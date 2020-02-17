export interface ColumnOptions {

}

export class Column {
  public field;
  public title;
  public options: ColumnOptions;

  constructor(field: string, title: string, options?: ColumnOptions) {
    this.field = field;
    this.title = title;
    this.options = options || {};
  }
}
