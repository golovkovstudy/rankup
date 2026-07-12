const fs = require('fs');
let fileStr = fs.readFileSync('src/App.tsx', 'utf8');

fileStr = fileStr.replace(
  "onSetRestDay={setRestDay}",
  "onSetRestDay={setRestDay}\n         onStartCalibration={() => setShowCalibration(true)}"
);

fs.writeFileSync('src/App.tsx', fileStr);
