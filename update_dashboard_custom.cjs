const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

const targetGetQuestData = `  const getQuestData = (id: string) => {`;
const replaceGetQuestData = `  const getQuestData = (quest: any) => {
    const id = quest.id;
    if (quest.isCustom) {
      return {
        id: quest.id,
        title: { en: quest.customTitle, ru: quest.customTitle },
        desc: { en: 'Optional Custom Task', ru: 'Дополнительное кастомное задание' },
        isCustom: true
      };
    }`;
fileStr = fileStr.replace(targetGetQuestData, replaceGetQuestData);

const targetMap = `            const qData = getQuestData(quest.id);
            if (!qData) return null;`;
const replaceMap = `            const qData = getQuestData(quest);
            if (!qData) return null;`;
fileStr = fileStr.replace(targetMap, replaceMap);

fs.writeFileSync('src/components/Dashboard.tsx', fileStr);
