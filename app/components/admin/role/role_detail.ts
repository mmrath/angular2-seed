import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {RoleService} from '../../../services/admin/admin';
import {Role} from '../../../models/admin/admin';
import {RouteParams, RouteData,ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'role-detail',
  templateUrl: 'components/admin/role/role_detail.html',
  providers: [],
  directives: [CORE_DIRECTIVES,ROUTER_DIRECTIVES],
  pipes: []
})
export class RoleDetailComponent {
  isNew:boolean;
  id:number;
  role:Role;
  constructor(roleService:RoleService,routeData: RouteData, params:RouteParams ) {
    this.isNew = routeData.get('isNew');
    this.id = +(params.get('id'));
    if(!this.isNew){
      roleService.findRole(this.id).subscribe(res => this.role = res);
    }
  }



}
