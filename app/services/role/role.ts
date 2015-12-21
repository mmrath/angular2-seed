import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {UrlConstants} from '../url_constants';
import {Permission} from '../../models/security/Permission';

@Injectable()
export class RoleService {
  allPermissionsData: Array<Permission>;

  constructor(private http: Http) {
    this.allPermissionsData = [{ 'id': 1, 'resource': 'SECURITY_USER', 'accessLevel': 'READ', 'description': 'View User', 'name': 'SECURITY_USER:READ' },
      { 'id': 2, 'resource': 'SECURITY_USER', 'accessLevel': 'CREATE', 'description': 'Create User', 'name': 'SECURITY_USER:CREATE' },
      { 'id': 3, 'resource': 'SECURITY_USER', 'accessLevel': 'UPDATE', 'description': 'Update User', 'name': 'SECURITY_USER:UPDATE' },
      { 'id': 4, 'resource': 'SECURITY_USER', 'accessLevel': 'DELETE', 'description': 'Delete User', 'name': 'SECURITY_USER:DELETE' },
      { 'id': 6, 'resource': 'SECURITY_ROLE', 'accessLevel': 'READ', 'description': 'View Role', 'name': 'SECURITY_ROLE:READ' },
      { 'id': 7, 'resource': 'SECURITY_ROLE', 'accessLevel': 'CREATE', 'description': 'Create Role', 'name': 'SECURITY_ROLE:CREATE' },
      { 'id': 8, 'resource': 'SECURITY_ROLE', 'accessLevel': 'UPDATE', 'description': 'Update Role', 'name': 'SECURITY_ROLE:UPDATE' },
      { 'id': 9, 'resource': 'SECURITY_ROLE', 'accessLevel': 'DELETE', 'description': 'Delete Role', 'name': 'SECURITY_ROLE:DELETE' },
      { 'id': 11, 'resource': 'SECURITY_GROUP', 'accessLevel': 'READ', 'description': 'View User Groups', 'name': 'SECURITY_GROUP:READ' },
      { 'id': 12, 'resource': 'SECURITY_GROUP', 'accessLevel': 'CREATE', 'description': 'Create User Groups', 'name': 'SECURITY_GROUP:CREATE' },
      { 'id': 13, 'resource': 'SECURITY_GROUP', 'accessLevel': 'UPDATE', 'description': 'Update User Groups', 'name': 'SECURITY_GROUP:UPDATE' },
      { 'id': 14, 'resource': 'SECURITY_GROUP', 'accessLevel': 'DELETE', 'description': 'Delete User Groups', 'name': 'SECURITY_GROUP:DELETE' }
    ];
  }

  allPermissions() {
    return this.http
    .get('http://localhost:8080/api/security/permissions')
    .map((responseData) => {
      return responseData.json();
    })
    .map((permissions: Array<Permission>) => {
      return permissions;
    });
  }

}
