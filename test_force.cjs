const fs = require('fs');
let storeStr = fs.readFileSync('src/store.ts', 'utf8');

// Ensure forceRank clears lastGenerated fields so it definitely triggers regeneration properly
storeStr = storeStr.replace(
  "      dailyQuests: [], // trigger generation next render",
  "      dailyQuests: [], // trigger generation next render\n      lastGeneratedDate: undefined,\n      lastGeneratedDay: undefined,\n      lastGeneratedRank: undefined,"
);

fs.writeFileSync('src/store.ts', storeStr);
