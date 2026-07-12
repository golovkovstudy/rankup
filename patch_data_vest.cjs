const fs = require('fs');
let fileStr = fs.readFileSync('src/data.ts', 'utf8');

fileStr = fileStr.replace(/\{ id: 's_weighted_pulls', inventoryReq: 'pullup_bar'/g, "{ id: 's_weighted_pulls', inventoryReq: 'weight_vest'");
fileStr = fileStr.replace(/\{ id: 's_weighted_pistols'/g, "{ id: 's_weighted_pistols', inventoryReq: 'weight_vest'");

fs.writeFileSync('src/data.ts', fileStr);
