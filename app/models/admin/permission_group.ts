import {Permission} from './permission';
export class PermissionGroup {

  constructor(
    public resource: string,
    public permissions: Map<string, Permission>
    ) {
  }
}

export class PermissionsByAccessLevel {
  accessLevelPermissionMap: Map<string, Permission>;
  constructor(
    public accessLevels: Array<string>,
    public permissions: Map<Permission>
    ) {
    this.accessLevelPermissionMap = new Map();
    for (var accessLevel of accessLevels) {
      for (var permission of permissions) {
        if (accessLevel === permission.accessLevel) {
          this.accessLevelPermissionMap.set(accessLevel, permission);
        }
      }
    }
  }

  contains(accessLevel: string): boolean {
    return this.accessLevelPermissionMap.has(accessLevel);
  }

  get(accessLevel: string): Permission {
    return this.accessLevelPermissionMap.get(accessLevel);
  }
}
