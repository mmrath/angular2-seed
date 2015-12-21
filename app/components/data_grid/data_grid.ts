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
  directives: [CORE_DIRECTIVES,ROUTER_DIRECTIVES,DataGridPager]
})
export class DataGrid {
  tableDef: TableDef;
  page: Page<any>;
  pageSizes: Array<number> = [20, 50, 100, 200];

  sort(colName) {
    console.log('Sort by column:' + colName);
  }
}
