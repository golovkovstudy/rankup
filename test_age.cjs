const fs = require('fs');
const content = fs.readFileSync('src/utils/age.ts', 'utf8');
const ts = require('typescript');
const js = ts.transpile(content);
eval(js);

const scale = getAgeScale(50);
console.log("Scale for 50:", scale);
console.log(scaleStringNumbers("3 sets of 15", scale));
console.log(scaleStringNumbers("3х15", scale));
console.log(scaleStringNumbers("100 reps", scale));
console.log(scaleStringNumbers("100 повторений", scale));
console.log(scaleStringNumbers("1 mile run", scale));
console.log(scaleStringNumbers("10 km run", scale));
console.log(scaleStringNumbers("3х60 сек", scale));
console.log(scaleStringNumbers("10 минут в сумме", scale));
