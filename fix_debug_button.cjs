const fs = require('fs');
let fileStr = fs.readFileSync('src/components/DebugMenu.tsx', 'utf8');

const oldBtn = `<button 
            onClick={handleResetConfirm}
            className="w-full py-4 bg-red-950/50 border border-red-900 text-red-500 rounded-xl flex items-center justify-center gap-2 hover:bg-red-900 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
          >
            {t.reset_progress}
          </button>`;

const newBtn = `{!showConfirm ? (
            <button 
              onClick={() => setShowConfirm(true)}
              className="w-full py-4 bg-red-950/50 border border-red-900 text-red-500 rounded-xl flex items-center justify-center gap-2 hover:bg-red-900 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
            >
              {t.reset_progress}
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="text-xs text-red-400 text-center">{t.confirm_reset}</p>
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 font-bold p-3 rounded-xl transition-colors text-xs"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    setShowConfirm(false);
                    onReset();
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-500 font-bold p-3 rounded-xl transition-colors text-xs"
                >
                  Confirm
                </button>
              </div>
            </div>
          )}`;

fileStr = fileStr.replace(oldBtn, newBtn);
fs.writeFileSync('src/components/DebugMenu.tsx', fileStr);
