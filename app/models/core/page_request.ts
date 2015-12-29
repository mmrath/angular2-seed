export class PageRequest {
  page: number = 0;
  size: number = 20;
  sort: Array<Order> = new Array<Order>();
}

export class Order {
  public static get ASC(): string { return 'asc'; }
  public static get DESC(): string { return 'desc'; }

  property: string;
  direction: string;
}
