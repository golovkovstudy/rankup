const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

const oldDecl = `  const daysInRank = differenceInCalendarDays(new Date(), parseISO(progress.rankStartDate)) + (allQuestsCompleted ? 1 : 0);
  const phase = daysInRank >= 28 ? 'III' : daysInRank >= 14 ? 'II' : 'I';
  const isSSR = progress.currentRank === 'SSR';
  const isEligibleForChallenge = isSSR ? false : daysInRank >= currentRankConfig.minDays;
  const allQuestsCompleted = dailyQuests.length > 0 && dailyQuests.every(q => q.completed);
  const todayStr = new Date().toISOString().split('T')[0];`;

const newDecl = `  const allQuestsCompleted = dailyQuests.length > 0 && dailyQuests.every(q => q.completed);
  const daysInRank = differenceInCalendarDays(new Date(), parseISO(progress.rankStartDate)) + (allQuestsCompleted ? 1 : 0);
  const phase = daysInRank >= 28 ? 'III' : daysInRank >= 14 ? 'II' : 'I';
  const isSSR = progress.currentRank === 'SSR';
  const isEligibleForChallenge = isSSR ? false : daysInRank >= currentRankConfig.minDays;
  const todayStr = new Date().toISOString().split('T')[0];`;

fileStr = fileStr.replace(oldDecl, newDecl);
fs.writeFileSync('src/components/Dashboard.tsx', fileStr);
