const fs = require('fs');
let dataStr = fs.readFileSync('src/data.ts', 'utf8');

// F Rank
dataStr = dataStr.replace(
  "      { id: 'f_plank', scheduleDays: [1, 3, 5], title: { en: 'Plank', ru: 'Планка' }, desc: { en: '3 sets of 60 sec', ru: '3х60 сек' }, desc_phase2: { en: '3 sets of 72 sec', ru: '3х72 сек' }, desc_phase3: { en: '3 sets of 90 sec', ru: '3х90 сек' } }",
  "      { id: 'f_plank', scheduleDays: [1, 3, 5], title: { en: 'Plank', ru: 'Планка' }, desc: { en: '3 sets of 60 sec', ru: '3х60 сек' }, desc_phase2: { en: '3 sets of 72 sec', ru: '3х72 сек' }, desc_phase3: { en: '3 sets of 90 sec', ru: '3х90 сек' } },\n      { id: 'f_hollow', scheduleDays: [2, 4, 6], title: { en: 'Hollow Body Hold', ru: 'Лодочка' }, desc: { en: '3 sets of 30 sec', ru: '3х30 сек' }, desc_phase2: { en: '3 sets of 40 sec', ru: '3х40 сек' }, desc_phase3: { en: '3 sets of 50 sec', ru: '3х50 сек' } },\n      { id: 'f_band_pulls', inventoryReq: 'resistance_bands', scheduleDays: [1, 3, 5], title: { en: 'Band Pull Aparts', ru: 'Разведение с эспандером' }, desc: { en: '3 sets of 15', ru: '3х15' }, desc_phase2: { en: '3 sets of 20', ru: '3х20' }, desc_phase3: { en: '3 sets of 25', ru: '3х25' } }"
);

// F Rank Female (quests_f)
dataStr = dataStr.replace(
  "      { id: 'f_plank', scheduleDays: [2, 4, 6], title: { en: 'Plank', ru: 'Планка' }, desc: { en: '3 sets of 60 sec', ru: '3х60 сек' }, desc_phase2: { en: '3 sets of 72 sec', ru: '3х72 сек' }, desc_phase3: { en: '3 sets of 90 sec', ru: '3х90 сек' } }",
  "      { id: 'f_plank', scheduleDays: [2, 4, 6], title: { en: 'Plank', ru: 'Планка' }, desc: { en: '3 sets of 60 sec', ru: '3х60 сек' }, desc_phase2: { en: '3 sets of 72 sec', ru: '3х72 сек' }, desc_phase3: { en: '3 sets of 90 sec', ru: '3х90 сек' } },\n      { id: 'f_hollow_f', scheduleDays: [2, 4, 6], title: { en: 'Hollow Body Hold', ru: 'Лодочка' }, desc: { en: '3 sets of 20 sec', ru: '3х20 сек' }, desc_phase2: { en: '3 sets of 30 sec', ru: '3х30 сек' }, desc_phase3: { en: '3 sets of 40 sec', ru: '3х40 сек' } },\n      { id: 'f_band_pulls_f', inventoryReq: 'resistance_bands', scheduleDays: [1, 3, 5], title: { en: 'Band Pull Aparts', ru: 'Разведение с эспандером' }, desc: { en: '3 sets of 15', ru: '3х15' }, desc_phase2: { en: '3 sets of 20', ru: '3х20' }, desc_phase3: { en: '3 sets of 25', ru: '3х25' } }"
);

// E Rank
dataStr = dataStr.replace(
  "      { id: 'e_lunges', scheduleDays: [2, 4, 6], title: { en: 'Lunges', ru: 'Выпады' }, desc: { en: '4 sets of 20', ru: '4х20' }, desc_phase2: { en: '4 sets of 22', ru: '4х22' }, desc_phase3: { en: '4 sets of 25', ru: '4х25' } }",
  "      { id: 'e_lunges', scheduleDays: [2, 4, 6], title: { en: 'Lunges', ru: 'Выпады' }, desc: { en: '4 sets of 20', ru: '4х20' }, desc_phase2: { en: '4 sets of 22', ru: '4х22' }, desc_phase3: { en: '4 sets of 25', ru: '4х25' } },\n      { id: 'e_pike_pushups', scheduleDays: [1, 3, 5], title: { en: 'Pike Pushups', ru: 'Отжимания уголком' }, desc: { en: '3 sets of 8', ru: '3х8' }, desc_phase2: { en: '3 sets of 10', ru: '3х10' }, desc_phase3: { en: '3 sets of 12', ru: '3х12' } },\n      { id: 'e_ab_roller', inventoryReq: 'ab_roller', scheduleDays: [2, 4, 6], title: { en: 'Ab Roller (Knees)', ru: 'Ролик (с колен)' }, desc: { en: '3 sets of 10', ru: '3х10' }, desc_phase2: { en: '3 sets of 12', ru: '3х12' }, desc_phase3: { en: '3 sets of 15', ru: '3х15' } }"
);

