import React from 'react';
import { AppState } from '../types';
import { UI, TROPHIES } from '../data';
import { getRankTheme } from '../utils';
import { Lock, Info } from 'lucide-react';

import { motion } from 'motion/react';


export function Achievements({ state }: { state: AppState }) {
  const lang = state.language;
  const t = UI[lang];

  const getProgress = (req: any) => {
    switch (req.type) {
      case 'workouts': return { current: state.stats.workoutsCompleted, target: req.count };
      case 'streak': return { current: state.progress.currentStreak, target: req.count };
      case 'run_km': return { current: state.stats.runKmTotal, target: req.count };
      case 'pushups': return { current: state.stats.pushupsTotal, target: req.count };
      case 'pullups': return { current: state.stats.pullupsTotal, target: req.count };
      case 'rank': 
        const ranks = ['F', 'E', 'D', 'C', 'B', 'A', 'S', 'SSR'];
        return { 
          current: Math.max(0, ranks.indexOf(state.progress.currentRank)), 
          target: ranks.indexOf(req.rank) 
        };
      case 'ssr_all': return { current: state.stats.ssrChallengesCompleted.length, target: 5 };
      case 'calories': return { current: state.stats.caloriesBurnedTotal || 0, target: req.count };
      case 'bmi_normal': {
         if (!state.user) return { current: 0, target: 1 };
         const bmi = state.user.weight / Math.pow(state.user.height / 100, 2);
         const isNormal = bmi >= 18.5 && bmi <= 24.9;
         return { current: isNormal ? 1 : 0, target: 1 };
      }
      default: return { current: 0, target: 1 };
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'wood': return 'from-[#8B5A2B] to-[#4A3219] text-[#CD853F] border-[#8B5A2B]/30';
      case 'copper': return 'from-[#D2691E] to-[#8B4513] text-[#FF7F50] border-[#D2691E]/30';
      case 'iron': return 'from-[#4F4F4F] to-[#2F2F2F] text-[#A9A9A9] border-[#4F4F4F]/30';
      case 'bronze': return 'from-[#CD7F32] to-[#8B5A2B] text-[#FFA07A] border-[#CD7F32]/30';
      case 'silver': return 'from-[#C0C0C0] to-[#808080] text-[#E0E0E0] border-[#C0C0C0]/30';
      case 'gold': return 'from-[#FFD700] to-[#B8860B] text-[#FFF8DC] border-[#FFD700]/30 shadow-[0_0_15px_rgba(255,215,0,0.3)]';
      case 'platinum': return 'from-[#E5E4E2] to-[#B0C4DE] text-[#F0F8FF] border-[#E5E4E2]/30 shadow-[0_0_20px_rgba(229,228,226,0.4)]';
      case 'diamond': return 'from-[#00FFFF] to-[#008B8B] text-[#E0FFFF] border-[#00FFFF]/40 shadow-[0_0_25px_rgba(0,255,255,0.5)]';
      case 'legend': return 'from-[#8A2BE2] to-[#4B0082] text-[#E6E6FA] border-[#8A2BE2]/50 shadow-[0_0_30px_rgba(138,43,226,0.6)]';
      default: return 'from-slate-800 to-slate-900 text-slate-400 border-white/10';
    }
  };

  const theme = getRankTheme(state.progress.currentRank);
  

  return (
    <div className="space-y-8">
      {/* Stats Section */}
      

      {/* Achievements */}
      <section>
        <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-4">
          {t.trophy_room}
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          {TROPHIES.map(trophy => {
            const progress = getProgress(trophy.req);
            const isUnlocked = progress.current >= progress.target;
            const tierClass = getTierColor(trophy.tier);
            
            return (
              <motion.div 
                key={trophy.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-4 rounded-2xl border flex flex-col items-center text-center transition-all ${
                  isUnlocked 
                    ? `bg-gradient-to-br ${tierClass}` 
                    : 'bg-slate-900/50 border-white/5 grayscale opacity-60'
                }`}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 bg-black/20">
                  {!isUnlocked ? <Lock size={20} className="text-slate-500" /> : <div className="text-2xl">🏆</div>}
                </div>
                <h3 className="font-bold text-sm mb-1 leading-tight">{trophy.title[lang]}</h3>
                <p className="text-[10px] uppercase tracking-widest opacity-70 mb-3">{trophy.desc[lang]}</p>
                
                
                {isUnlocked && (
                  <button 
                    onClick={() => {
                      if (state.user?.selectedTitle === trophy.title[lang]) {
                        window.dispatchEvent(new CustomEvent('equipTitle', { detail: null }));
                      } else {
                        window.dispatchEvent(new CustomEvent('equipTitle', { detail: trophy.title[lang] }));
                      }
                    }}
                    className={`mt-auto text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full transition-colors ${state.user?.selectedTitle === trophy.title[lang] ? 'bg-white text-black' : 'bg-black/30 hover:bg-black/50 text-white'}`}
                  >
                    {state.user?.selectedTitle === trophy.title[lang] ? (lang === 'ru' ? 'Снять титул' : 'Unequip') : (lang === 'ru' ? 'Выбрать титул' : 'Equip Title')}
                  </button>
                )}
                {!isUnlocked && trophy.req.type !== 'rank' && (
                  <div className="w-full mt-auto">
                    <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden border border-white/5 shadow-inner">
                      <div 
                        className={`h-full ${theme.bg.replace('/20', '/80')} ${theme.glow}`}
                        style={{ width: `${Math.min(100, (progress.current / progress.target) * 100)}%` }}
                      />
                    </div>
                    <div className={`text-[10px] font-bold mt-1.5 ${theme.text}`}>
                      {Math.floor(progress.current)} / {progress.target}
                    </div>
                  </div>
                )}
                {!isUnlocked && trophy.req.type === 'rank' && (
                  <div className="w-full mt-auto">
                    <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden border border-white/5 shadow-inner">
                      <div 
                        className={`h-full ${theme.bg.replace('/20', '/80')} ${theme.glow}`}
                        style={{ width: `${Math.min(100, (progress.current / progress.target) * 100)}%` }}
                      />
                    </div>
                    <div className={`text-[10px] font-bold mt-1.5 ${theme.text}`}>
                      Rank {state.progress.currentRank} / {trophy.req.rank}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
