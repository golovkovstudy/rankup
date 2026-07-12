const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

const targetStr = `                  <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-mono">{qData.desc}</div>
                </div>
              </div>
            </motion.div>`;

const newStr = `                  <div className="flex items-center gap-2 mt-1">
                    <div className="text-xs text-slate-500 uppercase tracking-wider font-mono">{qData.desc}</div>
                    <div className="text-[9px] font-bold text-orange-400/80 bg-orange-500/10 px-1.5 py-0.5 rounded border border-orange-500/20">
                       ~{state.user ? Math.round(state.user.weight * 1.5) : 100} kcal
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>`;

fileStr = fileStr.replace(targetStr, newStr);
fs.writeFileSync('src/components/Dashboard.tsx', fileStr);
