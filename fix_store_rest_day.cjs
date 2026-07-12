const fs = require('fs');

let fileStr = fs.readFileSync('src/store.ts', 'utf8');

fileStr = fileStr.replace('clearPenaltyAlert,', `clearPenaltyAlert,
    setRestDay,`);

fileStr = fileStr.replace('const setLanguage', `const setRestDay = (day: number) => {
    setState(prev => prev.user ? {
      ...prev,
      user: { ...prev.user, restDay: day }
    } : prev);
  };

  const setLanguage`);

fs.writeFileSync('src/store.ts', fileStr);
