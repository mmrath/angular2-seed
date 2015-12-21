import {TableDef, ColumnDef, Page} from '../../models/core/core';

export class CrudDefService {

  getCrudDef(id: number): TableDef {
    var tableDef: TableDef;

    tableDef.id = id;
    tableDef.tableName = 'some_table_name';
    tableDef.displayName = 'Sample Table';
    tableDef.insertable = true;
    tableDef.updatable = true;
    tableDef.deletable = true;

    var columnDefs: Array<ColumnDef> = new Array<ColumnDef>();

    var idColumn: ColumnDef;
    idColumn.id = 0;
    idColumn.columnIndex = 1;
    idColumn.columnName = 'id';
    idColumn.displayName = 'ID';
    idColumn.insertable = false;
    idColumn.updatable = false;
    idColumn.searchable = true;
    idColumn.type = 'number';
    idColumn.length = 10;
    idColumn.nullable = false;
    columnDefs.push(idColumn);

    var possibleTypes = ['string','number','enum','boolean'];
    for (var i: number = 1; i < 5; i++) {
      var column: ColumnDef;
      column.id = i + 1;
      column.columnIndex = i + 1;
      column.columnName = 'column' + i;
      column.displayName = 'Column Name ' + i;
      column.insertable = true;
      column.updatable = i%3 === 0;
      column.searchable = true;
      column.type = possibleTypes[i%4];
      column.length = 10;
      column.nullable = (i % 2 === 0);
      columnDefs.push(column);
    }
    tableDef.columnDefs = columnDefs;
    return tableDef;
  }

  getPage(): Page<any> {
    var page = new Page<any>();

    page.content = [{ 'column0': 'col0 value', 'column1': 'col1 value', 'column2': 'col2 value', 'column3': 'col3 value', 'column4': 'col4 value' }];
    page.last = true;
    page.totalPages = 1;
    page.totalElements = 1;
    page.size = 20;
    page.number = 1; // Page number
    page.first = true;
    page.numberOfElements = 1;

    return page;
  }
}
