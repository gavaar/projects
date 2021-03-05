import { Component, OnInit } from '@angular/core';
import { MoyTable } from '@libs/moy-table/moy-table.models';
import tableConfigBuilder from './uploader.config';
import { CsvObject, CsvReader } from '../helpers/csv-reader';
import { MoyTableConfig, Column } from '@libs/moy-table/moy-table.abstract';
import { MoyInput } from '@libs/moy-input/moy-input.models';

const tableDefault: MoyTableConfig<any> = {
  columns: {},
  maxRows: 50,
};

@Component({
  templateUrl: './uploader.component.html',
})
export class UploaderComponent implements OnInit {
  tableConfig: MoyTable<any> = new MoyTable(tableConfigBuilder());

  private csvObject = {};

  ngOnInit() {
    this.buildTable();
  }

  onCsvUpload(csvEvent: any) {
    this.tableConfig.setLoading();
    const csvFile = csvEvent.target.files[0];
    const reader = new CsvReader();

    reader.read(csvFile).subscribe(csvObject => {
      this.csvObject = csvObject;
      this.buildTable();
    });
  }

  private buildTable() {
    const tableConfig = this.getCsvTableColumns(this.csvObject);
    this.tableConfig = new MoyTable(tableConfig);
    const rowValues = Object.keys(this.csvObject).map((rowInd, index) => {
      return this.csvObject[rowInd].reduce((obj, val, colInd) => {
        obj[colInd] = val;
        return obj;
      }, { id: `${rowInd}`});
    });
    this.tableConfig.addRows(rowValues);
  }

  private getCsvTableColumns(csvObject: CsvObject): MoyTableConfig<any> {
    const columns = (csvObject[0] || []).reduce((colms, _, index) => {
      colms[index] = this.buildColumnFromValue(index);
      return colms;
    }, {});
    return { ...tableDefault, columns };
  }

  private buildColumnFromValue(name: string | number): Column {
    return {
      type: MoyInput,
      config: {
        controlOptions: { disabled: true },
      } 
    }
  }
}
