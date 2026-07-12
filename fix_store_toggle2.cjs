const fs = require('fs');
let storeStr = fs.readFileSync('src/store.ts', 'utf8');

const target = `      if (!wasCompleted && isCompleted) {
        if (!newStats.activityHistory) newStats.activityHistory = [];
        if (!newStats.activityHistory.includes(todayStr)) {
          newStats.activityHistory.push(todayStr);
        }`;

const replace = `      if (!wasCompleted && isCompleted) {
        if (!newStats.activityHistory) {
          newStats.activityHistory = [todayStr];
        } else if (!newStats.activityHistory.includes(todayStr)) {
          newStats.activityHistory = [...newStats.activityHistory, todayStr];
        }`;

storeStr = storeStr.replace(target, replace);
fs.writeFileSync('src/store.ts', storeStr);
