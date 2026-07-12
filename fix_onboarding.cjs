const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Onboarding.tsx', 'utf8');

const oldHandleNext = `  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete(formData as UserProfile);
    }
  };`;

const newHandleNext = `  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete(formData as UserProfile);
    }
  };`;

fileStr = fileStr.replace(oldHandleNext, newHandleNext);

const step2Block = `        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 relative z-10">
            <label className="block text-[10px] text-slate-500 uppercase tracking-tighter mb-2">{t.current_level}</label>
            <div className="space-y-3">
              {[
                { id: 'beginner', label: t.level_novice, desc: t.level_novice_desc },
                { id: 'experienced', label: t.level_experienced, desc: t.level_experienced_desc },
                { id: 'veteran', label: t.level_veteran, desc: t.level_veteran_desc }
              ].map((lvl) => (
                <div 
                  key={lvl.id}
                  onClick={() => setFormData({ ...formData, experience: lvl.id as any })}
                  className={\`p-5 rounded-2xl border cursor-pointer transition-all \${formData.experience === lvl.id ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-800 border-white/5 hover:border-emerald-500/30'}\`}
                >
                  <div className={\`font-bold uppercase tracking-widest text-sm \${formData.experience === lvl.id ? 'text-emerald-400' : 'text-slate-100'}\`}>{lvl.label}</div>
                  <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-mono">{lvl.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}`;

fileStr = fileStr.replace(step2Block, "");

const oldStep3Block = `        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 relative z-10">
            <label className="block text-[10px] text-slate-500 uppercase tracking-tighter mb-2">{t.inventory}</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'treadmill', label: t.treadmill },
                { id: 'pullup_bar', label: t.pullup_bar },
                { id: 'dumbbells', label: t.dumbbells },
                { id: 'rings', label: t.rings }
              ].map((item) => {`;

const newStep2Block = `        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 relative z-10">
            <label className="block text-[10px] text-slate-500 uppercase tracking-tighter mb-2">{t.inventory}</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'treadmill', label: t.treadmill },
                { id: 'pullup_bar', label: t.pullup_bar },
                { id: 'dip_station', label: t.dip_station },
                { id: 'dumbbells', label: t.dumbbells },
                { id: 'rings', label: t.rings },
                { id: 'resistance_bands', label: t.resistance_bands },
                { id: 'jump_rope', label: t.jump_rope },
                { id: 'weight_vest', label: t.weight_vest },
                { id: 'ab_roller', label: t.ab_roller },
                { id: 'yoga_mat', label: t.yoga_mat }
              ].map((item) => {`;

fileStr = fileStr.replace(oldStep3Block, newStep2Block);

fileStr = fileStr.replace(`{step === 4 && (`, `{step === 3 && (`);
fileStr = fileStr.replace(`key="step4"`, `key="step3"`);

const oldButtonDisabled = `disabled={(step === 1 && (!formData.age || !formData.height || !formData.weight)) || (step === 4 && (!formData.trainingDays || formData.trainingDays.length === 0))}`;
const newButtonDisabled = `disabled={(step === 1 && (!formData.age || !formData.height || !formData.weight)) || (step === 3 && (!formData.trainingDays || formData.trainingDays.length === 0))}`;

fileStr = fileStr.replace(oldButtonDisabled, newButtonDisabled);

fileStr = fileStr.replace(`{step === 4 ? t.initialize : t.proceed}`, `{step === 3 ? t.initialize : t.proceed}`);

const oldDots = `           {[1, 2, 3, 4].map(i => (
             <div key={i} className={\`w-2 h-1 rounded-full transition-all \${step >= i ? 'bg-emerald-400 w-4' : 'bg-white/10'}\`} />
           ))}`;
const newDots = `           {[1, 2, 3].map(i => (
             <div key={i} className={\`w-2 h-1 rounded-full transition-all \${step >= i ? 'bg-emerald-400 w-4' : 'bg-white/10'}\`} />
           ))}`;

fileStr = fileStr.replace(oldDots, newDots);

fileStr = fileStr.replace("experience: 'beginner',\n", "");

fs.writeFileSync('src/components/Onboarding.tsx', fileStr);
