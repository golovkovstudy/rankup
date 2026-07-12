const fs = require('fs');
let fileStr = fs.readFileSync('src/store.ts', 'utf8');

const regex1 = /const getDescToUse = \(\) => \{/s;
const replacement1 = `const getTitleToUse = () => {
        const questObj = prev.dailyQuests.find(q => q.id === questId);
        if (questObj?.isCustom) return questObj.customTitle?.en || '';
        const rankCfg = RANKS[prev.progress.currentRank];
        const qData = rankCfg?.quests?.find(q => q.id === questId) || rankCfg?.quests_f?.find(q => q.id === questId);
        if (qData) return qData.title.en;
        for (const c of SSR_CHALLENGES) {
            let q = c.quests?.find((x: any) => x.id === questId);
            if (!q) q = c.quests_f?.find((x: any) => x.id === questId);
            if (q) return q.title.en;
        }
        return '';
      };
      const getDescToUse = () => {
        const questObj = prev.dailyQuests.find(q => q.id === questId);
        if (questObj?.isCustom) return questObj.customDesc?.en || questObj.customTitle?.en || '';
        for (const c of SSR_CHALLENGES) {
            let q = c.quests?.find((x: any) => x.id === questId);
            if (!q) q = c.quests_f?.find((x: any) => x.id === questId);
            if (q) return q.desc.en;
        }
`;
fileStr = fileStr.replace(regex1, replacement1);

const regex2 = /const descToUse = getDescToUse\(\);/s;
const replacement2 = `const descToUse = getDescToUse();
      const titleToUse = getTitleToUse();`;
fileStr = fileStr.replace(regex2, replacement2);

const regex3 = /const cals = calculateCalories\(questId, prev\.user\?\.weight \|\| 75, descToUse\);/g;
const replacement3 = `const cals = calculateCalories(questId, prev.user?.weight || 75, descToUse + " " + titleToUse);`;
fileStr = fileStr.replace(regex3, replacement3);

fs.writeFileSync('src/store.ts', fileStr);
