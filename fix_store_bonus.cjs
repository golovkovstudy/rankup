const fs = require('fs');
let storeStr = fs.readFileSync('src/store.ts', 'utf8');

const targetCustom = `  const addCustomQuest = (title: string) => {
    setState(prev => {
      const todayStr = format(new Date(), 'yyyy-MM-dd');
      return {
        ...prev,
        dailyQuests: [...prev.dailyQuests, { id: 'custom_' + Date.now(), completed: false, date: todayStr, isCustom: true, customTitle: title }]
      };
    });
  };`;

const replaceBonus = `  const addBonusQuest = () => {
    setState(prev => {
      if (prev.progress.currentRank === 'SSR') return prev; // SSR uses challenges
      const todayStr = format(new Date(), 'yyyy-MM-dd');
      const rankConfig = RANKS[prev.progress.currentRank as keyof typeof RANKS];
      if (!rankConfig || !rankConfig.quests) return prev;
      
      const availableQuests = rankConfig.quests.filter(q => !prev.dailyQuests.some(dq => dq.id === q.id || dq.originalId === q.id));
      let selectedQuest;
      if (availableQuests.length > 0) {
        selectedQuest = availableQuests[Math.floor(Math.random() * availableQuests.length)];
      } else {
        selectedQuest = rankConfig.quests[Math.floor(Math.random() * rankConfig.quests.length)];
      }
      
      if (!selectedQuest) return prev;

      const uniqueId = prev.dailyQuests.some(dq => dq.id === selectedQuest.id) ? \`\${selectedQuest.id}_bonus_\${Date.now()}\` : selectedQuest.id;

      return {
        ...prev,
        dailyQuests: [...prev.dailyQuests, { 
          id: uniqueId, 
          completed: false, 
          date: todayStr, 
          isCustom: true,
          originalId: selectedQuest.id
        }]
      };
    });
  };`;

storeStr = storeStr.replace(targetCustom, replaceBonus);

const exportTarget = `    addCustomQuest,`;
const exportReplace = `    addBonusQuest,`;
storeStr = storeStr.replace(exportTarget, exportReplace);

fs.writeFileSync('src/store.ts', storeStr);
