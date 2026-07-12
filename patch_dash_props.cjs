const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

fileStr = fileStr.replace('onToggleQuest: (id: string) => void;', 'onToggleQuest: (id: string, incrementSets?: boolean, maxSets?: number) => void;');

fs.writeFileSync('src/components/Dashboard.tsx', fileStr);
