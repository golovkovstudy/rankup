const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

const targetGetQuestData = `  const getQuestData = (quest: any) => {
    const id = quest.originalId || quest.id;
    if (id === 'rest_day_quest') {`;

const replaceGetQuestData = `  const getQuestData = (quest: any) => {
    if (quest.isCustom && quest.customTitle) {
      return {
        id: quest.id,
        title: quest.customTitle,
        desc: quest.customDesc,
        isCustom: true
      };
    }
    const id = quest.originalId || quest.id;
    if (id === 'rest_day_quest') {`;

fileStr = fileStr.replace(targetGetQuestData, replaceGetQuestData);
fs.writeFileSync('src/components/Dashboard.tsx', fileStr);
