export class MoyDateUtil {
  static parseDateToReadable(date: Date) {
    return date.toLocaleString('en-GB', { year: '2-digit', month: 'short', day: '2-digit' });
  }
  
  static dateRangeString(dates: [Date, Date]) {
    const getDateString = (who: 0 | 1): string => {
      const _dateValue = dates[who];
      return _dateValue ? MoyDateUtil.parseDateToReadable(_dateValue) : ' ';
    };

    const before = getDateString(0);
    const after = getDateString(1);

    return `${before} - ${after}`
  }
}
