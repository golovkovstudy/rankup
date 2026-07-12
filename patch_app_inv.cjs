const fs = require('fs');
let fileStr = fs.readFileSync('src/App.tsx', 'utf8');

const updateRestDay = `  const setRestDay = (day: number) => {`;
const updateInventory = `  const updateInventory = (inventory: string[]) => {
    setState(prev => prev.user ? { ...prev, user: { ...prev.user, inventory } } : prev);
  };
  const setRestDay = (day: number) => {`;
fileStr = fileStr.replace(updateRestDay, updateInventory);

const settingsModalTarget = `<SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        state={state} 
        onSetLanguage={setLanguage} 
        onImport={importData} 
        onReset={resetData} 
        onSetRestDay={setRestDay}`;

const settingsModalReplacement = `<SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        state={state} 
        onSetLanguage={setLanguage} 
        onImport={importData} 
        onReset={resetData} 
        onSetRestDay={setRestDay}
        onUpdateInventory={updateInventory}`;

fileStr = fileStr.replace(settingsModalTarget, settingsModalReplacement);

fs.writeFileSync('src/App.tsx', fileStr);
