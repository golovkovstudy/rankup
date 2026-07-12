const fs = require('fs');
let fileStr = fs.readFileSync('src/store.ts', 'utf8');

const regex = /else if \(wasCompleted && !isCompleted\) \{.*?\}/s;
const match = fileStr.match(regex);

if (match) {
  const replacement = `else if (wasCompleted && !isCompleted) {
        newStats.workoutsCompleted = Math.max(0, newStats.workoutsCompleted - 1);
        const cals = calculateCalories(questId, prev.user?.weight || 75);
        newStats.caloriesBurnedTotal = Math.max(0, (newStats.caloriesBurnedTotal || 0) - cals);
        
        const lowerId = questId.toLowerCase();
        if (lowerId.includes('pushup') || lowerId.includes('dip')) newStats.pushupsTotal = Math.max(0, newStats.pushupsTotal - 40);
        else if (lowerId.includes('pullup') || lowerId.includes('mu') || lowerId.includes('hspu')) newStats.pullupsTotal = Math.max(0, newStats.pullupsTotal - 15);
        else if (lowerId.includes('run') || lowerId.includes('walk') || lowerId.includes('jog') || lowerId.includes('treadmill')) newStats.runKmTotal = Math.max(0, newStats.runKmTotal - 5);
        else if (lowerId.includes('squat') || lowerId.includes('lunge') || lowerId.includes('pistol')) {
           // Legs
        } else {
           if (prev.progress.currentRank !== 'F') newStats.pullupsTotal = Math.max(0, newStats.pullupsTotal - 10);
           newStats.pushupsTotal = Math.max(0, newStats.pushupsTotal - 20);
        }
      }`;
  
  fileStr = fileStr.replace(match[0], replacement);
  fs.writeFileSync('src/store.ts', fileStr);
  console.log('patched toggleQuest');
} else {
  console.log('not found');
}