// E Rank Female
dataStr = dataStr.replace(
  "      { id: 'e_hyperext', scheduleDays: [2, 4, 6], title: { en: 'Floor Hyperextension', ru: 'Гиперэкстензия на полу' }, desc: { en: '3 sets of 15', ru: '3х15' }, desc_phase2: { en: '3 sets of 17', ru: '3х17' }, desc_phase3: { en: '3 sets of 20', ru: '3х20' } }",
  "      { id: 'e_hyperext', scheduleDays: [2, 4, 6], title: { en: 'Floor Hyperextension', ru: 'Гиперэкстензия на полу' }, desc: { en: '3 sets of 15', ru: '3х15' }, desc_phase2: { en: '3 sets of 17', ru: '3х17' }, desc_phase3: { en: '3 sets of 20', ru: '3х20' } },\n      { id: 'e_pike_pushups_f', scheduleDays: [1, 3, 5], title: { en: 'Pike Pushups', ru: 'Отжимания уголком' }, desc: { en: '3 sets of 5', ru: '3х5' }, desc_phase2: { en: '3 sets of 7', ru: '3х7' }, desc_phase3: { en: '3 sets of 10', ru: '3х10' } },\n      { id: 'e_ab_roller_f', inventoryReq: 'ab_roller', scheduleDays: [2, 4, 6], title: { en: 'Ab Roller (Knees)', ru: 'Ролик (с колен)' }, desc: { en: '3 sets of 8', ru: '3х8' }, desc_phase2: { en: '3 sets of 10', ru: '3х10' }, desc_phase3: { en: '3 sets of 12', ru: '3х12' } }"
);

// D Rank
dataStr = dataStr.replace(
  "      { id: 'd_pistol_asst', scheduleDays: [2, 4, 6], title: { en: 'Assisted Pistol Squats', ru: 'Пистолетики с опорой' }, desc: { en: '4 sets of 5 / leg', ru: '4х5 на ногу' }, desc_phase2: { en: '4 sets of 6 / leg', ru: '4х6 на ногу' }, desc_phase3: { en: '4 sets of 8 / leg', ru: '4х8 на ногу' } }",
  "      { id: 'd_pistol_asst', scheduleDays: [2, 4, 6], title: { en: 'Assisted Pistol Squats', ru: 'Пистолетики с опорой' }, desc: { en: '4 sets of 5 / leg', ru: '4х5 на ногу' }, desc_phase2: { en: '4 sets of 6 / leg', ru: '4х6 на ногу' }, desc_phase3: { en: '4 sets of 8 / leg', ru: '4х8 на ногу' } },\n      { id: 'd_dips', inventoryReq: 'dip_station', scheduleDays: [1, 3, 5], title: { en: 'Dips', ru: 'Отжимания на брусьях' }, desc: { en: '4 sets of 8', ru: '4х8' }, desc_phase2: { en: '4 sets of 10', ru: '4х10' }, desc_phase3: { en: '4 sets of 12', ru: '4х12' } },\n      { id: 'd_jump_rope', inventoryReq: 'jump_rope', scheduleDays: [2, 4, 6], title: { en: 'Jump Rope', ru: 'Скакалка' }, desc: { en: '5 mins', ru: '5 минут' }, desc_phase2: { en: '7 mins', ru: '7 минут' }, desc_phase3: { en: '10 mins', ru: '10 минут' } }"
);

