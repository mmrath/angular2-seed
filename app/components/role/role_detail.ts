import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {RoleService} from '../../services/role/role';

@Component({
  selector: 'role-new',
  templateUrl: 'components/role/role_detail.html',
  providers: [],
  directives: [CORE_DIRECTIVES],
  pipes: []
})
export class RoleDetailComponent {

  constructor(public roleService:RoleService) {
  }

}
