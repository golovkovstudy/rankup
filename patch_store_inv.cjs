const fs = require('fs');
let fileStr = fs.readFileSync('src/store.ts', 'utf8');

const regex = /const setRestDay = \(day: number\) => \{/s;
const replacement = `const updateInventory = (inventory: string[]) => {
    setState(prev => prev.user ? { ...prev, user: { ...prev.user, inventory } } : prev);
  };
  
  const setRestDay = (day: number) => {`;

fileStr = fileStr.replace(regex, replacement);

const returnRegex = /setRestDay,/s;
const returnReplacement = `setRestDay,
    updateInventory,`;
fileStr = fileStr.replace(returnRegex, returnReplacement);

fs.writeFileSync('src/store.ts', fileStr);
