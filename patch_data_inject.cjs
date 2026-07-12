const fs = require('fs');
let fileStr = fs.readFileSync('src/data.ts', 'utf8');

function injectAfter(searchId, newStr) {
  const regex = new RegExp(`({\\s*id:\\s*'${searchId}'.*?})`, 'g');
  fileStr = fileStr.replace(regex, `$1,\n${newStr}`);
}

injectAfter('b_box_jumps', `      { id: 'b_windshield_wipers', scheduleDays: [1, 3, 5], title: { en: 'Windshield Wipers', ru: '"Дворники"' }, desc: { en: '3 sets of 10', ru: '3х10' }, desc_phase2: { en: '3 sets of 12', ru: '3х12' }, desc_phase3: { en: '3 sets of 15', ru: '3х15' } }`);
injectAfter('b_assisted_pistols', `      { id: 'b_windshield_wipers_f', scheduleDays: [1, 3, 5], title: { en: 'Windshield Wipers', ru: '"Дворники"' }, desc: { en: '3 sets of 8', ru: '3х8' }, desc_phase2: { en: '3 sets of 10', ru: '3х10' }, desc_phase3: { en: '3 sets of 12', ru: '3х12' } }`);
injectAfter('a_pistols', `      { id: 'a_nordic_curls', scheduleDays: [2, 4, 6], title: { en: 'Nordic Curls', ru: 'Нордические сгибания' }, desc: { en: '3 sets of 5', ru: '3х5' }, desc_phase2: { en: '3 sets of 6', ru: '3х6' }, desc_phase3: { en: '3 sets of 8', ru: '3х8' } }`);
injectAfter('a_pistols_f', `      { id: 'a_nordic_curls_f', scheduleDays: [2, 4, 6], title: { en: 'Nordic Curls', ru: 'Нордические сгибания' }, desc: { en: '3 sets of 5', ru: '3х5' }, desc_phase2: { en: '3 sets of 6', ru: '3х6' }, desc_phase3: { en: '3 sets of 8', ru: '3х8' } }`);

fs.writeFileSync('src/data.ts', fileStr);
