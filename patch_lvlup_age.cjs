const fs = require('fs');
let fileStr = fs.readFileSync('src/components/LevelUpChallenge.tsx', 'utf8');

if (!fileStr.includes('getAgeScale')) {
  fileStr = fileStr.replace("import { motion } from 'motion/react';", "import { motion } from 'motion/react';\nimport { getAgeScale } from '../utils/age';");
}

const target = `  const challenge = {
    ...baseChallenge,
    timeLimitMinutes: examType === 'rank' ? baseChallenge.timeLimitMinutes : Math.ceil(baseChallenge.timeLimitMinutes * (examType === 'phase2' ? 0.6 : 0.8)),
    tasks: baseChallenge.tasks.map(t => ({ 
       ...t, 
       count: examType === 'rank' ? t.count : Math.max(1, Math.ceil(t.count * (examType === 'phase2' ? 0.5 : 0.75)))
    }))
  };`;

const replacement = `  const ageScale = getAgeScale(state.user?.age || 25);
  const challenge = {
    ...baseChallenge,
    timeLimitMinutes: examType === 'rank' ? baseChallenge.timeLimitMinutes : Math.ceil(baseChallenge.timeLimitMinutes * (examType === 'phase2' ? 0.6 : 0.8)),
    tasks: baseChallenge.tasks.map(t => {
       const baseCount = examType === 'rank' ? t.count : Math.max(1, Math.ceil(t.count * (examType === 'phase2' ? 0.5 : 0.75)));
       return { 
         ...t, 
         count: Math.max(1, Math.ceil(baseCount * ageScale))
       };
    })
  };`;

fileStr = fileStr.replace(target, replacement);

fs.writeFileSync('src/components/LevelUpChallenge.tsx', fileStr);
