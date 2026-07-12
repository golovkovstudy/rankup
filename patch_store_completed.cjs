const fs = require('fs');
let fileStr = fs.readFileSync('src/store.ts', 'utf8');

const regex = /if \(prev\.progress\.currentRank === 'SSR' && !newStats\.ssrChallengesCompleted\.includes\(questId\)\) \{\s*newStats\.ssrChallengesCompleted\.push\(questId\);\s*\}/s;

const replacement = `const allQuestsDone = newQuests.every(q => q.completed);
        if (prev.progress.currentRank === 'SSR' && prev.progress.ssrChallengeId && allQuestsDone && !newStats.ssrChallengesCompleted.includes(prev.progress.ssrChallengeId)) {
          newStats.ssrChallengesCompleted.push(prev.progress.ssrChallengeId);
        }`;

fileStr = fileStr.replace(regex, replacement);

const regex2 = /const isCompleted = newQuests\.find\(q => q\.id === questId\)\?\.completed;/s;
const replacement2 = `const isCompleted = newQuests.find(q => q.id === questId)?.completed;
      const allQuestsDoneNow = newQuests.every(q => q.completed);`;
fileStr = fileStr.replace(regex2, replacement2);

const regex3 = /return \{\s*\.\.\.prev,\s*dailyQuests: newQuests,\s*stats: newStats\s*\};/s;
const replacement3 = `return {
        ...prev,
        progress: {
           ...prev.progress,
           ssrChallengeCompleted: prev.progress.currentRank === 'SSR' ? allQuestsDoneNow : prev.progress.ssrChallengeCompleted
        },
        dailyQuests: newQuests,
        stats: newStats
      };`;
fileStr = fileStr.replace(regex3, replacement3);

fs.writeFileSync('src/store.ts', fileStr);
