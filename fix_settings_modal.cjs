const fs = require('fs');
let fileStr = fs.readFileSync('src/components/SettingsModal.tsx', 'utf8');
fileStr = fileStr.replace(/downloadAnchorNode\.setAttribute\("download", \\\`rankup_backup_\\\$\\{new Date\(\)\.toISOString\(\)\.split\('T'\)\[0\]\}\.json\\\`\);/g, "downloadAnchorNode.setAttribute('download', `rankup_backup_${new Date().toISOString().split('T')[0]}.json`);");
fs.writeFileSync('src/components/SettingsModal.tsx', fileStr);
