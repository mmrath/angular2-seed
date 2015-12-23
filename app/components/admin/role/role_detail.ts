import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {RoleService} from '../../../services/admin/admin';
import {Role, Permission, PermissionGroup} from '../../../models/admin/admin';
import {RouteParams, RouteData, ROUTER_DIRECTIVES} from 'angular2/router';
import {ObjToArray} from '../../../pipes/pipes';
@Component({
  selector: 'role-detail',
  templateUrl: 'components/admin/role/role_detail.html',
  providers: [],
  directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES],
  pipes: [ObjToArray]
})
export class RoleDetailComponent {
  isNew: boolean;
  id: number;
  role: Role;
  permissionGroups: Array<PermissionGroup>;
  maxAccessLevels:number;
  submitted: boolean;
  constructor(private roleService: RoleService, routeData: RouteData, params: RouteParams) {
    this.isNew = routeData.get('isNew');
    this.id = +(params.get('id'));
    this.submitted = false;
    roleService.findAllPermissionGroups().subscribe(res => {
      this.permissionGroups = res;
      this.maxAccessLevels = this.computeMaxAccessLevels(this.permissionGroups);
    });
    if (!this.isNew) {
      roleService.findOne(this.id).subscribe(res => this.role = res);
    } else {
      this.role = new Role();
    }
  }
  onSubmit() {
    this.roleService.save(this.role);
  }

  private computeMaxAccessLevels(permissionGroups: Array<PermissionGroup>): number {
    var max:number = 0;
    for (var pg of permissionGroups){
      if (pg.permissions.length > max) {
        max = pg.permissions.length;
      }
    }
    return max;
  }
}
