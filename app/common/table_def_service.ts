import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {UrlConstants} from '../url_constants';
import {Permission, Role, Resource, Page, TableDef, ColumnDef} from '../../models/core/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TableDefService {

  constructor(private http: Http) { }

  findOne(id: number): TableDef {

  }

  save(tableDef: TableDef): TableDef {

  }
}
