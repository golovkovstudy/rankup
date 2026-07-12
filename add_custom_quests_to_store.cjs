const fs = require('fs');
let storeStr = fs.readFileSync('src/store.ts', 'utf8');

const targetStr = `  const setDebugDayOverride = (dayIndex?: number) => {`;
const replaceStr = `  const addCustomQuest = (title: string) => {
    setState(prev => {
      const todayStr = format(new Date(), 'yyyy-MM-dd');
      return {
        ...prev,
        dailyQuests: [...prev.dailyQuests, { id: 'custom_' + Date.now(), completed: false, date: todayStr, isCustom: true, customTitle: title }]
      };
    });
  };

  const deleteCustomQuest = (id: string) => {
    setState(prev => ({
      ...prev,
      dailyQuests: prev.dailyQuests.filter(q => q.id !== id)
    }));
  };

  const setDebugDayOverride = (dayIndex?: number) => {`;

storeStr = storeStr.replace(targetStr, replaceStr);

const exportsTarget = `    setDebugDayOverride,`;
const exportsReplace = `    addCustomQuest,
    deleteCustomQuest,
    setDebugDayOverride,`;
storeStr = storeStr.replace(exportsTarget, exportsReplace);

fs.writeFileSync('src/store.ts', storeStr);
