const fs = require('fs');
let storeStr = fs.readFileSync('src/store.ts', 'utf8');

const targetToggle = `      const isCompleted = newQuests.find(q => q.id === questId)?.completed;
      let newStats = { ...prev.stats };
      if (!wasCompleted && isCompleted) {
        if (!newStats.activityHistory) newStats.activityHistory = [];
        if (!newStats.activityHistory.includes(todayStr)) {
          newStats.activityHistory.push(todayStr);
        }`;

const replaceToggle = `      const isCompleted = newQuests.find(q => q.id === questId)?.completed;
      let newStats = { ...prev.stats };
      if (!wasCompleted && isCompleted) {
        if (!newStats.activityHistory) {
          newStats.activityHistory = [todayStr];
        } else if (!newStats.activityHistory.includes(todayStr)) {
          newStats.activityHistory = [...newStats.activityHistory, todayStr];
        }`;

storeStr = storeStr.replace(targetToggle, replaceToggle);
fs.writeFileSync('src/store.ts', storeStr);
