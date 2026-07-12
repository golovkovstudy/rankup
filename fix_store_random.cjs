const fs = require('fs');
let storeStr = fs.readFileSync('src/store.ts', 'utf8');

const targetAddBonus = `  const addBonusQuest = () => {
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

const replaceAddBonus = `  const addBonusQuest = () => {
    setState(prev => {
      if (prev.progress.currentRank === 'SSR') return prev; 
      const todayStr = format(new Date(), 'yyyy-MM-dd');
      
      const rank = prev.progress.currentRank;
      
      // Random generation logic
      const exercises = [
        { type: 'pushups', name: { en: 'Push-ups', ru: 'Отжимания' } },
        { type: 'squats', name: { en: 'Squats', ru: 'Приседания' } },
        { type: 'plank', name: { en: 'Plank Hold', ru: 'Планка' } },
        { type: 'run', name: { en: 'Light Jog', ru: 'Легкий бег' } },
        { type: 'burpees', name: { en: 'Burpees', ru: 'Бёрпи' } }
      ];
      
      if (rank === 'D' || rank === 'C' || rank === 'B' || rank === 'A' || rank === 'S') {
         exercises.push({ type: 'pullups', name: { en: 'Pull-ups', ru: 'Подтягивания' } });
      }
      
      const ex = exercises[Math.floor(Math.random() * exercises.length)];
      let countStr = '';
      
      const getMultiplier = (r: string) => {
        switch(r) {
          case 'F': return 1;
          case 'E': return 1.5;
          case 'D': return 2;
          case 'C': return 3;
          case 'B': return 4;
          case 'A': return 5;
          case 'S': return 6;
          default: return 1;
        }
      };
      const mult = getMultiplier(rank);
      
      if (ex.type === 'plank') {
         const sec = Math.floor((30 * mult) + Math.random() * 30);
         countStr = \`\${sec} sec\`;
      } else if (ex.type === 'run') {
         const km = Math.floor((1 * mult) + Math.random() * 2);
         countStr = \`\${km} km\`;
      } else {
         const reps = Math.floor((10 * mult) + Math.random() * 10);
         countStr = \`\${reps} reps\`;
      }
      
      const customTitle = ex.name;
      const customDesc = {
        en: \`Bonus: \${countStr}\`,
        ru: \`Дополнительно: \${countStr.replace('sec', 'сек').replace('reps', 'повторений')}\`
      };

      const uniqueId = \`bonus_\${Date.now()}_\${Math.floor(Math.random()*1000)}\`;

      return {
        ...prev,
        dailyQuests: [...prev.dailyQuests, { 
          id: uniqueId, 
          completed: false, 
          date: todayStr, 
          isCustom: true,
          customTitle: customTitle,
          customDesc: customDesc
        }]
      };
    });
  };`;

storeStr = storeStr.replace(targetAddBonus, replaceAddBonus);
fs.writeFileSync('src/store.ts', storeStr);
