const fs = require('fs');
let fileStr = fs.readFileSync('src/components/SettingsModal.tsx', 'utf8');

const target = `            {/* Data Management */}`;
const replacement = `            {/* Inventory */}
            <div>
              <label className="block text-[10px] text-slate-500 uppercase tracking-tighter mb-2">{t.inventory}</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'pullup_bar', label: t.pullup_bar },
                  { id: 'dip_station', label: t.dip_station },
                  { id: 'dumbbells', label: t.dumbbells },
                  { id: 'rings', label: t.rings },
                  { id: 'resistance_bands', label: t.resistance_bands },
                  { id: 'jump_rope', label: t.jump_rope },
                  { id: 'weight_vest', label: t.weight_vest },
                  { id: 'ab_roller', label: t.ab_roller },
                  { id: 'yoga_mat', label: t.yoga_mat }
                ].map((item) => {
                  const isSelected = state.user?.inventory?.includes(item.id);
                  return (
                    <div 
                      key={item.id}
                      onClick={() => {
                        const current = state.user?.inventory || [];
                        if (isSelected) {
                          onUpdateInventory(current.filter(i => i !== item.id));
                        } else {
                          onUpdateInventory([...current, item.id]);
                        }
                      }}
                      className={\`p-3 rounded-xl border text-center cursor-pointer transition-all text-[10px] font-bold uppercase tracking-widest \${isSelected ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-slate-800 border-white/5 text-slate-500 hover:border-emerald-500/30'}\`}
                    >
                      {item.label}
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Data Management */}`;

fileStr = fileStr.replace(target, replacement);
fs.writeFileSync('src/components/SettingsModal.tsx', fileStr);
