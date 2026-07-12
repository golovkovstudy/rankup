const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

const regex = /if \(isSSR\) \{\s*const challenge = SSR_CHALLENGES\.find\(\(c: any\) => c\.id === id\);\s*return challenge \? \{ id: challenge\.id, title: challenge\.title, desc: challenge\.desc, isCustom: quest\.isCustom \} : null;\s*\}/s;

const replacement = `if (isSSR) {
      const challenge = SSR_CHALLENGES.find((c: any) => c.id === id);
      if (challenge) return { id: challenge.id, title: challenge.title, desc: challenge.desc, isCustom: quest.isCustom };
      
      // Look inside quests
      for (const c of SSR_CHALLENGES) {
        let q = c.quests?.find((x: any) => x.id === id);
        if (!q) q = c.quests_f?.find((x: any) => x.id === id);
        if (q) return { id: q.id, title: q.title, desc: q.desc, isCustom: quest.isCustom };
      }
      return null;
    }`;

fileStr = fileStr.replace(regex, replacement);

fs.writeFileSync('src/components/Dashboard.tsx', fileStr);