// D Rank Female
dataStr = dataStr.replace(
  "      { id: 'd_pistol_asst_f', scheduleDays: [2, 4, 6], title: { en: 'Assisted Pistol Squats', ru: 'Пистолетики с опорой' }, desc: { en: '4 sets of 5 / leg', ru: '4х5 на ногу' }, desc_phase2: { en: '4 sets of 6 / leg', ru: '4х6 на ногу' }, desc_phase3: { en: '4 sets of 8 / leg', ru: '4х8 на ногу' } }",
  "      { id: 'd_pistol_asst_f', scheduleDays: [2, 4, 6], title: { en: 'Assisted Pistol Squats', ru: 'Пистолетики с опорой' }, desc: { en: '4 sets of 5 / leg', ru: '4х5 на ногу' }, desc_phase2: { en: '4 sets of 6 / leg', ru: '4х6 на ногу' }, desc_phase3: { en: '4 sets of 8 / leg', ru: '4х8 на ногу' } },\n      { id: 'd_dips_f', inventoryReq: 'dip_station', scheduleDays: [1, 3, 5], title: { en: 'Dips (Assisted)', ru: 'Брусья (с эспандером)' }, desc: { en: '4 sets of 5', ru: '4х5' }, desc_phase2: { en: '4 sets of 8', ru: '4х8' }, desc_phase3: { en: '4 sets of 10', ru: '4х10' } },\n      { id: 'd_jump_rope_f', inventoryReq: 'jump_rope', scheduleDays: [2, 4, 6], title: { en: 'Jump Rope', ru: 'Скакалка' }, desc: { en: '5 mins', ru: '5 минут' }, desc_phase2: { en: '7 mins', ru: '7 минут' }, desc_phase3: { en: '10 mins', ru: '10 минут' } }"
);

// C Rank
dataStr = dataStr.replace(
  "      { id: 'c_pistol', scheduleDays: [2, 4, 6], title: { en: 'Pistol Squats', ru: 'Пистолетики' }, desc: { en: '4 sets of 5 / leg', ru: '4х5 на ногу' }, desc_phase2: { en: '4 sets of 7 / leg', ru: '4х7 на ногу' }, desc_phase3: { en: '4 sets of 10 / leg', ru: '4х10 на ногу' } }",
  "      { id: 'c_pistol', scheduleDays: [2, 4, 6], title: { en: 'Pistol Squats', ru: 'Пистолетики' }, desc: { en: '4 sets of 5 / leg', ru: '4х5 на ногу' }, desc_phase2: { en: '4 sets of 7 / leg', ru: '4х7 на ногу' }, desc_phase3: { en: '4 sets of 10 / leg', ru: '4х10 на ногу' } },\n      { id: 'c_vest_squats', inventoryReq: 'weight_vest', scheduleDays: [2, 4, 6], title: { en: 'Weighted Squats (Vest)', ru: 'Приседания с жилетом' }, desc: { en: '4 sets of 20', ru: '4х20' }, desc_phase2: { en: '4 sets of 25', ru: '4х25' }, desc_phase3: { en: '4 sets of 30', ru: '4х30' } },\n      { id: 'c_ring_rows', inventoryReq: 'rings', scheduleDays: [1, 3, 5], title: { en: 'Ring Rows', ru: 'Подтягивания на кольцах' }, desc: { en: '4 sets of 12', ru: '4х12' }, desc_phase2: { en: '4 sets of 15', ru: '4х15' }, desc_phase3: { en: '4 sets of 18', ru: '4х18' } }"
);

// C Rank Female
dataStr = dataStr.replace(
  "      { id: 'c_pistol_f', scheduleDays: [2, 4, 6], title: { en: 'Pistol Squats', ru: 'Пистолетики' }, desc: { en: '4 sets of 5 / leg', ru: '4х5 на ногу' }, desc_phase2: { en: '4 sets of 7 / leg', ru: '4х7 на ногу' }, desc_phase3: { en: '4 sets of 10 / leg', ru: '4х10 на ногу' } }",
  "      { id: 'c_pistol_f', scheduleDays: [2, 4, 6], title: { en: 'Pistol Squats', ru: 'Пистолетики' }, desc: { en: '4 sets of 5 / leg', ru: '4х5 на ногу' }, desc_phase2: { en: '4 sets of 7 / leg', ru: '4х7 на ногу' }, desc_phase3: { en: '4 sets of 10 / leg', ru: '4х10 на ногу' } },\n      { id: 'c_vest_squats_f', inventoryReq: 'weight_vest', scheduleDays: [2, 4, 6], title: { en: 'Weighted Squats (Vest)', ru: 'Приседания с жилетом' }, desc: { en: '4 sets of 20', ru: '4х20' }, desc_phase2: { en: '4 sets of 25', ru: '4х25' }, desc_phase3: { en: '4 sets of 30', ru: '4х30' } },\n      { id: 'c_ring_rows_f', inventoryReq: 'rings', scheduleDays: [1, 3, 5], title: { en: 'Ring Rows', ru: 'Подтягивания на кольцах' }, desc: { en: '4 sets of 10', ru: '4х10' }, desc_phase2: { en: '4 sets of 12', ru: '4х12' }, desc_phase3: { en: '4 sets of 15', ru: '4х15' } }"
);

