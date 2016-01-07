import {Resource} from './resource';
export class Permission {
  id: number;
  name: string;
  resource: Resource;
  accessLevel: string;
  description: string;
  selected: boolean;
}
