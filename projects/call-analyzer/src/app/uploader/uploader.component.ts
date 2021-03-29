import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoyTable } from '@libs/moy-table-2/table/moy-table';
import { CsvObject, CsvReader } from '../helpers/csv-reader';
import { removeQuotes } from './uploader.utils';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface CsvOutput {
  table: MoyTable<any>,
  tableFilters: { columns: string[]; exampleRow: string[] },
}

function csvToRows(rows: CsvObject, columns: string[]): any[] {
  return Object.keys(rows)
    .map((rowInd) => rows[rowInd]
      .reduce((obj: { [key: string]: string }, val: string, colInd: number) => {
        const column = columns[colInd];
        obj[column] = removeQuotes(val);
        return obj;
      }, { id: `${rowInd}` })
    );
}

@Component({
  templateUrl: './uploader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploaderComponent {
  csvOutput: Observable<CsvOutput>;

  onCsvUpload(csvEvent: any) {
    const csvFile = csvEvent.target.files[0];
    const reader = new CsvReader().read(csvFile);
    this.csvOutput = reader.pipe(map(this.csvObjectToCsvOutput));
  }

  private csvObjectToCsvOutput(csvObject: CsvObject): CsvOutput {
    const headers = csvObject[0].map(removeQuotes);
    const config = MoyTable.basicConfig(headers);
    const table = new MoyTable(config);

    delete csvObject[0];
    const rows = csvToRows(csvObject, table.columns);
    table.addRows(rows);
    const tableFilters = { columns: table.columns, exampleRow: csvObject[1] };
    return { table, tableFilters };
  }
}
