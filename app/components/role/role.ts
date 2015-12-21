import {Component} from 'angular2/core';
import {RoleService} from '../../services/role/role';
import {CORE_DIRECTIVES} from 'angular2/common';
import {Permission, Role} from '../../models/security/security';
import 'rxjs/add/operator/map';

@Component({
  selector: 'role',
  templateUrl: 'components/role/role.html',
  directives: [CORE_DIRECTIVES],
  pipes: []
})
export class RoleComponent {
  permissionList: Array<Permission>;
  roleList:Array<Role>;
  constructor(public roleService: RoleService) {
    roleService.allPermissions().subscribe(res => this.permissionList = res);

  }
}
