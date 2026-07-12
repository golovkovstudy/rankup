const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Layout.tsx', 'utf8');

fileStr = fileStr.replace(
  "import { UI } from '../data';",
  "import { UI } from '../data';\nimport { getRankTheme } from '../utils';"
);

const rankThemeStr = `  const t = UI[lang];
  const theme = getRankTheme(state.progress.currentRank);`;

fileStr = fileStr.replace("  const t = UI[lang];", rankThemeStr);

fileStr = fileStr.replace(
  `<h1 className="font-black italic text-3xl uppercase tracking-tighter text-slate-100 leading-none">
          RankUp
        </h1>`,
  `<h1 className={\`font-black italic text-3xl uppercase tracking-tighter leading-none \${theme.text}\`} style={{ textShadow: \`0 0 20px \${theme.hex}66\` }}>
          RankUp
        </h1>`
);

fileStr = fileStr.replace(
  `activeTab === 'dashboard' ? 'text-emerald-400 scale-110' : 'text-slate-500 hover:text-slate-300'`,
  `activeTab === 'dashboard' ? \`\${theme.text} scale-110\` : 'text-slate-500 hover:text-slate-300'`
);

fileStr = fileStr.replace(
  `activeTab === 'achievements' ? 'text-purple-400 scale-110' : 'text-slate-500 hover:text-slate-300'`,
  `activeTab === 'achievements' ? \`\${theme.text} scale-110\` : 'text-slate-500 hover:text-slate-300'`
);

fileStr = fileStr.replace(
  `className="w-full bg-slate-800 border border-slate-600 rounded-xl p-3 text-center text-2xl tracking-widest text-white outline-none focus:border-emerald-500 mb-4"`,
  `className={\`w-full bg-slate-800 border border-slate-600 rounded-xl p-3 text-center text-2xl tracking-widest text-white outline-none focus:\${theme.border} mb-4\`}`
);

fs.writeFileSync('src/components/Layout.tsx', fileStr);
