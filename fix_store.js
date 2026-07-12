const fs = require('fs');
let fileStr = fs.readFileSync('src/store.ts', 'utf8');
fileStr = fileStr.replace(/  const resetData = \(\) => \{\n    localStorage.removeItem\(STORAGE_KEY\);\n    setState\(\{\n      user: null,\n      progress: \{\n        currentRank: 'F',\n        rankStartDate: format\(new Date\(\), 'yyyy-MM-dd'\),\n        currentStreak: 0,\n        lastActiveDate: format\(new Date\(\), 'yyyy-MM-dd'\),\n      \},\n      dailyQuests: \[\],\n      achievements: \[\],\n      language: state.language \|\| 'ru',\n    \}\);\n  \};/g, `  const resetData = () => {
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
  };`);
fs.writeFileSync('src/store.ts', fileStr);
