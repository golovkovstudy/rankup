import { Rank } from './types';

export interface LocalizedString {
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
  inventoryReq?: string;
}

export interface ChallengeTask {
  id: string;
  title: LocalizedString;
  count: number;
}

export interface RankConfig {
  quests_f?: QuestConfig[];
  challenge_f?: {
    timeLimitMinutes: number;
    tasks: ChallengeTask[];
  };
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
    desc: { en: '1 mile run, 100 pull-ups, 200 pushups, 300 squats, 1 mile run (with vest)', ru: '1 миля бег, 100 подтягиваний, 200 отжиманий, 300 приседаний, 1 миля бег (в жилете)' },
    quests: [
      { id: 'murph_run1', title: { en: '1 Mile Run', ru: '1 Миля Бег' }, desc: { en: 'With vest', ru: 'В жилете' } },
      { id: 'murph_pullups', title: { en: 'Pull-ups', ru: 'Подтягивания' }, desc: { en: '100 reps', ru: '100 повторений' } },
      { id: 'murph_pushups', title: { en: 'Push-ups', ru: 'Отжимания' }, desc: { en: '200 reps', ru: '200 повторений' } },
      { id: 'murph_squats', title: { en: 'Squats', ru: 'Приседания' }, desc: { en: '300 reps', ru: '300 повторений' } },
      { id: 'murph_run2', title: { en: '1 Mile Run', ru: '1 Миля Бег' }, desc: { en: 'With vest', ru: 'В жилете' } }
    ],
    quests_f: [
      { id: 'murph_run1', title: { en: '1 Mile Run', ru: '1 Миля Бег' }, desc: { en: 'Without vest', ru: 'Без жилета' } },
      { id: 'murph_pullups_f', title: { en: 'Australian Pull-ups', ru: 'Австралийские подтягивания' }, desc: { en: '100 reps', ru: '100 повторений' } },
      { id: 'murph_pushups_f', title: { en: 'Knee Push-ups', ru: 'Отжимания с колен' }, desc: { en: '200 reps', ru: '200 повторений' } },
      { id: 'murph_squats', title: { en: 'Squats', ru: 'Приседания' }, desc: { en: '300 reps', ru: '300 повторений' } },
      { id: 'murph_run2', title: { en: '1 Mile Run', ru: '1 Миля Бег' }, desc: { en: 'Without vest', ru: 'Без жилета' } }
    ]
  },
  {
    id: 'no_gravity',
    title: { en: 'No Gravity', ru: 'Гравитации нет' },
    desc: { en: '50 muscle-ups in one workout', ru: '50 выходов силой на две руки за тренировку' },
    quests: [
      { id: 'no_gravity_mu', title: { en: 'Muscle-ups', ru: 'Выходы силой' }, desc: { en: '50 reps', ru: '50 повторений' } }
    ],
    quests_f: [
      { id: 'no_gravity_pullups_f', title: { en: 'Strict Pull-ups', ru: 'Строгие подтягивания' }, desc: { en: '50 reps', ru: '50 повторений' } }
    ]
  },
  {
    id: 'iron_legs',
    title: { en: 'Iron Legs', ru: 'Железные ноги' },
    desc: { en: '10 km run (outdoors) + 100 pistol squats', ru: '10 км бег (на улице) + 100 приседаний "пистолетиком"' },
    quests: [
      { id: 'iron_legs_run', title: { en: '10 km run', ru: 'Бег 10 км' }, desc: { en: 'Outdoors', ru: 'На улице' } },
      { id: 'iron_legs_pistols', title: { en: 'Pistol Squats', ru: 'Пистолетики' }, desc: { en: '100 reps', ru: '100 повторений' } }
    ]
  },
  {
    id: 'spartan',
    title: { en: 'Spartan', ru: 'Спартанец' },
    desc: { en: '300 spartan pushups, 10 min L-sit hold total', ru: '300 спартанских отжиманий, 10 минут удержание L-sit (в сумме)' },
    quests: [
      { id: 'spartan_pushups', title: { en: 'Spartan Push-ups', ru: 'Спартанские отжимания' }, desc: { en: '300 reps', ru: '300 повторений' } },
      { id: 'spartan_lsit', title: { en: 'L-sit', ru: 'Уголок (L-sit)' }, desc: { en: '10 minutes total', ru: '10 минут в сумме' } }
    ]
  },
  {
    id: 'never_stop',
    title: { en: 'Never Stop', ru: 'Не останавливайся' },
    desc: { en: '21km run', ru: 'Полумарафон 21 км' },
    quests: [
      { id: 'never_stop_run', title: { en: 'Half Marathon', ru: 'Полумарафон 21 км' }, desc: { en: 'Continuous run', ru: 'Без остановок' } }
    ]
  }
];

