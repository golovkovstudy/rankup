const fs = require('fs');
let storeStr = fs.readFileSync('src/store.ts', 'utf8');

const targetLoop = `                 const isRestDayQuest = (i === 0) && dailyQuests.length > 0 && dailyQuests.every(q => q.id === 'rest_day_quest');
                 
                 if (i === 0) {
                     // Check yesterday's generated quests
                     if (isRestDay || isRestDayQuest) {
                         newStreak += 1; // Auto-complete rest day
                     } else {
                         const anyCompleted = dailyQuests.some(q => q.completed);
                         const allCompleted = dailyQuests.every(q => q.completed);
                         if (!anyCompleted && dailyQuests.length > 0) {
                             penaltyAlert = 'full';
                             penaltyDaysCount += 2;
                         } else if (!allCompleted && dailyQuests.length > 0) {
                             penaltyAlert = 'partial';
                         } else if (allCompleted && dailyQuests.length > 0) {
                             newStreak += 1;
                         }
                     }
                 } else {
                     // Days missed entirely
                     if (isRestDay) {
                         newStreak += 1; // Auto-complete missed rest day
                     } else {
                         penaltyAlert = 'full';
                         penaltyDaysCount += 2;
                     }
                 }`;

const replaceLoop = `                 const isRestDayQuest = (i === 0) && dailyQuests.length > 0 && dailyQuests.every(q => q.id === 'rest_day_quest');
                 
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
                 }`;

const targetVars = `      let penaltyDaysCount = 0;

      const lastDate = dailyQuests.length > 0 ? dailyQuests[0].date : progress.lastActiveDate;`;

const replaceVars = `      let penaltyDaysCount = 0;
      let newActivityLog = { ...(state.stats.activityLog || {}) };

      const lastDate = dailyQuests.length > 0 ? dailyQuests[0].date : progress.lastActiveDate;`;

const targetSetState = `      setState(prev => ({
        ...prev,
        progress: {`;

const replaceSetState = `      setState(prev => ({
        ...prev,
        stats: {
           ...prev.stats,
           activityLog: newActivityLog
        },
        progress: {`;

storeStr = storeStr.replace(targetLoop, replaceLoop);
storeStr = storeStr.replace(targetVars, replaceVars);
storeStr = storeStr.replace(targetSetState, replaceSetState);

fs.writeFileSync('src/store.ts', storeStr);
