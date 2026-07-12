const fs = require('fs');
let fileStr = fs.readFileSync('src/store.ts', 'utf8');

const regex = /const getDescToUse = \(\) => \{\s*const questObj = prev\.dailyQuests\.find\(q => q\.id === questId\);\s*if \(questObj\?\.isCustom\) return questObj\.customDesc\?\.en \|\| questObj\.customTitle\?\.en \|\| '';\s*for \(const c of SSR_CHALLENGES\) \{\s*let q = c\.quests\?\.find\(\(x: any\) => x\.id === questId\);\s*if \(!q\) q = c\.quests_f\?\.find\(\(x: any\) => x\.id === questId\);\s*if \(q\) return q\.desc\.en;\s*\}\s*const questObj = prev\.dailyQuests\.find\(q => q\.id === questId\);/s;

const replacement = `const getDescToUse = () => {
        const questObj = prev.dailyQuests.find(q => q.id === questId);
        if (questObj?.isCustom) return questObj.customDesc?.en || questObj.customTitle?.en || '';
        for (const c of SSR_CHALLENGES) {
            let q = c.quests?.find((x: any) => x.id === questId);
            if (!q) q = c.quests_f?.find((x: any) => x.id === questId);
            if (q) return q.desc.en;
        }`;

fileStr = fileStr.replace(regex, replacement);

fs.writeFileSync('src/store.ts', fileStr);
