const fs = require('fs');
const dataTs = fs.readFileSync('src/data.ts', 'utf8');

const newContent = `export interface LocalizedString {
  en: string;
  ru: string;
}

export interface QuestConfig {
  id: string;
  title: LocalizedString;
  desc: LocalizedString;
  desc_phase2?: LocalizedString;
  desc_phase3?: LocalizedString;
  scheduleDays: number[];
}

export interface ChallengeTask {
  id: string;
  title: LocalizedString;
  count: number;
}

export interface RankConfig {
  quests: QuestConfig[];
  challenge?: {
    timeLimitMinutes: number;
    tasks: ChallengeTask[];
  };
  requiredInventoryForNext?: LocalizedString;
  nextRank: any | null;
  minDays: number;
}

export const SSR_CHALLENGES = [
  {
    id: 'murph',
    title: { en: 'Murph', ru: 'Мерф' },
    desc: { en: '1 mile run, 100 pull-ups, 200 pushups, 300 squats, 1 mile run (with vest)', ru: '1 миля бег, 100 подтягиваний, 200 отжиманий, 300 приседаний, 1 миля бег (в жилете)' }
  },
  {
    id: 'no_gravity',
    title: { en: 'No Gravity', ru: 'Гравитации нет' },
    desc: { en: '50 muscle-ups in one workout', ru: '50 выходов силой на две руки за тренировку' }
  },
  {
    id: 'iron_legs',
    title: { en: 'Iron Legs', ru: 'Железные ноги' },
    desc: { en: '10 km run + 100 pistol squats', ru: '10 км бег + 100 приседаний "пистолетиком"' }
  },
  {
    id: 'spartan',
    title: { en: 'Spartan', ru: 'Спартанец' },
    desc: { en: '300 spartan pushups, 10 min L-sit hold total', ru: '300 спартанских отжиманий, 10 минут удержание L-sit (в сумме)' }
  },
  {
    id: 'rings_of_power',
    title: { en: 'Rings of Power', ru: 'Кольца власти' },
    desc: { en: '100 ring pushups, 50 ring pullups', ru: '100 отжиманий на гимнастических кольцах, 50 подтягиваний на кольцах' }
  }
];

export const RANKS: Record<string, RankConfig> = {
  F: {
    minDays: 28,
    requiredInventoryForNext: { en: 'Pull-up Bar', ru: 'Турник' },
    nextRank: 'E',
    quests: [
      { id: 'f_pushups', scheduleDays: [1, 3, 5], title: { en: 'Pushups', ru: 'Отжимания от пола' }, desc: { en: '4 sets of 15', ru: '4х15' }, desc_phase2: { en: '4 sets of 17', ru: '4х17' } },
      { id: 'f_chair_dips', scheduleDays: [1, 3, 5], title: { en: 'Chair Dips', ru: 'Обратные отжимания от стула' }, desc: { en: '3 sets of 12', ru: '3х12' }, desc_phase2: { en: '3 sets of 14', ru: '3х14' } },
      { id: 'f_plank', scheduleDays: [1, 3, 5], title: { en: 'Plank', ru: 'Планка' }, desc: { en: '3 sets of 60 sec', ru: '3х60 сек' } },
      { id: 'f_squats', scheduleDays: [2, 4], title: { en: 'Squats', ru: 'Приседания' }, desc: { en: '4 sets of 25', ru: '4х25' }, desc_phase2: { en: '4 sets of 27', ru: '4х27' } },
      { id: 'f_lunges', scheduleDays: [2, 4], title: { en: 'Reverse Lunges', ru: 'Выпады назад' }, desc: { en: '3 sets of 15 / leg', ru: '3х15 на ногу' }, desc_phase2: { en: '3 sets of 17 / leg', ru: '3х17 на ногу' } },
      { id: 'f_walk', scheduleDays: [6], title: { en: 'Brisk Walk', ru: 'Быстрая ходьба' }, desc: { en: '60 mins at 6 km/h', ru: '60 минут (6 км/ч)' } }
    ],
    challenge: {
      timeLimitMinutes: 5,
      tasks: [
        { id: 'chal_f_1', title: { en: 'Pushups', ru: 'Отжимания' }, count: 35 },
        { id: 'chal_f_2', title: { en: 'Squats', ru: 'Приседания' }, count: 50 }
      ]
    }
  },
  E: {
    minDays: 28,
    requiredInventoryForNext: { en: 'Dips Bar / Chairs', ru: 'Брусья или стулья' },
    nextRank: 'D',
    quests: [
      { id: 'e_neg_pullups', scheduleDays: [1, 4], title: { en: 'Negative Pullups', ru: 'Негативные подтягивания' }, desc: { en: '4 sets of 5', ru: '4х5' }, desc_phase2: { en: '4 sets of 7', ru: '4х7' } },
      { id: 'e_dead_hang', scheduleDays: [1, 4], title: { en: 'Dead Hang', ru: 'Вис на перекладине' }, desc: { en: '3 sets to max', ru: '3хМакс' }, desc_phase2: { en: '3 sets to max (+10s aim)', ru: '3хМакс (+10 сек)' } },
      { id: 'e_pushups', scheduleDays: [2, 5], title: { en: 'Classic Pushups', ru: 'Отжимания классика' }, desc: { en: '4 sets of 25', ru: '4х25' }, desc_phase2: { en: '4 sets of 27', ru: '4х27' } },
      { id: 'e_diamond', scheduleDays: [2, 5], title: { en: 'Diamond Pushups', ru: 'Алмазные отжимания' }, desc: { en: '3 sets of 12', ru: '3х12' }, desc_phase2: { en: '3 sets of 14', ru: '3х14' } },
      { id: 'e_treadmill', scheduleDays: [3, 6], title: { en: 'Treadmill / Run', ru: 'Бег / Дорожка' }, desc: { en: '60 mins (5% incline or +1.5km/h)', ru: '60 мин (Наклон 5% или ускорение)' } },
      { id: 'e_split_squats', scheduleDays: [3, 6], title: { en: 'Bulgarian Split Squats', ru: 'Болгарские сплит-приседания' }, desc: { en: '3 sets of 12', ru: '3х12' }, desc_phase2: { en: '3 sets of 14', ru: '3х14' } }
    ],
    challenge: {
      timeLimitMinutes: 10,
      tasks: [
        { id: 'chal_e_1', title: { en: 'Clean Pullups', ru: 'Чистые подтягивания' }, count: 5 },
        { id: 'chal_e_2', title: { en: 'Pushups Total', ru: 'Отжимания суммарно' }, count: 60 }
      ]
    }
  },
  D: {
    minDays: 28,
    requiredInventoryForNext: { en: 'None', ru: 'Не требуется' },
    nextRank: 'C',
    quests: [
      { id: 'd_pullups', scheduleDays: [1, 3, 5], title: { en: 'Pullups', ru: 'Подтягивания' }, desc: { en: '4 sets of 8', ru: '4х8' }, desc_phase2: { en: '4 sets of 10', ru: '4х10' } },
      { id: 'd_dips', scheduleDays: [1, 3, 5], title: { en: 'Dips', ru: 'Отжимания на брусьях' }, desc: { en: '4 sets of 12', ru: '4х12' }, desc_phase2: { en: '4 sets of 14', ru: '4х14' } },
      { id: 'd_run_int', scheduleDays: [2, 4, 6], title: { en: 'Interval Run', ru: 'Интервальный бег' }, desc: { en: '30 min intervals', ru: '30 мин интервалы' } },
      { id: 'd_plank_long', scheduleDays: [2, 4, 6], title: { en: 'Plank', ru: 'Планка' }, desc: { en: '3 sets of 90 sec', ru: '3х90 сек' }, desc_phase2: { en: '3 sets of 100 sec', ru: '3х100 сек' } }
    ],
    challenge: {
      timeLimitMinutes: 5,
      tasks: [
        { id: 'chal_d_1', title: { en: 'Pullups', ru: 'Подтягивания' }, count: 10 },
        { id: 'chal_d_2', title: { en: 'Dips', ru: 'Брусья' }, count: 30 }
      ]
    }
  },
  C: {
    minDays: 28,
    requiredInventoryForNext: { en: 'Jump Rope', ru: 'Скакалка' },
    nextRank: 'B',
    quests: [
      { id: 'c_mixed_pulls', scheduleDays: [1, 3, 5], title: { en: 'Mixed Pullups', ru: 'Подтягивания разными хватами' }, desc: { en: '5 sets of 10', ru: '5х10' }, desc_phase2: { en: '5 sets of 12', ru: '5х12' } },
      { id: 'c_archer', scheduleDays: [1, 3, 5], title: { en: 'Archer Pushups', ru: 'Отжимания лучника' }, desc: { en: '4 sets of 10', ru: '4х10' }, desc_phase2: { en: '4 sets of 12', ru: '4х12' } },
      { id: 'c_run', scheduleDays: [2, 4, 6], title: { en: '5km Run', ru: 'Бег 5 км' }, desc: { en: 'Non-stop', ru: 'Нон-стоп' } },
      { id: 'c_leg_raises', scheduleDays: [2, 4, 6], title: { en: 'Leg Raises', ru: 'Подъемы ног' }, desc: { en: '4 sets of 15', ru: '4х15' }, desc_phase2: { en: '4 sets of 17', ru: '4х17' } }
    ],
    challenge: {
      timeLimitMinutes: 20,
      tasks: [
        { id: 'chal_c_1', title: { en: 'Pullups', ru: 'Подтягивания' }, count: 15 },
        { id: 'chal_c_2', title: { en: 'Pushups in 2 min', ru: 'Отжимания (за 2 мин)' }, count: 50 },
        { id: 'chal_c_3', title: { en: '5km Run', ru: '5 км бег' }, count: 1 }
      ]
    }
  },
  B: {
    minDays: 28,
    requiredInventoryForNext: { en: 'None', ru: 'Не требуется' },
    nextRank: 'A',
    quests: [
      { id: 'b_explosive_pulls', scheduleDays: [1, 3, 5], title: { en: 'Explosive Pullups', ru: 'Взрывные подтягивания' }, desc: { en: '4 sets of 8', ru: '4х8' }, desc_phase2: { en: '4 sets of 10', ru: '4х10' } },
      { id: 'b_clap_pushups', scheduleDays: [1, 3, 5], title: { en: 'Clapping Pushups', ru: 'Отжимания с хлопком' }, desc: { en: '4 sets of 15', ru: '4х15' }, desc_phase2: { en: '4 sets of 17', ru: '4х17' } },
      { id: 'b_pistols', scheduleDays: [2, 4, 6], title: { en: 'Pistol Squats', ru: 'Приседания "пистолетиком"' }, desc: { en: '3 sets of 8 / leg', ru: '3х8 на ногу' }, desc_phase2: { en: '3 sets of 10 / leg', ru: '3х10 на ногу' } },
      { id: 'b_double_unders', scheduleDays: [2, 4, 6], title: { en: 'Double Unders', ru: 'Двойные прыжки' }, desc: { en: '4 sets of 30', ru: '4х30' }, desc_phase2: { en: '4 sets of 40', ru: '4х40' } }
    ],
    challenge: {
      timeLimitMinutes: 10,
      tasks: [
        { id: 'chal_b_1', title: { en: 'Pullups', ru: 'Подтягивания' }, count: 20 },
        { id: 'chal_b_2', title: { en: 'Clapping Pushups', ru: 'Отжимания с хлопком' }, count: 50 }
      ]
    }
  },
  A: {
    minDays: 28,
    requiredInventoryForNext: { en: 'Weight Vest +15kg, Gymnastic Rings', ru: 'Жилет +15кг, Гимнастические кольца' },
    nextRank: 'S',
    quests: [
      { id: 'a_mu_attempts', scheduleDays: [1, 3, 5], title: { en: 'Muscle-up Attempts', ru: 'Попытки выхода силой' }, desc: { en: '5 sets of 3', ru: '5х3' } },
      { id: 'a_lsit', scheduleDays: [1, 3, 5], title: { en: 'L-sit Hold', ru: 'Удержание L-sit' }, desc: { en: '4 sets of 15 sec', ru: '4х15 сек' }, desc_phase2: { en: '4 sets of 20 sec', ru: '4х20 сек' } },
      { id: 'a_strict_pistols', scheduleDays: [2, 4, 6], title: { en: 'Strict Pistols', ru: 'Строгие пистолетики' }, desc: { en: '4 sets of 10 / leg', ru: '4х10 на ногу' }, desc_phase2: { en: '4 sets of 12 / leg', ru: '4х12 на ногу' } },
      { id: 'a_du_max', scheduleDays: [2, 4, 6], title: { en: 'Double Unders', ru: 'Двойные прыжки' }, desc: { en: '3 sets to max', ru: '3хМакс' } }
    ],
    challenge: {
      timeLimitMinutes: 10,
      tasks: [
        { id: 'chal_a_1', title: { en: 'Clean Muscle-ups', ru: 'Чистые выходы силой' }, count: 3 },
        { id: 'chal_a_2', title: { en: 'Pistols / leg', ru: 'Пистолетики на ногу' }, count: 15 }
      ]
    }
  },
  S: {
    minDays: 28,
    requiredInventoryForNext: { en: 'Legendary Willpower', ru: 'Легендарная сила воли' },
    nextRank: 'SSR',
    quests: [
      { id: 's_weighted_pulls', scheduleDays: [1, 3, 5], title: { en: 'Weighted Pullups (+15kg)', ru: 'Подтягивания с весом (+15кг)' }, desc: { en: '5 sets of 5', ru: '5х5' }, desc_phase2: { en: '5 sets of 7', ru: '5х7' } },
      { id: 's_ring_mu', scheduleDays: [1, 3, 5], title: { en: 'Ring Muscle-ups', ru: 'Выходы на кольцах' }, desc: { en: '4 sets of 3', ru: '4х3' } },
      { id: 's_hspu', scheduleDays: [2, 4, 6], title: { en: 'HSPU', ru: 'Отжимания в стойке на руках' }, desc: { en: '4 sets of 8', ru: '4х8' }, desc_phase2: { en: '4 sets of 10', ru: '4х10' } },
      { id: 's_weighted_pistols', scheduleDays: [2, 4, 6], title: { en: 'Weighted Pistols (+15kg)', ru: 'Пистолетики с весом (+15кг)' }, desc: { en: '3 sets of 8 / leg', ru: '3х8 на ногу' } }
    ],
    challenge: {
      timeLimitMinutes: 10,
      tasks: [
        { id: 'chal_s_1', title: { en: 'Weighted Pullups (+15kg)', ru: 'Подтягивания (+15кг)' }, count: 10 },
        { id: 'chal_s_2', title: { en: 'Weighted Dips (+15kg)', ru: 'Брусья (+15кг)' }, count: 30 }
      ]
    }
  },
  SSR: {
    minDays: 0,
    nextRank: null,
    quests: []
  }
};
`;
let result = dataTs.replace(/export interface LocalizedString([\s\S]*?)export const RANKS: Record<string, RankConfig> = \{[\s\S]*?\};\n/, newContent);
const uiStartIndex = result.indexOf('export const UI');
const uiSection = result.slice(uiStartIndex);
const updatedUiSection = uiSection
  .replace("rest_quest_title: 'Full Recovery and Rest',", "rest_quest_title: 'Full Recovery and Rest',\n    challenge_yourself: 'Challenge Yourself',\n    challenge_accepted: 'Challenge Accepted!',\n    required_inventory: 'Required Inventory for Next Rank',\n    phase_i: 'Phase I: Awakening',\n    phase_ii: 'Phase II: Tempering',\n    phase_iii: 'Phase III: Limit',")
  .replace("rest_quest_title: 'Полное восстановление и отдых',", "rest_quest_title: 'Полное восстановление и отдых',\n    challenge_yourself: 'Брось себе вызов',\n    challenge_accepted: 'Вызов принят!',\n    required_inventory: 'Требуемый инвентарь для следующего ранга',\n    phase_i: 'Фаза I: Пробуждение',\n    phase_ii: 'Фаза II: Закалка',\n    phase_iii: 'Фаза III: Предел',")
  .replace("debug_mode: 'Debug Mode',", "debug_mode: 'Debug Mode',\n    force_phase: 'Force Phase',")
  .replace("debug_mode: 'Режим Отладки',", "debug_mode: 'Режим Отладки',\n    force_phase: 'Сменить фазу',")
  .replace("force_rank: 'Force Rank',", "force_rank: 'Force Rank',\n    simulate_day: 'Simulate Day of Week',")
  .replace("force_rank: 'Сменить ранг',", "force_rank: 'Сменить ранг',\n    simulate_day: 'Симуляция дня недели',");
result = result.slice(0, uiStartIndex) + updatedUiSection;
fs.writeFileSync('src/data.ts', result);
