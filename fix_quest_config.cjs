const fs = require('fs');
let dataStr = fs.readFileSync('src/data.ts', 'utf8');
dataStr = dataStr.replace("  scheduleDays: number[];\n}", "  scheduleDays: number[];\n  inventoryReq?: string;\n}");
fs.writeFileSync('src/data.ts', dataStr);
