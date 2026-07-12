const fs = require('fs');
let fileStr = fs.readFileSync('src/utils/exerciseTips.ts', 'utf8');

const newTips = `
  if (id.includes('bicycle_crunches')) {
    return isRu ? [
      'Тянитесь плечом, а не локтем к колену',
      'Медленно и подконтрольно',
      'Поясница плотно прижата к полу'
    ] : [
      'Aim with your shoulder, not elbow',
      'Slow and controlled motion',
      'Keep your lower back flat on the floor'
    ];
  }
  if (id.includes('face_pulls')) {
    return isRu ? [
      'Тяните эспандер ко лбу или глазам',
      'Разводите локти в стороны и назад',
      'Сводите лопатки в конечной точке'
    ] : [
      'Pull the band towards your forehead/eyes',
      'Keep your elbows high and wide',
      'Squeeze shoulder blades at the end'
    ];
  }
  if (id.includes('calf_raises')) {
    return isRu ? [
      'Поднимайтесь максимально высоко на носки',
      'Задержитесь в верхней точке на 1 секунду',
      'Опускайтесь медленно'
    ] : [
      'Rise as high as possible on your toes',
      'Hold at the top for 1 second',
      'Lower down slowly'
    ];
  }
  if (id.includes('single_leg_rdl')) {
    return isRu ? [
      'Спина прямая, таз отводится назад',
      'Опорная нога слегка согнута',
      'Держите баланс, не торопитесь'
    ] : [
      'Keep back straight, hinge at hips',
      'Standing leg slightly bent',
      'Focus on balance, do not rush'
    ];
  }
  if (id.includes('hanging_knee_raises')) {
    return isRu ? [
      'Поднимайте колени выше параллели',
      'Избегайте раскачиваний (читинга)',
      'Напрягайте пресс на выдохе'
    ] : [
      'Raise knees above parallel',
      'Avoid swinging (no kipping)',
      'Squeeze abs on the exhale'
    ];
  }
  if (id.includes('windshield_wipers')) {
    return isRu ? [
      'Опускайте ноги в стороны медленно',
      'Используйте косые мышцы пресса',
      'Старайтесь держать ноги прямыми'
    ] : [
      'Lower legs to the sides slowly',
      'Use obliques to control the movement',
      'Try to keep your legs straight'
    ];
  }
  if (id.includes('nordic_curls')) {
    return isRu ? [
      'Закрепите ноги или попросите партнера подержать',
      'Опускайтесь максимально медленно (эксцентрика)',
      'Спина и бедра на одной прямой линии'
    ] : [
      'Secure your feet or use a partner',
      'Lower yourself as slowly as possible (eccentric)',
      'Keep hips and back in a straight line'
    ];
  }
`;

fileStr = fileStr.replace(
  "return isRu ? [",
  newTips + "\n  return isRu ? ["
);

fs.writeFileSync('src/utils/exerciseTips.ts', fileStr);
