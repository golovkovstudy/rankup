const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

const regex1 = /<h2 className="text-xl font-bold tracking-tight uppercase text-emerald-400">\s*\{\!isSSR \? \(phase === 'III' \? t\.phase_iii : phase === 'II' \? t\.phase_ii : t\.phase_i\) : t\.level_veteran\}\s*<\/h2>/s;
const replacement1 = `{!isSSR && (
              <h2 className="text-xl font-bold tracking-tight uppercase text-emerald-400">
                {phase === 'III' ? t.phase_iii : phase === 'II' ? t.phase_ii : t.phase_i}
              </h2>
            )}`;
fileStr = fileStr.replace(regex1, replacement1);

const regex2 = /<div className=\{`text-center p-4 border \$\{theme\.border\} rounded-2xl \$\{theme\.bg\} \$\{theme\.glow\}`\}>\s*<h3 className="text-emerald-400 font-bold uppercase tracking-widest text-sm">SSR LEGEND<\/h3>\s*<p className="text-\[10px\] text-slate-400 mt-1">\{t\.required_inventory\}<\/p>\s*<\/div>/s;
const replacement2 = `<div className={\`text-center p-4 border \${theme.border} rounded-2xl \${theme.bg} \${theme.glow}\`}>
            <h3 className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-1">SSR LEGEND</h3>
          </div>`;
fileStr = fileStr.replace(regex2, replacement2);

fs.writeFileSync('src/components/Dashboard.tsx', fileStr);
