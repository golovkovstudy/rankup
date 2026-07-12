const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

const target = `      let descToUse = '';
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
      return sum + calculateCalories(q.id, state.user?.weight || 75, descToUse + " " + (qData?.title?.en || ''));`;

const replacement = `      let descToUse = '';
      let titleToUse = '';
      if (q.isCustom) {
        descToUse = q.customDesc?.en || q.customTitle?.en || '';
        titleToUse = q.customTitle?.en || '';
      } else {
         const rankCfg = RANKS[state.progress.currentRank];
         const qData = rankCfg?.quests?.find(x => x.id === q.id) || rankCfg?.quests_f?.find(x => x.id === q.id);
         if (qData) {
            const p = state.progress.currentPhase || 1;
            descToUse = (p === 3 && qData.desc_phase3 ? qData.desc_phase3.en : (p >= 2 && qData.desc_phase2 ? qData.desc_phase2.en : qData.desc.en));
            titleToUse = qData.title.en;
         } else {
            // Check SSR
            for (const c of SSR_CHALLENGES) {
              let qObj = c.quests?.find((x: any) => x.id === q.id);
              if (!qObj) qObj = c.quests_f?.find((x: any) => x.id === q.id);
              if (qObj) {
                descToUse = qObj.desc.en;
                titleToUse = qObj.title.en;
                break;
              }
            }
         }
      }
      return sum + calculateCalories(q.id, state.user?.weight || 75, descToUse + " " + titleToUse);`;

fileStr = fileStr.replace(target, replacement);

fs.writeFileSync('src/components/Dashboard.tsx', fileStr);
