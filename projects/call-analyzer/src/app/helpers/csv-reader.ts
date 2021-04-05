import { AsyncSubject, Observable } from 'rxjs';

export interface CsvObject { [row: number]: string[] };

export class CsvReader {
  private reader = new FileReader();
  private csvMemory: CsvObject;

  read(csvFile: Blob): Observable<CsvObject> {
    this.reader.readAsText(csvFile);
    
    const reader$ = new AsyncSubject<CsvObject>();
    this.reader.onload = () => {
      const { result } = this.reader;
      
      const resultCsvObject = this.breakStringIntoRows(result as string);

      this.csvMemory = this.csvMemory ? this.merge(this.csvMemory, resultCsvObject) : resultCsvObject;

      reader$.next({ ...this.csvMemory });
      reader$.complete();
    };

    return reader$;
  }

  private merge(prevCsv: CsvObject, newCsv: CsvObject): CsvObject {
    const mergedHeaders = [...new Set([...prevCsv[0], ...newCsv[0]])];
    const headerMap = mergedHeaders.reduce((map, col) => {
      map[col] = mergedHeaders.indexOf(col);
      return map;
    }, {});

    let csvBody = '';
    csvBody += buildCsvBodyFromExpectedHeaders(prevCsv, headerMap);
    csvBody += buildCsvBodyFromExpectedHeaders(newCsv, headerMap);

    return this.breakStringIntoRows(
      `${mergedHeaders.join(';')}
      ${csvBody}`
    );
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

/**
 * HELPERS
 */
function buildCsvBodyFromExpectedHeaders(csv: CsvObject, columnIndexMap: { [col: string]: number }): string {
  let body = '';
  for (let index in csv) {
    if (index !== '0') {
      const newRow = Array.from(new Array(6), _ => '');
      // get the values in their new positions
      csv[0].map((header, j) => {
        newRow[columnIndexMap[header]] = csv[index][j];
      });

      body += `${newRow.join(';')}\n`;
    }
  }

  return body;
}
