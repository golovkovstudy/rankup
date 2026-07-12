const fs = require('fs');
let fileStr = fs.readFileSync('src/store.ts', 'utf8');

fileStr = fileStr.replace(
  "if (!wasCompleted && isCompleted) {",
  `if (!wasCompleted && isCompleted) {
        if (!newStats.activityHistory) newStats.activityHistory = [];
        if (!newStats.activityHistory.includes(todayStr)) {
          newStats.activityHistory.push(todayStr);
        }`
);

fs.writeFileSync('src/store.ts', fileStr);
