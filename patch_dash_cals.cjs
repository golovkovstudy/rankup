const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

const regex = /return sum \+ calculateCalories\(q\.id, state\.user\?\.weight \|\| 75, descToUse\);/s;
const replacement = `return sum + calculateCalories(q.id, state.user?.weight || 75, descToUse + " " + (qData?.title?.en || ''));`;

fileStr = fileStr.replace(regex, replacement);

fs.writeFileSync('src/components/Dashboard.tsx', fileStr);
