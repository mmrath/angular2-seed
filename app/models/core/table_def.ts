import {ColumnDef} from './column_def';
export interface TableDef {
  id: number;
  tableName: string;
  displayName: string;
  insertable: boolean;
  updatable: boolean;
  deletable: boolean;
  primaryKeyColumnName:string;
  versionColumnName:string;
  columnDefs:Array<ColumnDef>;
}
