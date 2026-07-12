const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

if (!fileStr.includes('import { calculateCalories }')) {
  fileStr = fileStr.replace("import { getRankTheme } from '../utils';", "import { getRankTheme } from '../utils';\nimport { calculateCalories } from '../utils/calories';");
}

const todayCalsLogic = `const todayCalories = dailyQuests
    .filter(q => q.completed)
    .reduce((sum, q) => {
      let descToUse = '';
      if (q.isCustom) {
        descToUse = q.customDesc?.en || q.customTitle?.en || '';
      } else {
         const rankCfg = RANKS[state.progress.currentRank];
         const qData = rankCfg?.quests?.find(x => x.id === q.id) || rankCfg?.quests_f?.find(x => x.id === q.id);
         if (qData) {
            const p = state.progress.currentPhase || 1;
            descToUse = (p === 3 && qData.desc_phase3 ? qData.desc_phase3.en : (p >= 2 && qData.desc_phase2 ? qData.desc_phase2.en : qData.desc.en));
         }
      }
      return sum + calculateCalories(q.id, state.user?.weight || 75, descToUse);
    }, 0);`;

fileStr = fileStr.replace('  const getQuestData = (quest: any) => {', todayCalsLogic + '\n\n  const getQuestData = (quest: any) => {');

fileStr = fileStr.replace('{state.stats.caloriesBurnedTotal || 0}', '{todayCalories}');

fs.writeFileSync('src/components/Dashboard.tsx', fileStr);
