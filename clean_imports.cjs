const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Achievements.tsx', 'utf8');

fileStr = fileStr.replace("import { Lock, Dumbbell, ChevronUp, Flame, Info } from 'lucide-react';", "import { Lock, Info } from 'lucide-react';");
fileStr = fileStr.replace("import { format, subDays } from 'date-fns';", "");

fs.writeFileSync('src/components/Achievements.tsx', fileStr);
