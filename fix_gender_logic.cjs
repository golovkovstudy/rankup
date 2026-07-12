const fs = require('fs');

// 1. Update store.ts
let storeStr = fs.readFileSync('src/store.ts', 'utf8');

const targetStore = `            let uniqueQuests = new Map();
            currentRankConfig.quests.forEach(q => {`;
const replaceStore = `            let uniqueQuests = new Map();
            const qList = (user.gender === 'female' && currentRankConfig.quests_f) ? currentRankConfig.quests_f : currentRankConfig.quests;
            qList.forEach(q => {`;

storeStr = storeStr.replace(targetStore, replaceStore);

// Update addBonusQuest as well!
const targetBonus = `      const rankConfig = RANKS[prev.progress.currentRank as keyof typeof RANKS];
      if (!rankConfig || !rankConfig.quests) return prev;
      
      const availableQuests = rankConfig.quests.filter(q => !prev.dailyQuests.some(dq => dq.id === q.id || dq.originalId === q.id));`;

const replaceBonus = `      const rankConfig = RANKS[prev.progress.currentRank as keyof typeof RANKS];
      if (!rankConfig) return prev;
      const qList = (prev.user?.gender === 'female' && rankConfig.quests_f) ? rankConfig.quests_f : rankConfig.quests;
      if (!qList) return prev;
      
      const availableQuests = qList.filter(q => !prev.dailyQuests.some(dq => dq.id === q.id || dq.originalId === q.id));`;

// storeStr = storeStr.replace(targetBonus, replaceBonus);

fs.writeFileSync('src/store.ts', storeStr);

// 2. Update Dashboard.tsx
let dashStr = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

const targetDash = `    const qData = currentRankConfig.quests.find(q => q.id === id);`;
const replaceDash = `    const qList = (state.user?.gender === 'female' && currentRankConfig.quests_f) ? currentRankConfig.quests_f : currentRankConfig.quests;
    const qData = qList.find(q => q.id === id);`;

dashStr = dashStr.replace(targetDash, replaceDash);
fs.writeFileSync('src/components/Dashboard.tsx', dashStr);

// 3. Update LevelUpChallenge.tsx
let levelUpStr = fs.readFileSync('src/components/LevelUpChallenge.tsx', 'utf8');

const targetLevelUp = `  const currentRankConfig = RANKS[state.progress.currentRank];
  const challenge = currentRankConfig.challenge;`;
const replaceLevelUp = `  const currentRankConfig = RANKS[state.progress.currentRank];
  const challenge = (state.user?.gender === 'female' && currentRankConfig.challenge_f) ? currentRankConfig.challenge_f : currentRankConfig.challenge;`;

levelUpStr = levelUpStr.replace(targetLevelUp, replaceLevelUp);
fs.writeFileSync('src/components/LevelUpChallenge.tsx', levelUpStr);

