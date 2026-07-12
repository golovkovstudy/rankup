const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Achievements.tsx', 'utf8');
fileStr = fileStr.replace("import { Lock, Dumbbell, ChevronUp, Flame } from 'lucide-react';", "import { Lock, Dumbbell, ChevronUp, Flame, Info } from 'lucide-react';");
fs.writeFileSync('src/components/Achievements.tsx', fileStr);
