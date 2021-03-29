import { Component } from '@angular/core';
import { MoyTable, MoyTableConfig } from '@libs/moy-table-2/table/moy-table';
import { CsvObject, CsvReader } from '../helpers/csv-reader';
import { MoyInput } from '@libs/moy-input';
import { MoyColumnConfig } from '@libs/moy-table-2/column/column';

const columnDefault: MoyColumnConfig = { class: MoyInput, controlOptions: { disabled: true } };

@Component({
  templateUrl: './uploader.component.html',
})
export class UploaderComponent {
  tableConfig: MoyTable<any>;

  private csvObject: CsvObject = {};

  onCsvUpload(csvEvent: any) {
    const csvFile = csvEvent.target.files[0];
    const reader = new CsvReader();

    reader.read(csvFile).subscribe(csvObject => {
      this.buildTable(csvObject[0]);
      delete csvObject[0];
      this.csvObject = csvObject;
      this.addRows(this.csvObject);
    });
  }

  private buildTable(headerRow: string[]) {
    const tableConfig = headerRow.reduce((config, column) => {
      const nonQuotedColumn = removeQuotes(column);
      config.columns[nonQuotedColumn] = columnDefault;
      return config;
    }, { columns: {} } as MoyTableConfig<any>);
    this.tableConfig = new MoyTable(tableConfig);
  }

  private addRows(rows: CsvObject) {
    const rowValues = Object.keys(rows)
      .map((rowInd) => this.csvObject[rowInd]
        .reduce((obj: { [key: string]: string }, val: string, colInd: number) => {
          const column = this.tableConfig.columns[colInd];
          obj[column] = removeQuotes(val);
          return obj;
        }, { id: `${rowInd}` })
      );
    this.tableConfig.addRows(rowValues);
  }
}

function removeQuotes(from: string) {
  return from.match(/(?!").+(?<!")/g)[0];
}
