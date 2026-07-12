const fs = require('fs');

let fileStr = fs.readFileSync('src/App.tsx', 'utf8');

fileStr = fileStr.replace("import { Settings } from './components/Settings';", "import { DebugMenu } from './components/DebugMenu';\nimport { SettingsModal } from './components/SettingsModal';");

fileStr = fileStr.replace('const [showChallenge, setShowChallenge] = useState(false);', "const [showChallenge, setShowChallenge] = useState(false);\n  const [isSettingsOpen, setIsSettingsOpen] = useState(false);");

fileStr = fileStr.replace('<Layout activeTab={activeTab} setActiveTab={setActiveTab} state={state} setLanguage={setLanguage}>', '<Layout activeTab={activeTab} setActiveTab={setActiveTab} state={state} setLanguage={setLanguage} onOpenSettings={() => setIsSettingsOpen(true)}>');

fileStr = fileStr.replace('importData,', 'importData,\n    setRestDay,');

fileStr = fileStr.replace(`        {activeTab === 'settings' && (
          <Settings 
            state={state} 
            onImport={importData} 
            onReset={resetData} 
            onSetLanguage={setLanguage}
            onForceRank={forceRank}
            onForcePhase={forcePhase}
            onTestChallenge={handleTestChallenge}
            onSetDebugDay={setDebugDayOverride}
          />
        )}`, `        {activeTab === 'settings' && (
          <DebugMenu 
            state={state} 
            onImport={importData} 
            onReset={resetData} 
            onSetLanguage={setLanguage}
            onForceRank={forceRank}
            onForcePhase={forcePhase}
            onTestChallenge={handleTestChallenge}
            onSetDebugDay={setDebugDayOverride}
          />
        )}`);

fileStr = fileStr.replace(`</Layout>`, `</Layout>
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        state={state} 
        onSetLanguage={setLanguage} 
        onImport={importData} 
        onReset={resetData} 
        onSetRestDay={setRestDay} 
      />`);

fs.writeFileSync('src/App.tsx', fileStr);
