const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

if (!fileStr.includes('getAgeScale')) {
  fileStr = fileStr.replace("import { calculateCalories } from '../utils/calories';", "import { calculateCalories } from '../utils/calories';\nimport { getAgeScale, scaleStringNumbers } from '../utils/age';");
}

const scaleLocalizedFn = `  const ageScale = getAgeScale(state.user?.age || 25);
  const scaleLocalized = (obj: any) => {
    if (!obj) return obj;
    return {
      en: scaleStringNumbers(obj.en, ageScale),
      ru: scaleStringNumbers(obj.ru, ageScale)
    };
  };

  const getQuestData`;

fileStr = fileStr.replace('  const getQuestData', scaleLocalizedFn);

const regexQuestDataReturn = /return \{\s*id: [^,]+,\s*title: [^,]+,\s*desc: [^,]+,\s*isCustom: [^}]+\s*\};/g;

fileStr = fileStr.replace(regexQuestDataReturn, (match) => {
  if (match.includes('rest_day_quest')) return match;
  if (match.includes('challenge')) {
    return `return { id: challenge.id, title: scaleLocalized(challenge.title), desc: scaleLocalized(challenge.desc), isCustom: quest.isCustom };`;
  }
  if (match.includes('q.id')) {
    return `return { id: q.id, title: scaleLocalized(q.title), desc: scaleLocalized(q.desc), isCustom: quest.isCustom };`;
  }
  return match;
});

const regexFinalReturn = /return \{\s*id: qData\.id,\s*title,\s*desc: currentDesc,\s*isCustom: false\s*\};/g;
fileStr = fileStr.replace(regexFinalReturn, `return { id: qData.id, title: scaleLocalized(title), desc: scaleLocalized(currentDesc), isCustom: false };`);


const regexCalCalc = /return sum \+ calculateCalories\(q\.id, state\.user\?\.weight \|\| 75, descToUse \+ " " \+ titleToUse\);/g;
fileStr = fileStr.replace(regexCalCalc, `return sum + calculateCalories(q.id, state.user?.weight || 75, scaleStringNumbers(descToUse + " " + titleToUse, ageScale));`);

fs.writeFileSync('src/components/Dashboard.tsx', fileStr);
