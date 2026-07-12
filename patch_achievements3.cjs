const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Achievements.tsx', 'utf8');

const regexVars = /const activityHistory.*?const weekDays.*?;/s;
fileStr = fileStr.replace(regexVars, '');

fs.writeFileSync('src/components/Achievements.tsx', fileStr);
