import {Request, Response, Http} from 'angular2/http';
import {Injectable} from 'angular2/core';

import {
RESTClient, GET, PUT, POST, DELETE, BaseUrl, Headers, DefaultHeaders, Path, Body, Query, Url, Produces, MediaType
} from '../../common/rest_client';
import {Observable} from 'rxjs/Observable';

@Injectable()
@DefaultHeaders({
  'Accept': 'application/json',
  'Content-Type': 'application/json'
})
export class DataGridService extends RESTClient {

  public constructor(protected http: Http) {
    super(http);
  }

  @GET('')
  @Produces(MediaType.JSON)
  public getPage( @Url('url') url: string,
    @Query('page') page?: number,
    @Query('size') size?: number,
    @Query('sort') sort?: string): Observable<any> { return null; };

  @GET('/{id}')
  public getById( @Path('id') id: string): Observable<any> { return null; };

  @DELETE('/{id}')
  public deleteById( @Url('url') url: string, @Path('id') id: string): Observable<any> { return null; };

}
