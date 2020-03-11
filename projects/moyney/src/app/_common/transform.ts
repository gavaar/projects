/** Transform a Date object into a readable d/m/yyyy */
function parseDateReadable(date: Date): string {
  return date.toLocaleString('en-GB', { year: '2-digit', month: 'short', day: '2-digit' });
}

export { parseDateReadable };
