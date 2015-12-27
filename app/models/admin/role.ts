import {Permission} from './permission';
export class Role {
  constructor(
    public id: number = 0,
    public name: string = '',
    public description: string = '',
    public permissions?: Array<Permission>,
    public version: number
    ) { }


}
