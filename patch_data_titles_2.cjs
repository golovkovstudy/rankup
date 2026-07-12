const fs = require('fs');
let fileStr = fs.readFileSync('src/data.ts', 'utf8');

// f_pushups_knee
fileStr = fileStr.replace(/Отжимания с колен/g, "Отжимания с колен");

// chal_f_1f
fileStr = fileStr.replace(/Классические отжимания/g, "Классические отжимания от пола");

// e_ab_roller
fileStr = fileStr.replace(/Ролик \(с колен\)/g, "Выкатывания с роликом для пресса с колен");

// e_pike_pushups
fileStr = fileStr.replace(/Отжимания уголком/g, "Отжимания уголком (Pike Pushups)");

// e_split_squats
fileStr = fileStr.replace(/Болгарские сплит-приседания/g, "Болгарские сплит-приседания");

// d_close_pushups
fileStr = fileStr.replace(/Алмазные отжимания узким хватом/g, "Алмазные отжимания");

// c_mixed_pulls
fileStr = fileStr.replace(/Подтягивания разными хватами/g, "Подтягивания разными хватами");

// b_mu_prep
fileStr = fileStr.replace(/Подготовка к выходам силой/g, "Подводящие к выходу силой на две руки");

// b_pistols
fileStr = fileStr.replace(/Приседания "пистолетиком"/g, "Приседания на одной ноге (Пистолетики)");
fileStr = fileStr.replace(/Приседания Пистолетиком с весом/g, "Приседания на одной ноге с весом (Пистолетики)");

// a_hspu
fileStr = fileStr.replace(/Отжимания в стойке на руках/g, "Отжимания в стойке на руках у стены (HSPU)");

// s_ring_rows_f
fileStr = fileStr.replace(/Тяга на кольцах/g, "Горизонтальные подтягивания на кольцах");

fs.writeFileSync('src/data.ts', fileStr);
