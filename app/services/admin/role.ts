import {Injectable} from 'angular2/core';
import {Http,Headers} from 'angular2/http';
import {UrlConstants} from '../url_constants';
import {Permission, PermissionGroup, Role} from '../../models/admin/admin';
import {Page} from '../../models/core/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class RoleService {

  constructor(private http: Http) { }

  findAllPermissions(): Observable<Array<Permission>> {
    return this.http
      .get(UrlConstants.PERMISSION_API)
      .map((responseData) => {
      return responseData.json();
    }).map((permissions: Array<Permission>) => {
      return permissions;
    });
  }

  findAllPermissionGroups(): Observable<Array<PermissionGroup>> {
    return this.http
      .get(UrlConstants.PERMISSION_API + '/groups')
      .map((responseData) => {
      return responseData.json();
    }).map((permissionGroups: Array<PermissionGroup>) => {
      return permissionGroups;
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

  save(role: Role): Observable<Role> {
    console.log(JSON.stringify(role));
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin','*');
    return this.http.post(UrlConstants.ROLE_API, JSON.stringify(role), {headers:headers})
    .subscribe(response => {console.log(response);}, error => {console.log(error)});
    .map((responseData) => {
        console.log(responseData);
      return responseData.json();
    }).map((role: Role) => {
      return role;
    });
  }

  findAll(): Observable<Page<Role>> {
    return this.http
      .get(UrlConstants.ROLE_API)
      .map((responseData) => {
      return responseData.json();
    }).map((permissions: Page<Role>) => {
      return permissions;
    });
  }

}
