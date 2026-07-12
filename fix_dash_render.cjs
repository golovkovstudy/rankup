const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

const dashStart = `export function Dashboard({ state, onToggleQuest, onStartChallenge, onGenerateSSRChallenge, onAddCustomQuest, onDeleteCustomQuest }: DashboardProps) {`;
const dashStartNew = `export function Dashboard({ state, onToggleQuest, onStartChallenge, onGenerateSSRChallenge, onAddCustomQuest, onDeleteCustomQuest }: DashboardProps) {
  const [customTaskInput, setCustomTaskInput] = useState('');`;
fileStr = fileStr.replace(dashStart, dashStartNew);

const iconImports = `import { CheckCircle2, Circle, Flame, Award, ChevronRight, Info } from 'lucide-react';`;
const iconImportsNew = `import { CheckCircle2, Circle, Flame, Award, ChevronRight, Info, Plus, Trash2 } from 'lucide-react';`;
fileStr = fileStr.replace(iconImports, iconImportsNew);

const oldMapBody = `            return (
            <motion.div
              key={quest.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const wasCompleted = quest.completed;
                onToggleQuest(quest.id);
                if (!wasCompleted) {
                  const allWillBeCompleted = dailyQuests.every(q => q.id === quest.id ? true : q.completed);`;

const newMapBody = `            return (
            <motion.div
              key={quest.id}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                // Prevent toggle if clicking delete button
                if ((e.target as HTMLElement).closest('button.delete-btn')) return;
                const wasCompleted = quest.completed;
                onToggleQuest(quest.id);
                if (!wasCompleted) {
                  const allWillBeCompleted = requiredQuests.every(q => q.id === quest.id ? true : q.completed);`;
fileStr = fileStr.replace(oldMapBody, newMapBody);

const oldTitleRender = `              <div className="flex-1">
                <h4 className={\`font-bold \${quest.completed ? 'text-emerald-400 opacity-90' : 'text-white'}\`}>{qData.title[lang]}</h4>
                {qData.desc && (
                  <div className={\`text-[10px] mt-1 uppercase tracking-wider \${quest.completed ? 'text-emerald-500/80' : 'text-slate-500'}\`}>{qData.desc[lang]}</div>
                )}
              </div>
              {quest.completed ? (
                <span className={\`px-3 py-1 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase border border-emerald-500/30\`}>{t.completed}</span>
              ) : null}
            </motion.div>
          )})}
        </div>
      </section>`;

const newTitleRender = `              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className={\`font-bold \${quest.completed ? 'text-emerald-400 opacity-90' : 'text-white'}\`}>{qData.title[lang]}</h4>
                  {quest.isCustom && (
                    <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                      {lang === 'ru' ? 'Опционально' : 'Optional'}
                    </span>
                  )}
                </div>
                {qData.desc && (
                  <div className={\`text-[10px] mt-1 uppercase tracking-wider \${quest.completed ? 'text-emerald-500/80' : 'text-slate-500'}\`}>{qData.desc[lang]}</div>
                )}
              </div>
              <div className="flex items-center gap-2">
                {quest.completed ? (
                  <span className={\`px-3 py-1 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase border border-emerald-500/30\`}>{t.completed}</span>
                ) : null}
                {quest.isCustom && (
                  <button 
                    className="delete-btn p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    onClick={() => onDeleteCustomQuest(quest.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </motion.div>
          )})}

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (customTaskInput.trim()) {
                onAddCustomQuest(customTaskInput.trim());
                setCustomTaskInput('');
              }
            }}
            className="flex items-center mt-2 group"
          >
            <input 
              type="text" 
              value={customTaskInput}
              onChange={e => setCustomTaskInput(e.target.value)}
              placeholder={lang === 'ru' ? '+ Добавить свое задание (по желанию)...' : '+ Add custom task (optional)...'}
              className="flex-1 bg-white/[0.02] border border-white/5 rounded-l-2xl p-5 text-sm outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all text-white placeholder-slate-600"
            />
            <button 
              type="submit"
              disabled={!customTaskInput.trim()}
              className="bg-slate-800 border-y border-r border-white/5 p-5 rounded-r-2xl text-slate-400 hover:text-emerald-400 hover:bg-slate-700 transition-colors disabled:opacity-50"
            >
              <Plus size={20} />
            </button>
          </form>
        </div>
      </section>`;

fileStr = fileStr.replace(oldTitleRender, newTitleRender);
fs.writeFileSync('src/components/Dashboard.tsx', fileStr);
