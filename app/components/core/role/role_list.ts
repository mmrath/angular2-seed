import {Component} from 'angular2/core';
import {RoleService} from '../../../services/core/role';
import {UrlConstants} from '../../../services/url_constants';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {TableDef, ColumnDef} from '../../../models/core/core';
import {DataGrid} from '../../data_grid/data_grid';
import 'rxjs/add/operator/map';

@Component({
  selector: 'role',
  templateUrl: 'components/core/role/role_list.html',
  directives: [ROUTER_DIRECTIVES, DataGrid],
  pipes: []
})
export class RoleListCmp {
  roleTableDef: TableDef;
  constructor(public roleService: RoleService) {

    var tableDef: TableDef = new TableDef();

    tableDef.tableName = 'role';
    tableDef.displayLabel = 'Roles';

    tableDef.insertable = true;
    tableDef.updatable = true;
    tableDef.deletable = true;
    tableDef.multiSelectable = true;

    var columnDefs: Array<ColumnDef> = new Array<ColumnDef>();

    var idColumn: ColumnDef = new ColumnDef();
    idColumn.id = 0;
    idColumn.index = 1;
    idColumn.name = 'id';
    idColumn.displayLabel = 'ID';
    idColumn.searchable = true;
    idColumn.sortable = true;
    idColumn.dataType = 'number';
    idColumn.length = 10;
    columnDefs.push(idColumn);
    tableDef.primaryKeyColumn = idColumn;
    var nameColumn: ColumnDef = new ColumnDef();
    nameColumn.id = 0;
    nameColumn.index = 2;
    nameColumn.name = 'name';
    nameColumn.displayLabel = 'Name';
    nameColumn.searchable = true;
    nameColumn.sortable = true;
    nameColumn.dataType = 'string';
    nameColumn.length = 30;
    columnDefs.push(nameColumn);

    var descriptionColumn: ColumnDef = new ColumnDef();
    descriptionColumn.id = 0;
    descriptionColumn.index = 2;
    descriptionColumn.name = 'description';
    descriptionColumn.displayLabel = 'Description';
    descriptionColumn.searchable = true;
    descriptionColumn.sortable = false;
    descriptionColumn.dataType = 'string';
    descriptionColumn.length = 60;
    columnDefs.push(descriptionColumn);

    tableDef.columns = columnDefs;
    this.roleTableDef = tableDef;
  }

  apiBase(): string {
    return UrlConstants.ROLE_API;
  }
}
