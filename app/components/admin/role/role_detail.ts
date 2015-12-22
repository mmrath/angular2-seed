import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {RoleService} from '../../../services/admin/admin';
import {Role, Permission} from '../../../models/admin/admin';
import {RouteParams, RouteData, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'role-detail',
  templateUrl: 'components/admin/role/role_detail.html',
  providers: [],
  directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES],
  pipes: []
})
export class RoleDetailComponent {
  isNew: boolean;
  id: number;
  role: Role;
  permissionList: Array<Permission>;
  submitted: boolean;
  constructor(private roleService: RoleService, routeData: RouteData, params: RouteParams) {
    this.isNew = routeData.get('isNew');
    this.id = +(params.get('id'));
    this.submitted = false;
    roleService.allPermissions().subscribe(res => this.permissionList = res);
    if (!this.isNew) {
      roleService.findOne(this.id).subscribe(res => this.role = res);
    } else {
      this.role = new Role();
    }
  }
  onSubmit() {
    this.roleService.save(this.role);
  }



}
