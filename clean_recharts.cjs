const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Achievements.tsx', 'utf8');
fileStr = fileStr.replace(
  "import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';",
  ""
);
fs.writeFileSync('src/components/Achievements.tsx', fileStr);
