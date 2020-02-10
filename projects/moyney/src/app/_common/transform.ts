/** Transform a Date object into a readable d/m/yyyy */
function parseDateReadable(date: Date): string {
  return `${date.getDate()}/${+date.getMonth() + 1}/${date.getFullYear()}`;
}

export { parseDateReadable };
