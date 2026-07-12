const fs = require('fs');
let dashStr = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');
dashStr = dashStr.replace(
  "import { differenceInDays, parseISO } from 'date-fns';",
  "import { differenceInDays, differenceInCalendarDays, parseISO } from 'date-fns';"
);
fs.writeFileSync('src/components/Dashboard.tsx', dashStr);
