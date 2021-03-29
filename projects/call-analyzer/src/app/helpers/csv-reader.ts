import { AsyncSubject, Observable } from 'rxjs';

export interface CsvObject { [row: number]: string[] };

export class CsvReader {
  private reader = new FileReader();

  read(csvFile: Blob): Observable<CsvObject> {
    this.reader.readAsText(csvFile);
    
    const reader$ = new AsyncSubject<CsvObject>();
    this.reader.onload = () => {
      const { result } = this.reader;
      
      const resultRow = this.breakStringIntoRows(result as string);
      reader$.next(resultRow);
      reader$.complete();
    };

    return reader$;
  }

  private breakStringIntoRows(str: string): CsvObject {
    const rows = str.split(/\r|\n|\r/);
    let index = 0;

    return rows.reduce((rowMap, row) => {
      const columns = row.split(';').map(v => v.trim());
      if (columns.find(Boolean)) {
        rowMap[index] = columns;
        index += 1;
      }
      return rowMap;
    }, {});
  }
}
