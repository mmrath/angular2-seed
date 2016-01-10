export class PageRequest {
  page: number = 0;
  size: number = 20;
  sort: Array<Order> = new Array<Order>();
}

export class Order {
  public static get ASC(): string { return 'asc'; }
  public static get DESC(): string { return 'desc'; }

  property: string;
  direction: string;
}

export class Page<T>{
  content: Array<T> = new Array();
  last: boolean = true;
  totalPages: number = 0;
  totalElements: number = 0;
  size: number = 0;
  number: number = 0; // Page number
  first: boolean = true;
  numberOfElements: number = 0; //Number of elements in current page
}

export class Resource {
  id: number;
  name: string;
  description: string;
}

export class Permission {
  id: number;
  name: string;
  resource: Resource;
  accessLevel: string;
  description: string;
  selected: boolean;
}

export class Role {
  id: number = 0;
  name: string = '';
  description: string = '';
  version: number = 0;
  permissions: Array<Permission> = new Array();
}

export class User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  version: number;
  roles: Array<Role>;
}

export class ColumnDef {
  id: number;
  columnIndex: number;
  columnName: string;
  displayName: string;
  nullable: boolean;
  insertable: boolean;
  updatable: boolean;
  searchable: boolean;
  sortable: boolean;
  visibleInList: boolean;//Visible in List
  dataType: string;
  columnType: string; //Audit version column
  length: number;//Datatype Length
  dataCellTemplate: string;
  headerCellTemplate: string;
  validPattern: string;
  validPatternErrorMessage: String;
  defaultValue: string;
}

export class TableDef {
  id: number;
  tagId: string;
  tableName: string;
  displayName: string;
  insertable: boolean;
  updatable: boolean;
  deletable: boolean;
  multiSelectable: boolean;
  primaryKeyColumn: ColumnDef;
  columns: Array<ColumnDef>;
}
