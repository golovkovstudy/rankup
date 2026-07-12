import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppState, Rank } from '../types';
import { UI } from '../data';
import { X, Play, Target, Plus, Minus } from 'lucide-react';
import { format } from 'date-fns';

interface CalibrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: AppState;
  onComplete: (rank: Rank) => void;
}

export function CalibrationModal({ isOpen, onClose, state, onComplete }: CalibrationModalProps) {
  const lang = state.language;
  const t = UI[lang];
  const [step, setStep] = useState(0);
  const [pushups, setPushups] = useState('');
  const [pullups, setPullups] = useState('');
  const [squats, setSquats] = useState('');

  if (!isOpen) return null;

  const NumberInput = ({ label, value, onChange, placeholder }: any) => (
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
  );

  const handleFinish = () => {
    let score = 0;
    const pu = parseInt(pushups) || 0;
    const pl = parseInt(pullups) || 0;
    const sq = parseInt(squats) || 0;
    
    score += pu * 1;
    score += pl * 3;
    score += sq * 0.5;

    let assignedRank: Rank = 'F';
    if (score >= 100) assignedRank = 'D';
    else if (score >= 50) assignedRank = 'E';
    
    onComplete(assignedRank);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
        ></motion.div>
        
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-slate-900 border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.15)] p-6 rounded-3xl max-w-sm w-full relative z-10"
        >
          {step === 0 && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/50 mb-4 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <Target className="text-emerald-400" size={32} />
              </div>
              <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">
                {lang === 'ru' ? 'Калибровочный тест' : 'Calibration Test'}
              </h2>
              <p className="text-sm text-slate-400">
                {lang === 'ru' 
                  ? 'Определи свой реальный уровень подготовки, чтобы пропустить начальные ранги.' 
                  : 'Determine your real fitness level to skip initial ranks.'}
              </p>
              <button 
                onClick={() => setStep(1)}
                className="w-full mt-6 bg-emerald-600 hover:bg-emerald-500 text-white font-black italic uppercase tracking-widest p-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)]"
              >
                {lang === 'ru' ? 'Начать тест' : 'Start Test'} <Play size={18} />
              </button>
              <button 
                onClick={onClose}
                className="w-full mt-2 text-xs text-slate-500 uppercase font-bold tracking-widest py-2 hover:text-slate-300 transition-colors"
              >
                {lang === 'ru' ? 'Пропустить (Ранг F)' : 'Skip (Rank F)'}
              </button>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-black italic uppercase tracking-tighter text-white text-center">
                {lang === 'ru' ? 'Введи свои максимумы' : 'Enter your maximums'}
              </h2>
              <p className="text-xs text-center text-emerald-400 font-bold uppercase tracking-widest mb-4">
                {lang === 'ru' ? 'За 1 подход' : 'In 1 set'}
              </p>
              
              <NumberInput 
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
              />

              <button 
                onClick={handleFinish}
                className="w-full mt-6 bg-emerald-600 hover:bg-emerald-500 text-white font-black italic uppercase tracking-widest p-4 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)]"
              >
                {lang === 'ru' ? 'Завершить калибровку' : 'Complete Calibration'}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
