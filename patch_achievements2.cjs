const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Achievements.tsx', 'utf8');

const regex = /<section>\s*<div className="flex items-center gap-2 mb-4">.*?<\/section>/s;
fileStr = fileStr.replace(regex, '');

fs.writeFileSync('src/components/Achievements.tsx', fileStr);
