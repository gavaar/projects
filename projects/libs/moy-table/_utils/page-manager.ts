import { BehaviorSubject } from 'rxjs';

export class PageManager {
  get row$() {
    return this._row$.asObservable();
  }
  private _row$ = new BehaviorSubject<any[]>([]);

  currentPage = 0;
  totalRows = 0;
  lastPage: number;

  constructor(private rows: any[], private opts = { pageSize: 10 }) {
    this.reset(this.rows);
  }

  setPage(modif = 0): void {
    let newPage = this.currentPage + modif;

    if (newPage < 0) newPage = 0;
    if (newPage > this.lastPage) newPage = this.lastPage;

    this.currentPage = newPage;

    const pageRows = this.rows.slice(newPage * this.opts.pageSize, (newPage + 1) * this.opts.pageSize);
    this._row$.next(pageRows);
  }

  reset(rows: any[]): void {
    this.rows = rows;
    this.totalRows = rows.length;
    this.lastPage = Math.floor((this.rows.length - 1) / this.opts.pageSize);
    this.setPage();
  }
}
