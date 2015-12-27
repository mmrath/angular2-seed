import {Component, View} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {TableDef, Page} from '../../models/core/core';
import {DataGridPager} from './data_grid_pager';

@Component({
  selector: 'data-grid',
  properties: ['page', 'tableDef', 'pageSizes']
})
@View({
  templateUrl: 'components/data_grid/data_grid.html',
  directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, DataGridPager]
})
export class DataGrid {
  tableDef: TableDef;
  page: Page<any>;
  pageSizes: Array<number> = [10, 50, 100, 200];

  ngOnInit() {
    console.log(JSON.stringify(this.page));
  }

  onPageSizeChange(pageSize:number){
    console.log('Page size:' + pageSize);
  }

  onPageChange(page:number){
    console.log('Page number:' + page);
  }


  ngOnChanges() {
    console.log('changed value' + JSON.stringify(this.page));
  }


  sort(colName) {
    console.log('Sort by column:' + colName);
  }
}
