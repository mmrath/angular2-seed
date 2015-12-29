import {Component, View, Input, Output, EventEmitter} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {Http, Headers} from 'angular2/http';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {TableDef, Page, PageRequest} from '../../models/core/core';
import {DataGridPager} from './data_grid_pager';
import {UrlConstants} from '../../services/url_constants';
import {Uri} from '../../services/uri';

@Component({
  selector: 'data-grid',
})
@View({
  templateUrl: 'components/data_grid/data_grid.html',
  directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, DataGridPager]
})
export class DataGrid {
  @Input() tableDef: TableDef;
  @Input() pageSizes: Array<number> = [10, 20, 50, 100, 200];
  @Input() apiBase: string;
  @Input() newLink: string;
  @Input() editLink: string; //This must take id as a paramater
  page: Page<any> = new Page();
  pageRequest: PageRequest = new PageRequest();

  constructor(private router: Router, private http: Http) {
  }

  onPageSizeChange(pageSize: number) {
    console.log('Page size:' + pageSize);
    if (pageSize <= 0 || pageSize >= this.page.totalElements) {
      return;
    }

    this.pageRequest.size = pageSize;
    this.pageRequest.page = 0;
    this.http.get(this.getPageRequestUrl()).map(response => response.json())
      .map((data: Page<any>) => { return data; })
      .subscribe(
      response => { console.error('Response data:' + JSON.stringify(response)); this.page = response; },
      err => { console.error('Error while fetching data:' + err); });
  }

  onPageChange(pageNumber: number) {
    console.log('Page number:' + pageNumber);
    this.pageRequest.page = pageNumber - 1;
    this.pageRequest.size = this.page.size;
    this.http.get(this.getPageRequestUrl())
      .map(response => response.json())
      .map((data: Page<any>) => { return data; })
      .subscribe(
      response => { this.page = response; },
      err => { console.error('Error while fetching data:' + err); });
  }

  navigateToNew(event?: MouseEvent) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    console.log('Navigating to new');
    this.router.navigate([this.newLink]);
  }

  navigateToEdit(id: number, event?: MouseEvent) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    console.log('Navigating to edit:' + this.editLink);
    this.router.navigate([this.editLink, { 'id': id }]);
  }

  deleteRow(row: any, event?: MouseEvent) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    var id: number = row[this.tableDef.idColumnName];
    console.log('Deleting row:' + JSON.stringify(row));
    console.log('API Base:' + this.apiBase);
    var headers = new Headers();
    this.http.delete(this.apiBase + '/' + id, { headers: headers }).subscribe(
      res => { console.log('Response:' + res); },
      err => { console.log('Error:' + err); }
      );
  }

  ngOnChanges() {
    console.log('changed value' + JSON.stringify(this.page));
    this.http.get(this.apiBase).map(response => response.json())
      .map((data: Page<any>) => { return data; })
      .subscribe(
      response => {
        this.page = response;
        console.log(JSON.stringify(this.page));
      },
      err => { console.error('Error while fetching data:' + err); });
  }

  sort(colName: string) {
    console.log('Sort by column:' + colName);
  }

  private getPageRequestUrl(): string {
    var queryUri = new Uri(this.apiBase);
    queryUri.addQueryParam('page', this.pageRequest.page);
    queryUri.addQueryParam('size', this.pageRequest.size);
    for (var order of this.pageRequest.sort) {
      queryUri.addQueryParam('sort', order.property);
      if (typeof order.direction !== 'undefined') {
        queryUri.addQueryParam('sort', order.property + ',' + order.direction);
      } else {
        queryUri.addQueryParam('sort', order.property);
      }
    }
    return queryUri.toString();
  }
}
