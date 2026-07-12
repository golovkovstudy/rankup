const fs = require('fs');
let fileStr = fs.readFileSync('src/components/ExerciseModal.tsx', 'utf8');

fileStr = fileStr.replace("import { getQuestData } from '../utils/ranks';\n", "");
fileStr = fileStr.replace("import { getQuestData } from '../utils/ranks';", "");

const qDataOld = `  const qData = getQuestData(quest.id, quest);
  const title = qData.title[lang] || '';
  const desc = qData.desc ? qData.desc[lang] : '';`;

const qDataNew = `  const title = quest.customTitle ? quest.customTitle[lang] : (quest.title ? quest.title[lang] : '');
  const desc = quest.customDesc ? quest.customDesc[lang] : (quest.desc ? quest.desc[lang] : '');`;

fileStr = fileStr.replace(qDataOld, qDataNew);

fs.writeFileSync('src/components/ExerciseModal.tsx', fileStr);
