export class UrlConstants {
  private static get BASE_API_PATH(): string { return '/api'; }

  public static get PERMISSION_API(): string {
    return this.BASE_API_PATH + '/core/permissions';
  }

  public static get ROLE_API(): string {
    return this.BASE_API_PATH + '/core/roles';
  }

  public static get USER_API(): string {
    return this.BASE_API_PATH + '/core/users';
  }
}