export const RANKS: Record<Rank, RankConfig> = {
  F: {
    minDays: 28,
    requiredInventoryForNext: { en: 'Pull-up Bar', ru: 'Турник' },
    nextRank: 'E',
    quests: [
      { id: 'f_cardio', scheduleDays: [1, 2, 3, 4, 5, 6], title: { en: '3km Walk', ru: 'Ходьба 3 км' }, desc: { en: 'Any pace', ru: 'Любой темп' }, desc_phase2: { en: 'Fast pace', ru: 'Быстрый темп' }, desc_phase3: { en: '3km Run / Walk', ru: 'Бег / Ходьба 3 км' } },
      { id: 'f_pushups', scheduleDays: [1, 3, 5], title: { en: 'Pushups', ru: 'Отжимания от пола' }, desc: { en: '4 sets of 15', ru: '4х15' }, desc_phase2: { en: '4 sets of 17', ru: '4х17' }, desc_phase3: { en: '4 sets of 20', ru: '4х20' } },
      { id: 'f_squats', scheduleDays: [2, 4, 6], title: { en: 'Squats', ru: 'Приседания' }, desc: { en: '4 sets of 25', ru: '4х25' }, desc_phase2: { en: '4 sets of 27', ru: '4х27' }, desc_phase3: { en: '4 sets of 30', ru: '4х30' } },
      { id: 'f_plank', scheduleDays: [1, 3, 5], title: { en: 'Plank', ru: 'Планка' }, desc: { en: '3 sets of 60 sec', ru: '3х60 сек' }, desc_phase2: { en: '3 sets of 72 sec', ru: '3х72 сек' }, desc_phase3: { en: '3 sets of 90 sec', ru: '3х90 сек' } },
      { id: 'f_bicycle_crunches', scheduleDays: [2, 4, 6], title: { en: 'Bicycle Crunches', ru: 'Скручивания "Велосипед"' }, desc: { en: '3 sets of 20', ru: '3х20' }, desc_phase2: { en: '3 sets of 25', ru: '3х25' }, desc_phase3: { en: '3 sets of 30', ru: '3х30' } },
      { id: 'f_face_pulls', inventoryReq: 'resistance_bands', scheduleDays: [1, 3, 5], title: { en: 'Face Pulls', ru: 'Тяга эспандера к лицу' }, desc: { en: '3 sets of 15', ru: '3х15' }, desc_phase2: { en: '3 sets of 20', ru: '3х20' }, desc_phase3: { en: '3 sets of 25', ru: '3х25' } },
      { id: 'f_calf_raises', scheduleDays: [2, 4, 6], title: { en: 'Calf Raises', ru: 'Подъемы на носки' }, desc: { en: '4 sets of 25', ru: '4х25' }, desc_phase2: { en: '4 sets of 30', ru: '4х30' }, desc_phase3: { en: '4 sets of 35', ru: '4х35' } },
      { id: 'f_hollow', scheduleDays: [2, 4, 6], title: { en: 'Hollow Body Hold', ru: 'Удержание позиции Лодочка' }, desc: { en: '3 sets of 30 sec', ru: '3х30 сек' }, desc_phase2: { en: '3 sets of 40 sec', ru: '3х40 сек' }, desc_phase3: { en: '3 sets of 50 sec', ru: '3х50 сек' } },
      { id: 'f_band_pulls', inventoryReq: 'resistance_bands', scheduleDays: [1, 3, 5], title: { en: 'Band Pull Aparts', ru: 'Разведение с эспандером перед собой' }, desc: { en: '3 sets of 15', ru: '3х15' }, desc_phase2: { en: '3 sets of 20', ru: '3х20' }, desc_phase3: { en: '3 sets of 25', ru: '3х25' } }
    ],
    quests_f: [
      { id: 'f_cardio', scheduleDays: [1, 2, 3, 4, 5, 6], title: { en: '3km Walk', ru: 'Ходьба 3 км' }, desc: { en: 'Any pace', ru: 'Любой темп' }, desc_phase2: { en: 'Fast pace', ru: 'Быстрый темп' }, desc_phase3: { en: '3km Run / Walk', ru: 'Бег / Ходьба 3 км' } },
      { id: 'f_pushups_knee', scheduleDays: [1, 3, 5], title: { en: 'Knee Pushups', ru: 'Отжимания с колен' }, desc: { en: '4 sets of 15', ru: '4х15' }, desc_phase2: { en: '4 sets of 17', ru: '4х17' }, desc_phase3: { en: '4 sets of 20', ru: '4х20' } },
      { id: 'f_glute_bridge', scheduleDays: [1, 3, 5], title: { en: 'Glute Bridge', ru: 'Ягодичный мост' }, desc: { en: '4 sets of 20', ru: '4х20' }, desc_phase2: { en: '4 sets of 22', ru: '4х22' }, desc_phase3: { en: '4 sets of 25', ru: '4х25' } },
      { id: 'f_squats_pulse', scheduleDays: [2, 4, 6], title: { en: 'Pulse Squats', ru: 'Приседания с пульсацией' }, desc: { en: '4 sets of 25', ru: '4х25' }, desc_phase2: { en: '4 sets of 27', ru: '4х27' }, desc_phase3: { en: '4 sets of 30', ru: '4х30' } },
      { id: 'f_plank', scheduleDays: [2, 4, 6], title: { en: 'Plank', ru: 'Планка' }, desc: { en: '3 sets of 60 sec', ru: '3х60 сек' }, desc_phase2: { en: '3 sets of 72 sec', ru: '3х72 сек' }, desc_phase3: { en: '3 sets of 90 sec', ru: '3х90 сек' } },
      { id: 'f_bicycle_crunches', scheduleDays: [2, 4, 6], title: { en: 'Bicycle Crunches', ru: 'Скручивания "Велосипед"' }, desc: { en: '3 sets of 20', ru: '3х20' }, desc_phase2: { en: '3 sets of 25', ru: '3х25' }, desc_phase3: { en: '3 sets of 30', ru: '3х30' } },
      { id: 'f_face_pulls', inventoryReq: 'resistance_bands', scheduleDays: [1, 3, 5], title: { en: 'Face Pulls', ru: 'Тяга эспандера к лицу' }, desc: { en: '3 sets of 15', ru: '3х15' }, desc_phase2: { en: '3 sets of 20', ru: '3х20' }, desc_phase3: { en: '3 sets of 25', ru: '3х25' } },
      { id: 'f_calf_raises', scheduleDays: [2, 4, 6], title: { en: 'Calf Raises', ru: 'Подъемы на носки' }, desc: { en: '4 sets of 25', ru: '4х25' }, desc_phase2: { en: '4 sets of 30', ru: '4х30' }, desc_phase3: { en: '4 sets of 35', ru: '4х35' } },
      { id: 'f_hollow_f', scheduleDays: [2, 4, 6], title: { en: 'Hollow Body Hold', ru: 'Удержание позиции Лодочка' }, desc: { en: '3 sets of 20 sec', ru: '3х20 сек' }, desc_phase2: { en: '3 sets of 30 sec', ru: '3х30 сек' }, desc_phase3: { en: '3 sets of 40 sec', ru: '3х40 сек' } },
      { id: 'f_band_pulls_f', inventoryReq: 'resistance_bands', scheduleDays: [1, 3, 5], title: { en: 'Band Pull Aparts', ru: 'Разведение с эспандером перед собой' }, desc: { en: '3 sets of 15', ru: '3х15' }, desc_phase2: { en: '3 sets of 20', ru: '3х20' }, desc_phase3: { en: '3 sets of 25', ru: '3х25' } }
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
        { id: 'chal_f_1f', title: { en: 'Classic Pushups', ru: 'Классические отжимания от пола' }, count: 20 },
        { id: 'chal_f_2f', title: { en: 'Squats', ru: 'Приседания' }, count: 60 }
      ]
    }
  },
  E: {
    minDays: 28,
    requiredInventoryForNext: { en: 'Dips Bar', ru: 'Брусья' },
    nextRank: 'D',
    quests: [
      { id: 'e_cardio', scheduleDays: [1, 2, 3, 4, 5, 6], title: { en: '3km Run / Walk', ru: 'Бег / Ходьба 3 км' }, desc: { en: 'Any pace', ru: 'Любой темп' }, desc_phase2: { en: 'Steady pace', ru: 'Ровный темп' }, desc_phase3: { en: 'Fast pace', ru: 'Быстрый темп' } },
      { id: 'e_neg_pullups', inventoryReq: 'pullup_bar', scheduleDays: [1, 3, 5], title: { en: 'Negative Pullups', ru: 'Негативные подтягивания' }, desc: { en: '4 sets of 5', ru: '4х5' }, desc_phase2: { en: '4 sets of 7', ru: '4х7' }, desc_phase3: { en: '4 sets of 10', ru: '4х10' } },
      { id: 'e_diamond', scheduleDays: [1, 3, 5], title: { en: 'Diamond Pushups', ru: 'Алмазные отжимания' }, desc: { en: '3 sets of 12', ru: '3х12' }, desc_phase2: { en: '3 sets of 14', ru: '3х14' }, desc_phase3: { en: '3 sets of 17', ru: '3х17' } },
      { id: 'e_lunges', scheduleDays: [2, 4, 6], title: { en: 'Lunges', ru: 'Выпады' }, desc: { en: '4 sets of 20', ru: '4х20' }, desc_phase2: { en: '4 sets of 22', ru: '4х22' }, desc_phase3: { en: '4 sets of 25', ru: '4х25' } },
      { id: 'e_pike_pushups', scheduleDays: [1, 3, 5], title: { en: 'Pike Pushups', ru: 'Отжимания уголком (Pike Pushups)' }, desc: { en: '3 sets of 8', ru: '3х8' }, desc_phase2: { en: '3 sets of 10', ru: '3х10' }, desc_phase3: { en: '3 sets of 12', ru: '3х12' } },
      { id: 'e_ab_roller', inventoryReq: 'ab_roller', scheduleDays: [2, 4, 6], title: { en: 'Ab Roller (Knees)', ru: 'Выкатывания с роликом для пресса с колен' }, desc: { en: '3 sets of 10', ru: '3х10' }, desc_phase2: { en: '3 sets of 12', ru: '3х12' }, desc_phase3: { en: '3 sets of 15', ru: '3х15' } }
    ],
    quests_f: [
      { id: 'e_cardio', scheduleDays: [1, 2, 3, 4, 5, 6], title: { en: '3km Run / Walk', ru: 'Бег / Ходьба 3 км' }, desc: { en: 'Any pace', ru: 'Любой темп' }, desc_phase2: { en: 'Steady pace', ru: 'Ровный темп' }, desc_phase3: { en: 'Fast pace', ru: 'Быстрый темп' } },
      { id: 'e_aust_pulls', scheduleDays: [1, 3, 5], title: { en: 'Australian Pullups', ru: 'Австралийские подтягивания' }, desc: { en: '4 sets of 10', ru: '4х10' }, desc_phase2: { en: '4 sets of 12', ru: '4х12' }, desc_phase3: { en: '4 sets of 15', ru: '4х15' } },
      { id: 'e_pushups', scheduleDays: [1, 3, 5], title: { en: 'Classic Pushups', ru: 'Классические отжимания от пола' }, desc: { en: '4 sets of 12', ru: '4х12' }, desc_phase2: { en: '4 sets of 14', ru: '4х14' }, desc_phase3: { en: '4 sets of 17', ru: '4х17' } },
      { id: 'e_split_squats', scheduleDays: [2, 4, 6], title: { en: 'Bulgarian Split Squats', ru: 'Болгарские сплит-приседания' }, desc: { en: '4 sets of 15', ru: '4х15' }, desc_phase2: { en: '4 sets of 17', ru: '4х17' }, desc_phase3: { en: '4 sets of 20', ru: '4х20' } },
      { id: 'e_hyperext', scheduleDays: [2, 4, 6], title: { en: 'Floor Hyperextension', ru: 'Гиперэкстензия на полу (Супермен)' }, desc: { en: '3 sets of 15', ru: '3х15' }, desc_phase2: { en: '3 sets of 17', ru: '3х17' }, desc_phase3: { en: '3 sets of 20', ru: '3х20' } },
      { id: 'e_pike_pushups_f', scheduleDays: [1, 3, 5], title: { en: 'Pike Pushups', ru: 'Отжимания уголком (Pike Pushups)' }, desc: { en: '3 sets of 5', ru: '3х5' }, desc_phase2: { en: '3 sets of 7', ru: '3х7' }, desc_phase3: { en: '3 sets of 10', ru: '3х10' } },
      { id: 'e_ab_roller_f', inventoryReq: 'ab_roller', scheduleDays: [2, 4, 6], title: { en: 'Ab Roller (Knees)', ru: 'Выкатывания с роликом для пресса с колен' }, desc: { en: '3 sets of 8', ru: '3х8' }, desc_phase2: { en: '3 sets of 10', ru: '3х10' }, desc_phase3: { en: '3 sets of 12', ru: '3х12' } }
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
      { id: 'd_pullups', inventoryReq: 'pullup_bar', scheduleDays: [1, 3, 5], title: { en: 'Pullups', ru: 'Подтягивания прямым хватом' }, desc: { en: '4 sets of 8', ru: '4х8' }, desc_phase2: { en: '4 sets of 10', ru: '4х10' }, desc_phase3: { en: '4 sets of 13', ru: '4х13' } },
      { id: 'd_dips', inventoryReq: 'dip_station', scheduleDays: [1, 3, 5], title: { en: 'Dips', ru: 'Отжимания на брусьях' }, desc: { en: '4 sets of 12', ru: '4х12' }, desc_phase2: { en: '4 sets of 14', ru: '4х14' }, desc_phase3: { en: '4 sets of 17', ru: '4х17' } },
      { id: 'd_run_5k', scheduleDays: [1, 2, 3, 4, 5, 6], title: { en: '5km Run / Walk', ru: 'Бег / Ходьба 5 км' }, desc: { en: 'Outdoors, steady pace', ru: 'На улице, ровный темп' } },
      { id: 'd_single_leg_rdl', scheduleDays: [2, 4, 6], title: { en: 'Single Leg RDL', ru: 'Румынская тяга на одной ноге' }, desc: { en: '3 sets of 12', ru: '3х12' }, desc_phase2: { en: '3 sets of 15', ru: '3х15' }, desc_phase3: { en: '3 sets of 20', ru: '3х20' } },
      { id: 'd_hanging_knee_raises', inventoryReq: 'pullup_bar', scheduleDays: [1, 3, 5], title: { en: 'Hanging Knee Raises', ru: 'Подъемы коленей в висе' }, desc: { en: '3 sets of 10', ru: '3х10' }, desc_phase2: { en: '3 sets of 12', ru: '3х12' }, desc_phase3: { en: '3 sets of 15', ru: '3х15' } },
    ],
    quests_f: [
      { id: 'd_band_pulls', scheduleDays: [1, 3, 5], title: { en: 'Band Pullups', ru: 'Подтягивания с резинкой' }, desc: { en: '4 sets of 8', ru: '4х8' }, desc_phase2: { en: '4 sets of 10', ru: '4х10' }, desc_phase3: { en: '4 sets of 13', ru: '4х13' } },
      { id: 'd_close_pushups', scheduleDays: [1, 3, 5], title: { en: 'Close Grip Pushups', ru: 'Алмазные отжимания' }, desc: { en: '4 sets of 12', ru: '4х12' }, desc_phase2: { en: '4 sets of 14', ru: '4х14' }, desc_phase3: { en: '4 sets of 17', ru: '4х17' } },
      { id: 'd_jump_lunges', scheduleDays: [2, 4, 6], title: { en: 'Jump Lunges', ru: 'Выпады со сменой ног в прыжке' }, desc: { en: '3 sets of 20', ru: '3х20' }, desc_phase2: { en: '3 sets of 22', ru: '3х22' }, desc_phase3: { en: '3 sets of 25', ru: '3х25' } },
      { id: 'd_run_5k_f', scheduleDays: [1, 2, 3, 4, 5, 6], title: { en: '5km Run', ru: 'Бег 5 км' }, desc: { en: 'Steady pace', ru: 'Ровный темп' } },
      { id: 'd_single_leg_rdl_f', scheduleDays: [2, 4, 6], title: { en: 'Single Leg RDL', ru: 'Румынская тяга на одной ноге' }, desc: { en: '3 sets of 12', ru: '3х12' }, desc_phase2: { en: '3 sets of 15', ru: '3х15' }, desc_phase3: { en: '3 sets of 20', ru: '3х20' } },
      { id: 'd_hanging_knee_raises_f', inventoryReq: 'pullup_bar', scheduleDays: [1, 3, 5], title: { en: 'Hanging Knee Raises', ru: 'Подъемы коленей в висе' }, desc: { en: '3 sets of 10', ru: '3х10' }, desc_phase2: { en: '3 sets of 12', ru: '3х12' }, desc_phase3: { en: '3 sets of 15', ru: '3х15' } },
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
      { id: 'c_mixed_pulls', inventoryReq: 'pullup_bar', scheduleDays: [1, 3, 5], title: { en: 'Mixed Grip Pullups', ru: 'Подтягивания разными хватами' }, desc: { en: '5 sets of 10', ru: '5х10' }, desc_phase2: { en: '5 sets of 12', ru: '5х12' }, desc_phase3: { en: '5 sets of 15', ru: '5х15' } },
      { id: 'c_dips', inventoryReq: 'dip_station', scheduleDays: [1, 3, 5], title: { en: 'Dips', ru: 'Отжимания на брусьях' }, desc: { en: '5 sets of 15', ru: '5х15' }, desc_phase2: { en: '5 sets of 17', ru: '5х17' }, desc_phase3: { en: '5 sets of 20', ru: '5х20' } },
      { id: 'c_run', scheduleDays: [1, 2, 3, 4, 5, 6], title: { en: '5km Run', ru: 'Бег 5 км' }, desc: { en: 'Outdoors, fast pace', ru: 'На улице, быстрый темп' } }
    ],
    quests_f: [
      { id: 'c_chin_ups', inventoryReq: 'pullup_bar', scheduleDays: [1, 3, 5], title: { en: 'Chin-ups', ru: 'Подтягивания обратным хватом' }, desc: { en: '4 sets of 5', ru: '4х5' }, desc_phase2: { en: '4 sets of 7', ru: '4х7' }, desc_phase3: { en: '4 sets of 10', ru: '4х10' } },
      { id: 'c_close_pushups', scheduleDays: [1, 3, 5], title: { en: 'Close Grip Pushups', ru: 'Алмазные отжимания' }, desc: { en: '4 sets of 15', ru: '4х15' }, desc_phase2: { en: '4 sets of 17', ru: '4х17' }, desc_phase3: { en: '4 sets of 20', ru: '4х20' } },
      { id: 'c_jump_lunges', scheduleDays: [2, 4, 6], title: { en: 'Jump Lunges', ru: 'Выпады со сменой ног в прыжке' }, desc: { en: '4 sets of 20', ru: '4х20' }, desc_phase2: { en: '4 sets of 22', ru: '4х22' }, desc_phase3: { en: '4 sets of 25', ru: '4х25' } },
      { id: 'c_run_f', scheduleDays: [1, 2, 3, 4, 5, 6], title: { en: '5km Run', ru: 'Бег 5 км' }, desc: { en: 'Fast pace', ru: 'Быстрый темп' } }
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
      { id: 'b_mu_prep', inventoryReq: 'pullup_bar', scheduleDays: [1, 3, 5], title: { en: 'Muscle-ups Prep', ru: 'Подводящие к выходу силой на две руки' }, desc: { en: 'High pullups 4x8', ru: 'Высокие подтягивания 4х8' } },
      { id: 'b_clap_pushups', scheduleDays: [1, 3, 5], title: { en: 'Clapping Pushups', ru: 'Отжимания с хлопком' }, desc: { en: '4 sets of 15', ru: '4х15' }, desc_phase2: { en: '4 sets of 17', ru: '4х17' }, desc_phase3: { en: '4 sets of 20', ru: '4х20' } },
      { id: 'b_pistols', scheduleDays: [2, 4, 6], title: { en: 'Pistol Squats', ru: 'Приседания на одной ноге (Пистолетики)' }, desc: { en: '3 sets of 8 / leg', ru: '3х8 на ногу' }, desc_phase2: { en: '3 sets of 10 / leg', ru: '3х10 на ногу' }, desc_phase3: { en: '3 sets of 13 / leg', ru: '3х13 на ногу' } }
    ],
    quests_f: [
      { id: 'b_run', scheduleDays: [1, 2, 3, 4, 5, 6], title: { en: '8km Run', ru: 'Бег 8 км' }, desc: { en: 'Steady pace', ru: 'Ровный темп' }, desc_phase2: { en: 'Fast pace', ru: 'Быстрый темп' }, desc_phase3: { en: 'Personal Best pace', ru: 'Максимальный темп' } },
      { id: 'b_strict_pulls', inventoryReq: 'pullup_bar', scheduleDays: [1, 3, 5], title: { en: 'Strict Pullups', ru: 'Строгие подтягивания' }, desc: { en: '4 sets of 6', ru: '4х6' }, desc_phase2: { en: '4 sets of 8', ru: '4х8' }, desc_phase3: { en: '4 sets of 11', ru: '4х11' } },
      { id: 'b_lsit', scheduleDays: [1, 3, 5], title: { en: 'L-sit', ru: 'Уголок (L-sit)' }, desc: { en: '4 sets of 15 sec', ru: '4х15 сек' }, desc_phase2: { en: '4 sets of 27 sec', ru: '4х27 сек' }, desc_phase3: { en: '4 sets of 45 sec', ru: '4х45 сек' } },
      { id: 'b_box_jumps', scheduleDays: [2, 4, 6], title: { en: 'Explosive Jumps', ru: 'Взрывные запрыгивания' }, desc: { en: '4 sets of 15', ru: '4х15' }, desc_phase2: { en: '4 sets of 17', ru: '4х17' }, desc_phase3: { en: '4 sets of 20', ru: '4х20' } },
      { id: 'b_windshield_wipers', inventoryReq: 'pullup_bar', scheduleDays: [1, 3, 5], title: { en: 'Windshield Wipers', ru: '"Дворники"' }, desc: { en: '3 sets of 10', ru: '3х10' }, desc_phase2: { en: '3 sets of 12', ru: '3х12' }, desc_phase3: { en: '3 sets of 15', ru: '3х15' } },
      { id: 'b_assisted_pistols', scheduleDays: [2, 4, 6], title: { en: 'Assisted Pistols', ru: 'Пистолетики с опорой' }, desc: { en: '4 sets of 8 / leg', ru: '4х8 на ногу' }, desc_phase2: { en: '4 sets of 10 / leg', ru: '4х10 на ногу' }, desc_phase3: { en: '4 sets of 13 / leg', ru: '4х13 на ногу' } },
      { id: 'b_windshield_wipers_f', scheduleDays: [1, 3, 5], title: { en: 'Windshield Wipers', ru: '"Дворники"' }, desc: { en: '3 sets of 8', ru: '3х8' }, desc_phase2: { en: '3 sets of 10', ru: '3х10' }, desc_phase3: { en: '3 sets of 12', ru: '3х12' } },
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
      { id: 'a_mu', inventoryReq: 'pullup_bar', scheduleDays: [1, 3, 5], title: { en: 'Muscle-ups', ru: 'Выходы силой' }, desc: { en: '5 sets of 3', ru: '5х3' }, desc_phase2: { en: '5 sets of 5', ru: '5х5' }, desc_phase3: { en: '5 sets of 8', ru: '5х8' } },
      { id: 'a_hspu', scheduleDays: [1, 3, 5], title: { en: 'HSPU', ru: 'Отжимания в стойке на руках у стены (HSPU)' }, desc: { en: '4 sets of 8', ru: '4х8' }, desc_phase2: { en: '4 sets of 10', ru: '4х10' }, desc_phase3: { en: '4 sets of 13', ru: '4х13' } },
      { id: 'a_pistols', scheduleDays: [2, 4, 6], title: { en: 'Strict Pistols', ru: 'Строгие пистолетики' }, desc: { en: '4 sets of 10 / leg', ru: '4х10 на ногу' }, desc_phase2: { en: '4 sets of 12 / leg', ru: '4х12 на ногу' }, desc_phase3: { en: '4 sets of 15 / leg', ru: '4х15 на ногу' } },
      { id: 'a_nordic_curls', scheduleDays: [2, 4, 6], title: { en: 'Nordic Curls', ru: 'Нордические сгибания' }, desc: { en: '3 sets of 5', ru: '3х5' }, desc_phase2: { en: '3 sets of 6', ru: '3х6' }, desc_phase3: { en: '3 sets of 8', ru: '3х8' } }
    ],
    quests_f: [
      { id: 'a_run', scheduleDays: [1, 2, 3, 4, 5, 6], title: { en: '10km Run', ru: 'Бег 10 км' }, desc: { en: 'Steady pace', ru: 'Ровный темп' }, desc_phase2: { en: 'Fast pace', ru: 'Быстрый темп' }, desc_phase3: { en: 'Personal Best pace', ru: 'Максимальный темп' } },
      { id: 'a_strict_pulls_f', inventoryReq: 'pullup_bar', scheduleDays: [1, 3, 5], title: { en: 'Strict Pullups', ru: 'Строгие подтягивания' }, desc: { en: '4 sets of 8', ru: '4х8' }, desc_phase2: { en: '4 sets of 10', ru: '4х10' }, desc_phase3: { en: '4 sets of 13', ru: '4х13' } },
      { id: 'a_lsit_f', scheduleDays: [1, 3, 5], title: { en: 'L-sit', ru: 'Уголок (L-sit)' }, desc: { en: '4 sets of 20 sec', ru: '4х20 сек' }, desc_phase2: { en: '4 sets of 32 sec', ru: '4х32 сек' }, desc_phase3: { en: '4 sets of 50 sec', ru: '4х50 сек' } },
      { id: 'a_box_jumps_f', scheduleDays: [2, 4, 6], title: { en: 'Explosive Jumps', ru: 'Взрывные запрыгивания' }, desc: { en: '4 sets of 20', ru: '4х20' }, desc_phase2: { en: '4 sets of 22', ru: '4х22' }, desc_phase3: { en: '4 sets of 25', ru: '4х25' } },
      { id: 'a_pistols_f', scheduleDays: [2, 4, 6], title: { en: 'Assisted Pistols', ru: 'Пистолетики с опорой' }, desc: { en: '4 sets of 12 / leg', ru: '4х12 на ногу' }, desc_phase2: { en: '4 sets of 14 / leg', ru: '4х14 на ногу' }, desc_phase3: { en: '4 sets of 17 / leg', ru: '4х17 на ногу' } },
      { id: 'a_nordic_curls_f', scheduleDays: [2, 4, 6], title: { en: 'Nordic Curls', ru: 'Нордические сгибания' }, desc: { en: '3 sets of 5', ru: '3х5' }, desc_phase2: { en: '3 sets of 6', ru: '3х6' }, desc_phase3: { en: '3 sets of 8', ru: '3х8' } }
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
      { id: 's_weighted_pulls', inventoryReq: 'weight_vest', scheduleDays: [1, 3, 5], title: { en: 'Weighted Pullups (+15kg)', ru: 'Подтягивания на турнике с доп. весом (+15кг)' }, desc: { en: '5 sets of 5', ru: '5х5' }, desc_phase2: { en: '5 sets of 7', ru: '5х7' }, desc_phase3: { en: '5 sets of 10', ru: '5х10' } },
      { id: 's_ring_mu', inventoryReq: 'rings', scheduleDays: [1, 3, 5], title: { en: 'Ring Muscle-ups', ru: 'Выходы силой на кольцах' }, desc: { en: '4 sets of 3', ru: '4х3' }, desc_phase2: { en: '4 sets of 5', ru: '4х5' }, desc_phase3: { en: '4 sets of 8', ru: '4х8' } },
      { id: 's_weighted_pistols', inventoryReq: 'weight_vest', scheduleDays: [2, 4, 6], title: { en: 'Weighted Pistols (+15kg)', ru: 'Пистолетики с весом (+15кг)' }, desc: { en: '3 sets of 8 / leg', ru: '3х8 на ногу' }, desc_phase2: { en: '3 sets of 10 / leg', ru: '3х10 на ногу' }, desc_phase3: { en: '3 sets of 13 / leg', ru: '3х13 на ногу' } }
    ],
    quests_f: [
      { id: 's_run', scheduleDays: [1, 2, 3, 4, 5, 6], title: { en: '10km Run', ru: 'Бег 10 км' }, desc: { en: 'Fast pace', ru: 'Быстрый темп' }, desc_phase2: { en: 'Weighted (+5kg)', ru: 'С доп. весом (+5кг)' }, desc_phase3: { en: 'Weighted (+10kg)', ru: 'С доп. весом (+10кг)' } },
      { id: 's_weighted_pulls_f', scheduleDays: [1, 3, 5], title: { en: 'Weighted Pullups (+5kg)', ru: 'Подтягивания на турнике с доп. весом (+5кг)' }, desc: { en: '5 sets of 5', ru: '5х5' }, desc_phase2: { en: '5 sets of 7', ru: '5х7' }, desc_phase3: { en: '5 sets of 10', ru: '5х10' } },
      { id: 's_ring_rows_f', inventoryReq: 'rings', scheduleDays: [1, 3, 5], title: { en: 'Ring Rows', ru: 'Горизонтальные подтягивания на кольцах' }, desc: { en: '4 sets of 12', ru: '4х12' }, desc_phase2: { en: '4 sets of 14', ru: '4х14' }, desc_phase3: { en: '4 sets of 17', ru: '4х17' } },
      { id: 's_weighted_pistols_f', scheduleDays: [2, 4, 6], title: { en: 'Weighted Pistols (+5kg)', ru: 'Пистолетики с весом (+5кг)' }, desc: { en: '3 sets of 8 / leg', ru: '3х8 на ногу' }, desc_phase2: { en: '3 sets of 10 / leg', ru: '3х10 на ногу' }, desc_phase3: { en: '3 sets of 13 / leg', ru: '3х13 на ногу' } }
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
export const ACHIEVEMENTS = [
  { id: 'first_blood', title: { en: 'First Blood', ru: 'Первая кровь' }, description: { en: 'Complete your first daily quest.', ru: 'Выполнить первый ежедневный квест.' } },
  { id: 'streak_3_days', title: { en: 'Warming Up', ru: 'Разминка' }, description: { en: 'Maintain a 3-day streak.', ru: 'Удержать серию из 3 дней.' } },
  { id: 'streak_7_days', title: { en: 'Iron Will', ru: 'Железная воля' }, description: { en: 'Maintain a 7-day streak.', ru: 'Удержать серию из 7 дней.' } },
  { id: 'streak_30_days', title: { en: 'Unstoppable', ru: 'Неудержимость' }, description: { en: 'Maintain a 30-day streak.', ru: 'Удержать серию из 30 дней.' } },
  { id: 'rank_e', title: { en: 'Out of the Mud', ru: 'Из грязи в князи' }, description: { en: 'Reach Rank E.', ru: 'Достичь ранга E.' } },
  { id: 'rank_d', title: { en: 'Rising Star', ru: 'Восходящая звезда' }, description: { en: 'Reach Rank D.', ru: 'Достичь ранга D.' } },
  { id: 'rank_c', title: { en: 'Serious Business', ru: 'Серьезный настрой' }, description: { en: 'Reach Rank C.', ru: 'Достичь ранга C.' } },
];

export const TROPHIES = [
  { id: 't_calories_1', tier: 'wood', title: { en: 'Spark', ru: 'Искра' }, desc: { en: 'Burn 1,000 kcal', ru: 'Сжечь 1,000 ккал' }, req: { type: 'calories', count: 1000 } },
  { id: 't_calories_2', tier: 'iron', title: { en: 'Furnace', ru: 'Печь' }, desc: { en: 'Burn 10,000 kcal', ru: 'Сжечь 10,000 ккал' }, req: { type: 'calories', count: 10000 } },
  { id: 't_calories_3', tier: 'silver', title: { en: 'Human Torch', ru: 'Человек-Факел' }, desc: { en: 'Burn 50,000 kcal', ru: 'Сжечь 50,000 ккал' }, req: { type: 'calories', count: 50000 } },
  { id: 't_calories_4', tier: 'gold', title: { en: 'Supernova', ru: 'Сверхновая' }, desc: { en: 'Burn 100,000 kcal', ru: 'Сжечь 100,000 ккал' }, req: { type: 'calories', count: 100000 } },
  { id: 't_calories_5', tier: 'diamond', title: { en: 'Star Core', ru: 'Ядро Звезды' }, desc: { en: 'Burn 250,000 kcal', ru: 'Сжечь 250,000 ккал' }, req: { type: 'calories', count: 250000 } },
  { id: 't_calories_6', tier: 'legend', title: { en: 'Big Bang', ru: 'Большой Взрыв' }, desc: { en: 'Burn 1,000,000 kcal', ru: 'Сжечь 1,000,000 ккал' }, req: { type: 'calories', count: 1000000 } },
  { id: 't_bmi_1', tier: 'bronze', title: { en: 'Optimal Shape', ru: 'Оптимальная Форма' }, desc: { en: 'Reach Normal BMI (18.5 - 24.9)', ru: 'Достичь Нормального ИМТ (18.5 - 24.9)' }, req: { type: 'bmi_normal' } },

  { id: 't_wood_1', tier: 'wood', title: { en: 'First Blood', ru: 'Первая кровь' }, desc: { en: 'Complete your first workout', ru: 'Сделать 1 тренировку' }, req: { type: 'workouts', count: 1 } },
  { id: 't_wood_2', tier: 'wood', title: { en: 'Awakening', ru: 'Пробуждение' }, desc: { en: 'Reach Rank E', ru: 'Достичь ранга E' }, req: { type: 'rank', rank: 'E' } },
  { id: 't_wood_3', tier: 'wood', title: { en: 'Half Marathon', ru: 'Полумарафон' }, desc: { en: 'Run 21 km total', ru: 'Пробежать 21 км суммарно' }, req: { type: 'run_km', count: 21 } },
  
  { id: 't_copper_1', tier: 'copper', title: { en: 'Consistency', ru: 'Постоянство' }, desc: { en: 'Reach a 7-day streak', ru: 'Стрик 7 дней' }, req: { type: 'streak', count: 7 } },
  { id: 't_copper_2', tier: 'copper', title: { en: 'Pedometer', ru: 'Шагомер' }, desc: { en: 'Run 50 km total', ru: '50 км суммарно' }, req: { type: 'run_km', count: 50 } },
  { id: 't_copper_3', tier: 'copper', title: { en: 'Rising Star', ru: 'Восходящая звезда' }, desc: { en: 'Reach Rank D', ru: 'Достичь ранга D' }, req: { type: 'rank', rank: 'D' } },

  { id: 't_iron_1', tier: 'iron', title: { en: 'Month in Game', ru: 'Месяц в игре' }, desc: { en: 'Reach a 30-day streak', ru: 'Стрик 30 дней' }, req: { type: 'streak', count: 30 } },
  { id: 't_iron_2', tier: 'iron', title: { en: 'Iron Chest', ru: 'Стальная броня' }, desc: { en: '1000 pushups total', ru: '1000 отжиманий суммарно' }, req: { type: 'pushups', count: 1000 } },
  { id: 't_iron_3', tier: 'iron', title: { en: 'Serious Business', ru: 'Серьезный настрой' }, desc: { en: 'Reach Rank C', ru: 'Достичь ранга C' }, req: { type: 'rank', rank: 'C' } },

  { id: 't_bronze_1', tier: 'bronze', title: { en: 'Warrior', ru: 'Воин' }, desc: { en: 'Reach Rank B', ru: 'Достичь ранга B' }, req: { type: 'rank', rank: 'B' } },
  { id: 't_bronze_2', tier: 'bronze', title: { en: 'Gravity', ru: 'Сила притяжения' }, desc: { en: '500 pullups total', ru: '500 подтягиваний суммарно' }, req: { type: 'pullups', count: 500 } },

  { id: 't_silver_1', tier: 'silver', title: { en: 'Steel Will', ru: 'Стальная воля' }, desc: { en: 'Reach a 100-day streak', ru: 'Стрик 100 дней' }, req: { type: 'streak', count: 100 } },
  { id: 't_silver_2', tier: 'silver', title: { en: 'Runner', ru: 'Бегун' }, desc: { en: 'Run 500 km total', ru: '500 км суммарно' }, req: { type: 'run_km', count: 500 } },

  { id: 't_gold_1', tier: 'gold', title: { en: 'Body Mastery', ru: 'Мастерство тела' }, desc: { en: 'Reach Rank A', ru: 'Достичь ранга A' }, req: { type: 'rank', rank: 'A' } },
  { id: 't_gold_2', tier: 'gold', title: { en: 'Sparta', ru: 'Спарта' }, desc: { en: '10,000 pushups total', ru: '10,000 отжиманий суммарно' }, req: { type: 'pushups', count: 10000 } },

  { id: 't_platinum_1', tier: 'platinum', title: { en: 'Year without Excuses', ru: 'Год без отговорок' }, desc: { en: 'Reach a 365-day streak', ru: 'Стрик 365 дней' }, req: { type: 'streak', count: 365 } },

  { id: 't_diamond_1', tier: 'diamond', title: { en: 'Grandmaster', ru: 'Грандмастер' }, desc: { en: 'Reach Rank S', ru: 'Достичь ранга S' }, req: { type: 'rank', rank: 'S' } },
  { id: 't_diamond_2', tier: 'diamond', title: { en: 'Equator', ru: 'Экватор' }, desc: { en: 'Run 1000 km total', ru: '1000 км суммарно' }, req: { type: 'run_km', count: 1000 } },

  { id: 't_legend_1', tier: 'legend', title: { en: 'Path to the River', ru: 'Путь к реке' }, desc: { en: 'Run 10,000 km total', ru: '10,000 км суммарно' }, req: { type: 'run_km', count: 10000 } },
  { id: 't_legend_2', tier: 'legend', title: { en: 'Anti-Gravity', ru: 'Анти-Гравитация' }, desc: { en: '100,000 pushups total', ru: '100,000 отжиманий суммарно' }, req: { type: 'pushups', count: 100000 } },
  { id: 't_legend_3', tier: 'legend', title: { en: 'Absolute', ru: 'Абсолют' }, desc: { en: 'Complete all 5 SSR challenges', ru: 'Выполнить ВСЕ 5 случайных SSR-испытаний' }, req: { type: 'ssr_all' } },
  { id: 't_legend_4', tier: 'legend', title: { en: 'God of Calisthenics', ru: 'Бог Калистеники' }, desc: { en: 'Reach Rank SSR', ru: 'Достичь ранга SSR' }, req: { type: 'rank', rank: 'SSR' } }
];

export const UI = {
  en: {
    dashboard_title: 'RankUp Dashboard',
    path_to: 'Path to',
    status: 'Status',
    xp: 'Experience Points',
    time_in_rank: 'Time in Rank',
    days: 'DAYS',
    todays_quests: "Today's Quests",
    completed: 'Completed',
    claim: 'Claim',
    locked: 'Locked',
    challenge_active: 'Challenge Active',
    promotion: 'PROMOTION',
    rank_up_eval: 'Rank Up Evaluation',
    try_level_up: 'Try to Level Up',
    days_remaining: 'Days Remaining',
    trophy_room: 'Trophy Room',
    your_achievements: 'Your Achievements',
    config: 'Config',
    manage_data: 'Manage Data',
    data_management: 'Data Management',
    export_backup: 'Export Backup (.json)',
    import_backup: 'Import Backup',
    danger_zone: 'Danger Zone',
    reset_progress: 'Reset All Progress',
    system_locked: 'System Locked',
    return_to_base: 'Return to Base',
    evaluation_mode: 'Evaluation Mode',
    start_timer: 'Start Timer',
    complete_eval: 'Complete Evaluation',
    objectives: 'Objectives',
    home: 'Home',
    trophies: 'Trophies',
    statistics: 'Stats',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    age: 'Age',
    height: 'Height (cm)',
    weight: 'Weight (kg)',
    current_level: 'Current Level',
    level_novice: 'Novice',
    level_novice_desc: 'Starting from scratch',
    level_experienced: 'Experienced',
    level_experienced_desc: 'Returning to form',
    level_veteran: 'Veteran',
    level_veteran_desc: 'Just need the system',
    inventory: 'Available Inventory (Optional)',
    pullup_bar: 'Pull-up Bar',
    dip_station: 'Dip Station',
    dumbbells: 'Dumbbells / Kettlebells',
    rings: 'Gymnastic Rings',
    resistance_bands: 'Resistance Bands',
    jump_rope: 'Jump Rope',
    weight_vest: 'Weight Vest',
    ab_roller: 'Ab Roller',
    yoga_mat: 'Yoga Mat',
    initialize: 'Initialize System',
    proceed: 'Proceed',
    establish_baseline: 'Establish your',
    baseline: 'Baseline',
    rank: 'Rank',
    day_streak: 'Day Streak',
    language: 'Language',
    confirm_reset: 'Are you absolutely sure you want to reset all progress? This action cannot be undone.',
    import_success: 'Data imported successfully!',
    import_error: 'Invalid backup file structure.',
    import_parse_error: 'Error parsing JSON file.',
    test: 'Test',
    fail_desc_1: 'You failed the recent evaluation. Neural pathways need recovery. Next attempt available in roughly ',
    fail_desc_2: 'h',
    rest_day_select: 'Choose a Rest Day',
    sunday: 'Sunday',
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    rest_quest_title: 'Full Recovery and Rest',
    penalty_title: 'Training Missed!',
    penalty_partial: "You didn't complete all quests. Streak reset to 0.",
    penalty_full: 'You missed your training! Streak reset to 0, rank progress reduced by 2 days.',
    debug_mode: 'Debug Mode',
    force_phase: 'Force Phase',
    force_rank: 'Force Rank',
    simulate_day: 'Simulate Day of Week',
    test_level_up: 'Test Level Up',
    challenge_yourself: 'Challenge Yourself',
    challenge_accepted: 'Challenge Accepted!',
    required_inventory: 'Required Inventory for Next Rank',
    phase_i: 'Phase I: Awakening',
    phase_ii: 'Phase II: Tempering',
    phase_iii: 'Phase III: Limit',
    week_days: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  },
  ru: {
    dashboard_title: 'Трекер RankUp',
    path_to: 'Путь к',
    status: 'Статусу',
    xp: 'Очки Опыта',
    time_in_rank: 'Дней в ранге',
    days: 'ДНЕЙ',
    todays_quests: 'Задания на сегодня',
    completed: 'Выполнено',
    claim: 'Забрать',
    locked: 'Заблокировано',
    challenge_active: 'Испытание Доступно',
    promotion: 'ПОВЫШЕНИЕ',
    rank_up_eval: 'Экзамен на Повышение',
    try_level_up: 'Начать Испытание',
    days_remaining: 'Дней осталось',
    trophy_room: 'Зал Славы',
    your_achievements: 'Твои Достижения',
    config: 'Настройки',
    manage_data: 'Управление Данными',
    data_management: 'Хранение',
    export_backup: 'Экспорт Прогресса (.json)',
    import_backup: 'Импорт Прогресса',
    danger_zone: 'Опасная Зона',
    reset_progress: 'Сбросить Весь Прогресс',
    system_locked: 'Система Заблокирована',
    return_to_base: 'Вернуться на Базу',
    evaluation_mode: 'Режим Экзамена',
    start_timer: 'Запустить Таймер',
    complete_eval: 'Завершить Испытание',
    objectives: 'Цели',
    home: 'Главная',
    trophies: 'Трофеи',
    statistics: 'Статистика',
    gender: 'Пол',
    male: 'Мужской',
    female: 'Женский',
    age: 'Возраст',
    height: 'Рост (см)',
    weight: 'Вес (кг)',
    current_level: 'Текущий Уровень',
    level_novice: 'Новичок',
    level_novice_desc: 'Никогда особо не тренировался',
    level_experienced: 'Был опыт',
    level_experienced_desc: 'Раньше занимался, хочу вернуться',
    level_veteran: 'Ветеран',
    level_veteran_desc: 'Знаю что делать, нужна система',
    inventory: 'Инвентарь (Опционально)',
    pullup_bar: 'Турник',
    dip_station: 'Брусья',
    dumbbells: 'Гантели / Гири',
    rings: 'Кольца гимнастические',
    resistance_bands: 'Фитнес-резинки (Эспандеры)',
    jump_rope: 'Скакалка',
    weight_vest: 'Утяжелительный жилет',
    ab_roller: 'Ролик для пресса',
    yoga_mat: 'Коврик для фитнеса',
    initialize: 'Инициализация Системы',
    proceed: 'Продолжить',
    establish_baseline: 'Установи свою',
    baseline: 'Базу',
    rank: 'Ранг',
    day_streak: 'Дней Подряд',
    language: 'Язык',
    confirm_reset: 'Вы абсолютно уверены, что хотите сбросить весь прогресс? Это действие нельзя отменить.',
    import_success: 'Данные успешно импортированы!',
    import_error: 'Неверная структура файла резервной копии.',
    import_parse_error: 'Ошибка при чтении JSON файла.',
    test: 'Тест',
    fail_desc_1: 'Испытание провалено. Нейронным путям требуется восстановление. Следующая попытка примерно через ',
    fail_desc_2: 'ч',
    rest_day_select: 'Выбери день полного отдыха',
    sunday: 'Воскресенье',
    monday: 'Понедельник',
    tuesday: 'Вторник',
    wednesday: 'Среда',
    thursday: 'Четверг',
    friday: 'Пятница',
    saturday: 'Суббота',
    rest_quest_title: 'Полное восстановление и отдых',
    penalty_title: 'Тренировка пропущена!',
    penalty_partial: 'Вы не выполнили все задания. Стрик сброшен до 0.',
    penalty_full: 'Вы пропустили день! Стрик сброшен до 0, прогресс ранга уменьшен на 2 дня.',
    debug_mode: 'Режим Отладки',
    force_phase: 'Сменить фазу',
    force_rank: 'Сменить ранг',
    simulate_day: 'Симуляция дня недели',
    test_level_up: 'Тест Испытания',
    challenge_yourself: 'Брось себе вызов',
    challenge_accepted: 'Вызов принят!',
    required_inventory: 'Требуемый инвентарь для следующего ранга',
    phase_i: 'Фаза I: Пробуждение',
    phase_ii: 'Фаза II: Закалка',
    phase_iii: 'Фаза III: Предел',
    week_days: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
  }
};
