const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Achievements.tsx', 'utf8');

const targetLogic = `      case 'ssr_all': return { current: state.stats.ssrChallengesCompleted.length, target: 5 };`;

const newLogic = `      case 'ssr_all': return { current: state.stats.ssrChallengesCompleted.length, target: 5 };
      case 'calories': return { current: state.stats.caloriesBurnedTotal || 0, target: req.count };
      case 'bmi_normal': {
         if (!state.user) return { current: 0, target: 1 };
         const bmi = state.user.weight / Math.pow(state.user.height / 100, 2);
         const isNormal = bmi >= 18.5 && bmi <= 24.9;
         return { current: isNormal ? 1 : 0, target: 1 };
      }`;

fileStr = fileStr.replace(targetLogic, newLogic);
fs.writeFileSync('src/components/Achievements.tsx', fileStr);
