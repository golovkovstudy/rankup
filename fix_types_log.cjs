const fs = require('fs');
let fileStr = fs.readFileSync('src/types.ts', 'utf8');

fileStr = fileStr.replace("activityHistory?: string[];", "activityHistory?: string[];\n  activityLog?: Record<string, 'full' | 'partial' | 'missed' | 'rest'>;");
fs.writeFileSync('src/types.ts', fileStr);
