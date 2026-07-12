const fs = require('fs');
let fileStr = fs.readFileSync('src/App.tsx', 'utf8');

fileStr = fileStr.replace(
  "import { SettingsModal } from './components/SettingsModal';",
  "import { SettingsModal } from './components/SettingsModal';\nimport { SystemToasts } from './components/SystemToasts';"
);

fileStr = fileStr.replace(
  "<Layout activeTab={activeTab} setActiveTab={setActiveTab} state={state} setLanguage={setLanguage} onOpenSettings={() => setIsSettingsOpen(true)}>",
  "<SystemToasts />\n      <Layout activeTab={activeTab} setActiveTab={setActiveTab} state={state} setLanguage={setLanguage} onOpenSettings={() => setIsSettingsOpen(true)}>"
);

fs.writeFileSync('src/App.tsx', fileStr);
