const fs = require('fs');

// 1. Types
let typesStr = fs.readFileSync('src/types.ts', 'utf8');
typesStr = typesStr.replace(
  "restDay: number; // 0-6 (0 = Sunday)",
  "restDay: number; // 0-6 (0 = Sunday)\n  trainingDays?: number[];\n  selectedTitle?: string;"
);
fs.writeFileSync('src/types.ts', typesStr);

// 2. Store
let storeStr = fs.readFileSync('src/store.ts', 'utf8');

// Fix toggleQuest stats calculation
const oldStatsLogic = `        // Dynamic stats parsing based on quest ID
        if (questId.includes('pushups')) newStats.pushupsTotal += 40;
        else if (questId.includes('pullups') || questId.includes('mu') || questId.includes('hspu')) newStats.pullupsTotal += 15;
        else if (questId.includes('run') || questId.includes('walk') || questId.includes('jog')) newStats.runKmTotal += 5;
        else {
           // Default if not specified
           if (prev.progress.currentRank !== 'F') newStats.pullupsTotal += 10;
           newStats.pushupsTotal += 20;
        }`;

const newStatsLogic = `        // Dynamic stats parsing based on quest ID
        const lowerId = questId.toLowerCase();
        if (lowerId.includes('pushup')) newStats.pushupsTotal += 40;
        else if (lowerId.includes('pullup') || lowerId.includes('mu') || lowerId.includes('hspu')) newStats.pullupsTotal += 15;
        else if (lowerId.includes('run') || lowerId.includes('walk') || lowerId.includes('jog')) newStats.runKmTotal += 5;
        else {
           if (prev.progress.currentRank !== 'F') newStats.pullupsTotal += 10;
           newStats.pushupsTotal += 20;
        }`;

storeStr = storeStr.replace(oldStatsLogic, newStatsLogic);

// Add state.dailyQuests.length to dependencies of useEffect
storeStr = storeStr.replace(
  "state.progress.ssrChallengeId]);",
  "state.progress.ssrChallengeId, state.dailyQuests.length]);"
);

fs.writeFileSync('src/store.ts', storeStr);

// 3. Dashboard days in rank
let dashStr = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');
dashStr = dashStr.replace(
  "const daysInRank = differenceInDays(new Date(), parseISO(progress.rankStartDate));",
  "const daysInRank = differenceInCalendarDays(new Date(), parseISO(progress.rankStartDate)) + (allQuestsCompleted ? 1 : 0);"
);
dashStr = dashStr.replace(
  "import { differenceInDays, parseISO, format } from 'date-fns';",
  "import { differenceInDays, differenceInCalendarDays, parseISO, format } from 'date-fns';"
);
fs.writeFileSync('src/components/Dashboard.tsx', dashStr);

// 4. Calibration Modal Plus/Minus UI
let calibStr = fs.readFileSync('src/components/CalibrationModal.tsx', 'utf8');
calibStr = calibStr.replace(
  "import { X, Play, Target } from 'lucide-react';",
  "import { X, Play, Target, Plus, Minus } from 'lucide-react';"
);

const numberInputComponent = `  const NumberInput = ({ label, value, onChange, placeholder }: any) => (
    <div className="mb-6">
      <label className="block text-[10px] text-slate-500 uppercase tracking-tighter mb-2 text-center">
        {label}
      </label>
      <div className="flex items-center justify-center gap-4">
        <button 
          onClick={() => onChange(Math.max(0, (parseInt(value) || 0) - 1).toString())}
          className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors active:scale-95"
        >
          <Minus size={20} />
        </button>
        <input 
          type="number" 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-24 bg-slate-900 border-b-2 border-emerald-500/50 p-2 text-white text-3xl font-black text-center focus:outline-none focus:border-emerald-400"
        />
        <button 
          onClick={() => onChange(((parseInt(value) || 0) + 1).toString())}
          className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors active:scale-95"
        >
          <Plus size={20} />
        </button>
      </div>
    </div>
  );`;

calibStr = calibStr.replace("  const handleFinish = () => {", numberInputComponent + "\n\n  const handleFinish = () => {");

const oldInputs = `              <div>
                <label className="block text-[10px] text-slate-500 uppercase tracking-tighter mb-2">
                  {lang === 'ru' ? 'Отжимания от пола' : 'Pushups'}
                </label>
                <input 
                  type="number" 
                  value={pushups} 
                  onChange={(e) => setPushups(e.target.value)}
                  placeholder="0"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white text-2xl font-black text-center focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-500 uppercase tracking-tighter mb-2">
                  {lang === 'ru' ? 'Подтягивания (или тяги в наклоне)' : 'Pullups (or rows)'}
                </label>
                <input 
                  type="number" 
                  value={pullups} 
                  onChange={(e) => setPullups(e.target.value)}
                  placeholder="0"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white text-2xl font-black text-center focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-500 uppercase tracking-tighter mb-2">
                  {lang === 'ru' ? 'Приседания за 1 минуту' : 'Squats in 1 min'}
                </label>
                <input 
                  type="number" 
                  value={squats} 
                  onChange={(e) => setSquats(e.target.value)}
                  placeholder="0"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white text-2xl font-black text-center focus:outline-none focus:border-emerald-500"
                />
              </div>`;

