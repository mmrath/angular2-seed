export class UrlConstants {
  private static get BASE_API_PATH(): string { return '/api'; }

  public static get PERMISSION_API(): string {
    return this.BASE_API_PATH + '/admin/permissions';
  }

  public static get ROLE_API(): string {
    return this.BASE_API_PATH + '/admin/roles';
  }

  public static get USER_API(): string {
    return this.BASE_API_PATH + '/admin/users';
  }
}
