import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {UrlConstants} from '../url_constants';
import {User, Page} from '../../models/core/core';


@Injectable()
export class UserService {

  constructor(private http: Http) { }

  findAllUsers() {
    return this.http
      .get(UrlConstants.USER_API)
      .map((responseData) => {
      return responseData.json();
    }).map((permissions: Page<User>) => {
      return permissions;
    });
  }
}
