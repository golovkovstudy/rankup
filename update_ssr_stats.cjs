const fs = require('fs');

let fileStr = fs.readFileSync('src/store.ts', 'utf8');

fileStr = fileStr.replace("if (questId.includes('run')) newStats.runKmTotal += 5;", `if (questId.includes('run')) newStats.runKmTotal += 5;
        if (prev.progress.currentRank === 'SSR' && !newStats.ssrChallengesCompleted.includes(questId)) {
          newStats.ssrChallengesCompleted.push(questId);
        }`);

fs.writeFileSync('src/store.ts', fileStr);
