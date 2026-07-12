const fs = require('fs');
let fileStr = fs.readFileSync('src/store.ts', 'utf8');

if (!fileStr.includes('calculateCalories')) {
  fileStr = "import { calculateCalories } from './utils/calories';\n" + fileStr;
  fs.writeFileSync('src/store.ts', fileStr);
} else if (!fileStr.includes("import { calculateCalories }")) {
  fileStr = "import { calculateCalories } from './utils/calories';\n" + fileStr;
  fs.writeFileSync('src/store.ts', fileStr);
}

let fileStrDash = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');
if (!fileStrDash.includes("import { calculateCalories }")) {
  fileStrDash = fileStrDash.replace(
    "import { getQuestData, getRankTheme, getRankConfig } from '../utils/ranks';",
    "import { getQuestData, getRankTheme, getRankConfig } from '../utils/ranks';\nimport { calculateCalories } from '../utils/calories';"
  );
  fs.writeFileSync('src/components/Dashboard.tsx', fileStrDash);
}
