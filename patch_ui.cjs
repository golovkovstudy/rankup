const fs = require('fs');
let fileStr = fs.readFileSync('src/data.ts', 'utf8');

fileStr = fileStr.replace("trophies: 'Trophies',", "trophies: 'Trophies',\n    statistics: 'Stats',");
fileStr = fileStr.replace("trophies: 'Трофеи',", "trophies: 'Трофеи',\n    statistics: 'Статистика',");

fs.writeFileSync('src/data.ts', fileStr);
