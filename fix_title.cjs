const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

const oldHeader = `<div className="text-center">
             <h2 className="text-xl font-bold tracking-tight uppercase text-emerald-400">`;

const newHeader = `<div className="text-center">
             {state.user?.selectedTitle && (
               <motion.div 
                 initial={{ scale: 0.9, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 className="inline-block px-3 py-1 mb-2 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/40 text-yellow-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-[0_0_15px_rgba(234,179,8,0.2)]"
               >
                 🏆 {state.user.selectedTitle}
               </motion.div>
             )}
             <h2 className="text-xl font-bold tracking-tight uppercase text-emerald-400">`;

fileStr = fileStr.replace(oldHeader, newHeader);
fs.writeFileSync('src/components/Dashboard.tsx', fileStr);
