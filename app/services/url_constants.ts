export class UrlConstants {
  public static get BASE_API_PATH(): string { return '/api'; }

  public static get PERMISSION_API_PATH(): string {
    return this.BASE_API_PATH + '/api/security/permissions' ;
  }

  public static get ROLE_API_PATH(): string {
    return this.BASE_API_PATH + '/api/security/roles' ;
  }

  public static get USER_API_PATH(): string {
    return this.BASE_API_PATH + '/api/security/users' ;
  }
}
