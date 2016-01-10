import {Component} from 'angular2/core';
import {UserService} from '../../../services/core/user';

@Component({
  selector: 'user',
  templateUrl: 'components/core/user/user.html',
  directives: [],
  pipes: []
})
export class UserComponent {

  constructor(public userService:UserService) {
  }

}
