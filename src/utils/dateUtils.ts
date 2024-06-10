
/* Time must be always 00:00:00, edit if adding time related features */
export function isNotNextDay(date1: Date, date2: Date) {
  const timeDiff = Math.floor(date2.getTime() / 1000) - Math.floor(date1.getTime() / 1000);
  const oneDay = 60 * 60 * 24;

  return timeDiff > oneDay;
}

export function calcNdaysFromDate(date: Date, n: number) {
  return new Date(date.getTime() + (n * 24 * 60 * 60 * 1000));
}

export function getLocalDateString(date: Date): string {
  const copyDate = new Date(date);
  const year = copyDate.getFullYear();
  const month = String(copyDate.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
  const day = String(copyDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}