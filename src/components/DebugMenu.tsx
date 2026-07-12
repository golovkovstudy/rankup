import React, { useRef, useState } from 'react';
import { AppState, Rank } from '../types';
import { UI } from '../data';
import { Download, Upload, Trash2, Globe, Bug } from 'lucide-react';

interface DebugMenuProps {
  state: AppState;
  onImport: (state: AppState) => void;
  onReset: () => void;
  onSetLanguage: (lang: 'ru' | 'en') => void;
  onForceRank: (rank: Rank) => void;
  onForcePhase: (phase: 1 | 2 | 3) => void;
  onTestChallenge: () => void;
  onSetDebugDay: (dayIndex?: number) => void;
}

export function DebugMenu({ state, onImport, onReset, onSetLanguage, onForceRank, onForcePhase, onTestChallenge, onSetDebugDay }: DebugMenuProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const lang = state.language;
  const t = UI[lang];

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `rankup_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedState = JSON.parse(e.target?.result as string);
        if (importedState && importedState.progress && importedState.progress.currentRank) {
          onImport(importedState);
          alert(t.import_success);
        } else {
          alert(t.import_error);
        }
      } catch (error) {
        alert(t.import_parse_error);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };



  return (
    <div className="pb-4 flex flex-col gap-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none">DEBUG MENU</h1>
          <p className="text-slate-400 mt-2"><span className="text-emerald-400 font-bold tracking-widest">{t.manage_data}</span></p>
        </div>
      </header>

      <div className="space-y-6">
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
          <p className="text-[10px] text-slate-500 uppercase tracking-tighter mb-4 flex items-center gap-2"><Globe size={14}/> {t.language}</p>
          <div className="flex gap-4">
             <button onClick={() => onSetLanguage('ru')} className={`flex-1 py-4 rounded-xl border uppercase text-xs font-bold tracking-widest transition-all ${lang === 'ru' ? 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10' : 'bg-slate-800 border-white/5 text-slate-500 hover:border-emerald-500/30'}`}>RU</button>
             <button onClick={() => onSetLanguage('en')} className={`flex-1 py-4 rounded-xl border uppercase text-xs font-bold tracking-widest transition-all ${lang === 'en' ? 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10' : 'bg-slate-800 border-white/5 text-slate-500 hover:border-emerald-500/30'}`}>EN</button>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
          <p className="text-[10px] text-slate-500 uppercase tracking-tighter mb-4">{t.data_management}</p>
          
          <div className="space-y-3">
            <button 
              onClick={handleExport}
              className="w-full py-4 bg-slate-800 border border-white/10 rounded-xl flex items-center justify-center gap-2 hover:border-emerald-500/50 hover:text-emerald-400 transition-colors text-xs font-bold uppercase tracking-widest"
            >
              <Download size={18} />
              {t.export_backup}
            </button>

            <button 
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-4 bg-slate-800 border border-white/10 rounded-xl flex items-center justify-center gap-2 hover:border-emerald-500/50 hover:text-emerald-400 transition-colors text-xs font-bold uppercase tracking-widest"
            >
              <Upload size={18} />
              {t.import_backup}
            </button>
            <input 
              type="file" 
              accept=".json" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              onChange={handleImport}
            />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-indigo-500/[0.05] border border-indigo-500/20">
          <p className="text-[10px] text-indigo-500 uppercase tracking-tighter mb-4 flex items-center gap-2">
            <Bug size={16} />
            {t.debug_mode}
          </p>
          
          <div className="space-y-3">
            <div>
              <label className="block text-[10px] text-slate-500 uppercase tracking-tighter mb-2">{t.force_rank}</label>
              <select 
                className="w-full bg-slate-800 border border-white/10 rounded-xl p-4 text-slate-100 font-mono focus:outline-none focus:border-indigo-500/50 transition-colors uppercase text-xs font-bold tracking-widest"
                value={state.progress.currentRank}
                onChange={(e) => onForceRank(e.target.value as any)}
              >
                {['F', 'E', 'D', 'C', 'B', 'A', 'S', 'SSR'].map(rank => (
                  <option key={rank} value={rank}>Rank {rank}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] text-slate-500 uppercase tracking-tighter mb-2">{t.force_phase}</label>
              <select 
                className="w-full bg-slate-800 border border-white/10 rounded-xl p-4 text-slate-100 font-mono focus:outline-none focus:border-indigo-500/50 transition-colors uppercase text-xs font-bold tracking-widest"
                onChange={(e) => onForcePhase(parseInt(e.target.value) as 1 | 2 | 3)}
                defaultValue=""
              >
                <option value="" disabled>Select Phase</option>
                <option value="1">Phase I</option>
                <option value="2">Phase II</option>
                <option value="3">Phase III</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] text-slate-500 uppercase tracking-tighter mb-2">{t.simulate_day}</label>
              <select 
                className="w-full bg-slate-800 border border-white/10 rounded-xl p-4 text-slate-100 font-mono focus:outline-none focus:border-indigo-500/50 transition-colors uppercase text-xs font-bold tracking-widest"
                value={state.debugDayOverride !== undefined ? state.debugDayOverride.toString() : 'none'}
                onChange={(e) => onSetDebugDay(e.target.value === 'none' ? undefined : parseInt(e.target.value, 10))}
              >
                <option value="none">Current Day (Realtime)</option>
                {t.week_days.map((dayName: string, index: number) => (
                  <option key={index} value={index}>{dayName}</option>
                ))}
              </select>
            </div>

            <button 
              onClick={onTestChallenge}
              className="w-full py-4 bg-indigo-600 border border-indigo-500 text-white rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-500 transition-colors text-xs font-bold uppercase tracking-widest"
            >
              {t.test_level_up}
            </button>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-red-500/[0.05] border border-red-500/20">
          <p className="text-[10px] text-red-500 uppercase tracking-tighter mb-4 flex items-center gap-2">
            <Trash2 size={16} />
            {t.danger_zone}
          </p>
          {!showConfirm ? (
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
          )}
        </div>
      </div>
    </div>
  );
}
