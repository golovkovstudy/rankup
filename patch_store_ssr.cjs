const fs = require('fs');
let fileStr = fs.readFileSync('src/store.ts', 'utf8');

const regex = /const generateSSRChallenge = \(\) => \{\s*const todayStr = format\(new Date\(\), 'yyyy-MM-dd'\);\s*const randomChallenge = SSR_CHALLENGES\[Math\.floor\(Math\.random\(\) \* SSR_CHALLENGES\.length\)\];\s*setState\(prev => \(\{\s*\.\.\.prev,\s*progress: \{\s*\.\.\.prev\.progress,\s*ssrChallengeDate: todayStr,\s*ssrChallengeId: randomChallenge\.id,\s*ssrChallengeCompleted: false\s*\},\s*dailyQuests: \[\{ id: randomChallenge\.id, completed: false, date: todayStr \}\]\s*\}\)\);\s*\};/s;

const replacement = `const generateSSRChallenge = () => {
    const todayStr = format(new Date(), 'yyyy-MM-dd');
    const randomChallenge = SSR_CHALLENGES[Math.floor(Math.random() * SSR_CHALLENGES.length)];
    setState(prev => {
      const qList = (prev.user?.gender === 'female' && randomChallenge.quests_f) ? randomChallenge.quests_f : (randomChallenge.quests || []);
      const newQuests = qList.map(q => ({
        id: q.id,
        completed: false,
        date: todayStr
      }));
      
      // fallback just in case
      if (newQuests.length === 0) {
        newQuests.push({ id: randomChallenge.id, completed: false, date: todayStr });
      }

      return {
        ...prev,
        progress: {
            ...prev.progress,
            ssrChallengeDate: todayStr,
            ssrChallengeId: randomChallenge.id,
            ssrChallengeCompleted: false
        },
        dailyQuests: newQuests
      };
    });
  };`;

fileStr = fileStr.replace(regex, replacement);

// We also need to fix generating quests if it's the SSR day and the user comes back.
const regexGenSSR = /if \(progress\.ssrChallengeDate === todayStr && progress\.ssrChallengeId\) \{\s*newQuests = \[\{ id: progress\.ssrChallengeId, completed: !!progress\.ssrChallengeCompleted, date: todayStr \}\];\s*\}/s;

const replacementGenSSR = `if (progress.ssrChallengeDate === todayStr && progress.ssrChallengeId) {
            const ssrCfg = SSR_CHALLENGES.find(c => c.id === progress.ssrChallengeId);
            if (ssrCfg) {
                const qList = (user.gender === 'female' && ssrCfg.quests_f) ? ssrCfg.quests_f : (ssrCfg.quests || []);
                if (qList.length > 0) {
                   newQuests = qList.map(q => {
                      const existing = dailyQuests.find(eq => eq.id === q.id);
                      return {
                          id: q.id,
                          completed: existing ? existing.completed : false,
                          date: todayStr
                      };
                   });
                } else {
                   const existing = dailyQuests.find(eq => eq.id === progress.ssrChallengeId);
                   newQuests = [{ id: progress.ssrChallengeId, completed: existing ? existing.completed : false, date: todayStr }];
                }
            }
        }`;

fileStr = fileStr.replace(regexGenSSR, replacementGenSSR);

fs.writeFileSync('src/store.ts', fileStr);
