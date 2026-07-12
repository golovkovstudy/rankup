const fs = require('fs');

let fileStr = fs.readFileSync('src/store.ts', 'utf8');

// Inside toggleQuest:
const toggleQuestCode = `  const toggleQuest = (questId: string) => {
    setState(prev => {
      const todayStr = format(new Date(), 'yyyy-MM-dd');
      
      const newQuests = prev.dailyQuests.map(q => 
        q.id === questId ? { ...q, completed: !q.completed } : q
      );

      const wasCompleted = prev.dailyQuests.find(q => q.id === questId)?.completed;
      const isCompleted = newQuests.find(q => q.id === questId)?.completed;

      let newStats = { ...prev.stats };

      if (!wasCompleted && isCompleted) {
        newStats.workoutsCompleted += 1;
        // In a real app we'd parse the quest desc to find exact pushups/pullups.
        // For simplicity we add an average based on rank.
        if (prev.progress.currentRank !== 'F') newStats.pullupsTotal += 15;
        newStats.pushupsTotal += 40;
        if (questId.includes('run')) newStats.runKmTotal += 5;
      }

      return {
        ...prev,
        dailyQuests: newQuests,
        stats: newStats
      };
    });
  };`;

fileStr = fileStr.replace(/const toggleQuest = \([\s\S]*?\}\);[\s\n]*\};/, toggleQuestCode);

const levelUpCode = `  const levelUp = (newRank: Rank) => {
    setState(prev => ({
      ...prev,
      progress: {
        ...prev.progress,
        currentRank: newRank,
        rankStartDate: format(new Date(), 'yyyy-MM-dd')
      },
      stats: {
        ...prev.stats,
        pullupsTotal: prev.stats.pullupsTotal + 20,
        pushupsTotal: prev.stats.pushupsTotal + 50
      },
      dailyQuests: [] // clear today's quests so new ones generate
    }));
  };`;

fileStr = fileStr.replace(/const levelUp = \([\s\S]*?\}\);[\s\n]*\};/, levelUpCode);

fs.writeFileSync('src/store.ts', fileStr);
