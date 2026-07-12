export type Rank = 'F' | 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'SSR';

export interface UserProfile {
  gender: 'male' | 'female' | 'other';
  age: number;
  height: number; // cm
  weight: number; // kg
  inventory: string[];
  restDay: number; // 0-6 (0 = Sunday)
  trainingDays?: number[];
  selectedTitle?: string;
}

export interface DailyQuest {
  id: string;
  completed: boolean;
  date: string; // YYYY-MM-DD
  isCustom?: boolean;
  customTitle?: { en: string, ru: string };
  customDesc?: { en: string, ru: string };
  originalId?: string;
  currentSets?: number;
}

export interface Progress {
  currentRank: Rank;
  currentPhase?: 1 | 2 | 3;
  phaseStartDate?: string;
  rankStartDate: string; // YYYY-MM-DD
  currentStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
  failedChallengeTimestamp?: number; // timestamp in ms
  ssrChallengeDate?: string;
  ssrChallengeId?: string;
  ssrChallengeCompleted?: boolean;
}

export interface AppStats {
  workoutsCompleted: number;
  pushupsTotal: number;
  pullupsTotal: number;
  runKmTotal: number;
  caloriesBurnedTotal?: number;
  ssrChallengesCompleted: string[];
  activityHistory?: string[];
  activityLog?: Record<string, 'full' | 'partial' | 'missed' | 'rest'>;
}

export interface AppState {
  user: UserProfile | null;
  progress: Progress;
  dailyQuests: DailyQuest[];
  achievements: string[];
  stats: AppStats;
  language: 'ru' | 'en';
  penaltyAlert?: 'partial' | 'full' | null;
  debugDayOverride?: number;
  lastGeneratedDate?: string;
  lastGeneratedDay?: number;
  lastGeneratedRank?: string;
}

