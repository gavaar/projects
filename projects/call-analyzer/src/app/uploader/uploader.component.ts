import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoyTable } from '@libs/moy-table-2/table/moy-table';
import { CsvObject, CsvReader } from '../helpers/csv-reader';
import { csvToRows, removeQuotes } from './uploader.utils';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface CsvOutput {
  table: MoyTable<any>,
  tableFilters: { columns: string[]; exampleRow: string[] },
}

@Component({
  templateUrl: './uploader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploaderComponent {
  csvOutput: Observable<CsvOutput>;

  private csvReader = new CsvReader();

  onCsvUpload(csvEvent: any) {
    const csvFile = csvEvent.target.files[0];
    const reader = this.csvReader.read(csvFile);
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
