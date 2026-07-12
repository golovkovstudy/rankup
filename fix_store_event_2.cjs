const fs = require('fs');
let fileStr = fs.readFileSync('src/store.ts', 'utf8');

const effectStr = `  // Listen for custom events
  useEffect(() => {
    const handleUpdateTrainingDays = (e) => {
      setState(prev => prev.user ? {
        ...prev,
        user: { ...prev.user, trainingDays: e.detail },
        dailyQuests: [] // force regeneration
      } : prev);
    };
    
    const handleEquipTitle = (e) => {
      setState(prev => prev.user ? {
        ...prev,
        user: { ...prev.user, selectedTitle: e.detail }
      } : prev);
    };

    window.addEventListener('updateTrainingDays', handleUpdateTrainingDays);
    window.addEventListener('equipTitle', handleEquipTitle);
    
    return () => {
      window.removeEventListener('updateTrainingDays', handleUpdateTrainingDays);
      window.removeEventListener('equipTitle', handleEquipTitle);
    };
  }, []);

  useEffect(() => {`;

fileStr = fileStr.replace("  useEffect(() => {\n    localStorage.setItem", effectStr + "\n    localStorage.setItem");
fs.writeFileSync('src/store.ts', fileStr);
