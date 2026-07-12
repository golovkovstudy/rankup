const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

fileStr = fileStr.replace(
  "const phase = daysInRank >= 28 ? 'III' : daysInRank >= 14 ? 'II' : 'I';",
  `const phaseVal = state.progress.currentPhase || (daysInRank >= 28 ? 3 : daysInRank >= 14 ? 2 : 1);
  const phase = phaseVal === 3 ? 'III' : phaseVal === 2 ? 'II' : 'I';`
);

fs.writeFileSync('src/components/Dashboard.tsx', fileStr);
