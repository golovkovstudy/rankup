
import React from 'react';
import { AppState } from '../types';
import { UI } from '../data';
import { Dumbbell, ChevronUp, Flame, Activity } from 'lucide-react';
import { format, subDays } from 'date-fns';

export function Statistics({ state }: { state: AppState }) {
  const lang = state.language;
  const t = UI[lang];

  const activityHistory = state.stats.activityHistory || [];

  const heatmapDays = (() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysUntilSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
    const endDay = new Date(today);
    endDay.setDate(today.getDate() + daysUntilSunday);

    return Array.from({ length: 35 }).map((_, i) => {
      const d = subDays(endDay, 34 - i);
      const dateStr = format(d, 'yyyy-MM-dd');
      let status = state.stats.activityLog?.[dateStr];

      if (dateStr === format(today, 'yyyy-MM-dd')) {
         const quests = state.dailyQuests || [];
         if (quests.length > 0) {
             const isRest = quests.every(q => q.id === 'rest_day_quest');
             if (isRest) status = 'rest';
             else {
                 const anyComplete = quests.some(q => q.completed);
                 const allComplete = quests.every(q => q.completed);
                 if (allComplete) status = 'full';
                 else if (anyComplete) status = 'partial';
                 else status = undefined;
             }
         }
      }

      if (!status && activityHistory.includes(dateStr)) {
         status = 'full';
      }

      return {
         date: d,
         status: status,
        isFuture: d > today
      };
    });
  })();

  const weekDays = lang === 'ru' ? ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'] : ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">
            {lang === 'ru' ? 'Метрики Тела' : 'Body Metrics'}
          </h2>
          <button 
            onClick={() => document.dispatchEvent(new CustomEvent('open-update-body'))}
            className="text-indigo-400 hover:text-indigo-300 transition-colors bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/30 text-xs font-bold uppercase tracking-widest"
          >
            {lang === 'ru' ? 'Изменить' : 'Update'}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-800/50 border border-white/5 rounded-2xl p-4 flex items-center justify-between">
            <div>
               <div className="text-[10px] text-slate-500 uppercase tracking-widest">{t.weight}</div>
               <div className="text-xl font-black text-slate-200">{state.user.weight} <span className="text-xs text-slate-500 font-normal">kg</span></div>
            </div>
          </div>
          <div className="bg-slate-800/50 border border-white/5 rounded-2xl p-4 flex items-center justify-between">
            <div>
               <div className="text-[10px] text-slate-500 uppercase tracking-widest">{t.height}</div>
               <div className="text-xl font-black text-slate-200">{state.user.height} <span className="text-xs text-slate-500 font-normal">cm</span></div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-4">
          {lang === 'ru' ? 'Тренировки' : 'Workouts'}
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex flex-col items-center justify-center text-center">
            <Dumbbell className="text-slate-400 mb-2" size={24} />
            <div className="text-2xl font-black text-white leading-none">{state.stats.pushupsTotal}</div>
            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{lang === 'ru' ? 'Отжимания' : 'Pushups'}</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex flex-col items-center justify-center text-center">
            <ChevronUp className="text-slate-400 mb-2" size={24} />
            <div className="text-2xl font-black text-white leading-none">{state.stats.pullupsTotal}</div>
            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{lang === 'ru' ? 'Подтягивания' : 'Pullups'}</div>
          </div>
          <div className="col-span-2 grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex flex-col items-center justify-center text-center">
              <Flame className="text-orange-500 mb-2" size={24} />
              <div className="text-2xl font-black text-white leading-none">{state.stats.caloriesBurnedTotal || 0}</div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{lang === 'ru' ? 'Сожжено ккал' : 'Calories'}</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex flex-col items-center justify-center text-center">
              <div className="text-2xl font-black text-white leading-none mb-2">{state.stats.runKmTotal} <span className="text-xs text-slate-500">{lang === 'ru' ? 'км' : 'km'}</span></div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{lang === 'ru' ? 'Дистанция' : 'Distance Run'}</div>
            </div>
          </div>
          <div className="col-span-2 p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-center">
            <div>
              <div className="text-2xl font-black text-white leading-none">{state.stats.workoutsCompleted}</div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{lang === 'ru' ? 'Тренировок выполнено' : 'Workouts Completed'}</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">
            {lang === 'ru' ? 'Активность' : 'Activity Log'}
          </h2>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900 border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[50px] rounded-full pointer-events-none"></div>
          
          <div className="grid grid-cols-7 gap-1.5 mb-2">
            {weekDays.map(wd => (
              <div key={wd} className="text-center text-[9px] font-bold text-slate-500 uppercase">{wd}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1.5 relative z-10">
            {heatmapDays.map((day, i) => {
              let classes = "w-full aspect-square rounded-[4px] transition-all duration-300 ";
              if (day.isFuture) {
                classes += "bg-slate-800/20 border border-white/[0.02]";
              } else if (day.status === 'full') {
                classes += "bg-emerald-500/80 shadow-[0_0_10px_rgba(16,185,129,0.4)] border border-emerald-400 transform hover:scale-110 z-10";
              } else if (day.status === 'partial') {
                classes += "bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.3)] border border-yellow-400 transform hover:scale-110 z-10";
              } else if (day.status === 'missed') {
                classes += "bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.3)] border border-red-400 transform hover:scale-110 z-10";
              } else if (day.status === 'rest') {
                classes += "bg-blue-500/30 border border-blue-400/50 transform hover:scale-110 z-10";
              } else {
                classes += "bg-slate-800/50 border border-white/5 hover:bg-slate-700";
              }
              return (
                <div 
                  key={i} 
                  className={classes}
                  title={format(day.date, 'dd MMM yyyy')}
                />
              )
            })}
          </div>
          
          <div className="mt-4 flex items-center justify-between text-[9px] uppercase font-bold text-slate-500 tracking-widest">
             <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-500/80 border border-emerald-400"></div>
                <span className="text-emerald-500">{lang === 'ru' ? 'Успех' : 'Success'}</span>
             </div>
             <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-[2px] bg-yellow-500/80 border border-yellow-400"></div>
                <span className="text-yellow-500">{lang === 'ru' ? 'Частично' : 'Partial'}</span>
             </div>
             <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-[2px] bg-red-500/80 border border-red-400"></div>
                <span className="text-red-500">{lang === 'ru' ? 'Пропуск' : 'Missed'}</span>
             </div>
             <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-[2px] bg-blue-500/30 border border-blue-400/50"></div>
                <span className="text-blue-400">{lang === 'ru' ? 'Выходной' : 'Rest'}</span>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
