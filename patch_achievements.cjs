const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Achievements.tsx', 'utf8');

// The stats section:
const statsRegex = /<section>\s*<h2 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-4">.*?<section>/s;

fileStr = fileStr.replace(statsRegex, '<section>');

fs.writeFileSync('src/components/Achievements.tsx', fileStr);
