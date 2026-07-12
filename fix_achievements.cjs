const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Achievements.tsx', 'utf8');

const targetHeatmap = `    return Array.from({ length: 35 }).map((_, i) => {
      const d = subDays(endDay, 34 - i);
      const dateStr = format(d, 'yyyy-MM-dd');
      return { 
        date: d, 
        active: activityHistory.includes(dateStr),
        isFuture: d > today
      };
    });`;

const replaceHeatmap = `    return Array.from({ length: 35 }).map((_, i) => {
      const d = subDays(endDay, 34 - i);
      const dateStr = format(d, 'yyyy-MM-dd');
      
      let status = state.stats.activityLog?.[dateStr];

      // If it's today, dynamically calculate it
      if (dateStr === format(today, 'yyyy-MM-dd')) {
         const quests = state.dailyQuests || [];
         if (quests.length > 0) {
             const isRest = quests.every(q => q.id === 'rest_day_quest');
             if (isRest) status = 'rest';
             else {
                 const anyComplete = quests.some(q => q.completed);
                 const allComplete = quests.every(q => q.completed);
                 if (allComplete) status = 'full';
                 else if (anyComplete) status = 'partial';
                 else status = 'missed'; // will be 'missed' if they don't complete anything
             }
         }
      }

      if (!status && activityHistory.includes(dateStr)) {
         status = 'full';
      }
      
      return { 
        date: d, 
        status: status,
        isFuture: d > today
      };
    });`;

const targetClasses = `              // Add some visual distinction based on past/future/active
              let classes = "w-full aspect-square rounded-[4px] transition-all duration-300 ";
              if (day.isFuture) {
                classes += "bg-slate-800/20 border border-white/[0.02]";
              } else if (day.active) {
                classes += \`\${theme.bg} shadow-[0_0_10px_rgba(16,185,129,0.3)] border \${theme.border} transform hover:scale-110 z-10\`;
              } else {
                classes += "bg-slate-800/50 border border-white/5 hover:bg-slate-700";
              }`;

const replaceClasses = `              // Add some visual distinction based on past/future/active
              let classes = "w-full aspect-square rounded-[4px] transition-all duration-300 ";
              if (day.isFuture) {
                classes += "bg-slate-800/20 border border-white/[0.02]";
              } else if (day.status === 'full') {
                classes += \`\${theme.bg} shadow-[0_0_10px_rgba(16,185,129,0.3)] border \${theme.border} transform hover:scale-110 z-10\`;
              } else if (day.status === 'partial') {
                classes += "bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.3)] border border-yellow-400 transform hover:scale-110 z-10";
              } else if (day.status === 'missed') {
                classes += "bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.3)] border border-red-400 transform hover:scale-110 z-10";
              } else if (day.status === 'rest') {
                classes += "bg-blue-500/30 border border-blue-400/50 transform hover:scale-110 z-10";
              } else {
                classes += "bg-slate-800/50 border border-white/5 hover:bg-slate-700";
              }`;

fileStr = fileStr.replace(targetHeatmap, replaceHeatmap);
fileStr = fileStr.replace(targetClasses, replaceClasses);

fs.writeFileSync('src/components/Achievements.tsx', fileStr);
