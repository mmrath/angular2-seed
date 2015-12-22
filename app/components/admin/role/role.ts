import {Component} from 'angular2/core';
import {RoleService} from '../../../services/admin/admin';
import {CORE_DIRECTIVES} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {Permission, Role} from '../../../models/admin/admin';
import {Page} from '../../../models/core/core';
import 'rxjs/add/operator/map';

@Component({
  selector: 'role',
  templateUrl: 'components/admin/role/role.html',
  directives: [CORE_DIRECTIVES,ROUTER_DIRECTIVES],
  pipes: []
})
export class RoleComponent {
  permissionList: Array<Permission>;
  roleList:Page<Role>;
  constructor(public roleService: RoleService) {
    roleService.allPermissions().subscribe(res => this.permissionList = res);
    roleService.findAll().subscribe(res => this.roleList = res);
  }
}
