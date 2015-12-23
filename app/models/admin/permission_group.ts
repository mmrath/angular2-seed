import {Permission} from './permission';
export class PermissionGroup {
  constructor(
    public resource: string,
    public permissions: Array<Permission>
  ) { }
}
