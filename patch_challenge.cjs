const fs = require('fs');
let fileStr = fs.readFileSync('src/components/LevelUpChallenge.tsx', 'utf8');

const regex = /const incrementTask = \(taskId: string, targetCount: number, amount: number = 1\) => \{\s*if \(!hasStarted\) return;\s*setTaskCounts\(prev => \{\s*const current = prev\[taskId\] \|\| 0;\s*if \(current >= targetCount\) return prev;\s*return \{ \.\.\.prev, \[taskId\]: Math\.min\(current \+ amount, targetCount\) \};\s*\}\);\s*\};/s;

const newToggle = `const toggleTask = (taskId: string, targetCount: number) => {
    if (!hasStarted) return;
    setTaskCounts(prev => {
      const current = prev[taskId] || 0;
      if (current >= targetCount) {
        return { ...prev, [taskId]: 0 }; // uncheck
      }
      return { ...prev, [taskId]: targetCount }; // instantly complete
    });
  };`;

fileStr = fileStr.replace(regex, newToggle);
fileStr = fileStr.replace(/incrementTask\(task\.id, task\.count\)/g, 'toggleTask(task.id, task.count)');

fileStr = fileStr.replace(/<span className="text-2xl font-black">\+<\/span>/, `<div className="w-4 h-4 rounded-full border-2 border-slate-700 group-hover:border-slate-500"></div>`);

fs.writeFileSync('src/components/LevelUpChallenge.tsx', fileStr);
