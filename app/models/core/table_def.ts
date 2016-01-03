import {ColumnDef} from './column_def';
export class TableDef {
  id: number;
  tableName: string;
  displayName: string;
  insertable: boolean;
  updatable: boolean;
  deletable: boolean;
  multiSelectable:boolean;
  primaryKeyColumnName: string;
  idColumnName:string;
  versionColumnName: string;
  columnDefs: Array<ColumnDef>;
}
