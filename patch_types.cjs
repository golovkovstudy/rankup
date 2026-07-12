const fs = require('fs');
let fileStr = fs.readFileSync('src/types.ts', 'utf8');

fileStr = fileStr.replace('currentRank: Rank;', 'currentRank: Rank;\n  currentPhase?: 1 | 2 | 3;\n  phaseStartDate?: string;');

fs.writeFileSync('src/types.ts', fileStr);
