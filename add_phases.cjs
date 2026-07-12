const fs = require('fs');

let data = fs.readFileSync('src/data.ts', 'utf8');

function incrementReps(descStr, amount) {
    return descStr.replace(/(\d+)х(\d+)/, (match, sets, reps) => {
        return `${sets}х${parseInt(reps) + amount}`;
    }).replace(/(\d+) sets of (\d+)/, (match, sets, reps) => {
        return `${sets} sets of ${parseInt(reps) + amount}`;
    }).replace(/(\d+)х(\d+) сек/, (match, sets, reps) => {
        return `${sets}х${parseInt(reps) + amount * 5} сек`;
    }).replace(/(\d+) sets of (\d+) sec/, (match, sets, reps) => {
        return `${sets} sets of ${parseInt(reps) + amount * 5} sec`;
    });
}

data = data.replace(/desc: \{ en: '([^']+)', ru: '([^']+)' \} \}/g, (match, en, ru) => {
    // Check if it has sets/reps or seconds
    if ((en.includes('sets of') || en.includes('sec')) && (ru.includes('х') || ru.includes('сек'))) {
        const en2 = incrementReps(en, 2);
        const ru2 = incrementReps(ru, 2);
        const en3 = incrementReps(en, 5);
        const ru3 = incrementReps(ru, 5);
        
        if (en !== en2 && ru !== ru2) {
             return `desc: { en: '${en}', ru: '${ru}' }, desc_phase2: { en: '${en2}', ru: '${ru2}' }, desc_phase3: { en: '${en3}', ru: '${ru3}' } }`;
        }
    }
    return match;
});

fs.writeFileSync('src/data.ts', data);
