export class ColumnDef {
  id: number;
  columnIndex: number;
  columnName: string;
  displayName: string;
  description: string;
  insertable: boolean;
  updatable: boolean;
  searchable: boolean;
  sortable: string;
  visible: boolean;//Visible in List
  type: string;
  length: number;//Datatype Length
  nullable: boolean;
  dataClassName: string;
  headerClassName: string;
  dataCellTemplate: string;
  headerCellTemplate: string;
  validPattern: string;
  validPatternErrorMessage: String;
  defaultValue: string;
}
