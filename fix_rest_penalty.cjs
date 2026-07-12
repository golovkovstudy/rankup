const fs = require('fs');
let storeStr = fs.readFileSync('src/store.ts', 'utf8');

const targetLoop = `                 const isRestDay = !tDays.includes(dayOfWeek);
                 
                 if (i === 0) {
                     // Check yesterday's generated quests
                     if (isRestDay) {
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

const replaceLoop = `                 const isRestDay = !tDays.includes(dayOfWeek);
                 const isRestDayQuest = (i === 0) && dailyQuests.length > 0 && dailyQuests.every(q => q.id === 'rest_day_quest');
                 
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

storeStr = storeStr.replace(targetLoop, replaceLoop);
fs.writeFileSync('src/store.ts', storeStr);
