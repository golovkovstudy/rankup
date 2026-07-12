const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

// Add import
fileStr = fileStr.replace(
  "import { getQuestData, getRankTheme, getRankConfig } from '../utils/ranks';",
  "import { getQuestData, getRankTheme, getRankConfig } from '../utils/ranks';\nimport { calculateCalories } from '../utils/calories';"
);

const targetText = "~{state.user ? Math.round(state.user.weight * 1.5) : 100} kcal";
const replaceText = "~{calculateCalories(quest.id, state.user?.weight || 75)} kcal";

fileStr = fileStr.replace(targetText, replaceText);

fs.writeFileSync('src/components/Dashboard.tsx', fileStr);
