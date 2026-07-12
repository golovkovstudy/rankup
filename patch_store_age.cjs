const fs = require('fs');
let fileStr = fs.readFileSync('src/store.ts', 'utf8');

if (!fileStr.includes('getAgeScale')) {
  fileStr = fileStr.replace("import { calculateCalories } from './utils/calories';", "import { calculateCalories } from './utils/calories';\nimport { getAgeScale, scaleStringNumbers } from './utils/age';");
}

const target = `        const cals = calculateCalories(questId, prev.user?.weight || 75, descToUse + " " + titleToUse);`;
const replacement = `        const ageScale = getAgeScale(prev.user?.age || 25);
        const cals = calculateCalories(questId, prev.user?.weight || 75, scaleStringNumbers(descToUse + " " + titleToUse, ageScale));`;

fileStr = fileStr.replace(target, replacement);

const target2 = `        const cals = calculateCalories(questId, prev.user?.weight || 75, descToUse + " " + titleToUse);`;
const replacement2 = `        const ageScale2 = getAgeScale(prev.user?.age || 25);
        const cals = calculateCalories(questId, prev.user?.weight || 75, scaleStringNumbers(descToUse + " " + titleToUse, ageScale2));`;

fileStr = fileStr.replace(target2, replacement2); // There is a second occurrence

fs.writeFileSync('src/store.ts', fileStr);
