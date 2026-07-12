const fs = require('fs');
let fileStr = fs.readFileSync('src/components/LevelUpChallenge.tsx', 'utf8');

const regexProps = /interface LevelUpChallengeProps \{.*?onCancel: \(\) => void;\n\}/s;
fileStr = fileStr.replace(regexProps, `interface LevelUpChallengeProps {
  state: AppState;
  onSuccess: (newRank: any) => void;
  onFail: () => void;
  onCancel: () => void;
  examType?: 'rank' | 'phase2' | 'phase3';
}`);

const regexComp = /export function LevelUpChallenge\(\{ state, onSuccess, onFail, onCancel \}: LevelUpChallengeProps\) \{/;
fileStr = fileStr.replace(regexComp, "export function LevelUpChallenge({ state, onSuccess, onFail, onCancel, examType = 'rank' }: LevelUpChallengeProps) {");

const regexChal = /const challenge = \(state\.user\?\.gender === 'female' && currentRankConfig\.challenge_f\) \? currentRankConfig\.challenge_f : currentRankConfig\.challenge;/;
const challengeReplacement = `const baseChallenge = (state.user?.gender === 'female' && currentRankConfig.challenge_f) ? currentRankConfig.challenge_f : currentRankConfig.challenge;
  const challenge = {
    ...baseChallenge,
    timeLimitMinutes: examType === 'rank' ? baseChallenge.timeLimitMinutes : Math.ceil(baseChallenge.timeLimitMinutes * (examType === 'phase2' ? 0.6 : 0.8)),
    tasks: baseChallenge.tasks.map(t => ({
       ...t,
       count: examType === 'rank' ? t.count : Math.max(1, Math.ceil(t.count * (examType === 'phase2' ? 0.5 : 0.75)))
    }))
  };`;
fileStr = fileStr.replace(regexChal, challengeReplacement);

fs.writeFileSync('src/components/LevelUpChallenge.tsx', fileStr);
