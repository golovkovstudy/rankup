const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

const targetStr = `                <button 
                  className="info-btn p-2 rounded-lg text-slate-500 hover:text-indigo-400 hover:bg-indigo-500/10 transition-colors"
                  onClick={() => setInfoQuest(quest)}
                >`;

const replaceStr = `                <button 
                  className="info-btn p-2 rounded-lg text-slate-500 hover:text-indigo-400 hover:bg-indigo-500/10 transition-colors"
                  onClick={() => setInfoQuest({ ...quest, title: qData.title, desc: qData.desc })}
                >`;

fileStr = fileStr.split(targetStr).join(replaceStr);
fs.writeFileSync('src/components/Dashboard.tsx', fileStr);
