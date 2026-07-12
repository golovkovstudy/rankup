const fs = require('fs');
let fileStr = fs.readFileSync('src/components/SettingsModal.tsx', 'utf8');

const targetMap = `{t.week_days.map((dayName: string, index: number) => {`;
const replaceMap = `{[1, 2, 3, 4, 5, 6, 0].map((index: number) => {
                  const dayName = t.week_days[index];`;

fileStr = fileStr.replace(targetMap, replaceMap);
fs.writeFileSync('src/components/SettingsModal.tsx', fileStr);
