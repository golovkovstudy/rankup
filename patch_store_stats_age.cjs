const fs = require('fs');
let fileStr = fs.readFileSync('src/store.ts', 'utf8');

const regex1 = /newStats\.pushupsTotal \+= 40;/g;
fileStr = fileStr.replace(regex1, "newStats.pushupsTotal += Math.max(1, Math.round(40 * ageScale));");

const regex2 = /newStats\.pullupsTotal \+= 15;/g;
fileStr = fileStr.replace(regex2, "newStats.pullupsTotal += Math.max(1, Math.round(15 * ageScale));");

const regex3 = /newStats\.runKmTotal \+= 5;/g;
fileStr = fileStr.replace(regex3, "newStats.runKmTotal += Math.max(0.1, 5 * ageScale);");

const regex4 = /newStats\.pullupsTotal \+= 10;/g;
fileStr = fileStr.replace(regex4, "newStats.pullupsTotal += Math.max(1, Math.round(10 * ageScale));");

const regex5 = /newStats\.pushupsTotal \+= 20;/g;
fileStr = fileStr.replace(regex5, "newStats.pushupsTotal += Math.max(1, Math.round(20 * ageScale));");

// Subtracts
const regexS1 = /newStats\.pushupsTotal = Math\.max\(0, newStats\.pushupsTotal - 40\);/g;
fileStr = fileStr.replace(regexS1, "newStats.pushupsTotal = Math.max(0, newStats.pushupsTotal - Math.max(1, Math.round(40 * ageScale2)));");

const regexS2 = /newStats\.pullupsTotal = Math\.max\(0, newStats\.pullupsTotal - 15\);/g;
fileStr = fileStr.replace(regexS2, "newStats.pullupsTotal = Math.max(0, newStats.pullupsTotal - Math.max(1, Math.round(15 * ageScale2)));");

const regexS3 = /newStats\.runKmTotal = Math\.max\(0, newStats\.runKmTotal - 5\);/g;
fileStr = fileStr.replace(regexS3, "newStats.runKmTotal = Math.max(0, newStats.runKmTotal - Math.max(0.1, 5 * ageScale2));");

const regexS4 = /newStats\.pullupsTotal = Math\.max\(0, newStats\.pullupsTotal - 10\);/g;
fileStr = fileStr.replace(regexS4, "newStats.pullupsTotal = Math.max(0, newStats.pullupsTotal - Math.max(1, Math.round(10 * ageScale2)));");

const regexS5 = /newStats\.pushupsTotal = Math\.max\(0, newStats\.pushupsTotal - 20\);/g;
fileStr = fileStr.replace(regexS5, "newStats.pushupsTotal = Math.max(0, newStats.pushupsTotal - Math.max(1, Math.round(20 * ageScale2)));");

fs.writeFileSync('src/store.ts', fileStr);
