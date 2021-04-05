import { CsvObject } from '../helpers/csv-reader';

export function removeQuotes(from: string) {
  return (from.match(/(?!").+(?<!")/g) || [''])[0];
}

export function checkStringType(str: string): FilterType {
  const unquoted = removeQuotes(str);

  const date = new Date(unquoted);
  if (date instanceof Date && !isNaN(date.valueOf())) {
    return FilterType.Date;
  }
  const number = +unquoted;
  if (!isNaN(number)) {
    return FilterType.Number;
  }
  return FilterType.String;
}


export function csvToRows(rows: CsvObject, columns: string[]): any[] {
  return Object.keys(rows)
    .map((rowInd) => rows[rowInd]
      .reduce((obj: { [key: string]: string }, val: string, colInd: number) => {
        const column = columns[colInd];
        obj[column] = removeQuotes(val);
        return obj;
      }, { id: `${rowInd}` })
    );
}

export enum FilterType {
  Date = 'filter_date',
  Number = 'filter_number',
  String = 'filter_string',
}
