export interface TableSettings<Model> {
  hideHeaders?: boolean;
  hidePagination?: boolean;
}

export class MoyColumnManager {
  all?: string[];
  headers?: string[];
  body?: string[];
  footers?: string[];

  constructor(columns: string[], tableSettings: TableSettings<any> = {}) {
    this.body = columns;
    this.all = [...columns];

    if (!tableSettings.hideHeaders) {
      this.headers = columns;
    }

    if (!tableSettings.hidePagination) {
      this.footers = ['__pagination__'];
      this.all.push('__pagination__');
    }
  }
}
