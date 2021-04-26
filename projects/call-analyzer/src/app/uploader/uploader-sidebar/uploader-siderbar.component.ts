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
  @Output() groupingsUpdated = new EventEmitter<{ column: string, value: boolean }>();

  filterManager: UploaderFilterManager;
  readonly frequencyKey = '__frequency__';
  showFrequency = false;
  FilterType = FilterType;
  INPUT_APPENDS = INPUT_APPENDS;

  private _filtersForTable: MoyTableFilter<any>['columns'] = {};
  private _frequency: MoyTableFilter<any>['frequency'] = {};

  ngOnInit(): void {
    this.filterManager = new UploaderFilterManager(this.tableFilters);
  }

  inputColumnFn = (index: number) => index;

  onFilterChange(column: string) {
    const noFilterCol = column.split('::')[0];

    if (noFilterCol === this.frequencyKey) {
      const frequencyProperty = column.includes(INPUT_APPENDS.numberHigherThan) ? 'higherThan' : 'lowerThan';
      this._frequency[frequencyProperty] = this.filterManager.columns[column].control.value;
    } else {
      this._filtersForTable[noFilterCol] = this.filterManager.buildFilter(noFilterCol);
    }

    this.filtersUpdated.emit({ columns: this._filtersForTable, frequency: this._frequency });
  }

  onTypeChange(column: string, type: FilterType) {
    this.filterManager.patchType(column, type);
  }

  onButtonClick(column: string, value: boolean) {
    this.showFrequency = Object.values(this.filterManager.groupings).find(b => b.pressed) != null;
    if (!this.showFrequency) {
      // clear frequency values when removing grouping options
      const higher = this.filterManager.columns[`${this.frequencyKey}::${INPUT_APPENDS.numberHigherThan}`];
      const lower = this.filterManager.columns[`${this.frequencyKey}::${INPUT_APPENDS.numberLowerThan}`];
      higher && higher.control.setValue(null);
      lower && lower.control.setValue(null);
    }
    this.groupingsUpdated.emit({ column, value });
  }
}
