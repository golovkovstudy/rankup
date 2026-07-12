const fs = require('fs');
let fileStr = fs.readFileSync('src/store.ts', 'utf8');

fileStr = fileStr.replace(
  "tDays.push((user.restDay !== undefined ? user.restDay : 0) + i % 7);",
  "tDays.push(( (user.restDay !== undefined ? user.restDay : 0) + i ) % 7);"
);

fs.writeFileSync('src/store.ts', fileStr);
