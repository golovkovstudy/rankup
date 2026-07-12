const fs = require('fs');
let appStr = fs.readFileSync('src/App.tsx', 'utf8');

appStr = appStr.replace(
  "import { SettingsModal } from './components/SettingsModal';",
  "import { SettingsModal } from './components/SettingsModal';\nimport { RestTimer } from './components/RestTimer';"
);

appStr = appStr.replace(
  "      <SystemToasts />\n    </div>",
  "      <SystemToasts />\n      {state.user && <RestTimer lang={state.language} />}\n    </div>"
);

fs.writeFileSync('src/App.tsx', appStr);
