const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Layout.tsx', 'utf8');

const regexImport = /import \{ Home, Trophy, Settings as SettingsIcon, User \} from 'lucide-react';/;
fileStr = fileStr.replace(regexImport, "import { Home, Trophy, BarChart2, Settings as SettingsIcon, User } from 'lucide-react';");

const regexProps = /activeTab: 'dashboard' \| 'achievements' \| 'settings';\n\s*setActiveTab: \(tab: 'dashboard' \| 'achievements' \| 'settings'\) => void;/;
fileStr = fileStr.replace(regexProps, `activeTab: 'dashboard' | 'achievements' | 'statistics' | 'settings';\n  setActiveTab: (tab: 'dashboard' | 'achievements' | 'statistics' | 'settings') => void;`);

const regexNav = /<button \n\s*onClick=\{\(\) => setActiveTab\('achievements'\)\}\n\s*className=\{`flex flex-col items-center gap-1 p-2 w-20 transition-all \$\{activeTab === 'achievements' \? `\$\{theme\.text\} scale-110` : 'text-slate-500 hover:text-slate-300'\}`\}\n\s*>\n\s*<Trophy size=\{24\} \/>\n\s*<span className="text-\[10px\] uppercase tracking-widest font-bold">\{t\.trophies\}<\/span>\n\s*<\/button>/;

const replacementNav = `<button 
          onClick={() => setActiveTab('statistics')}
          className={\`flex flex-col items-center gap-1 p-2 w-20 transition-all \${activeTab === 'statistics' ? \`\${theme.text} scale-110\` : 'text-slate-500 hover:text-slate-300'}\`}
        >
          <BarChart2 size={24} />
          <span className="text-[10px] uppercase tracking-widest font-bold">{t.statistics}</span>
        </button>
        <button 
          onClick={() => setActiveTab('achievements')}
          className={\`flex flex-col items-center gap-1 p-2 w-20 transition-all \${activeTab === 'achievements' ? \`\${theme.text} scale-110\` : 'text-slate-500 hover:text-slate-300'}\`}
        >
          <Trophy size={24} />
          <span className="text-[10px] uppercase tracking-widest font-bold">{t.trophies}</span>
        </button>`;

fileStr = fileStr.replace(regexNav, replacementNav);

fs.writeFileSync('src/components/Layout.tsx', fileStr);
