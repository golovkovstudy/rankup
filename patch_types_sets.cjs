const fs = require('fs');
let fileStr = fs.readFileSync('src/types.ts', 'utf8');

fileStr = fileStr.replace('originalId?: string;', 'originalId?: string;\n  currentSets?: number;');

fs.writeFileSync('src/types.ts', fileStr);
