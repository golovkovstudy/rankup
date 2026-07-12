export function getExerciseTips(questId: string, lang: 'ru' | 'en') {
  const id = questId.toLowerCase();
  
  if (id.includes('pushup')) {
     return lang === 'ru'
       ? ['Держите спину прямой и напрягите кор', 'Опускайтесь, пока локти не образуют угол 90 градусов', 'Избегайте прогиба в пояснице']
       : ['Keep your back straight and core tight', 'Lower until elbows are at 90 degrees', 'Avoid sagging in the lower back'];
  }
  if (id.includes('pullup') || id.includes('pull')) {
     return lang === 'ru'
       ? ['Используйте полный диапазон движений', 'Тянитесь подбородком выше перекладины', 'Избегайте раскачки', 'Сводите лопатки вместе']
       : ['Use full range of motion', 'Pull your chin over the bar', 'Avoid swinging (kipping)', 'Squeeze shoulder blades together'];
  }
  if (id.includes('squat')) {
     return lang === 'ru'
       ? ['Держите грудь поднятой', 'Опускайтесь ниже параллели', 'Колени не должны заваливаться внутрь', 'Вес на всей стопе']
       : ['Keep your chest up', 'Squat below parallel', 'Do not let knees cave inwards', 'Keep weight evenly distributed on feet'];
  }
  if (id.includes('dip')) {
     return lang === 'ru'
       ? ['Наклонитесь немного вперед для акцента на грудь', 'Опускайтесь до угла 90 градусов', 'Не разводите локти слишком широко']
       : ['Lean slightly forward to target chest', 'Lower until elbows hit 90 degrees', 'Keep elbows somewhat tucked in'];
  }
  if (id.includes('run') || id.includes('walk')) {
     return lang === 'ru'
       ? ['Держите ровный темп', 'Приземляйтесь на среднюю часть стопы', 'Расслабьте плечи', 'Следите за дыханием']
       : ['Maintain a steady pace', 'Land on your midfoot', 'Keep shoulders relaxed', 'Focus on rhythmic breathing'];
  }
  if (id.includes('core') || id.includes('situp') || id.includes('plank')) {
     return lang === 'ru'
       ? ['Держите поясницу прижатой к полу (для пресса)', 'Максимально напрягите мышцы кора', 'Не задерживайте дыхание']
       : ['Keep lower back pressed against floor (for situps)', 'Brace your core tight', 'Do not hold your breath'];
  }

  // Default
  return lang === 'ru'
    ? ['Сосредоточьтесь на правильной технике', 'Контролируйте негативную фазу (опускание)', 'Равномерно дышите', 'При необходимости используйте регрессию (облегченный вариант)']
    : ['Focus on proper form over quantity', 'Control the negative (eccentric) phase', 'Breathe smoothly and consistently', 'Use a regression (easier variation) if form breaks down'];
}