const newInputs = `              <NumberInput 
                label={lang === 'ru' ? 'Отжимания от пола' : 'Pushups'}
                value={pushups}
                onChange={setPushups}
                placeholder="0"
              />
              <NumberInput 
                label={lang === 'ru' ? 'Подтягивания (или тяги в наклоне)' : 'Pullups (or rows)'}
                value={pullups}
                onChange={setPullups}
                placeholder="0"
              />
              <NumberInput 
                label={lang === 'ru' ? 'Приседания за 1 минуту' : 'Squats in 1 min'}
                value={squats}
                onChange={setSquats}
                placeholder="0"
              />`;

calibStr = calibStr.replace(oldInputs, newInputs);
fs.writeFileSync('src/components/CalibrationModal.tsx', calibStr);

// 5. Training days warning and selection
let obStr = fs.readFileSync('src/components/Onboarding.tsx', 'utf8');

const tDaysWarning = `            <p className="text-[10px] text-slate-400 mb-2 leading-tight">
              {lang === 'ru' ? 'Нагрузка будет распределена на выбранные дни. Мы рекомендуем 3-5 дней в неделю.' : 'Volume will be distributed across selected days. We recommend 3-5 days.'}
            </p>`;

const tDaysWarningNew = `            <p className="text-[10px] text-slate-400 mb-2 leading-tight">
              {lang === 'ru' ? 'Нагрузка будет распределена на выбранные дни. Мы рекомендуем 3-5 дней в неделю.' : 'Volume will be distributed across selected days. We recommend 3-5 days.'}
            </p>
            {formData.trainingDays && formData.trainingDays.length === 7 && (
              <p className="text-[10px] text-red-400 font-bold mb-2 leading-tight bg-red-500/10 p-2 rounded-lg border border-red-500/30">
                {lang === 'ru' ? '⚠️ Внимание: Тренировки 7 дней в неделю могут привести к перетренированности и травмам. Обязательно прислушивайтесь к телу!' : '⚠️ Warning: Training 7 days a week can lead to overtraining. Listen to your body!'}
              </p>
            )}`;

obStr = obStr.replace(tDaysWarning, tDaysWarningNew);

// Fix colors for training days in Onboarding
obStr = obStr.replace(
  "className={`p-3 rounded-xl border text-center cursor-pointer transition-all text-xs font-bold uppercase tracking-widest ${isSelected ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-slate-800 border-white/5 text-slate-500 hover:border-emerald-500/30'}`}",
  "className={`p-3 rounded-xl border text-center cursor-pointer transition-all text-xs font-bold uppercase tracking-widest ${isSelected ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-slate-800 border-white/5 text-slate-500 hover:border-emerald-500/30'}`}"
);

fs.writeFileSync('src/components/Onboarding.tsx', obStr);

// Fix colors for training days in Settings
let settingsStr = fs.readFileSync('src/components/SettingsModal.tsx', 'utf8');
settingsStr = settingsStr.replace(
  "className={`p-2 rounded-lg text-xs font-bold transition-colors ${isSelected ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-500 hover:bg-slate-700'}`}",
  "className={`p-2 rounded-lg text-xs font-bold transition-colors ${isSelected ? 'bg-emerald-600 border border-emerald-500 text-white' : 'bg-slate-800 border border-transparent text-slate-500 hover:bg-slate-700'}`}"
);

const tDaysWarningSettings = `              </label>
              <div className="grid grid-cols-7 gap-1">`;
const tDaysWarningSettingsNew = `              </label>
              {state.user?.trainingDays?.length === 7 && (
                <p className="text-[10px] text-red-400 font-bold mb-2 leading-tight bg-red-500/10 p-2 rounded-lg border border-red-500/30">
                  {lang === 'ru' ? '⚠️ 7 дней в неделю могут привести к перетренированности.' : '⚠️ 7 days a week can lead to overtraining.'}
                </p>
              )}
              <div className="grid grid-cols-7 gap-1">`;
settingsStr = settingsStr.replace(tDaysWarningSettings, tDaysWarningSettingsNew);
fs.writeFileSync('src/components/SettingsModal.tsx', settingsStr);
