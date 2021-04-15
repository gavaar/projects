import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { MoyTable, MoyTableFilter } from '@libs/moy-table';
import { CsvObject, CsvReader } from '../helpers/csv-reader';
import { csvToRows, removeQuotes } from './uploader.utils';
import { debounceTime, map, takeUntil } from 'rxjs/operators';
import { AsyncSubject, BehaviorSubject, Observable, pipe } from 'rxjs';

interface CsvOutput {
  table: MoyTable<any>,
  tableFilters: { columns: string[]; exampleRow: string[] },
}

@Component({
  templateUrl: './uploader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploaderComponent implements OnDestroy {
  csvOutput: Observable<CsvOutput>;
  loading = { state: false, message: 'Calculando, por favor espere...' };

  private csvReader = new CsvReader();
  private _table: MoyTable<any>;
  private _filter$ = new BehaviorSubject({ columns: {} });
  private _destroy$ = new AsyncSubject();

  ngOnDestroy() {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  onCsvUpload(csvEvent: any) {
    this.loading.state = true;
    const csvFile = csvEvent.target.files[0];
    const reader = this.csvReader.read(csvFile);
    this.csvOutput = reader.pipe(map(csv => this.csvObjectToCsvOutput(csv)));
  }

  filtersUpdate(filters: MoyTableFilter<any>) {
    this.loading.state = true;
    this._filter$.next(filters);
  }

  private csvObjectToCsvOutput(csvObject: CsvObject): CsvOutput {
    const headers = csvObject[0].map(removeQuotes);
    const config = MoyTable.basicConfig(headers);
    this._table = new MoyTable(config);

    delete csvObject[0];
    const rows = csvToRows(csvObject, this._table.columns.body);
    this._table.addRows(rows);
    this.listenForFilters();
    const tableFilters = { columns: this._table.columns.body, exampleRow: csvObject[1] };
    this.loading.state = false;
    return { table: this._table, tableFilters };
  }

  private listenForFilters() {
    this._filter$.asObservable().pipe(
      takeUntil(this._destroy$),
      debounceTime(500),
    ).subscribe(filters => {
      this._table.setFilters(filters);
      this.loading.state = false;
    });
  }
}
