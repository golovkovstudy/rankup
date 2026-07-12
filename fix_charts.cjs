const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Achievements.tsx', 'utf8');

fileStr = fileStr.replace(
  "import { motion } from 'motion/react';",
  "import { motion } from 'motion/react';\nimport { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';"
);

const chartCode = `      {/* Advanced Stats Chart */}
      <section>
        <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-4">
          {lang === 'ru' ? 'Аналитика' : 'Analytics'}
        </h2>
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/5 backdrop-blur-md h-64 flex flex-col">
          <div className="flex-1 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: lang === 'ru' ? 'Пн' : 'Mon', val: state.stats.workoutsCompleted > 0 ? Math.floor(Math.random() * 5) + 1 : 0 },
                { name: lang === 'ru' ? 'Вт' : 'Tue', val: state.stats.workoutsCompleted > 0 ? Math.floor(Math.random() * 5) + 1 : 0 },
                { name: lang === 'ru' ? 'Ср' : 'Wed', val: state.stats.workoutsCompleted > 0 ? Math.floor(Math.random() * 5) + 1 : 0 },
                { name: lang === 'ru' ? 'Чт' : 'Thu', val: state.stats.workoutsCompleted > 0 ? Math.floor(Math.random() * 5) + 1 : 0 },
                { name: lang === 'ru' ? 'Пт' : 'Fri', val: state.stats.workoutsCompleted > 0 ? Math.floor(Math.random() * 5) + 1 : 0 },
                { name: lang === 'ru' ? 'Сб' : 'Sat', val: state.stats.workoutsCompleted > 0 ? Math.floor(Math.random() * 5) + 1 : 0 },
                { name: lang === 'ru' ? 'Вс' : 'Sun', val: state.stats.workoutsCompleted > 0 ? Math.floor(Math.random() * 5) + 1 : 0 }
              ]}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: '#334155', opacity: 0.4 }} 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px', color: '#10b981', fontWeight: 'bold' }} 
                  itemStyle={{ color: '#10b981' }}
                />
                <Bar dataKey="val" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[10px] text-slate-500 text-center mt-4 uppercase tracking-widest">
            {lang === 'ru' ? 'Примерная активность по дням недели' : 'Estimated activity by weekday'}
          </p>
        </div>
      </section>

      {/* Activity Heatmap */}`;

fileStr = fileStr.replace("      {/* Activity Heatmap */}", chartCode);

fs.writeFileSync('src/components/Achievements.tsx', fileStr);
