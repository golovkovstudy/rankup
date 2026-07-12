const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

const profileOld = `          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter">{progress.currentRank}</h2>
            <p className={\`text-xs font-bold uppercase tracking-widest \${theme.text}\`}>
              {t.path_to} {progress.nextRank || 'SSR'}
            </p>
          </div>`;

const profileNew = `          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter">{progress.currentRank}</h2>
            <p className={\`text-xs font-bold uppercase tracking-widest \${theme.text}\`}>
              {t.path_to} {progress.nextRank || 'SSR'}
            </p>
            {state.user?.selectedTitle && (
              <div className="mt-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest text-emerald-400">
                {state.user.selectedTitle}
              </div>
            )}
          </div>`;

fileStr = fileStr.replace(profileOld, profileNew);
fs.writeFileSync('src/components/Dashboard.tsx', fileStr);
