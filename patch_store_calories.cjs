const fs = require('fs');
let fileStr = fs.readFileSync('src/store.ts', 'utf8');

const replacement = `const getDescToUse = () => {
        const questObj = prev.dailyQuests.find(q => q.id === questId);
        if (questObj?.isCustom) return questObj.customDesc?.en || questObj.customTitle?.en || '';
        const rankCfg = RANKS[prev.progress.currentRank];
        const qData = rankCfg?.quests?.find(q => q.id === questId) || rankCfg?.quests_f?.find(q => q.id === questId);
        if (qData) {
           const p = prev.progress.currentPhase || 1;
           return (p === 3 && qData.desc_phase3 ? qData.desc_phase3.en : (p >= 2 && qData.desc_phase2 ? qData.desc_phase2.en : qData.desc.en));
        }
        return '';
      };
      const descToUse = getDescToUse();
      
      let newStats = { ...prev.stats };`;

fileStr = fileStr.replace('let newStats = { ...prev.stats };', replacement);

fileStr = fileStr.replace(/calculateCalories\(questId, prev\.user\?\.weight \|\| 75\)/g, "calculateCalories(questId, prev.user?.weight || 75, descToUse)");

fs.writeFileSync('src/store.ts', fileStr);
