export function getAgeScale(age: number): number {
  if (!age || age < 35) return 1.0;
  return Math.max(0.4, 1.0 - (age - 35) * 0.02);
}

export function scaleStringNumbers(text: string, scale: number): string {
  if (scale >= 1.0) return text;
  
  let res = text;
  
  res = res.replace(/(\d+)\s*(x|х)\s*(\d+)/gi, (match, p1, p2, p3) => {
    return `${p1}${p2}__NUM${Math.max(1, Math.round(parseInt(p3) * scale))}__`;
  });
  
  res = res.replace(/(\d+)\s*sets of\s*(\d+)/gi, (match, p1, p2) => {
    return `${p1} sets of __NUM${Math.max(1, Math.round(parseInt(p2) * scale))}__`;
  });
  
  res = res.replace(/(\d+)\s*(reps|повторений|sec|сек|min|минут)/gi, (match, p1, p2) => {
    const val = parseInt(p1);
    if (val <= 1 && p2.startsWith('min')) return match;
    return `__NUM${Math.max(1, Math.round(val * scale))}__ ${p2}`;
  });

  res = res.replace(/(\d+(?:\.\d+)?)\s*(km|км|mile|миля)/gi, (match, p1, p2) => {
    let val = parseFloat(p1);
    val = Math.max(0.1, val * scale);
    val = Math.round(val * 10) / 10;
    return `__NUM${val}__ ${p2}`;
  });

  res = res.replace(/__NUM([\d.]+)__/g, "$1");

  return res;
}
