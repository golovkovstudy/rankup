const fs = require('fs');
let fileStr = fs.readFileSync('src/store.ts', 'utf8');

const targetStr = `        if (prev.progress.currentRank === 'SSR' && !newStats.ssrChallengesCompleted.includes(questId)) {
          newStats.ssrChallengesCompleted.push(questId);
        }
      }`;

const replaceStr = `        if (prev.progress.currentRank === 'SSR' && !newStats.ssrChallengesCompleted.includes(questId)) {
          newStats.ssrChallengesCompleted.push(questId);
        }
        
        const cals = prev.user?.weight ? Math.round(prev.user.weight * 1.5) : 100;
        newStats.caloriesBurnedTotal = (newStats.caloriesBurnedTotal || 0) + cals;
      } else if (wasCompleted && !isCompleted) {
        newStats.workoutsCompleted = Math.max(0, newStats.workoutsCompleted - 1);
        const cals = prev.user?.weight ? Math.round(prev.user.weight * 1.5) : 100;
        newStats.caloriesBurnedTotal = Math.max(0, (newStats.caloriesBurnedTotal || 0) - cals);
      }`;

fileStr = fileStr.replace(targetStr, replaceStr);

// Also add a method to update Body Metrics
const completeOnboardingStr = `  const completeOnboarding = (user: AppState['user']) => {`;

const updateMetricsStr = `  const updateBodyMetrics = (weight: number, height: number, age: number) => {
    setState(prev => {
      if (!prev.user) return prev;
      return {
        ...prev,
        user: {
          ...prev.user,
          weight,
          height,
          age
        }
      };
    });
  };

  const completeOnboarding = (user: AppState['user']) => {`;

fileStr = fileStr.replace(completeOnboardingStr, updateMetricsStr);

// add to return interface
fileStr = fileStr.replace(
  "    completeOnboarding,",
  "    completeOnboarding,\n    updateBodyMetrics,"
);

fs.writeFileSync('src/store.ts', fileStr);
