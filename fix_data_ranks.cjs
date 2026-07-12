const fs = require('fs');
let fileStr = fs.readFileSync('src/data.ts', 'utf8');

// Update RankConfig interface
fileStr = fileStr.replace(
  "export interface RankConfig {",
  "export interface RankConfig {\n  quests_f?: QuestConfig[];\n  challenge_f?: {\n    timeLimitMinutes: number;\n    tasks: ChallengeTask[];\n  };"
);

// We need to replace the RANKS object.
const ranksStart = fileStr.indexOf('export const RANKS: Record<Rank, RankConfig> = {');
const ranksEnd = fileStr.indexOf('export const ACHIEVEMENTS = [');

const newRanks = `export const RANKS: Record<Rank, RankConfig> = {
  F: {
    minDays: 28,
    requiredInventoryForNext: { en: 'Pull-up Bar', ru: 'Турник' },
    nextRank: 'E',
    quests: [
      { id: 'f_pushups', scheduleDays: [1, 3, 5], title: { en: 'Pushups', ru: 'Отжимания от пола' }, desc: { en: '4 sets of 15', ru: '4х15' } },
      { id: 'f_squats', scheduleDays: [2, 4, 6], title: { en: 'Squats', ru: 'Приседания' }, desc: { en: '4 sets of 25', ru: '4х25' } },
      { id: 'f_plank', scheduleDays: [1, 3, 5], title: { en: 'Plank', ru: 'Планка' }, desc: { en: '3 sets of 60 sec', ru: '3х60 сек' } }
    ],
    quests_f: [
      { id: 'f_pushups_knee', scheduleDays: [1, 3, 5], title: { en: 'Knee Pushups', ru: 'Отжимания с колен' }, desc: { en: '4 sets of 15', ru: '4х15' } },
      { id: 'f_glute_bridge', scheduleDays: [1, 3, 5], title: { en: 'Glute Bridge', ru: 'Ягодичный мост' }, desc: { en: '4 sets of 20', ru: '4х20' } },
      { id: 'f_squats_pulse', scheduleDays: [2, 4, 6], title: { en: 'Pulse Squats', ru: 'Приседания с пульсацией' }, desc: { en: '4 sets of 25', ru: '4х25' } },
      { id: 'f_plank', scheduleDays: [2, 4, 6], title: { en: 'Plank', ru: 'Планка' }, desc: { en: '3 sets of 60 sec', ru: '3х60 сек' } }
    ],
    challenge: {
      timeLimitMinutes: 5,
      tasks: [
        { id: 'chal_f_1', title: { en: 'Pushups', ru: 'Отжимания' }, count: 35 },
        { id: 'chal_f_2', title: { en: 'Squats', ru: 'Приседания' }, count: 50 }
      ]
    },
    challenge_f: {
      timeLimitMinutes: 5,
      tasks: [
        { id: 'chal_f_1f', title: { en: 'Classic Pushups', ru: 'Классические отжимания' }, count: 20 },
        { id: 'chal_f_2f', title: { en: 'Squats', ru: 'Приседания' }, count: 60 }
      ]
    }
  },
  E: {
    minDays: 28,
    requiredInventoryForNext: { en: 'Dips Bar', ru: 'Брусья' },
    nextRank: 'D',
    quests: [
      { id: 'e_neg_pullups', scheduleDays: [1, 3, 5], title: { en: 'Negative Pullups', ru: 'Негативные подтягивания' }, desc: { en: '4 sets of 5', ru: '4х5' } },
      { id: 'e_diamond', scheduleDays: [1, 3, 5], title: { en: 'Diamond Pushups', ru: 'Алмазные отжимания' }, desc: { en: '3 sets of 12', ru: '3х12' } },
      { id: 'e_lunges', scheduleDays: [2, 4, 6], title: { en: 'Lunges', ru: 'Выпады' }, desc: { en: '4 sets of 20', ru: '4х20' } }
    ],
    quests_f: [
      { id: 'e_aust_pulls', scheduleDays: [1, 3, 5], title: { en: 'Australian Pullups', ru: 'Австралийские подтягивания' }, desc: { en: '4 sets of 10', ru: '4х10' } },
      { id: 'e_pushups', scheduleDays: [1, 3, 5], title: { en: 'Classic Pushups', ru: 'Классические отжимания' }, desc: { en: '4 sets of 12', ru: '4х12' } },
      { id: 'e_split_squats', scheduleDays: [2, 4, 6], title: { en: 'Bulgarian Split Squats', ru: 'Болгарские сплит-приседания' }, desc: { en: '4 sets of 15', ru: '4х15' } },
      { id: 'e_hyperext', scheduleDays: [2, 4, 6], title: { en: 'Floor Hyperextension', ru: 'Гиперэкстензия на полу' }, desc: { en: '3 sets of 15', ru: '3х15' } }
    ],
    challenge: {
      timeLimitMinutes: 10,
      tasks: [
        { id: 'chal_e_1', title: { en: 'Pullups', ru: 'Подтягивания' }, count: 5 }
      ]
    },
    challenge_f: {
      timeLimitMinutes: 10,
      tasks: [
        { id: 'chal_e_1f', title: { en: 'Australian Pullups', ru: 'Австралийские подтягивания' }, count: 15 },
        { id: 'chal_e_2f', title: { en: 'Pushups', ru: 'Отжимания' }, count: 40 }
      ]
    }
  },
  D: {
    minDays: 28,
    requiredInventoryForNext: { en: 'None', ru: 'Не требуется' },
    nextRank: 'C',
    quests: [
      { id: 'd_pullups', scheduleDays: [1, 3, 5], title: { en: 'Pullups', ru: 'Подтягивания прямым хватом' }, desc: { en: '4 sets of 8', ru: '4х8' } },
      { id: 'd_dips', scheduleDays: [1, 3, 5], title: { en: 'Dips', ru: 'Отжимания на брусьях' }, desc: { en: '4 sets of 12', ru: '4х12' } },
      { id: 'd_run_5k', scheduleDays: [2, 4, 6], title: { en: '5km Run', ru: 'Бег 5 км' }, desc: { en: 'Steady pace', ru: 'Ровный темп' } }
    ],
    quests_f: [
      { id: 'd_band_pulls', scheduleDays: [1, 3, 5], title: { en: 'Band Pullups', ru: 'Подтягивания с резинкой' }, desc: { en: '4 sets of 8', ru: '4х8' } },
      { id: 'd_close_pushups', scheduleDays: [1, 3, 5], title: { en: 'Close Grip Pushups', ru: 'Отжимания узким хватом' }, desc: { en: '4 sets of 12', ru: '4х12' } },
      { id: 'd_jump_lunges', scheduleDays: [2, 4, 6], title: { en: 'Jump Lunges', ru: 'Выпады в прыжке' }, desc: { en: '3 sets of 20', ru: '3х20' } },
      { id: 'd_run_5k_f', scheduleDays: [2, 4, 6], title: { en: '5km Run', ru: 'Бег 5 км' }, desc: { en: 'Steady pace', ru: 'Ровный темп' } }
    ],
    challenge: {
      timeLimitMinutes: 10,
      tasks: [
        { id: 'chal_d_1', title: { en: 'Pullups', ru: 'Подтягивания' }, count: 10 },
        { id: 'chal_d_2', title: { en: 'Dips', ru: 'Брусья' }, count: 30 }
      ]
    },
    challenge_f: {
      timeLimitMinutes: 10,
      tasks: [
        { id: 'chal_d_1f', title: { en: 'Band Pullups', ru: 'Подтягивания с резинкой' }, count: 15 },
        { id: 'chal_d_2f', title: { en: 'Pushups', ru: 'Отжимания' }, count: 30 }
      ]
    }
  },
  C: {
    minDays: 28,
    requiredInventoryForNext: { en: 'Jump Rope', ru: 'Скакалка' },
    nextRank: 'B',
    quests: [
      { id: 'c_mixed_pulls', scheduleDays: [1, 3, 5], title: { en: 'Mixed Grip Pullups', ru: 'Подтягивания разными хватами' }, desc: { en: '5 sets of 10', ru: '5х10' } },
      { id: 'c_dips', scheduleDays: [1, 3, 5], title: { en: 'Dips', ru: 'Отжимания на брусьях' }, desc: { en: '5 sets of 15', ru: '5х15' } },
      { id: 'c_run', scheduleDays: [2, 4, 6], title: { en: '5km Run', ru: 'Бег 5 км' }, desc: { en: 'Fast pace', ru: 'Быстрый темп' } }
    ],
    quests_f: [
      { id: 'c_chin_ups', scheduleDays: [1, 3, 5], title: { en: 'Chin-ups', ru: 'Подтягивания обратным хватом' }, desc: { en: '4 sets of 5', ru: '4х5' } },
      { id: 'c_close_pushups', scheduleDays: [1, 3, 5], title: { en: 'Close Grip Pushups', ru: 'Отжимания узким хватом' }, desc: { en: '4 sets of 15', ru: '4х15' } },
      { id: 'c_jump_lunges', scheduleDays: [2, 4, 6], title: { en: 'Jump Lunges', ru: 'Выпады в прыжке' }, desc: { en: '4 sets of 20', ru: '4х20' } },
      { id: 'c_run_f', scheduleDays: [2, 4, 6], title: { en: '5km Run', ru: 'Бег 5 км' }, desc: { en: 'Fast pace', ru: 'Быстрый темп' } }
    ],
    challenge: {
      timeLimitMinutes: 20,
      tasks: [
        { id: 'chal_c_1', title: { en: 'Pullups', ru: 'Подтягивания' }, count: 15 },
        { id: 'chal_c_2', title: { en: 'Pushups', ru: 'Отжимания' }, count: 50 }
      ]
    },
    challenge_f: {
      timeLimitMinutes: 20,
      tasks: [
        { id: 'chal_c_1f', title: { en: 'Chin-ups', ru: 'Чистые подтягивания' }, count: 5 },
        { id: 'chal_c_2f', title: { en: 'Pushups', ru: 'Отжимания' }, count: 30 },
        { id: 'chal_c_3f', title: { en: 'Split Squats', ru: 'Болгарские приседания' }, count: 50 }
      ]
    }
  },
  B: {
    minDays: 28,
    requiredInventoryForNext: { en: 'None', ru: 'Не требуется' },
    nextRank: 'A',
    quests: [
      { id: 'b_mu_prep', scheduleDays: [1, 3, 5], title: { en: 'Muscle-ups Prep', ru: 'Подготовка к выходам силой' }, desc: { en: 'High pullups 4x8', ru: 'Высокие подтягивания 4х8' } },
      { id: 'b_clap_pushups', scheduleDays: [1, 3, 5], title: { en: 'Clapping Pushups', ru: 'Отжимания с хлопком' }, desc: { en: '4 sets of 15', ru: '4х15' } },
      { id: 'b_pistols', scheduleDays: [2, 4, 6], title: { en: 'Pistol Squats', ru: 'Приседания "пистолетиком"' }, desc: { en: '3 sets of 8 / leg', ru: '3х8 на ногу' } }
    ],
    quests_f: [
      { id: 'b_strict_pulls', scheduleDays: [1, 3, 5], title: { en: 'Strict Pullups', ru: 'Строгие подтягивания' }, desc: { en: '4 sets of 6', ru: '4х6' } },
      { id: 'b_lsit', scheduleDays: [1, 3, 5], title: { en: 'L-sit', ru: 'Уголок (L-sit)' }, desc: { en: '4 sets of 15 sec', ru: '4х15 сек' } },
      { id: 'b_box_jumps', scheduleDays: [2, 4, 6], title: { en: 'Explosive Jumps', ru: 'Взрывные запрыгивания' }, desc: { en: '4 sets of 15', ru: '4х15' } },
      { id: 'b_assisted_pistols', scheduleDays: [2, 4, 6], title: { en: 'Assisted Pistols', ru: 'Пистолетики с опорой' }, desc: { en: '4 sets of 8 / leg', ru: '4х8 на ногу' } }
    ],
    challenge: {
      timeLimitMinutes: 10,
      tasks: [
        { id: 'chal_b_1', title: { en: 'Pullups', ru: 'Подтягивания' }, count: 20 },
        { id: 'chal_b_2', title: { en: 'Clapping Pushups', ru: 'Отжимания с хлопком' }, count: 50 }
      ]
    },
    challenge_f: {
      timeLimitMinutes: 10,
      tasks: [
        { id: 'chal_b_1f', title: { en: 'Strict Pullups', ru: 'Строгие подтягивания' }, count: 10 },
        { id: 'chal_b_2f', title: { en: 'Assisted Pistols / leg', ru: 'Пистолетики с опорой (на ногу)' }, count: 20 }
      ]
    }
  },
  A: {
    minDays: 28,
    requiredInventoryForNext: { en: 'Weight Vest +15kg, Rings', ru: 'Жилет +15кг, Кольца' },
    nextRank: 'S',
    quests: [
      { id: 'a_mu', scheduleDays: [1, 3, 5], title: { en: 'Muscle-ups', ru: 'Выходы силой' }, desc: { en: '5 sets of 3', ru: '5х3' } },
      { id: 'a_hspu', scheduleDays: [1, 3, 5], title: { en: 'HSPU', ru: 'Отжимания в стойке на руках' }, desc: { en: '4 sets of 8', ru: '4х8' } },
      { id: 'a_pistols', scheduleDays: [2, 4, 6], title: { en: 'Strict Pistols', ru: 'Строгие пистолетики' }, desc: { en: '4 sets of 10 / leg', ru: '4х10 на ногу' } }
    ],
    quests_f: [
      { id: 'a_strict_pulls_f', scheduleDays: [1, 3, 5], title: { en: 'Strict Pullups', ru: 'Строгие подтягивания' }, desc: { en: '4 sets of 8', ru: '4х8' } },
      { id: 'a_lsit_f', scheduleDays: [1, 3, 5], title: { en: 'L-sit', ru: 'Уголок (L-sit)' }, desc: { en: '4 sets of 20 sec', ru: '4х20 сек' } },
      { id: 'a_box_jumps_f', scheduleDays: [2, 4, 6], title: { en: 'Explosive Jumps', ru: 'Взрывные запрыгивания' }, desc: { en: '4 sets of 20', ru: '4х20' } },
      { id: 'a_pistols_f', scheduleDays: [2, 4, 6], title: { en: 'Assisted Pistols', ru: 'Пистолетики с опорой' }, desc: { en: '4 sets of 12 / leg', ru: '4х12 на ногу' } }
    ],
    challenge: {
      timeLimitMinutes: 10,
      tasks: [
        { id: 'chal_a_1', title: { en: 'Clean Muscle-ups', ru: 'Чистые выходы силой' }, count: 5 },
        { id: 'chal_a_2', title: { en: 'Pistols / leg', ru: 'Пистолетики на ногу' }, count: 20 }
      ]
    },
    challenge_f: {
      timeLimitMinutes: 10,
      tasks: [
        { id: 'chal_a_1f', title: { en: 'Strict Pullups', ru: 'Строгие подтягивания' }, count: 12 },
        { id: 'chal_a_2f', title: { en: 'Assisted Pistols / leg', ru: 'Пистолетики с опорой' }, count: 30 }
      ]
    }
  },
  S: {
    minDays: 28,
    requiredInventoryForNext: { en: 'Willpower', ru: 'Сила воли' },
    nextRank: 'SSR',
    quests: [
      { id: 's_weighted_pulls', scheduleDays: [1, 3, 5], title: { en: 'Weighted Pullups (+15kg)', ru: 'Подтягивания с весом (+15кг)' }, desc: { en: '5 sets of 5', ru: '5х5' } },
      { id: 's_ring_mu', scheduleDays: [1, 3, 5], title: { en: 'Ring Muscle-ups', ru: 'Выходы на кольцах' }, desc: { en: '4 sets of 3', ru: '4х3' } },
      { id: 's_weighted_pistols', scheduleDays: [2, 4, 6], title: { en: 'Weighted Pistols (+15kg)', ru: 'Пистолетики с весом (+15кг)' }, desc: { en: '3 sets of 8 / leg', ru: '3х8 на ногу' } }
    ],
    quests_f: [
      { id: 's_weighted_pulls_f', scheduleDays: [1, 3, 5], title: { en: 'Weighted Pullups (+5kg)', ru: 'Подтягивания с весом (+5кг)' }, desc: { en: '5 sets of 5', ru: '5х5' } },
      { id: 's_ring_rows_f', scheduleDays: [1, 3, 5], title: { en: 'Ring Rows', ru: 'Тяга на кольцах' }, desc: { en: '4 sets of 12', ru: '4х12' } },
      { id: 's_weighted_pistols_f', scheduleDays: [2, 4, 6], title: { en: 'Weighted Pistols (+5kg)', ru: 'Пистолетики с весом (+5кг)' }, desc: { en: '3 sets of 8 / leg', ru: '3х8 на ногу' } }
    ],
    challenge: {
      timeLimitMinutes: 10,
      tasks: [
        { id: 'chal_s_1', title: { en: 'Weighted Pullups (+15kg)', ru: 'Подтягивания (+15кг)' }, count: 10 },
        { id: 'chal_s_2', title: { en: 'Weighted Dips (+15kg)', ru: 'Брусья (+15кг)' }, count: 30 }
      ]
    },
    challenge_f: {
      timeLimitMinutes: 10,
      tasks: [
        { id: 'chal_s_1f', title: { en: 'Weighted Pullups (+5kg)', ru: 'Подтягивания (+5кг)' }, count: 10 },
        { id: 'chal_s_2f', title: { en: 'Weighted Pistols / leg (+5kg)', ru: 'Пистолетики (+5кг)' }, count: 20 }
      ]
    }
  },
  SSR: {
    minDays: 0,
    requiredInventoryForNext: null,
    nextRank: null,
    quests: [],
    quests_f: [],
    challenge: {
      timeLimitMinutes: 60,
      tasks: [
        { id: 'murph_1', title: { en: 'Pullups', ru: 'Подтягивания' }, count: 100 },
        { id: 'murph_2', title: { en: 'Pushups', ru: 'Отжимания' }, count: 200 },
        { id: 'murph_3', title: { en: 'Squats', ru: 'Приседания' }, count: 300 }
      ]
    },
    challenge_f: {
      timeLimitMinutes: 60,
      tasks: [
        { id: 'murph_1f', title: { en: 'Pullups', ru: 'Подтягивания' }, count: 50 },
        { id: 'murph_2f', title: { en: 'Pushups', ru: 'Отжимания' }, count: 150 },
        { id: 'murph_3f', title: { en: 'Squats (with vest)', ru: 'Приседания (с жилетом)' }, count: 300 }
      ]
    }
  }
};
`;

const updatedFileStr = fileStr.substring(0, ranksStart) + newRanks + fileStr.substring(ranksEnd);
fs.writeFileSync('src/data.ts', updatedFileStr);
