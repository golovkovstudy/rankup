const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

fileStr = fileStr.replace(
  "import { getRankTheme } from '../utils';",
  "import { getRankTheme } from '../utils';\nimport { showSystemToast } from '../toast';"
);

fs.writeFileSync('src/components/Dashboard.tsx', fileStr);
