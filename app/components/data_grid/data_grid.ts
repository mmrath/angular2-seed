import {Component, View, Input, Output, EventEmitter} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {Http, Headers} from 'angular2/http';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {TableDef, Page, PageRequest, Order} from '../../models/core/core';
import {DataGridPager} from './data_grid_pager';
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
  sortingColumn:string;

  constructor(private router: Router, private http: Http) {
  }

  onPageSizeChange(pageSize: number) {
    console.log('Page size:' + pageSize);
    if (pageSize <= 0 || pageSize >= this.page.totalElements) {
      return;
    }
    this.pageRequest.size = pageSize;
    this.pageRequest.page = 0;
    this.refreshPage();
  }

  onPageChange(pageNumber: number) {
    console.log('Page number:' + pageNumber);
    if (pageNumber < 1 || pageNumber > this.page.totalPages) {
      return;
    }
    this.pageRequest.page = pageNumber - 1;
    this.pageRequest.size = this.page.size;
    this.refreshPage();
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
    var headers = new Headers();
    this.http.delete(this.apiBase + '/' + id, { headers: headers }).subscribe(
      res => {
        if (this.page.numberOfElements === 1 && this.page.number !== 0) {
          this.pageRequest.page = this.pageRequest.page - 1;
        }
        this.refreshPage();
      },
      err => { console.log('Error:' + err); }
      );
  }

  ngOnChanges() {
    console.log('changed value' + JSON.stringify(this.page));
    this.refreshPage();
  }

  sort(colName: string) {
    console.log('Sort by column:' + colName);
    var found: boolean = false;
    var newOrders = new Array<Order>();
    if (typeof this.pageRequest.sort !== 'undefined') {
      for (var order of this.pageRequest.sort) {
        if (order.property === colName) {
          found = true;
          if (order.direction === Order.DESC) {
            order.direction = Order.ASC;
          } else {
            order.direction = Order.DESC;
          }
          newOrders.push(order);
        }
      }
      this.pageRequest.sort = newOrders;
      if (!found) {
        this.pageRequest.sort.push({ property: colName, direction: Order.ASC });
      }
    }
    this.pageRequest.page = 0;
    this.refreshPage();
  }

  private getPageRequestUrl(): string {
    var queryUri = new Uri(this.apiBase);
    queryUri.addQueryParam('page', this.pageRequest.page);
    queryUri.addQueryParam('size', this.pageRequest.size);
    for (var order of this.pageRequest.sort) {
      if (typeof order.direction !== 'undefined') {
        queryUri.addQueryParam('sort', order.property + ',' + order.direction);
      } else {
        queryUri.addQueryParam('sort', order.property);
      }
    }
    return queryUri.toString();
  }

  private refreshPage() {
    this.http.get(this.getPageRequestUrl())
      .map(response => response.json())
      .map((data: Page<any>) => { return data; })
      .subscribe(
      response => { this.page = response; },
      err => { console.error('Error while fetching data:' + err); });
  }
}
