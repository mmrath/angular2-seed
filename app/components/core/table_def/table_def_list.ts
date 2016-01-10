import {Component} from 'angular2/core';
import {RoleService} from '../../../services/core/role';
import {UrlConstants} from '../../../services/url_constants';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {Role, Page, TableDef, ColumnDef} from '../../../models/core/core';
import {DataGrid} from '../../data_grid/data_grid';
import 'rxjs/add/operator/map';

@Component({
  selector: 'role',
  templateUrl: 'components/core/role/role.html',
  directives: [ROUTER_DIRECTIVES, DataGrid],
  pipes: []
})
export class TableDefListCmp {
  tableDef: TableDef;
  


}
