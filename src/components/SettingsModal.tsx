import React, { useRef, useState } from 'react';
import { AppState } from '../types';
import { UI } from '../data';
import { X, Download, Upload, Trash2, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: AppState;
  onSetLanguage: (lang: 'en' | 'ru') => void;
  onImport: (state: AppState) => void;
  onReset: () => void;
  onSetRestDay: (day: number) => void;
  onUpdateInventory: (inventory: string[]) => void;
}

export function SettingsModal({ isOpen, onClose, state, onSetLanguage, onImport, onReset, onSetRestDay, onUpdateInventory, onStartCalibration }: SettingsModalProps & { onStartCalibration?: () => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const lang = state.language;
  const t = UI[lang];

  if (!isOpen) return null;

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
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        ></motion.div>
        
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-slate-900 border border-white/10 p-6 rounded-2xl max-w-sm w-full relative z-10 max-h-[80vh] overflow-y-auto scrollbar-hide"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
            <X size={24} />
          </button>
          
          <h2 className="text-xl font-bold uppercase tracking-tight text-white mb-6 flex items-center gap-2">            {lang === 'ru' ? 'Профиль' : 'Profile'}          </h2>

          <div className="space-y-6">
            {/* Language */}
            <div>
              <label className="block text-[10px] text-slate-500 uppercase tracking-tighter mb-2">{t.language}</label>
              <select 
                className="w-full bg-slate-800 border border-white/10 rounded-xl p-4 text-slate-100 font-mono focus:outline-none focus:border-emerald-500/50 transition-colors uppercase text-xs font-bold tracking-widest"
                value={state.language}
                onChange={(e) => onSetLanguage(e.target.value as 'en' | 'ru')}
              >
                <option value="ru">Русский</option>
                <option value="en">English</option>
              </select>
            </div>

            {/* Training Days */}
            <div>
              <label className="block text-[10px] text-slate-500 uppercase tracking-tighter mb-2">
                {lang === 'ru' ? 'Тренировочные дни' : 'Training Days'}
              </label>
              {state.user?.trainingDays?.length === 7 && (
                <p className="text-[10px] text-red-400 font-bold mb-2 leading-tight bg-red-500/10 p-2 rounded-lg border border-red-500/30">
                  {lang === 'ru' ? '⚠️ 7 дней в неделю могут привести к перетренированности.' : '⚠️ 7 days a week can lead to overtraining.'}
                </p>
              )}
              <div className="grid grid-cols-7 gap-1">
                {[1, 2, 3, 4, 5, 6, 0].map((index: number) => {
                  const dayName = t.week_days[index];
                  let tDays = state.user?.trainingDays;
                  if (!tDays) {
                    tDays = [];
                    for(let i=1; i<=6; i++) tDays.push(((state.user?.restDay || 0) + i) % 7);
                  }
                  const isSelected = tDays.includes(index);
                  
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        let newDays = [...tDays];
                        if (isSelected) {
                          if (newDays.length > 1) newDays = newDays.filter(d => d !== index);
                        } else {
                          newDays.push(index);
                          newDays.sort();
                        }
                        // We need a store function to set training days!
                        // For now, if we reuse onSetRestDay, we can't easily. We need a new prop or modify onSetRestDay.
                        // Actually let's just dispatch an event to the store.
                        window.dispatchEvent(new CustomEvent('updateTrainingDays', { detail: newDays }));
                      }}
                      className={`p-2 rounded-lg text-xs font-bold transition-colors ${isSelected ? 'bg-emerald-600 border border-emerald-500 text-white' : 'bg-slate-800 border border-transparent text-slate-500 hover:bg-slate-700'}`}
                    >
                      {dayName.slice(0, 2)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Inventory */}
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
                      className={`p-3 rounded-xl border text-center cursor-pointer transition-all text-[10px] font-bold uppercase tracking-widest ${isSelected ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-slate-800 border-white/5 text-slate-500 hover:border-emerald-500/30'}`}
                    >
                      {item.label}
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Data Management */}
            <div>
              <h3 className="text-[10px] text-slate-500 uppercase tracking-tighter mb-3 border-b border-white/5 pb-2">{t.data_management}</h3>
              <div className="space-y-3">
                <button 
                  onClick={handleExport}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold p-4 rounded-xl flex items-center justify-center gap-2 transition-colors uppercase text-xs tracking-widest"
                >
                  <Download size={16} />
                  {t.export_backup}
                </button>
                
                <input 
                  type="file" 
                  accept=".json" 
                  ref={fileInputRef} 
                  onChange={handleImport} 
                  className="hidden" 
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold p-4 rounded-xl flex items-center justify-center gap-2 transition-colors uppercase text-xs tracking-widest"
                >
                  <Upload size={16} />
                  {t.import_backup}
                </button>
              </div>
            </div>

                        {/* Calibration */}
            <div>
              <h3 className="text-[10px] text-emerald-500 uppercase tracking-tighter mb-3 border-b border-white/5 pb-2">{lang === 'ru' ? 'Калибровка' : 'Calibration'}</h3>
              <button 
                onClick={() => {
                  if (onStartCalibration) {
                    onClose();
                    onStartCalibration();
                  }
                }}
                className="w-full bg-emerald-950/30 hover:bg-emerald-900/50 text-emerald-400 font-bold p-4 rounded-xl flex items-center justify-center gap-2 transition-colors uppercase text-xs tracking-widest border border-emerald-900/50"
              >
                <Target size={16} />
                {lang === 'ru' ? 'Пересдать тест' : 'Retake Test'}
              </button>
            </div>
            
            {/* Danger Zone */}
            <div className="pt-4 mt-4 border-t border-red-900/30">
              <h3 className="text-[10px] text-red-500 uppercase tracking-tighter mb-3">{t.danger_zone}</h3>
              {!showConfirm ? (
                <button 
                  onClick={() => setShowConfirm(true)}
                  className="w-full bg-red-950/30 hover:bg-red-900/50 border border-red-900/50 text-red-400 font-bold p-4 rounded-xl flex items-center justify-center gap-2 transition-colors uppercase text-xs tracking-widest"
                >
                  <Trash2 size={16} />
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
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
