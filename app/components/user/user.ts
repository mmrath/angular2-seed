import {Component} from 'angular2/core';
import {UserService} from '../../services/user/user';

@Component({
  selector: 'user',
  templateUrl: 'components/user/user.html',
  directives: [],
  pipes: []
})
export class UserComponent {

  constructor(public userService:UserService) {
  }

}
