export class Permission {
  constructor(
    public id: number,
    public name: string,
    public resource: string,
    public accessLevel: string,
    public description: string
  ) { }
}
