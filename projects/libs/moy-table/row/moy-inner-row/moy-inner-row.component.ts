import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MoyTableConfig } from '@libs/moy-table/table';
import { MoyRow } from '../moy-row';
import { MoyInnerRow } from './';
import { PageManager } from '../../_utils/page-manager';

@Component({
  selector: 'moy-inner-row',
  templateUrl: './moy-inner-row.component.html',
  styleUrls: ['./moy-inner-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoyInnerRowComponent implements OnInit {
  @Input() config: {
    tableConfig: MoyTableConfig<any>;
    row: MoyInnerRow<any>;
  };

  pageManager: PageManager;

  ngOnInit() {
    const allInnerRows = this.config.row.innerValues.map(value => new MoyRow({ ...this.config.tableConfig, value }));
    this.pageManager = new PageManager(allInnerRows);
  }

  rowFn = (index: number) => index;
  columnFn = (index: number) => index;

  setPage(modif: 1 | -1) {
    this.pageManager.setPage(modif);
  }
}
