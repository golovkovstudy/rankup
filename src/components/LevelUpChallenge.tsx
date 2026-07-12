import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { getAgeScale } from '../utils/age';
import { AppState } from '../types';
import { RANKS, UI } from '../data';
import { AlertTriangle, Clock, CheckCircle2, Circle, X } from 'lucide-react';

interface LevelUpChallengeProps {
  state: AppState;
  onSuccess: (newRank: any) => void;
  onFail: () => void;
  onCancel: () => void;
  examType?: 'rank' | 'phase2' | 'phase3';
}

export function LevelUpChallenge({ state, onSuccess, onFail, onCancel, examType = 'rank' }: LevelUpChallengeProps) {
  const currentRankConfig = RANKS[state.progress.currentRank] || RANKS['F'];
  const baseChallenge = (state.user?.gender === 'female' && currentRankConfig.challenge_f) ? currentRankConfig.challenge_f : currentRankConfig.challenge;
  const challenge = {
    ...baseChallenge,
    timeLimitMinutes: examType === 'rank' ? baseChallenge.timeLimitMinutes : Math.ceil(baseChallenge.timeLimitMinutes * (examType === 'phase2' ? 0.6 : 0.8)),
    tasks: baseChallenge.tasks.map(t => ({
       ...t,
       count: examType === 'rank' ? t.count : Math.max(1, Math.ceil(t.count * (examType === 'phase2' ? 0.5 : 0.75)))
    }))
  };
  const nextRank = currentRankConfig.nextRank;
  const lang = state.language;
  const t = UI[lang];

  const [hasStarted, setHasStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(challenge.timeLimitMinutes * 60);
  const [taskCounts, setTaskCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    let timer: any;
    if (hasStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (hasStarted && timeLeft === 0) {
      // Timer ran out
      onFail();
    }
    return () => clearInterval(timer);
  }, [hasStarted, timeLeft, onFail]);

  const toggleTask = (taskId: string, targetCount: number) => {
    if (!hasStarted) return;
    setTaskCounts(prev => {
      const current = prev[taskId] || 0;
      if (current >= targetCount) {
        return { ...prev, [taskId]: 0 }; // uncheck
      }
      return { ...prev, [taskId]: targetCount }; // instantly complete
    });
  };

  const allCompleted = challenge.tasks.every(t => (taskCounts[t.id] || 0) >= t.count);

  const handleFinish = () => {
    if (allCompleted) {
      onSuccess(nextRank);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Check cooldown
  const now = Date.now();
  const failedTime = state.progress.failedChallengeTimestamp;
  const cooldownMs = 24 * 60 * 60 * 1000;
  
  if (failedTime && now - failedTime < cooldownMs) {
    const remainingCooldown = Math.ceil((cooldownMs - (now - failedTime)) / (60 * 60 * 1000));
    return (
      <div className="absolute inset-0 z-50 bg-[#050507] p-8 flex flex-col items-center justify-center text-center selection:bg-emerald-500/30">
         <div className="w-24 h-24 rounded-full border border-red-500/40 bg-red-500/10 flex items-center justify-center text-red-500 mb-8 animate-pulse">
            <AlertTriangle size={48} />
         </div>
         <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-none mb-4 text-slate-100">{t.system_locked}</h2>
         <p className="text-slate-400 mb-8 max-w-xs text-sm">
           {t.fail_desc_1} <span className="text-red-400 font-bold font-mono">{remainingCooldown}{t.fail_desc_2}</span>.
         </p>
         <button 
           onClick={onCancel}
           className="w-full max-w-xs px-8 py-4 font-bold text-white transition-all duration-200 bg-slate-800 border border-white/10 rounded-full hover:bg-slate-700 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] uppercase tracking-widest"
         >
           {t.return_to_base}
         </button>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-50 bg-[#050507] flex flex-col selection:bg-emerald-500/30">
      <div className="p-6 border-b border-white/5 flex justify-between items-end bg-slate-900/20 backdrop-blur-md">
         <div>
           <div className="text-[10px] text-emerald-500 uppercase tracking-[0.2em] mb-1">{t.evaluation_mode}</div>
           <div className="text-3xl font-black italic tracking-tighter uppercase leading-none text-slate-100">{t.rank} {nextRank} {t.test}</div>
         </div>
         {!hasStarted && (
           <button onClick={onCancel} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-slate-400">
             <X size={24} />
           </button>
         )}
      </div>

      <div className="flex-1 p-6 overflow-y-auto flex flex-col bg-gradient-to-br from-[#050507] to-slate-900/50 relative overflow-hidden">
        <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="flex justify-center mb-12 mt-8 relative z-10">
          <div className="relative">
             <div className={`text-7xl font-black italic tracking-tighter tabular-nums ${hasStarted && timeLeft < 60 ? 'text-red-500' : 'text-slate-100'}`}>
               {formatTime(timeLeft)}
             </div>
             {!hasStarted && (
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-1 bg-red-500 -rotate-12 opacity-50" />
             )}
          </div>
        </div>

        <div className="space-y-4 mb-auto relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] flex-1 bg-white/10"></div>
            <div className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-bold">{t.objectives}</div>
            <div className="h-[1px] flex-1 bg-white/10"></div>
          </div>

          {challenge.tasks.map(task => {
            const currentCount = taskCounts[task.id] || 0;
            const isCompleted = currentCount >= task.count;
            return (
              <div 
                key={task.id}
                onClick={() => toggleTask(task.id, task.count)}
                className={`group flex items-center p-4 rounded-2xl border transition-all ${
                  hasStarted ? 'cursor-pointer active:scale-[0.98]' : 'opacity-50'
                } ${
                  isCompleted 
                    ? 'bg-emerald-500/10 border-emerald-500/20' 
                    : 'bg-white/[0.03] border-white/5 hover:bg-white/[0.05]'
                }`}
              >
                <div className="flex-1">
                  <div className={`font-bold text-lg ${isCompleted ? 'text-emerald-400 opacity-70' : 'text-slate-100'}`}>
                    {task.title[lang]}
                  </div>
                  <div className="text-sm font-mono text-slate-500">
                    <span className={isCompleted ? 'text-emerald-400 font-bold' : 'text-slate-300'}>{currentCount}</span> / {task.count}
                  </div>
                </div>

                <div className={`w-14 h-14 rounded-xl flex items-center justify-center border transition-colors ${
                  isCompleted 
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                    : 'bg-slate-800 text-slate-400 border-white/10 group-hover:border-emerald-500/50 group-hover:bg-slate-700'
                }`}>
                  {isCompleted ? (
                    <CheckCircle2 size={28} />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-slate-700 group-hover:border-slate-500"></div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-8 relative z-10">
          {!hasStarted ? (
            <div className="flex flex-col gap-4">
              {currentRankConfig.requiredInventoryForNext && (
                <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] text-orange-400 uppercase tracking-widest font-bold mb-1">{t.required_inventory}</span>
                  <span className="text-slate-100 font-bold">{currentRankConfig.requiredInventoryForNext[lang]}</span>
                </div>
              )}
              <button
                onClick={() => setHasStarted(true)}
                className="w-full px-8 py-4 font-bold text-slate-950 transition-all duration-200 bg-emerald-500 rounded-full hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] text-lg uppercase tracking-widest"
              >
                {t.start_timer}
              </button>
            </div>
          ) : (
            <button
              onClick={handleFinish}
              disabled={!allCompleted}
              className={`w-full px-8 py-4 font-bold transition-all duration-200 rounded-full text-lg uppercase tracking-widest ${
                allCompleted
                  ? 'bg-emerald-600 text-white hover:bg-emerald-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] scale-105'
                  : 'bg-slate-800 text-slate-500 border border-white/5 cursor-not-allowed'
              }`}
            >
              {t.complete_eval}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
