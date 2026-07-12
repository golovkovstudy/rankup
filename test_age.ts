import { getAgeScale, scaleStringNumbers } from './src/utils/age.js';

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
