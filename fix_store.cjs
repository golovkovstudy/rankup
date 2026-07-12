const fs = require('fs');
let storeStr = fs.readFileSync('src/store.ts', 'utf8');

const targetPenaltyBlock = `      let newStreak = progress.currentStreak;
      let newRankStartDate = progress.rankStartDate;
      let penaltyAlert: 'partial' | 'full' | null = null;

      const lastDate = dailyQuests.length > 0 ? dailyQuests[0].date : progress.lastActiveDate;
      
      if (lastDate && lastDate !== todayStr && state.lastGeneratedDate && state.lastGeneratedDate !== todayStr) {
         const daysDiff = differenceInDays(new Date(todayStr), parseISO(lastDate));
         
         if (daysDiff === 1) {
             const anyCompleted = dailyQuests.some(q => q.completed);
             const allCompleted = dailyQuests.every(q => q.completed);
             
             if (!anyCompleted && dailyQuests.length > 0) {
                 penaltyAlert = 'full';
             } else if (!allCompleted && dailyQuests.length > 0) {
                 penaltyAlert = 'partial';
             } else if (allCompleted && dailyQuests.length > 0) {
                 newStreak += 1;
             }
         } else if (daysDiff > 1) {
             penaltyAlert = 'full';
         }
      }

      if (penaltyAlert) {
         newStreak = 0;
         if (penaltyAlert === 'full') {
            const currentDateStart = parseISO(newRankStartDate);
            // Subtract 2 days of progress by shifting rankStartDate forward
            let updatedDateStart = new Date(currentDateStart.getTime() + 2 * 24 * 60 * 60 * 1000);
            if (updatedDateStart > new Date()) {
                updatedDateStart = new Date();
            }
            newRankStartDate = format(updatedDateStart, 'yyyy-MM-dd');
         }
      }`;

const replacePenaltyBlock = `      // Determine training days for penalty calculations
      let tDays = user.trainingDays;
      if (!tDays || tDays.length === 0) {
        tDays = [];
        for (let i = 1; i <= 6; i++) {
            tDays.push(( (user.restDay !== undefined ? user.restDay : 0) + i ) % 7);
        }
        tDays = tDays.map(d => d % 7);
      }

      let newStreak = progress.currentStreak;
      let newRankStartDate = progress.rankStartDate;
      let penaltyAlert: 'partial' | 'full' | null = null;
      let penaltyDaysCount = 0;

      const lastDate = dailyQuests.length > 0 ? dailyQuests[0].date : progress.lastActiveDate;
      
      if (lastDate && lastDate !== todayStr && state.lastGeneratedDate && state.lastGeneratedDate !== todayStr) {
         const daysDiff = differenceInDays(new Date(todayStr), parseISO(lastDate));
         
         if (daysDiff > 0) {
             for (let i = 0; i < daysDiff; i++) {
                 const d = new Date(parseISO(lastDate).getTime() + i * 24 * 60 * 60 * 1000);
                 const dateStr = format(d, 'yyyy-MM-dd');
                 const dayOfWeek = getDay(d);
                 
                 const isRestDay = !tDays.includes(dayOfWeek);
                 
                 if (i === 0) {
                     // Check yesterday's generated quests
                     if (isRestDay) {
                         newStreak += 1; // Auto-complete rest day
                     } else {
                         const anyCompleted = dailyQuests.some(q => q.completed);
                         const allCompleted = dailyQuests.every(q => q.completed);
                         if (!anyCompleted && dailyQuests.length > 0) {
                             penaltyAlert = 'full';
                             penaltyDaysCount += 2;
                         } else if (!allCompleted && dailyQuests.length > 0) {
                             penaltyAlert = 'partial';
                         } else if (allCompleted && dailyQuests.length > 0) {
                             newStreak += 1;
                         }
                     }
                 } else {
                     // Days missed entirely
                     if (isRestDay) {
                         newStreak += 1; // Auto-complete missed rest day
                     } else {
                         penaltyAlert = 'full';
                         penaltyDaysCount += 2;
                     }
                 }
             }
         }
      }

      if (penaltyAlert) {
         newStreak = 0;
         if (penaltyDaysCount > 0) {
            const currentDateStart = parseISO(newRankStartDate);
            let updatedDateStart = new Date(currentDateStart.getTime() + penaltyDaysCount * 24 * 60 * 60 * 1000);
            if (updatedDateStart > new Date()) {
                updatedDateStart = new Date();
            }
            newRankStartDate = format(updatedDateStart, 'yyyy-MM-dd');
         }
      }`;

storeStr = storeStr.replace(targetPenaltyBlock, replacePenaltyBlock);

const targetTDaysBlock = `          let tDays = user.trainingDays;
          if (!tDays || tDays.length === 0) {
            tDays = [];
            for (let i = 1; i <= 6; i++) {
                tDays.push(( (user.restDay !== undefined ? user.restDay : 0) + i ) % 7);
            }
            tDays = tDays.map(d => d % 7);
          }`;
const replaceTDaysBlock = `          // tDays already calculated above`;
storeStr = storeStr.replace(targetTDaysBlock, replaceTDaysBlock);

fs.writeFileSync('src/store.ts', storeStr);
