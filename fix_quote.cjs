const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

const oldHeader = `        </div>
        {/* Progress Bar */}`;

const newHeader = `        </div>
        
        {/* Daily Motivation */}
        <div className="p-4 rounded-xl bg-slate-900 border border-white/5 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
           <p className="text-xs text-slate-400 italic">
             {lang === 'ru' 
               ? '"Дисциплина — это решение делать то, чего очень не хочется делать, чтобы достичь того, чего очень хочется достичь."' 
               : '"Discipline is choosing between what you want now and what you want most."'}
           </p>
        </div>

        {/* Progress Bar */}`;

fileStr = fileStr.replace(oldHeader, newHeader);
fs.writeFileSync('src/components/Dashboard.tsx', fileStr);
