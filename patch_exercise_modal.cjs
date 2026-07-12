const fs = require('fs');
let fileStr = fs.readFileSync('src/components/ExerciseModal.tsx', 'utf8');

fileStr = fileStr.replace(
  "import { getExerciseTips } from '../utils/exerciseTips';",
  "import { getExerciseTips } from '../utils/exerciseTips';\nimport { getQuestData } from '../utils/ranks';"
);

const oldTitleDesc = `  const title = quest.customTitle ? quest.customTitle[lang] : (quest.title ? quest.title[lang] : '');
  const desc = quest.customDesc ? quest.customDesc[lang] : (quest.desc ? quest.desc[lang] : '');`;

const newTitleDesc = `  const qData = getQuestData(quest.id, quest);
  const title = qData.title[lang] || '';
  const desc = qData.desc ? qData.desc[lang] : '';`;

fileStr = fileStr.replace(oldTitleDesc, newTitleDesc);

fs.writeFileSync('src/components/ExerciseModal.tsx', fileStr);
