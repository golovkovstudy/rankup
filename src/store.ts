import { calculateCalories } from './utils/calories';
import { getAgeScale, scaleStringNumbers } from './utils/age';
import { useState, useEffect } from 'react';
import { AppState, DailyQuest, Rank } from './types';
import { RANKS, ACHIEVEMENTS, SSR_CHALLENGES } from './data';
import { format, isSameDay, parseISO, differenceInDays, getDay } from 'date-fns';

const STORAGE_KEY = 'rankup_fitness_data';

const getInitialState = (): AppState => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (!parsed.language) parsed.language = 'ru'; // default to ru for existing
      if (!parsed.stats) parsed.stats = { workoutsCompleted: 0, pushupsTotal: 0, pullupsTotal: 0, runKmTotal: 0, ssrChallengesCompleted: [] };
      return parsed;
    } catch (e) {
      console.error('Failed to parse local storage', e);
    }
  }
  return {
    user: null,
    progress: {
      currentRank: 'F',
      rankStartDate: format(new Date(), 'yyyy-MM-dd'),
      currentStreak: 0,
      lastActiveDate: format(new Date(), 'yyyy-MM-dd'),
    },
    dailyQuests: [],
    achievements: [],
    stats: {
      workoutsCompleted: 0,
      pushupsTotal: 0,
      pullupsTotal: 0,
      runKmTotal: 0,
      ssrChallengesCompleted: []
    },
    language: 'ru', // RU by default as requested
  };
};

