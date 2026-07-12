const fs = require('fs');
let fileStr = fs.readFileSync('src/data.ts', 'utf8');

const a_corrupted1 = `      { id: 'a_pistols', scheduleDays: [2, 4, 6], title: { en: 'Strict Pistols', ru: 'Строгие пистолетики' },
      { id: 'a_nordic_curls', scheduleDays: [2, 4, 6], title: { en: 'Nordic Curls', ru: 'Нордические сгибания' }, desc: { en: '3 sets of 5', ru: '3х5' }, desc_phase2: { en: '3 sets of 6', ru: '3х6' }, desc_phase3: { en: '3 sets of 8', ru: '3х8' } }, desc: { en: '4 sets of 10 / leg', ru: '4х10 на ногу' }, desc_phase2: { en: '4 sets of 12 / leg', ru: '4х12 на ногу' }, desc_phase3: { en: '4 sets of 15 / leg', ru: '4х15 на ногу' } }`;

const a_fixed1 = `      { id: 'a_pistols', scheduleDays: [2, 4, 6], title: { en: 'Strict Pistols', ru: 'Строгие пистолетики' }, desc: { en: '4 sets of 10 / leg', ru: '4х10 на ногу' }, desc_phase2: { en: '4 sets of 12 / leg', ru: '4х12 на ногу' }, desc_phase3: { en: '4 sets of 15 / leg', ru: '4х15 на ногу' } },
      { id: 'a_nordic_curls', scheduleDays: [2, 4, 6], title: { en: 'Nordic Curls', ru: 'Нордические сгибания' }, desc: { en: '3 sets of 5', ru: '3х5' }, desc_phase2: { en: '3 sets of 6', ru: '3х6' }, desc_phase3: { en: '3 sets of 8', ru: '3х8' } }`;

fileStr = fileStr.replace(a_corrupted1, a_fixed1);

const a_corrupted2 = `      { id: 'a_pistols_f', scheduleDays: [2, 4, 6], title: { en: 'Assisted Pistols', ru: 'Пистолетики с опорой' },
      { id: 'a_nordic_curls_f', scheduleDays: [2, 4, 6], title: { en: 'Nordic Curls', ru: 'Нордические сгибания' }, desc: { en: '3 sets of 5', ru: '3х5' }, desc_phase2: { en: '3 sets of 6', ru: '3х6' }, desc_phase3: { en: '3 sets of 8', ru: '3х8' } }, desc: { en: '4 sets of 12 / leg', ru: '4х12 на ногу' }, desc_phase2: { en: '4 sets of 14 / leg', ru: '4х14 на ногу' }, desc_phase3: { en: '4 sets of 17 / leg', ru: '4х17 на ногу' } }`;

const a_fixed2 = `      { id: 'a_pistols_f', scheduleDays: [2, 4, 6], title: { en: 'Assisted Pistols', ru: 'Пистолетики с опорой' }, desc: { en: '4 sets of 12 / leg', ru: '4х12 на ногу' }, desc_phase2: { en: '4 sets of 14 / leg', ru: '4х14 на ногу' }, desc_phase3: { en: '4 sets of 17 / leg', ru: '4х17 на ногу' } },
      { id: 'a_nordic_curls_f', scheduleDays: [2, 4, 6], title: { en: 'Nordic Curls', ru: 'Нордические сгибания' }, desc: { en: '3 sets of 5', ru: '3х5' }, desc_phase2: { en: '3 sets of 6', ru: '3х6' }, desc_phase3: { en: '3 sets of 8', ru: '3х8' } }`;

fileStr = fileStr.replace(a_corrupted2, a_fixed2);

fs.writeFileSync('src/data.ts', fileStr);
