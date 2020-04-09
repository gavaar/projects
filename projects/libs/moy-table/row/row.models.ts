import { AbstractRow, RowOptions, RowType } from './row.abstract';

/* ROW */
class Row<T> extends AbstractRow<T> {
  type = RowType.default;
}

/* EXPANDABLE ROW */
interface ExpandableRowOptions<T> extends RowOptions<T> {
  innerRows?: T[];
}

class ExpandableRow<T> extends AbstractRow<T> {
  type = RowType.expandable;

  constructor(opts: ExpandableRowOptions<T>) {
    super(opts);
  }
}

export { Row, ExpandableRow };
