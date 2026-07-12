const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Onboarding.tsx', 'utf8');

const oldAge = `<input 
                    type="number" 
                    placeholder="25"
                    className="w-full bg-slate-800 border border-white/5 rounded-xl p-4 text-slate-100 font-mono focus:outline-none focus:border-emerald-500/50 transition-colors"
                    onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                  />`;
                  
const newAge = `<input 
                    type="number" 
                    placeholder="25"
                    className="w-full bg-slate-900/50 border border-white/5 rounded-2xl p-4 text-center text-2xl text-white font-black focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all shadow-inner placeholder:text-slate-700"
                    onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                  />`;

const oldHeight = `<input 
                    type="number" 
                    placeholder="180"
                    className="w-full bg-slate-800 border border-white/5 rounded-xl p-4 text-slate-100 font-mono focus:outline-none focus:border-emerald-500/50 transition-colors"
                    onChange={(e) => setFormData({ ...formData, height: parseInt(e.target.value) || 0 })}
                  />`;

const newHeight = `<input 
                    type="number" 
                    placeholder="180"
                    className="w-full bg-slate-900/50 border border-white/5 rounded-2xl p-4 text-center text-2xl text-white font-black focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all shadow-inner placeholder:text-slate-700"
                    onChange={(e) => setFormData({ ...formData, height: parseInt(e.target.value) || 0 })}
                  />`;

const oldWeight = `<input 
                  type="number" 
                  placeholder="75"
                 className="w-full bg-slate-800 border border-white/5 rounded-xl p-4 text-slate-100 font-mono focus:outline-none focus:border-emerald-500/50 transition-colors"
                 onChange={(e) => setFormData({ ...formData, weight: parseInt(e.target.value) || 0 })}
               />`;

const newWeight = `<input 
                  type="number" 
                  placeholder="75"
                 className="w-full bg-slate-900/50 border border-white/5 rounded-2xl p-4 text-center text-2xl text-white font-black focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all shadow-inner placeholder:text-slate-700"
                 onChange={(e) => setFormData({ ...formData, weight: parseInt(e.target.value) || 0 })}
               />`;

fileStr = fileStr.replace(oldAge, newAge);
fileStr = fileStr.replace(oldHeight, newHeight);
fileStr = fileStr.replace(oldWeight, newWeight);

fs.writeFileSync('src/components/Onboarding.tsx', fileStr);
