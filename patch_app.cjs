const fs = require('fs');
let fileStr = fs.readFileSync('src/App.tsx', 'utf8');

const regexImport = /import \{ Dashboard \} from '.\/components\/Dashboard';/;
fileStr = fileStr.replace(regexImport, "import { Dashboard } from './components/Dashboard';\nimport { Statistics } from './components/Statistics';");

const regexState = /const \[activeTab, setActiveTab\] = useState<'dashboard' \| 'achievements' \| 'settings'>\('dashboard'\);/;
fileStr = fileStr.replace(regexState, "const [activeTab, setActiveTab] = useState<'dashboard' | 'achievements' | 'statistics' | 'settings'>('dashboard');");

const regexRender = /\{activeTab === 'achievements' && <Achievements state=\{state\} \/>\}/;
fileStr = fileStr.replace(regexRender, "{activeTab === 'achievements' && <Achievements state={state} />}\n        {activeTab === 'statistics' && <Statistics state={state} />}");

fs.writeFileSync('src/App.tsx', fileStr);
