export function calculateCalories(questId: string, weightKg: number, desc: string = ''): number {
  const id = questId.toLowerCase();
  const d = desc.toLowerCase();
  
  let totalReps = 0;
  let totalMins = 0;
  let totalKm = 0;

  // check for km
  const kmMatch = d.match(/(\d+(?:\.\d+)?)\s*km/);
  if (kmMatch) {
    totalKm = parseFloat(kmMatch[1]);
  } else if (id.includes('5k')) {
    totalKm = 5;
  } else if (id.includes('10k')) {
    totalKm = 10;
  }
  const titleD = (questId + " " + desc).toLowerCase();
  if (titleD.includes('1 mile') || titleD.includes('1 миля')) {
    totalKm = 1.6;
  } else if (titleD.includes('10 km') || titleD.includes('10 км')) {
    totalKm = 10;
  }

  const setsMatch = d.match(/(\d+)\s*(?:x|х|sets?\s*of)\s*(\d+)/);
  if (setsMatch) {
    const val = parseInt(setsMatch[1]) * parseInt(setsMatch[2]);
    if (d.includes('sec')) {
      totalMins = val / 60;
    } else {
      totalReps = val;
    }
  } else {
    const nums = d.match(/\b(\d+)\b/g);
    if (nums && !totalKm) {
      totalReps = Math.max(...nums.map(n => parseInt(n)));
    }
  }

  if (d.includes('min') && !setsMatch) {
     const minMatch = d.match(/(\d+)\s*min/);
     if (minMatch) {
       totalMins = parseInt(minMatch[1]);
     }
  }

  // Calculate based on type
  if (totalKm > 0) {
     if (id.includes('walk')) return Math.round(weightKg * totalKm * 0.7);
     return Math.round(weightKg * totalKm * 1.036);
  }

  if (totalMins > 0) {
     return Math.round(totalMins * 5); // ~5 kcal per min of intense hold
  }

  if (totalReps > 0) {
     if (id.includes('pullup') || id.includes('mu')) {
       return Math.round(totalReps * 1.0); // 1 kcal per rep
     }
     if (id.includes('pushup') || id.includes('dip') || id.includes('hspu')) {
       return Math.round(totalReps * 0.4); // 0.4 kcal per rep
     }
     if (id.includes('squat') || id.includes('lunge') || id.includes('pistol') || id.includes('rdl') || id.includes('calf') || id.includes('box_jump')) {
       return Math.round(totalReps * 0.5); // 0.5 kcal per rep
     }
     if (id.includes('core') || id.includes('situp') || id.includes('crunch') || id.includes('raises') || id.includes('wiper') || id.includes('hollow')) {
       return Math.round(totalReps * 0.3); // 0.3 kcal per rep
     }
     return Math.round(totalReps * 0.5);
  }

  // Fallbacks
  if (id.includes('run')) return Math.round(weightKg * 3 * 1.036);
  if (id.includes('walk')) return Math.round(weightKg * 3 * 0.7);
  if (id.includes('pullup') || id.includes('mu')) return Math.round(40 + (weightKg * 0.2));
  if (id.includes('pushup') || id.includes('dip') || id.includes('hspu')) return Math.round(30 + (weightKg * 0.15));
  if (id.includes('squat') || id.includes('lunge') || id.includes('pistol') || id.includes('rdl')) return Math.round(45 + (weightKg * 0.25));
  if (id.includes('core') || id.includes('situp') || id.includes('plank')) return 25;
  if (id.includes('murph')) return Math.round(weightKg * 10);
  if (id.includes('chal_')) return Math.round(weightKg * 1.5);
  
  return Math.round(weightKg * 0.5);
}
