import { ExerciseModal } from './ExerciseModal';
import React, { useState } from 'react';
import { AppState } from '../types';
import { RANKS, UI, SSR_CHALLENGES } from '../data';
import { getRankTheme } from '../utils';
import { calculateCalories } from '../utils/calories';
import { getAgeScale, scaleStringNumbers } from '../utils/age';
import { showSystemToast } from '../toast';
import { motion } from 'motion/react';
import { CheckCircle2, Circle, Flame, Award, ChevronRight, Info, Plus, Trash2 } from 'lucide-react';
import { differenceInDays, differenceInCalendarDays, parseISO } from 'date-fns';
import confetti from 'canvas-confetti';

interface DashboardProps {
  state: AppState;
  onToggleQuest: (id: string, incrementSets?: boolean, maxSets?: number) => void;
  onStartChallenge: () => void;
  onGenerateSSRChallenge: () => void;
  onAddBonusQuest: () => void;
  onDeleteCustomQuest: (id: string) => void;
}

export function Dashboard({ state, onToggleQuest, onStartChallenge, onGenerateSSRChallenge, onAddBonusQuest, onDeleteCustomQuest }: DashboardProps) {
  const { progress, dailyQuests } = state;
  const currentRankConfig = RANKS[progress.currentRank] || RANKS['F'];
  const [guideQuestId, setGuideQuestId] = useState<string | null>(null);
  const lang = state.language;
  const t = UI[lang];
  
  const requiredQuests = dailyQuests.filter(q => !q.isCustom);
  const allQuestsCompleted = requiredQuests.length > 0 && requiredQuests.every(q => q.completed);
  const daysInRank = differenceInCalendarDays(new Date(), parseISO(progress.rankStartDate)) + (allQuestsCompleted ? 1 : 0);
  const phaseVal = state.progress.currentPhase || (daysInRank >= 28 ? 3 : daysInRank >= 14 ? 2 : 1);
  const phase = phaseVal === 3 ? 'III' : phaseVal === 2 ? 'II' : 'I';
  const isSSR = progress.currentRank === 'SSR';
  const isEligibleForChallenge = isSSR ? false : daysInRank >= currentRankConfig.minDays;
  const todayStr = new Date().toISOString().split('T')[0];

const todayCalories = dailyQuests
    .filter(q => q.completed)
    .reduce((sum, q) => {
      let descToUse = '';
      let titleToUse = '';
      if (q.isCustom) {
        descToUse = q.customDesc?.en || q.customTitle?.en || '';
        titleToUse = q.customTitle?.en || '';
      } else {
         const rankCfg = RANKS[state.progress.currentRank] || RANKS['F'];
         const qData = rankCfg?.quests?.find(x => x.id === q.id) || rankCfg?.quests_f?.find(x => x.id === q.id);
         if (qData) {
            const p = state.progress.currentPhase || 1;
            descToUse = (p === 3 && qData.desc_phase3 ? qData.desc_phase3.en : (p >= 2 && qData.desc_phase2 ? qData.desc_phase2.en : qData.desc.en));
            titleToUse = qData.title.en;
         } else {
            // Check SSR
            for (const c of SSR_CHALLENGES) {
              let qObj = c.quests?.find((x: any) => x.id === q.id);
              if (!qObj) qObj = c.quests_f?.find((x: any) => x.id === q.id);
              if (qObj) {
                descToUse = qObj.desc.en;
                titleToUse = qObj.title.en;
                break;
              }
            }
         }
      }
      return sum + calculateCalories(q.id, state.user?.weight || 75, scaleStringNumbers(descToUse + " " + titleToUse, ageScale));
    }, 0);

  const ageScale = getAgeScale(state.user?.age || 25);
  const scaleLocalized = (obj: any) => {
    if (!obj) return obj;
    return {
      en: scaleStringNumbers(obj.en, ageScale),
      ru: scaleStringNumbers(obj.ru, ageScale)
    };
  };

  const getQuestData = (quest: any) => {
    if (quest.isCustom && quest.customTitle) {
      return {
        id: quest.id,
        title: quest.customTitle,
        desc: quest.customDesc,
        isCustom: true
      };
    }
    const id = quest.originalId || quest.id;
    if (id === 'rest_day_quest') {
      return {
        id: 'rest_day_quest',
        title: { en: t.rest_quest_title, ru: t.rest_quest_title },
        desc: null,
        isCustom: quest.isCustom
      };
    }
    if (isSSR) {
      const challenge = SSR_CHALLENGES.find((c: any) => c.id === id);
      if (challenge) return { id: challenge.id, title: scaleLocalized(challenge.title), desc: scaleLocalized(challenge.desc), isCustom: quest.isCustom };
      
      // Look inside quests
      for (const c of SSR_CHALLENGES) {
        let q = c.quests?.find((x: any) => x.id === id);
        if (!q) q = c.quests_f?.find((x: any) => x.id === id);
        if (q) return { id: q.id, title: scaleLocalized(q.title), desc: scaleLocalized(q.desc), isCustom: quest.isCustom };
      }
      return null;
    }
    const qList = (state.user?.gender === 'female' && currentRankConfig.quests_f) ? currentRankConfig.quests_f : currentRankConfig.quests;
    const qData = qList.find(q => q.id === id);
    if (!qData) return null;
    let currentDesc = qData.desc;
    if (phase === 'III' && qData.desc_phase3) currentDesc = qData.desc_phase3;
    else if ((phase === 'II' || phase === 'III') && qData.desc_phase2) currentDesc = qData.desc_phase2;
    
    let title = { ...qData.title };
    if (state.user?.gender === 'female') {
      if ((id.includes('pushups') || title.en.toLowerCase().includes('pushup')) && !title.en.toLowerCase().includes('knee') && !title.ru.toLowerCase().includes('с колен')) {
        title = { en: title.en.replace('Push-ups', 'Knee Push-ups').replace('push-ups', 'knee push-ups').replace('Pushups', 'Knee Pushups'), ru: title.ru.replace('Отжимания', 'Отжимания с колен').replace('отжимания', 'отжимания с колен') };
      }
      if ((id.includes('pullups') || title.en.toLowerCase().includes('pull-up')) && !title.en.toLowerCase().includes('australian') && !title.ru.toLowerCase().includes('австрал')) {
        title = { en: title.en.replace('Pull-ups', 'Australian Pull-ups').replace('pull-ups', 'Australian pull-ups').replace('Pullups', 'Australian Pullups'), ru: title.ru.replace('Подтягивания', 'Австралийские подтягивания').replace('подтягивания', 'австралийские подтягивания') };
      }
    }
    
    return {
      id: quest.id,
      title: scaleLocalized(title),
      desc: scaleLocalized(currentDesc),
      isCustom: quest.isCustom
    };
  };
  
  const theme = getRankTheme(progress.currentRank);
  const rankStyle = `${theme.text} ${theme.border} ${theme.bg} ${theme.glow}`;
  const [infoQuest, setInfoQuest] = useState<any>(null);

  return (
    <div className="flex flex-col gap-8 pb-4">
      {/* Profile Header */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-4">
           <div className="relative w-24 h-24 mx-auto">
             <div className={`absolute inset-0 rounded-full bg-emerald-500/20 animate-pulse`}></div>
             <div className={`absolute inset-1 rounded-full border-2 flex items-center justify-center ${rankStyle}`}>
               <span className="text-3xl font-black italic">{progress.currentRank}</span>
             </div>
           </div>
           <div className="text-center">
             {state.user?.selectedTitle && (
               <motion.div 
                 initial={{ scale: 0.9, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 className="inline-block px-3 py-1 mb-2 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/40 text-yellow-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-[0_0_15px_rgba(234,179,8,0.2)]"
               >
                 🏆 {state.user.selectedTitle}
               </motion.div>
             )}
             {!isSSR && (
              <h2 className="text-xl font-bold tracking-tight uppercase text-emerald-400">
                {phase === 'III' ? t.phase_iii : phase === 'II' ? t.phase_ii : t.phase_i}
              </h2>
            )}
             <p className="text-xs text-slate-500 font-mono tracking-widest uppercase mt-1">{t.rank} {progress.currentRank}</p>
           </div>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
           <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]"></div>
             <span className="text-sm font-bold uppercase tracking-widest text-slate-100">{progress.currentStreak} {t.day_streak}</span>
           </div>
           <span className="text-orange-400 font-black">🔥</span>
        </div>

        {/* Progress Bar */}
        {!isSSR ? (
          <div>
            <div className="flex justify-between text-[10px] text-slate-500 uppercase tracking-[0.2em] mb-2">
              <span>{t.time_in_rank}</span>
              <span className="font-mono font-bold text-emerald-400">
                {daysInRank} / {currentRankConfig.minDays} {t.days} ({phase === 'III' ? t.phase_iii : phase === 'II' ? t.phase_ii : t.phase_i})
              </span>
            </div>
            <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden border border-white/5">
               <div 
                 className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-1000"
                 style={{ width: `${Math.min(100, (daysInRank / currentRankConfig.minDays) * 100)}%` }}
               />
            </div>
          </div>
        ) : (
          <div className={`text-center p-4 border ${theme.border} rounded-2xl ${theme.bg} ${theme.glow}`}>
            <h3 className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-1">SSR LEGEND</h3>
          </div>
        )}
      </div>
      
      {/* Body Metrics */}
      {state.user && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">
            <span>{lang === 'ru' ? 'Мотивация' : 'Motivation'}</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-800/50 border border-white/5 rounded-2xl p-4 relative overflow-hidden flex flex-col justify-between">
               <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">BMI / ИМТ</div>
               <div className="flex items-end gap-2">
                 <div className="text-2xl font-black text-white">
                   {(() => {
                     const bmi = state.user.weight / Math.pow(state.user.height/100, 2);
                     return bmi.toFixed(1);
                   })()}
                 </div>
                 <div className="text-[10px] uppercase font-bold tracking-widest pb-1" style={{
                   color: (() => {
                     const bmi = state.user.weight / Math.pow(state.user.height/100, 2);
                     if (bmi < 18.5) return '#60a5fa'; // blue
                     if (bmi < 25) return '#34d399'; // emerald
                     if (bmi < 30) return '#fbbf24'; // amber
                     return '#f87171'; // red
                   })()
                 }}>
                   {(() => {
                     const bmi = state.user.weight / Math.pow(state.user.height/100, 2);
                     if (bmi < 18.5) return lang === 'ru' ? 'Дефицит' : 'Under';
                     if (bmi < 25) return lang === 'ru' ? 'Норма' : 'Normal';
                     if (bmi < 30) return lang === 'ru' ? 'Избыток' : 'Over';
                     return lang === 'ru' ? 'Ожирение' : 'Obese';
                   })()}
                 </div>
               </div>
               <div className="absolute right-0 top-0 bottom-0 w-2 opacity-50" style={{
                 background: (() => {
                   const bmi = state.user.weight / Math.pow(state.user.height/100, 2);
                   if (bmi < 18.5) return 'linear-gradient(to bottom, #3b82f6, #60a5fa)';
                   if (bmi < 25) return 'linear-gradient(to bottom, #10b981, #34d399)';
                   if (bmi < 30) return 'linear-gradient(to bottom, #f59e0b, #fbbf24)';
                   return 'linear-gradient(to bottom, #ef4444, #f87171)';
                 })()
               }}></div>
            </div>
            <div className="bg-slate-800/50 border border-white/5 rounded-2xl p-4 relative overflow-hidden">
               <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">{lang === 'ru' ? 'Сожжено ккал' : 'Calories Burned'}</div>
               <div className="text-2xl font-black text-orange-400">
                 {todayCalories}
               </div>
               <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-b from-orange-500 to-red-500 opacity-50"></div>
            </div>
          </div>
        </div>
      )}

      {/* Daily Quests */}
      <section className="flex-1 mt-4">
        <div className="flex items-center gap-4 mb-6">
           <div className="h-[1px] flex-1 bg-white/10"></div>
           <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500">{t.todays_quests}</h3>
           <div className="h-[1px] flex-1 bg-white/10"></div>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {dailyQuests.map(quest => {
            const qData = getQuestData(quest);
            if (!qData) return null;
            
            const setsMatch = qData.desc ? qData.desc.en.match(/(\d+)\s*(?:x|х|sets?\s*of)/i) : null;
            const maxSets = setsMatch ? parseInt(setsMatch[1], 10) : 1;
            const currentSets = quest.currentSets || 0;
            const hasSets = maxSets > 1;

            return (
            <motion.div
              key={quest.id}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                if ((e.target as HTMLElement).closest('button.delete-btn') || (e.target as HTMLElement).closest('button.info-btn')) return;
                
                const wasCompleted = quest.completed;
                if (hasSets) {
                  if (wasCompleted) {
                    onToggleQuest(quest.id, false, 1);
                  } else {
                    onToggleQuest(quest.id, true, maxSets);
                  }
                  if (!wasCompleted && currentSets + 1 >= maxSets) {
                    const allWillBeCompleted = requiredQuests.every(q => q.id === quest.id ? true : q.completed);
                    if (allWillBeCompleted) {
                      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#10b981', '#34d399', '#059669'] });
                    }
                    try { const a = new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3'); a.volume=0.5; a.play(); } catch(e) {}
                    showSystemToast(lang === 'ru' ? '[СИСТЕМА] Задание выполнено' : '[SYSTEM] Quest Completed', 'success');
                  }
                } else {
                  onToggleQuest(quest.id, false, 1);
                  if (!wasCompleted) {
                    const allWillBeCompleted = requiredQuests.every(q => q.id === quest.id ? true : q.completed);
                    if (allWillBeCompleted) {
                      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#10b981', '#34d399', '#059669'] });
                    }
                    try { const a = new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3'); a.volume=0.5; a.play(); } catch(e) {}
                    showSystemToast(lang === 'ru' ? '[СИСТЕМА] Задание выполнено' : '[SYSTEM] Quest Completed', 'success');
                  }
                }
              }}
              className={`group flex items-center p-5 rounded-2xl border transition-all cursor-pointer ${
                quest.completed 
                  ? 'bg-emerald-900/40 border-emerald-400/60 shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:bg-emerald-900/60' 
                  : `bg-white/[0.03] border-white/5 hover:${theme.border}`
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center mr-4 border transition-colors ${
                quest.completed ? 'bg-emerald-500 text-white border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : `bg-slate-800 text-slate-500 border-white/10 group-hover:${theme.border}`
              }`}>
                {quest.completed ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                ) : hasSets ? (
                  <div className="flex flex-col items-center">
                    <Plus size={16} className="text-slate-400 mb-0.5 group-hover:text-white" />
                    <div className="text-[10px] font-bold leading-none text-slate-400 group-hover:text-white">{currentSets}/{maxSets}</div>
                  </div>
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-slate-700 group-hover:border-slate-500"></div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className={`font-bold ${quest.completed ? 'text-emerald-400 opacity-90' : 'text-white'}`}>{qData.title[lang]}</h4>
                  {quest.isCustom && (
                    <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                      {lang === 'ru' ? 'Опционально' : 'Optional'}
                    </span>
                  )}
                </div>
                {qData.desc && (
                  <div className={`text-[10px] mt-1 uppercase tracking-wider ${quest.completed ? 'text-emerald-500/80' : 'text-slate-500'}`}>{qData.desc[lang]}</div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button 
                  className="info-btn p-2 rounded-lg text-slate-500 hover:text-indigo-400 hover:bg-indigo-500/10 transition-colors"
                  onClick={() => setInfoQuest({ ...quest, title: qData.title, desc: qData.desc })}
                >
                  <Info size={18} />
                </button>
                {quest.completed ? (
                  <span className={`px-3 py-1 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase border border-emerald-500/30`}>{t.completed}</span>
                ) : null}
                {quest.isCustom && (
                  <button 
                    className="delete-btn p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    onClick={() => onDeleteCustomQuest(quest.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </motion.div>
          )})}

          {!isSSR && (
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={onAddBonusQuest}
              className="w-full flex items-center justify-center gap-2 p-4 mt-2 rounded-2xl bg-white/[0.02] border border-white/5 border-dashed text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all"
            >
              <Plus size={18} />
              <span className="text-sm font-bold tracking-widest uppercase">{lang === 'ru' ? 'Получить доп. задание' : 'Get bonus quest'}</span>
            </motion.button>
          )}
        </div>
      </section>

      {/* Level Up Button / SSR Button */}
      {isSSR ? (
        <footer className="mt-8 p-6 rounded-[2rem] bg-gradient-to-br from-slate-900 to-black border-2 border-orange-500/20 shadow-[0_0_30px_rgba(249,115,22,0.1)] relative overflow-hidden">
          <div className="absolute -left-16 -top-16 w-64 h-64 bg-orange-500/10 blur-[80px] rounded-full"></div>
          <div className="relative flex flex-col gap-4">
            <div>
              <h3 className="text-xl font-black italic uppercase text-orange-400">SSR Legend</h3>
              <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest">{t.required_inventory}</p>
            </div>
            
            <div className="w-full">
              <button
                onClick={onGenerateSSRChallenge}
                disabled={progress.ssrChallengeDate === todayStr}
                className={`w-full relative inline-flex items-center justify-center px-8 py-4 font-bold transition-all duration-200 rounded-full ${
                  progress.ssrChallengeDate !== todayStr
                    ? 'bg-orange-600 text-white hover:bg-orange-500 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5'
                }`}
              >
                <span className="uppercase tracking-widest flex flex-col items-center">
                  {progress.ssrChallengeDate === todayStr ? t.challenge_accepted : t.challenge_yourself}
                </span>
              </button>
            </div>
          </div>
        </footer>
      ) : currentRankConfig.nextRank ? (
        <footer className="mt-8 p-6 rounded-[2rem] bg-gradient-to-br from-slate-900 to-black border-2 border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full"></div>
          <div className="relative flex flex-col gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-0.5 rounded text-slate-950 text-[10px] font-black uppercase tracking-widest ${phase === 'III' && allQuestsCompleted ? 'bg-emerald-500' : 'bg-slate-500'}`}>
                  {phase === 'III' && allQuestsCompleted ? t.challenge_active : t.locked}
                </span>
                <span className="text-xs text-slate-500 font-mono">{progress.currentRank} → {currentRankConfig.nextRank} {t.promotion}</span>
              </div>
              <h3 className="text-2xl font-black italic uppercase">{t.rank_up_eval}</h3>
            </div>
            
            <div className="w-full">
              <button
                onClick={onStartChallenge}
                disabled={phase !== 'III' || !allQuestsCompleted}
                className={`w-full group relative inline-flex items-center justify-center px-8 py-4 font-bold transition-all duration-200 rounded-full ${
                  phase === 'III' && allQuestsCompleted
                    ? 'bg-emerald-600 text-white hover:bg-emerald-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5'
                }`}
              >
                <span className="uppercase tracking-widest flex flex-col items-center">
                  {phase === 'III' ? t.try_level_up : `${currentRankConfig.minDays - daysInRank} ${t.days_remaining}`}
                </span>
              </button>
            </div>
          </div>
        </footer>
      ) : null}
      <ExerciseModal isOpen={!!infoQuest} onClose={() => setInfoQuest(null)} quest={infoQuest} state={state} />
    </div>
  );
}
