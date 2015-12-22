import {Component} from 'angular2/core';
import {UserService} from '../../../services/admin/admin';

@Component({
  selector: 'user',
  templateUrl: 'components/admin/user/user.html',
  directives: [],
  pipes: []
})
export class UserComponent {

  constructor(public userService:UserService) {
  }

}