// B Rank
dataStr = dataStr.replace(
  "      { id: 'b_dragon_flag', scheduleDays: [1, 3, 5], title: { en: 'Dragon Flag (Negatives)', ru: 'Негативный Флаг Дракона' }, desc: { en: '4 sets of 3', ru: '4х3' }, desc_phase2: { en: '4 sets of 5', ru: '4х5' }, desc_phase3: { en: '4 sets of 7', ru: '4х7' } }",
  "      { id: 'b_dragon_flag', scheduleDays: [1, 3, 5], title: { en: 'Dragon Flag (Negatives)', ru: 'Негативный Флаг Дракона' }, desc: { en: '4 sets of 3', ru: '4х3' }, desc_phase2: { en: '4 sets of 5', ru: '4х5' }, desc_phase3: { en: '4 sets of 7', ru: '4х7' } },\n      { id: 'b_vest_pulls', inventoryReq: 'weight_vest', scheduleDays: [1, 3, 5], title: { en: 'Weighted Pullups (Vest)', ru: 'Подтягивания с жилетом' }, desc: { en: '4 sets of 5', ru: '4х5' }, desc_phase2: { en: '4 sets of 7', ru: '4х7' }, desc_phase3: { en: '4 sets of 9', ru: '4х9' } },\n      { id: 'b_db_press', inventoryReq: 'dumbbells', scheduleDays: [2, 4, 6], title: { en: 'Dumbbell OHP', ru: 'Жим гантелей стоя' }, desc: { en: '4 sets of 10', ru: '4х10' }, desc_phase2: { en: '4 sets of 12', ru: '4х12' }, desc_phase3: { en: '4 sets of 15', ru: '4х15' } }"
);

// B Rank Female
dataStr = dataStr.replace(
  "      { id: 'b_dragon_flag_f', scheduleDays: [1, 3, 5], title: { en: 'Dragon Flag (Negatives)', ru: 'Негативный Флаг Дракона' }, desc: { en: '4 sets of 2', ru: '4х2' }, desc_phase2: { en: '4 sets of 3', ru: '4х3' }, desc_phase3: { en: '4 sets of 5', ru: '4х5' } }",
  "      { id: 'b_dragon_flag_f', scheduleDays: [1, 3, 5], title: { en: 'Dragon Flag (Negatives)', ru: 'Негативный Флаг Дракона' }, desc: { en: '4 sets of 2', ru: '4х2' }, desc_phase2: { en: '4 sets of 3', ru: '4х3' }, desc_phase3: { en: '4 sets of 5', ru: '4х5' } },\n      { id: 'b_vest_pulls_f', inventoryReq: 'weight_vest', scheduleDays: [1, 3, 5], title: { en: 'Weighted Pullups (Vest)', ru: 'Подтягивания с жилетом' }, desc: { en: '4 sets of 3', ru: '4х3' }, desc_phase2: { en: '4 sets of 5', ru: '4х5' }, desc_phase3: { en: '4 sets of 7', ru: '4х7' } },\n      { id: 'b_db_press_f', inventoryReq: 'dumbbells', scheduleDays: [2, 4, 6], title: { en: 'Dumbbell OHP', ru: 'Жим гантелей стоя' }, desc: { en: '4 sets of 10', ru: '4х10' }, desc_phase2: { en: '4 sets of 12', ru: '4х12' }, desc_phase3: { en: '4 sets of 15', ru: '4х15' } }"
);

fs.writeFileSync('src/data.ts', dataStr);
