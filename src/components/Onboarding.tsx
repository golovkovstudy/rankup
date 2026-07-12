import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Dumbbell, ArrowRight } from 'lucide-react';
import { UserProfile, AppState } from '../types';
import { UI } from '../data';

interface OnboardingProps {
  onComplete: (user: UserProfile) => void;
  state: AppState;
  onSetLanguage: (lang: 'ru' | 'en') => void;
}

export function Onboarding({ onComplete, state, onSetLanguage }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    gender: 'male',
        inventory: []
  });

  const lang = state.language;
  const t = UI[lang];

  const handleNext = () => {
    if (step < 2) { setStep(step + 1); } else { onComplete(formData as UserProfile); }
  };

  const toggleInventory = (item: string) => {
    const current = formData.inventory || [];
    if (current.includes(item)) {
      setFormData({ ...formData, inventory: current.filter(i => i !== item) });
    } else {
      setFormData({ ...formData, inventory: [...current, item] });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#050507] text-slate-100 selection:bg-emerald-500/30">
      
      <div className="absolute top-4 right-4 z-50 flex gap-2">
         <button onClick={() => onSetLanguage('ru')} className={`px-2 py-1 text-xs font-bold rounded ${lang === 'ru' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' : 'text-slate-500'}`}>RU</button>
         <button onClick={() => onSetLanguage('en')} className={`px-2 py-1 text-xs font-bold rounded ${lang === 'en' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' : 'text-slate-500'}`}>EN</button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/[0.03] p-8 rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none"></div>

        <div className="flex justify-center mb-6 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
             <Dumbbell size={32} />
          </div>
        </div>
        
        <div className="text-center relative z-10">
          <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none mb-2">RankUp</h1>
          <p className="text-slate-400 mb-8 text-sm">{t.establish_baseline} <span className="text-emerald-400 font-bold tracking-widest uppercase">{t.baseline}</span></p>
        </div>

        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 relative z-10">
            <div>
              <label className="block text-[10px] text-slate-500 uppercase tracking-tighter mb-2">{t.gender}</label>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: 'male', label: t.male },
                  { id: 'female', label: t.female }
                ].map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setFormData({ ...formData, gender: g.id as any })}
                    className={`py-3 rounded-xl border uppercase text-xs font-bold tracking-widest transition-all ${formData.gender === g.id ? 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10' : 'bg-slate-800 border-white/5 text-slate-500 hover:border-emerald-500/30'}`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-[10px] text-slate-500 uppercase tracking-tighter mb-2">{t.age}</label>
                  <input 
                    type="number" 
                    placeholder="25"
                    className="w-full bg-slate-900/50 border border-white/5 rounded-2xl p-4 text-center text-2xl text-white font-black focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all shadow-inner placeholder:text-slate-700"
                    onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                  />
               </div>
               <div>
                  <label className="block text-[10px] text-slate-500 uppercase tracking-tighter mb-2">{t.height}</label>
                  <input 
                    type="number" 
                    placeholder="180"
                    className="w-full bg-slate-900/50 border border-white/5 rounded-2xl p-4 text-center text-2xl text-white font-black focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all shadow-inner placeholder:text-slate-700"
                    onChange={(e) => setFormData({ ...formData, height: parseInt(e.target.value) || 0 })}
                  />
               </div>
            </div>
            <div>
               <label className="block text-[10px] text-slate-500 uppercase tracking-tighter mb-2">{t.weight}</label>
               <input 
                 type="number" 
                 placeholder="75"
                 className="w-full bg-slate-800 border border-white/5 rounded-xl p-4 text-slate-100 font-mono focus:outline-none focus:border-emerald-500/50 transition-colors"
                 onChange={(e) => setFormData({ ...formData, weight: parseInt(e.target.value) || 0 })}
               />
            </div>
          </motion.div>
        )}



        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 relative z-10">
            <label className="block text-[10px] text-slate-500 uppercase tracking-tighter mb-2">{t.inventory}</label>
            <div className="grid grid-cols-2 gap-3">
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
                const isSelected = formData.inventory?.includes(item.id);
                return (
                  <div 
                    key={item.id}
                    onClick={() => toggleInventory(item.id)}
                    className={`p-4 rounded-xl border text-center cursor-pointer transition-all text-xs font-bold uppercase tracking-widest ${isSelected ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-slate-800 border-white/5 text-slate-500 hover:border-emerald-500/30'}`}
                  >
                    {item.label}
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}

        <button 
          onClick={handleNext}
          disabled={(step === 1 && (!formData.age || !formData.height || !formData.weight))}
          className="w-full mt-8 py-4 bg-emerald-600 text-white font-bold uppercase tracking-widest rounded-full flex items-center justify-center gap-2 hover:bg-emerald-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed relative z-10"
        >
          {step === 2 ? t.initialize : t.proceed}
          <ArrowRight size={20} />
        </button>
        
        <div className="flex justify-center gap-2 mt-8 relative z-10">
           {[1, 2].map(i => (
             <div key={i} className={`w-2 h-1 rounded-full transition-all ${step >= i ? 'bg-emerald-400 w-4' : 'bg-white/10'}`} />
           ))}
        </div>
      </motion.div>
    </div>
  );
}