export const useStore = () => {
  const [state, setState] = useState<AppState>(getInitialState);

  // Sync to local storage whenever state changes
  // Listen for custom events
  useEffect(() => {
    const handleUpdateTrainingDays = (e) => {
      setState(prev => prev.user ? {
        ...prev,
        user: { ...prev.user, trainingDays: e.detail },
        dailyQuests: [] // force regeneration
      } : prev);
    };
    
    const handleEquipTitle = (e) => {
      setState(prev => prev.user ? {
        ...prev,
        user: { ...prev.user, selectedTitle: e.detail }
      } : prev);
    };

    window.addEventListener('updateTrainingDays', handleUpdateTrainingDays);
    window.addEventListener('equipTitle', handleEquipTitle);
    
    return () => {
      window.removeEventListener('updateTrainingDays', handleUpdateTrainingDays);
      window.removeEventListener('equipTitle', handleEquipTitle);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Generate or refresh daily quests
  useEffect(() => {
    if (!state.user) return; // Don't generate quests if no user

    const todayStr = format(new Date(), 'yyyy-MM-dd');
    const realDayOfWeek = getDay(new Date()); // 0 = Sunday, 1 = Monday, ...
    const activeDayOfWeek = state.debugDayOverride !== undefined ? state.debugDayOverride : realDayOfWeek;
    const { progress, dailyQuests, user } = state;

    const isUpToDate = state.lastGeneratedDate === todayStr && 
                       state.lastGeneratedDay === activeDayOfWeek && 
                       state.lastGeneratedRank === progress.currentRank && dailyQuests.length > 0;

    if (!isUpToDate) {
      // It's a new day! Calculate penalty and streak
      // Determine training days for penalty calculations
      let tDays = user.trainingDays;
      if (!tDays || tDays.length === 0) {
        tDays = [];
        for (let i = 1; i <= 6; i++) {
            tDays.push(( (user.restDay !== undefined ? user.restDay : 0) + i ) % 7);
        }
        tDays = tDays.map(d => d % 7);
      }

      let newStreak = progress.currentStreak;
      let newRankStartDate = progress.rankStartDate;
      let penaltyAlert: 'partial' | 'full' | null = null;
      let penaltyDaysCount = 0;
      let newActivityLog = { ...(state.stats.activityLog || {}) };

      const lastDate = dailyQuests.length > 0 ? dailyQuests[0].date : progress.lastActiveDate;
      
      if (lastDate && lastDate !== todayStr && state.lastGeneratedDate && state.lastGeneratedDate !== todayStr) {
         const daysDiff = differenceInDays(new Date(todayStr), parseISO(lastDate));
         
         if (daysDiff > 0) {
             for (let i = 0; i < daysDiff; i++) {
                 const d = new Date(parseISO(lastDate).getTime() + i * 24 * 60 * 60 * 1000);
                 const dateStr = format(d, 'yyyy-MM-dd');
                 const dayOfWeek = getDay(d);
                 
                 const isRestDay = !tDays.includes(dayOfWeek);
                 const isRestDayQuest = (i === 0) && dailyQuests.length > 0 && dailyQuests.every(q => q.id === 'rest_day_quest');
                 
                 if (i === 0) {
                     // Check yesterday's generated quests
                     if (isRestDay || isRestDayQuest) {
                         newStreak += 1; // Auto-complete rest day
                         newActivityLog[dateStr] = 'rest';
                     } else {
                         const anyCompleted = dailyQuests.some(q => q.completed);
                         const allCompleted = dailyQuests.every(q => q.completed);
                         if (!anyCompleted && dailyQuests.length > 0) {
                             penaltyAlert = 'full';
                             penaltyDaysCount += 2;
                             newActivityLog[dateStr] = 'missed';
                         } else if (!allCompleted && dailyQuests.length > 0) {
                             penaltyAlert = 'partial';
                             newActivityLog[dateStr] = 'partial';
                         } else if (allCompleted && dailyQuests.length > 0) {
                             newStreak += 1;
                             newActivityLog[dateStr] = 'full';
                         } else {
                             newActivityLog[dateStr] = 'rest';
                         }
                     }
                 } else {
                     // Days missed entirely
                     if (isRestDay) {
                         newStreak += 1; // Auto-complete missed rest day
                         newActivityLog[dateStr] = 'rest';
                     } else {
                         penaltyAlert = 'full';
                         penaltyDaysCount += 2;
                         newActivityLog[dateStr] = 'missed';
                     }
                 }
             }
         }
      }

      if (penaltyAlert) {
         newStreak = 0;
         if (penaltyDaysCount > 0) {
            const currentDateStart = parseISO(newRankStartDate);
            let updatedDateStart = new Date(currentDateStart.getTime() + penaltyDaysCount * 24 * 60 * 60 * 1000);
            if (updatedDateStart > new Date()) {
                updatedDateStart = new Date();
            }
            newRankStartDate = format(updatedDateStart, 'yyyy-MM-dd');
         }
      }

      // Generate new quests
      let newQuests: DailyQuest[] = [];
      
      if (progress.currentRank === 'SSR') {
        if (progress.ssrChallengeDate === todayStr && progress.ssrChallengeId) {
            const ssrCfg = SSR_CHALLENGES.find(c => c.id === progress.ssrChallengeId);
            if (ssrCfg) {
                const qList = (user.gender === 'female' && ssrCfg.quests_f) ? ssrCfg.quests_f : (ssrCfg.quests || []);
                if (qList.length > 0) {
                   newQuests = qList.map(q => {
                      const existing = dailyQuests.find(eq => eq.id === q.id);
                      return {
                          id: q.id,
                          completed: existing ? existing.completed : false,
                          date: todayStr
                      };
                   });
                } else {
                   const existing = dailyQuests.find(eq => eq.id === progress.ssrChallengeId);
                   newQuests = [{ id: progress.ssrChallengeId, completed: existing ? existing.completed : false, date: todayStr }];
                }
            }
        }
      } else {
          // Backward compatibility + new trainingDays logic
          // tDays already calculated above
          
          if (!tDays.includes(activeDayOfWeek)) {
            // It's rest day!
            newQuests = [{
                id: 'rest_day_quest',
                completed: false,
                date: todayStr
            }];
          } else {
            const currentRankConfig = RANKS[progress.currentRank] || RANKS['F'];
            
            // Map the selected N training days to the 6 workout templates
            const N = tDays.length;
            const idx = tDays.indexOf(activeDayOfWeek); // 0 to N-1
            
            const templatesToRun = [];
            if (N >= 6) {
                // For 6 or 7 days, just run template (idx % 6) + 1
                // E.g. day 0->1, 1->2, ... 5->6, 6->1
                templatesToRun.push((idx % 6) + 1);
            } else {
                // e.g. N=3 -> idx=0 gets templates 1,2; idx=1 gets 3,4; idx=2 gets 5,6
                const startTemplate = Math.floor(idx * (6 / N)) + 1;
                const endTemplate = Math.floor((idx + 1) * (6 / N));
                for(let i = startTemplate; i <= endTemplate; i++) {
                    templatesToRun.push(i);
                }
            }
            
            // Gather all quests for these templates
            let uniqueQuests = new Map();
            const qList = (user.gender === 'female' && currentRankConfig.quests_f) ? currentRankConfig.quests_f : currentRankConfig.quests;
            qList.forEach(q => {
                const isScheduled = templatesToRun.some(tNum => q.scheduleDays.includes(tNum));
                const hasInventory = !q.inventoryReq || user.inventory?.includes(q.inventoryReq);
                if (isScheduled && hasInventory) {
                    uniqueQuests.set(q.id, {
                        id: q.id,
                        completed: false,
                        date: todayStr,
                    });
                }
            });
            
            newQuests = Array.from(uniqueQuests.values());
            
            // If somehow empty, give a rest quest
            if (newQuests.length === 0) {
                newQuests = [{ id: 'rest_day_quest', completed: false, date: todayStr }];
            }
          }
      }

      setState(prev => ({
        ...prev,
        stats: {
           ...prev.stats,
           activityLog: newActivityLog
        },
        progress: {
          ...prev.progress,
          currentStreak: newStreak,
          lastActiveDate: todayStr,
          rankStartDate: newRankStartDate
        },
        dailyQuests: newQuests,
        penaltyAlert: penaltyAlert,
        lastGeneratedDate: todayStr,
        lastGeneratedDay: activeDayOfWeek,
        lastGeneratedRank: progress.currentRank
      }));
    }
  }, [state.user, state.progress.currentRank, state.progress.lastActiveDate, state.debugDayOverride, state.user?.restDay, state.lastGeneratedDate, state.lastGeneratedDay, state.lastGeneratedRank, state.progress.ssrChallengeDate, state.progress.ssrChallengeId, state.dailyQuests.length]);

    const toggleQuest = (questId: string, incrementSets: boolean = false, maxSets: number = 1) => {
    setState(prev => {
      const todayStr = format(new Date(), 'yyyy-MM-dd');
      
      const newQuests = prev.dailyQuests.map(q => {
        if (q.id === questId) {
          if (incrementSets) {
            const nextSets = (q.currentSets || 0) + 1;
            if (nextSets >= maxSets) {
               return { ...q, currentSets: nextSets, completed: true };
            } else {
               return { ...q, currentSets: nextSets };
            }
          } else {
            // normal toggle
            if (q.completed) {
              return { ...q, completed: false, currentSets: 0 };
            } else {
              return { ...q, completed: true, currentSets: maxSets };
            }
          }
        }
        return q;
      });

      const wasCompleted = prev.dailyQuests.find(q => q.id === questId)?.completed;
      const isCompleted = newQuests.find(q => q.id === questId)?.completed;
      const allQuestsDoneNow = newQuests.every(q => q.completed);

      const getTitleToUse = () => {
        const questObj = prev.dailyQuests.find(q => q.id === questId);
        if (questObj?.isCustom) return questObj.customTitle?.en || '';
        const rankCfg = RANKS[prev.progress.currentRank] || RANKS['F'];
        const qData = rankCfg?.quests?.find(q => q.id === questId) || rankCfg?.quests_f?.find(q => q.id === questId);
        if (qData) return qData.title.en;
        for (const c of SSR_CHALLENGES) {
            let q = c.quests?.find((x: any) => x.id === questId);
            if (!q) q = c.quests_f?.find((x: any) => x.id === questId);
            if (q) return q.title.en;
        }
        return '';
      };
      const getDescToUse = () => {
        const questObj = prev.dailyQuests.find(q => q.id === questId);
        if (questObj?.isCustom) return questObj.customDesc?.en || questObj.customTitle?.en || '';
        for (const c of SSR_CHALLENGES) {
            let q = c.quests?.find((x: any) => x.id === questId);
            if (!q) q = c.quests_f?.find((x: any) => x.id === questId);
            if (q) return q.desc.en;
        }
        if (questObj?.isCustom) return questObj.customDesc?.en || questObj.customTitle?.en || '';
        const rankCfg = RANKS[prev.progress.currentRank] || RANKS['F'];
        const qData = rankCfg?.quests?.find(q => q.id === questId) || rankCfg?.quests_f?.find(q => q.id === questId);
        if (qData) {
           const p = prev.progress.currentPhase || 1;
           return (p === 3 && qData.desc_phase3 ? qData.desc_phase3.en : (p >= 2 && qData.desc_phase2 ? qData.desc_phase2.en : qData.desc.en));
        }
        return '';
      };
      const descToUse = getDescToUse();
      const titleToUse = getTitleToUse();
      
      let newStats = { ...prev.stats };

      if (!wasCompleted && isCompleted) {
        if (!newStats.activityHistory) {
          newStats.activityHistory = [todayStr];
        } else if (!newStats.activityHistory.includes(todayStr)) {
          newStats.activityHistory = [...newStats.activityHistory, todayStr];
        }
        newStats.workoutsCompleted += 1;

        const lowerId = questId.toLowerCase();
        if (lowerId.includes('pushup') || lowerId.includes('dip')) newStats.pushupsTotal += Math.max(1, Math.round(40 * ageScale));
        else if (lowerId.includes('pullup') || lowerId.includes('mu') || lowerId.includes('hspu')) newStats.pullupsTotal += Math.max(1, Math.round(15 * ageScale));
        else if (lowerId.includes('run') || lowerId.includes('walk') || lowerId.includes('jog') || lowerId.includes('treadmill')) newStats.runKmTotal += Math.max(0.1, 5 * ageScale);
        else if (lowerId.includes('squat') || lowerId.includes('lunge') || lowerId.includes('pistol') || lowerId.includes('rdl') || lowerId.includes('calf') || lowerId.includes('nordic') || lowerId.includes('wiper') || lowerId.includes('raise') || lowerId.includes('hollow') || lowerId.includes('plank') || lowerId.includes('crunch') || lowerId.includes('situp')) {
           // Legs
        } else {
           if (prev.progress.currentRank !== 'F') newStats.pullupsTotal += Math.max(1, Math.round(10 * ageScale));
           newStats.pushupsTotal += Math.max(1, Math.round(20 * ageScale));
        }

        const allQuestsDone = newQuests.every(q => q.completed);
        if (prev.progress.currentRank === 'SSR' && prev.progress.ssrChallengeId && allQuestsDone && !newStats.ssrChallengesCompleted.includes(prev.progress.ssrChallengeId)) {
          newStats.ssrChallengesCompleted.push(prev.progress.ssrChallengeId);
        }
        
        const ageScale = getAgeScale(prev.user?.age || 25);
        const cals = calculateCalories(questId, prev.user?.weight || 75, scaleStringNumbers(descToUse + " " + titleToUse, ageScale));
        newStats.caloriesBurnedTotal = (newStats.caloriesBurnedTotal || 0) + cals;
      } else if (wasCompleted && !isCompleted) {
        newStats.workoutsCompleted = Math.max(0, newStats.workoutsCompleted - 1);
        const ageScale2 = getAgeScale(prev.user?.age || 25);
        const cals = calculateCalories(questId, prev.user?.weight || 75, scaleStringNumbers(descToUse + " " + titleToUse, ageScale2));
        newStats.caloriesBurnedTotal = Math.max(0, (newStats.caloriesBurnedTotal || 0) - cals);
        
        const lowerId = questId.toLowerCase();
        if (lowerId.includes('pushup') || lowerId.includes('dip')) newStats.pushupsTotal = Math.max(0, newStats.pushupsTotal - Math.max(1, Math.round(40 * ageScale2)));
        else if (lowerId.includes('pullup') || lowerId.includes('mu') || lowerId.includes('hspu')) newStats.pullupsTotal = Math.max(0, newStats.pullupsTotal - Math.max(1, Math.round(15 * ageScale2)));
        else if (lowerId.includes('run') || lowerId.includes('walk') || lowerId.includes('jog') || lowerId.includes('treadmill')) newStats.runKmTotal = Math.max(0, newStats.runKmTotal - Math.max(0.1, 5 * ageScale2));
        else if (lowerId.includes('squat') || lowerId.includes('lunge') || lowerId.includes('pistol') || lowerId.includes('rdl') || lowerId.includes('calf') || lowerId.includes('nordic') || lowerId.includes('wiper') || lowerId.includes('raise') || lowerId.includes('hollow') || lowerId.includes('plank') || lowerId.includes('crunch') || lowerId.includes('situp')) {
           // Legs
        } else {
           if (prev.progress.currentRank !== 'F') newStats.pullupsTotal = Math.max(0, newStats.pullupsTotal - Math.max(1, Math.round(10 * ageScale2)));
           newStats.pushupsTotal = Math.max(0, newStats.pushupsTotal - Math.max(1, Math.round(20 * ageScale2)));
        }
      }

      return {
        ...prev,
        progress: {
           ...prev.progress,
           ssrChallengeCompleted: prev.progress.currentRank === 'SSR' ? allQuestsDoneNow : prev.progress.ssrChallengeCompleted
        },
        dailyQuests: newQuests,
        stats: newStats
      };
    });
  };

  const updateBodyMetrics = (weight: number, height: number, age: number) => {
    setState(prev => {
      if (!prev.user) return prev;
      return {
        ...prev,
        user: {
          ...prev.user,
          weight,
          height,
          age
        }
      };
    });
  };

  const completeOnboarding = (user: AppState['user']) => {
    setState(prev => ({
      ...prev,
      user,
      progress: {
        ...prev.progress,
        currentRank: 'F',
        rankStartDate: format(new Date(), 'yyyy-MM-dd'),
        lastActiveDate: format(new Date(), 'yyyy-MM-dd'),
      }
    }));
  };

    const levelUp = (newRank: Rank) => {
    setState(prev => ({
      ...prev,
      progress: {
        ...prev.progress,
        currentRank: newRank,
        rankStartDate: format(new Date(), 'yyyy-MM-dd')
      },
      stats: {
        ...prev.stats,
        pullupsTotal: prev.stats.pullupsTotal + 20,
        pushupsTotal: prev.stats.pushupsTotal + 50
      },
      dailyQuests: [] // clear today's quests so new ones generate
    }));
  };

  const setFailedChallenge = () => {
    setState(prev => ({
      ...prev,
      progress: {
        ...prev.progress,
        failedChallengeTimestamp: Date.now()
      }
    }));
  };

  const importData = (importedState: AppState) => {
    setState(importedState);
  };

  const resetData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState({
      user: null,
      progress: {
        currentRank: 'F',
        rankStartDate: format(new Date(), 'yyyy-MM-dd'),
        currentStreak: 0,
        lastActiveDate: format(new Date(), 'yyyy-MM-dd'),
      },
      dailyQuests: [],
      achievements: [],
      stats: {
        workoutsCompleted: 0,
        pushupsTotal: 0,
        pullupsTotal: 0,
        runKmTotal: 0,
        ssrChallengesCompleted: [],
      },
      language: state.language || 'ru',
    });
  };

  const updateInventory = (inventory: string[]) => {
    setState(prev => prev.user ? { ...prev, user: { ...prev.user, inventory } } : prev);
  };
  
  const setRestDay = (day: number) => {
    setState(prev => prev.user ? {
      ...prev,
      user: { ...prev.user, restDay: day }
    } : prev);
  };

  const setLanguage = (lang: 'ru' | 'en') => {
    setState(prev => ({ ...prev, language: lang }));
  };

  const clearPenaltyAlert = () => {
    setState(prev => ({ ...prev, penaltyAlert: null }));
  };

  const forceRank = (rank: Rank) => {
    setState(prev => ({
      ...prev,
      progress: {
        ...prev.progress,
        currentRank: rank,
        rankStartDate: format(new Date(), 'yyyy-MM-dd'),
        currentStreak: 0,
        failedChallengeTimestamp: undefined,
      },
      dailyQuests: [], // trigger generation next render
      lastGeneratedDate: undefined,
      lastGeneratedDay: undefined,
      lastGeneratedRank: undefined,
    }));
  };

  const forcePhase = (phase: 1 | 2 | 3) => {
    const daysOffset = phase === 1 ? 0 : phase === 2 ? 14 : 28;
    const offsetDate = new Date();
    offsetDate.setDate(offsetDate.getDate() - daysOffset);
    
    setState(prev => ({
      ...prev,
      progress: {
        ...prev.progress,
        rankStartDate: format(offsetDate, 'yyyy-MM-dd'),
      },
      dailyQuests: [], // trigger generation to pick up new desc
    }));
  };

  const addBonusQuest = () => {
    setState(prev => {
      if (prev.progress.currentRank === 'SSR') return prev; 
      const todayStr = format(new Date(), 'yyyy-MM-dd');
      
      const rank = prev.progress.currentRank;
      
      // Random generation logic
      const isFemale = prev.user?.gender === 'female';
      const exercises = [
        { type: 'pushups', name: isFemale ? { en: 'Knee Push-ups', ru: 'Отжимания с колен' } : { en: 'Push-ups', ru: 'Отжимания' } },
        { type: 'squats', name: { en: 'Squats', ru: 'Приседания' } },
        { type: 'plank', name: { en: 'Plank Hold', ru: 'Планка' } },
        { type: 'run', name: { en: 'Light Jog', ru: 'Легкий бег' } },
        { type: 'burpees', name: { en: 'Burpees', ru: 'Бёрпи' } }
      ];
      
      if (rank === 'D' || rank === 'C' || rank === 'B' || rank === 'A' || rank === 'S') {
         exercises.push({ type: 'pullups', name: isFemale ? { en: 'Australian Pull-ups', ru: 'Австралийские подтягивания' } : { en: 'Pull-ups', ru: 'Подтягивания' } });
      }
      
      const ex = exercises[Math.floor(Math.random() * exercises.length)];
      let countStr = '';
      
      const getMultiplier = (r: string) => {
        switch(r) {
          case 'F': return 1;
          case 'E': return 1.5;
          case 'D': return 2;
          case 'C': return 3;
          case 'B': return 4;
          case 'A': return 5;
          case 'S': return 6;
          default: return 1;
        }
      };
      const mult = getMultiplier(rank);
      
      if (ex.type === 'plank') {
         const sec = Math.floor((30 * mult) + Math.random() * 30);
         countStr = `${sec} sec`;
      } else if (ex.type === 'run') {
         const km = Math.floor((1 * mult) + Math.random() * 2);
         countStr = `${km} km`;
      } else {
         const reps = Math.floor((10 * mult) + Math.random() * 10);
         countStr = `${reps} reps`;
      }
      
      const customTitle = ex.name;
      const customDesc = {
        en: `Bonus: ${countStr}`,
        ru: `Дополнительно: ${countStr.replace('sec', 'сек').replace('reps', 'повторений')}`
      };

      const uniqueId = `bonus_${Date.now()}_${Math.floor(Math.random()*1000)}`;

      return {
        ...prev,
        dailyQuests: [...prev.dailyQuests, { 
          id: uniqueId, 
          completed: false, 
          date: todayStr, 
          isCustom: true,
          customTitle: customTitle,
          customDesc: customDesc
        }]
      };
    });
  };

  const deleteCustomQuest = (id: string) => {
    setState(prev => ({
      ...prev,
      dailyQuests: prev.dailyQuests.filter(q => q.id !== id)
    }));
  };

  const setDebugDayOverride = (dayIndex?: number) => {
    setState(prev => ({
      ...prev,
      debugDayOverride: dayIndex,
      dailyQuests: [], // trigger regeneration
    }));
  };

  const generateSSRChallenge = () => {
    const todayStr = format(new Date(), 'yyyy-MM-dd');
    const randomChallenge = SSR_CHALLENGES[Math.floor(Math.random() * SSR_CHALLENGES.length)];
    setState(prev => {
      const qList = (prev.user?.gender === 'female' && randomChallenge.quests_f) ? randomChallenge.quests_f : (randomChallenge.quests || []);
      const newQuests = qList.map(q => ({
        id: q.id,
        completed: false,
        date: todayStr
      }));
      
      // fallback just in case
      if (newQuests.length === 0) {
        newQuests.push({ id: randomChallenge.id, completed: false, date: todayStr });
      }

      return {
        ...prev,
        progress: {
            ...prev.progress,
            ssrChallengeDate: todayStr,
            ssrChallengeId: randomChallenge.id,
            ssrChallengeCompleted: false
        },
        dailyQuests: newQuests
      };
    });
  };

  return {
    state,
    toggleQuest,
    completeOnboarding,
    updateBodyMetrics,
    levelUp,
    setFailedChallenge,
    importData,
    resetData,
    setLanguage,
    clearPenaltyAlert,
    setRestDay,
    updateInventory,
    forceRank,
    forcePhase,
    addBonusQuest,
    deleteCustomQuest,
    setDebugDayOverride,
    generateSSRChallenge,
  };
};
