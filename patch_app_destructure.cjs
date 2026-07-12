const fs = require('fs');
let fileStr = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /setRestDay,/s;
const replacement = `setRestDay,
    updateInventory,`;

fileStr = fileStr.replace(regex, replacement);

fs.writeFileSync('src/App.tsx', fileStr);
