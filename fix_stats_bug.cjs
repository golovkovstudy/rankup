const fs = require('fs');
let storeStr = fs.readFileSync('src/store.ts', 'utf8');

const oldCode = `        newStats.workoutsCompleted += 1;

        // In a real app we'd parse the quest desc to find exact pushups/pullups.
        // For simplicity we add an average based on rank.
        if (prev.progress.currentRank !== 'F') newStats.pullupsTotal += 15;
        newStats.pushupsTotal += 40;
        if (questId.includes('run')) newStats.runKmTotal += 5;

        if (prev.progress.currentRank === 'SSR' && !newStats.ssrChallengesCompleted.includes(questId)) {`;

const newCode = `        newStats.workoutsCompleted += 1;

        const lowerId = questId.toLowerCase();
        if (lowerId.includes('pushup') || lowerId.includes('dip')) newStats.pushupsTotal += 40;
        else if (lowerId.includes('pullup') || lowerId.includes('mu') || lowerId.includes('hspu')) newStats.pullupsTotal += 15;
        else if (lowerId.includes('run') || lowerId.includes('walk') || lowerId.includes('jog')) newStats.runKmTotal += 5;
        else if (lowerId.includes('squat') || lowerId.includes('lunge') || lowerId.includes('pistol')) {
           // Legs
        } else {
           if (prev.progress.currentRank !== 'F') newStats.pullupsTotal += 10;
           newStats.pushupsTotal += 20;
        }

        if (prev.progress.currentRank === 'SSR' && !newStats.ssrChallengesCompleted.includes(questId)) {`;

storeStr = storeStr.replace(oldCode, newCode);
fs.writeFileSync('src/store.ts', storeStr);
