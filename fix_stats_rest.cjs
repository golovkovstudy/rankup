const fs = require('fs');
let storeStr = fs.readFileSync('src/store.ts', 'utf8');

const targetStats = `        if (lowerId.includes('pushup') || lowerId.includes('dip') || lowerId.includes('plank')) newStats.pushupsTotal += 40;
        else if (lowerId.includes('pull') || lowerId.includes('chin') || lowerId.includes('mu') || lowerId.includes('row') || lowerId.includes('hspu')) newStats.pullupsTotal += 15;
        else if (lowerId.includes('run') || lowerId.includes('walk') || lowerId.includes('jog') || lowerId.includes('treadmill')) newStats.runKmTotal += 5;
        else if (lowerId.includes('squat') || lowerId.includes('lunge') || lowerId.includes('pistol') || lowerId.includes('glute') || lowerId.includes('jump')) { 
          // Legs
        } else { 
          if (prev.progress.currentRank !== 'F') newStats.pullupsTotal += 10;
          newStats.pushupsTotal += 20;
        }`;

const replaceStats = `        if (lowerId === 'rest_day_quest') {
          // No stats for rest day
        } else if (lowerId.includes('pushup') || lowerId.includes('dip') || lowerId.includes('plank')) newStats.pushupsTotal += 40;
        else if (lowerId.includes('pull') || lowerId.includes('chin') || lowerId.includes('mu') || lowerId.includes('row') || lowerId.includes('hspu')) newStats.pullupsTotal += 15;
        else if (lowerId.includes('run') || lowerId.includes('walk') || lowerId.includes('jog') || lowerId.includes('treadmill')) newStats.runKmTotal += 5;
        else if (lowerId.includes('squat') || lowerId.includes('lunge') || lowerId.includes('pistol') || lowerId.includes('glute') || lowerId.includes('jump')) { 
          // Legs
        } else { 
          if (prev.progress.currentRank !== 'F') newStats.pullupsTotal += 10;
          newStats.pushupsTotal += 20;
        }`;

storeStr = storeStr.replace(targetStats, replaceStats);
fs.writeFileSync('src/store.ts', storeStr);
