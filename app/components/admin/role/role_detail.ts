import {Component} from 'angular2/core';
import {RoleService} from '../../../services/admin/admin';
import {Role, Permission, Resource} from '../../../models/admin/admin';
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
  resources: Array<Resource>;
  permissionGroups: Map<number, Map<string, Permission>>;
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
  isValidPermission(resourceIn: Resource, accessLevel: string): boolean {
    var returnVal = false;
    if (typeof this.permissionGroups !== 'undefined') {
      if (resourceIn.id in this.permissionGroups) {
        if (accessLevel in this.permissionGroups[resourceIn.id]) {
          returnVal = true;
        }
      }
    }
    return returnVal;
  }
  onSubmit() {
    var selectedPerms = new Array<Permission>();
    for (var resource of this.resources) {
      if (typeof this.permissionGroups !== 'undefined' && resource.id in this.permissionGroups) {
        for (var accessLevel of this.accessLevels) {
          if (accessLevel in this.permissionGroups[resource.id] && this.permissionGroups[resource.id][accessLevel].selected) {
            selectedPerms.push(this.permissionGroups[resource.id][accessLevel]);
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
      if (permission.resource.id in this.permissionGroups) {
        if (permission.accessLevel in this.permissionGroups[permission.resource.id]) {
          this.permissionGroups[permission.resource.id][permission.accessLevel].selected = true;
        }
      }
    }
  }
}
