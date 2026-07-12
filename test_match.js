const desc1 = "4 sets of 15";
const desc2 = "4х15";
const desc3 = "10km run";
const match1 = desc1.match(/(\d+)\s*(?:x|х|sets?\s*of)/i);
const match2 = desc2.match(/(\d+)\s*(?:x|х|sets?\s*of)/i);
const match3 = desc3.match(/(\d+)\s*(?:x|х|sets?\s*of)/i);
console.log(match1 ? match1[1] : null);
console.log(match2 ? match2[1] : null);
console.log(match3 ? match3[1] : null);
