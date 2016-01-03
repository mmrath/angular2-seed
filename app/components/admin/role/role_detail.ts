import {Component} from 'angular2/core';
import {RoleService} from '../../../services/admin/admin';
import {Role, Permission} from '../../../models/admin/admin';
import {RouteParams, RouteData, ROUTER_DIRECTIVES} from 'angular2/router';
//import {Observable} from 'rxjs/Observable';
@Component({
  selector: 'role-detail',
  templateUrl: 'components/admin/role/role_detail.html',
  providers: [],
  directives: [ROUTER_DIRECTIVES],
  pipes: []
})
export class RoleDetailComponent {
  isNew: boolean;
  id: number;
  role: Role = new Role();
  accessLevels: Array<string>;
  resources: Array<string>;
  permissionGroups: Map<string, Map<string, Permission>>;
  constructor(private roleService: RoleService, routeData: RouteData, params: RouteParams) {
    this.isNew = routeData.get('isNew');
    this.id = +(params.get('id'));
    var accessLevelsObs = roleService.findAllAccessLevels();
    var resourcesObs = roleService.findAllResources();
    var permissionGroupsObs = roleService.findAllPermissionGroups();
    accessLevelsObs.subscribe(res => {
      this.accessLevels = res;
    });
    resourcesObs.subscribe(res => {
      this.resources = res;
    }, err => { console.error('Error ' + err); });
    permissionGroupsObs.subscribe(res => {
      this.permissionGroups = res;
      console.log('Got all permissions');
      this.updatePermissionSelectStatus();
    }, err => { console.error('Error permissionGroups' + err); });
    if (!this.isNew) {
      roleService.findOne(this.id).subscribe(res => {
        console.log('Got role');
        this.role = res;
        this.updatePermissionSelectStatus();
      }, err => { console.log('Error ' + err); });
    }
  }
  isValidPermission(resource: string, accessLevel: string): boolean {
    if (typeof this.permissionGroups !== 'undefined' && resource in this.permissionGroups) {
      if (accessLevel in this.permissionGroups[resource]) {
        return true;
      }
    }
    return false;
  }
  onSubmit() {
    var selectedPerms = new Array<Permission>();
    for (var resource of this.resources) {
      if (typeof this.permissionGroups !== 'undefined' && resource in this.permissionGroups) {
        for (var accessLevel of this.accessLevels) {
          if (accessLevel in this.permissionGroups[resource] && this.permissionGroups[resource][accessLevel].selected) {
            selectedPerms.push(this.permissionGroups[resource][accessLevel]);
          }
        }
      }
    }
    this.role.permissions = selectedPerms;
    this.roleService.save(this.role).subscribe(
      res => { console.log('Success'); },
      err => { console.log('Error' + err); });
  }

  private updatePermissionSelectStatus() {
    if (typeof this.permissionGroups === 'undefined' || typeof this.role.permissions === 'undefined') {
      console.log('Not updating select status');
      return;
    }
    console.log('Updating select status');
    for (var permission of this.role.permissions) {
      if (permission.resource in this.permissionGroups) {
        if (permission.accessLevel in this.permissionGroups[permission.resource]) {
          this.permissionGroups[permission.resource][permission.accessLevel].selected = true;
        }
      }
    }
  }

}
