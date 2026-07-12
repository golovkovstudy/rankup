const fs = require('fs');
let fileStr = fs.readFileSync('src/data.ts', 'utf8');

// The corrupted block for B
const b_corrupted = `      { id: 'b_box_jumps', scheduleDays: [2, 4, 6], title: { en: 'Explosive Jumps', ru: 'Взрывные запрыгивания' },
      { id: 'b_windshield_wipers', scheduleDays: [1, 3, 5], title: { en: 'Windshield Wipers', ru: '"Дворники"' }, desc: { en: '3 sets of 10', ru: '3х10' }, desc_phase2: { en: '3 sets of 12', ru: '3х12' }, desc_phase3: { en: '3 sets of 15', ru: '3х15' } }, desc: { en: '4 sets of 15', ru: '4х15' }, desc_phase2: { en: '4 sets of 17', ru: '4х17' }, desc_phase3: { en: '4 sets of 20', ru: '4х20' } },
      { id: 'b_windshield_wipers', scheduleDays: [1, 3, 5], title: { en: 'Windshield Wipers', ru: '"Дворники"' }, desc: { en: '3 sets of 10', ru: '3х10' }, desc_phase2: { en: '3 sets of 12', ru: '3х12' }, desc_phase3: { en: '3 sets of 15', ru: '3х15' } },
      { id: 'b_assisted_pistols', scheduleDays: [2, 4, 6], title: { en: 'Assisted Pistols', ru: 'Пистолетики с опорой' },
      { id: 'b_windshield_wipers_f', scheduleDays: [1, 3, 5], title: { en: 'Windshield Wipers', ru: '"Дворники"' }, desc: { en: '3 sets of 8', ru: '3х8' }, desc_phase2: { en: '3 sets of 10', ru: '3х10' }, desc_phase3: { en: '3 sets of 12', ru: '3х12' } }, desc: { en: '4 sets of 8 / leg', ru: '4х8 на ногу' }, desc_phase2: { en: '4 sets of 10 / leg', ru: '4х10 на ногу' }, desc_phase3: { en: '4 sets of 13 / leg', ru: '4х13 на ногу' } },
      { id: 'b_windshield_wipers_f', scheduleDays: [1, 3, 5], title: { en: 'Windshield Wipers', ru: '"Дворники"' }, desc: { en: '3 sets of 8', ru: '3х8' }, desc_phase2: { en: '3 sets of 10', ru: '3х10' }, desc_phase3: { en: '3 sets of 12', ru: '3х12' } },`;

const b_fixed = `      { id: 'b_box_jumps', scheduleDays: [2, 4, 6], title: { en: 'Explosive Jumps', ru: 'Взрывные запрыгивания' }, desc: { en: '4 sets of 15', ru: '4х15' }, desc_phase2: { en: '4 sets of 17', ru: '4х17' }, desc_phase3: { en: '4 sets of 20', ru: '4х20' } },
      { id: 'b_windshield_wipers', scheduleDays: [1, 3, 5], title: { en: 'Windshield Wipers', ru: '"Дворники"' }, desc: { en: '3 sets of 10', ru: '3х10' }, desc_phase2: { en: '3 sets of 12', ru: '3х12' }, desc_phase3: { en: '3 sets of 15', ru: '3х15' } },
      { id: 'b_assisted_pistols', scheduleDays: [2, 4, 6], title: { en: 'Assisted Pistols', ru: 'Пистолетики с опорой' }, desc: { en: '4 sets of 8 / leg', ru: '4х8 на ногу' }, desc_phase2: { en: '4 sets of 10 / leg', ru: '4х10 на ногу' }, desc_phase3: { en: '4 sets of 13 / leg', ru: '4х13 на ногу' } },
      { id: 'b_windshield_wipers_f', scheduleDays: [1, 3, 5], title: { en: 'Windshield Wipers', ru: '"Дворники"' }, desc: { en: '3 sets of 8', ru: '3х8' }, desc_phase2: { en: '3 sets of 10', ru: '3х10' }, desc_phase3: { en: '3 sets of 12', ru: '3х12' } },`;

fileStr = fileStr.replace(b_corrupted, b_fixed);
fs.writeFileSync('src/data.ts', fileStr);
