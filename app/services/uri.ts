import URI = require('urijs');

export class Uri {
  private uri: URI;

  constructor(uriString: string) {
    this.uri = URI(uriString);
  }

  addQueryParam(key: string, value: any): Uri {
    this.uri = this.uri.addSearch(key, value);
    return this;
  }

  toString(): string {
    return this.uri.toString();
  }
}
