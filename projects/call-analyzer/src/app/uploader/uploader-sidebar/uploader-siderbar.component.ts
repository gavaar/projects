import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterType } from '../uploader.utils';
import { INPUT_APPENDS } from './uploader-sidebar.config';
import { MoyTableFilter } from '@libs/moy-table';
import { UploaderFilterManager } from './_utils/uploader-filter-manager';
@Component({
  selector: 'uploader-sidebar',
  templateUrl: './uploader-sidebar.component.html',
  styleUrls: ['./uploader-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploaderSidebarComponent implements OnInit {
  @Input() tableFilters: { columns: string[]; exampleRow: string[] };
  @Output() filtersUpdated = new EventEmitter<MoyTableFilter<any>>();

  filterManager: UploaderFilterManager;
  FilterType = FilterType;
  INPUT_APPENDS = INPUT_APPENDS;

  private _filtersForTable: MoyTableFilter<any>['columns'] = {};

  ngOnInit(): void {
    this.filterManager = new UploaderFilterManager(this.tableFilters);
  }

  inputColumnFn = (index: number) => index;

  onFilterChange(column: string, value: string) {
    const noFilterCol = column.split('::')[0];
    this._filtersForTable[noFilterCol] = this.filterManager.buildFilter(noFilterCol);
    this.filtersUpdated.emit({ columns: this._filtersForTable });
  }

  onTypeChange(column: string, type: FilterType) {
    this.filterManager.patchType(column, type);
  }
}
