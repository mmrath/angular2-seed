import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {UrlConstants} from '../url_constants';
import {Permission, Role} from '../../models/admin/admin';
import {Page} from '../../models/core/core';


@Injectable()
export class RoleService {

  constructor(private http: Http) { }

  allPermissions() {
    return this.http
      .get(UrlConstants.PERMISSION_API)
      .map((responseData) => {
      return responseData.json();
    }).map((permissions: Array<Permission>) => {
      return permissions;
    });
  }

  findRole(id: number) {
    return this.http.get(UrlConstants.ROLE_API)
      .map((responseData) => {
      return responseData.json();
    }).map((role: Role) => {
      return role;
    });
  }

  findAllRoles() {
    return this.http
      .get(UrlConstants.ROLE_API)
      .map((responseData) => {
      return responseData.json();
    }).map((permissions: Page<Role>) => {
      return permissions;
    });
  }

}
