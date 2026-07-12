import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Activity } from 'lucide-react';
import { AppState } from '../types';
import { UI } from '../data';

interface UpdateBodyModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: AppState;
  onUpdate: (weight: number, height: number, age: number) => void;
}

export function UpdateBodyModal({ isOpen, onClose, state, onUpdate }: UpdateBodyModalProps) {
  const t = UI[state.language];
  const [formData, setFormData] = useState({
    weight: state.user?.weight || 75,
    height: state.user?.height || 180,
    age: state.user?.age || 25
  });

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[#0A0A0F] border border-white/10 p-6 rounded-3xl w-full max-w-sm relative"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Activity size={20} />
            </div>
            <h2 className="text-xl font-black italic uppercase tracking-wider text-slate-100">
              {state.language === 'ru' ? 'Метрики Тела' : 'Body Metrics'}
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] text-slate-500 uppercase tracking-tighter mb-2">{t.weight}</label>
              <input 
                type="number" 
                value={formData.weight || ''}
                className="w-full bg-slate-900/50 border border-white/5 rounded-2xl p-4 text-center text-2xl text-white font-black focus:outline-none focus:border-indigo-500/50 focus:bg-indigo-500/5 transition-all shadow-inner placeholder:text-slate-700"
                onChange={(e) => setFormData({ ...formData, weight: parseInt(e.target.value) || 0 })}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-[10px] text-slate-500 uppercase tracking-tighter mb-2">{t.height}</label>
                  <input 
                    type="number" 
                    value={formData.height || ''}
                    className="w-full bg-slate-900/50 border border-white/5 rounded-2xl p-4 text-center text-2xl text-white font-black focus:outline-none focus:border-indigo-500/50 focus:bg-indigo-500/5 transition-all shadow-inner placeholder:text-slate-700"
                    onChange={(e) => setFormData({ ...formData, height: parseInt(e.target.value) || 0 })}
                  />
               </div>
               <div>
                  <label className="block text-[10px] text-slate-500 uppercase tracking-tighter mb-2">{t.age}</label>
                  <input 
                    type="number" 
                    value={formData.age || ''}
                    className="w-full bg-slate-900/50 border border-white/5 rounded-2xl p-4 text-center text-2xl text-white font-black focus:outline-none focus:border-indigo-500/50 focus:bg-indigo-500/5 transition-all shadow-inner placeholder:text-slate-700"
                    onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                  />
               </div>
            </div>
          </div>

          <button 
            onClick={() => {
              onUpdate(formData.weight, formData.height, formData.age);
              onClose();
            }}
            disabled={!formData.weight || !formData.height || !formData.age}
            className="w-full mt-8 py-4 bg-indigo-600 text-white font-bold uppercase tracking-widest rounded-full hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all disabled:opacity-50"
          >
            {state.language === 'ru' ? 'Обновить' : 'Update'}
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
