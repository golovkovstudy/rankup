const { format, differenceInDays, parseISO, getDay } = require('date-fns');

const lastDate = '2026-07-10';
const todayStr = '2026-07-12';

const daysDiff = differenceInDays(new Date(todayStr), parseISO(lastDate));
for (let i = 0; i < daysDiff; i++) {
    const d = new Date(parseISO(lastDate).getTime() + i * 24 * 60 * 60 * 1000);
    console.log(format(d, 'yyyy-MM-dd'), getDay(d));
}
