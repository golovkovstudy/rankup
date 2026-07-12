const fs = require('fs');
let fileStr = fs.readFileSync('src/data.ts', 'utf8');

// F: quests
const f_plank_m = "      { id: 'f_plank', scheduleDays: [1, 3, 5], title: { en: 'Plank', ru: 'Планка' }, desc: { en: '3 sets of 60 sec', ru: '3х60 сек' }, desc_phase2: { en: '3 sets of 72 sec', ru: '3х72 сек' }, desc_phase3: { en: '3 sets of 90 sec', ru: '3х90 сек' } },";
const f_extra = `      { id: 'f_bicycle_crunches', scheduleDays: [2, 4, 6], title: { en: 'Bicycle Crunches', ru: 'Скручивания "Велосипед"' }, desc: { en: '3 sets of 20', ru: '3х20' }, desc_phase2: { en: '3 sets of 25', ru: '3х25' }, desc_phase3: { en: '3 sets of 30', ru: '3х30' } },
      { id: 'f_face_pulls', inventoryReq: 'resistance_bands', scheduleDays: [1, 3, 5], title: { en: 'Face Pulls', ru: 'Тяга эспандера к лицу' }, desc: { en: '3 sets of 15', ru: '3х15' }, desc_phase2: { en: '3 sets of 20', ru: '3х20' }, desc_phase3: { en: '3 sets of 25', ru: '3х25' } },
      { id: 'f_calf_raises', scheduleDays: [2, 4, 6], title: { en: 'Calf Raises', ru: 'Подъемы на носки' }, desc: { en: '4 sets of 25', ru: '4х25' }, desc_phase2: { en: '4 sets of 30', ru: '4х30' }, desc_phase3: { en: '4 sets of 35', ru: '4х35' } },`;
fileStr = fileStr.replace(f_plank_m, f_plank_m + '\n' + f_extra);

const b_box_jumps_m = "      { id: 'b_box_jumps', scheduleDays: [2, 4, 6], title: { en: 'Explosive Jumps', ru: 'Взрывные запрыгивания' }, desc: { en: '4 sets of 15', ru: '4х15' }, desc_phase2: { en: '4 sets of 17', ru: '4х17' }, desc_phase3: { en: '4 sets of 20', ru: '4х20' } },";
const b_extra = `      { id: 'b_windshield_wipers', scheduleDays: [1, 3, 5], title: { en: 'Windshield Wipers', ru: '"Дворники"' }, desc: { en: '3 sets of 10', ru: '3х10' }, desc_phase2: { en: '3 sets of 12', ru: '3х12' }, desc_phase3: { en: '3 sets of 15', ru: '3х15' } },`;
fileStr = fileStr.replace(b_box_jumps_m, b_box_jumps_m + '\n' + b_extra);

const b_pistols_f = "      { id: 'b_assisted_pistols', scheduleDays: [2, 4, 6], title: { en: 'Assisted Pistols', ru: 'Пистолетики с опорой' }, desc: { en: '4 sets of 8 / leg', ru: '4х8 на ногу' }, desc_phase2: { en: '4 sets of 10 / leg', ru: '4х10 на ногу' }, desc_phase3: { en: '4 sets of 13 / leg', ru: '4х13 на ногу' } }";
const b_extra_f = `      { id: 'b_windshield_wipers_f', scheduleDays: [1, 3, 5], title: { en: 'Windshield Wipers', ru: '"Дворники"' }, desc: { en: '3 sets of 8', ru: '3х8' }, desc_phase2: { en: '3 sets of 10', ru: '3х10' }, desc_phase3: { en: '3 sets of 12', ru: '3х12' } },`;
fileStr = fileStr.replace(b_pistols_f, b_pistols_f + ',\n' + b_extra_f);

const a_pistols_m = "      { id: 'a_pistols', scheduleDays: [2, 4, 6], title: { en: 'Strict Pistols', ru: 'Строгие пистолетики' }, desc: { en: '4 sets of 10 / leg', ru: '4х10 на ногу' }, desc_phase2: { en: '4 sets of 12 / leg', ru: '4х12 на ногу' }, desc_phase3: { en: '4 sets of 16 / leg', ru: '4х16 на ногу' } }";
const a_extra = `      { id: 'a_nordic_curls', scheduleDays: [2, 4, 6], title: { en: 'Nordic Curls', ru: 'Нордические сгибания' }, desc: { en: '3 sets of 5', ru: '3х5' }, desc_phase2: { en: '3 sets of 6', ru: '3х6' }, desc_phase3: { en: '3 sets of 8', ru: '3х8' } },`;
fileStr = fileStr.replace(a_pistols_m, a_pistols_m + ',\n' + a_extra);

const a_pistols_f = "      { id: 'a_pistols_f', scheduleDays: [2, 4, 6], title: { en: 'Assisted Pistols', ru: 'Пистолетики с опорой' }, desc: { en: '4 sets of 12 / leg', ru: '4х12 на ногу' }, desc_phase2: { en: '4 sets of 15 / leg', ru: '4х15 на ногу' }, desc_phase3: { en: '4 sets of 20 / leg', ru: '4х20 на ногу' } }";
const a_extra_f = `      { id: 'a_nordic_curls_f', scheduleDays: [2, 4, 6], title: { en: 'Nordic Curls', ru: 'Нордические сгибания' }, desc: { en: '3 sets of 5', ru: '3х5' }, desc_phase2: { en: '3 sets of 6', ru: '3х6' }, desc_phase3: { en: '3 sets of 8', ru: '3х8' } },`;
fileStr = fileStr.replace(a_pistols_f, a_pistols_f + ',\n' + a_extra_f);

fs.writeFileSync('src/data.ts', fileStr);
