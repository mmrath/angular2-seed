import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {UrlConstants} from '../url_constants';
import {Permission, Role} from '../../models/admin/admin';
import {Page} from '../../models/core/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class RoleService {

  constructor(private http: Http) { }

  allPermissions(): Observable<Array<Permission>> {
    return this.http
      .get(UrlConstants.PERMISSION_API)
      .map((responseData) => {
      return responseData.json();
    }).map((permissions: Array<Permission>) => {
      return permissions;
    });
  }

  findOne(id: number): Observable<Role> {
    return this.http.get(UrlConstants.ROLE_API)
      .map((responseData) => {
      return responseData.json();
    }).map((role: Role) => {
      return role;
    });
  }

  save(role: Role):Observable<Role>{
    return this.http.post(UrlConstants.ROLE_API,  JSON.stringify(role))
    .map((responseData) => {
      return responseData.json();
    }).map((role: Role) => {
      return role;
    });
  }

  findAll():Observable<Page<Role>> {
    return this.http
      .get(UrlConstants.ROLE_API)
      .map((responseData) => {
      return responseData.json();
    }).map((permissions: Page<Role>) => {
      return permissions;
    });
  }

}
