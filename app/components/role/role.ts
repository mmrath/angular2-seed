import {Component} from 'angular2/core';
import {RoleService} from '../../services/role/role';
import {CORE_DIRECTIVES} from 'angular2/common';
import {Permission, Role} from '../../models/security/security';

@Component({
  selector: 'role',
  templateUrl: 'components/role/role.html',
  directives: [CORE_DIRECTIVES],
  pipes: []
})
export class RoleComponent {
  allPermissions: Array<Permission>;
  roleList:Array<Role>;
  constructor(public roleService: RoleService) {
    this.allPermissions = roleService.allPermissions();

  }
}
