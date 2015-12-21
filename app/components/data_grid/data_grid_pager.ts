import {Component, View} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

@Component({
  selector: 'data-grid-pager',
  properties: ['number', 'last', 'first', 'totalPages', 'totalElements', 'size', 'numberOfElements', 'pageSizes']
})
@View({
  templateUrl: 'components/data_grid/data_grid_pager.html',
  directives: [CORE_DIRECTIVES]
})
export class DataGridPager {
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; // Page number
  first: boolean;
  numberOfElements: number;
  pageSizes: Array<number> = [20, 50, 100, 200];

  pagerStartIndex: number;
  pagerEndIndex: number;

  elementStart = () => {
    return ((this.number - 1) * this.size) + 1;
  };
  elementEnd = () => {
    return ((this.number - 1) * this.size) + this.numberOfElements;
  };
  pagerStartIndexRange = () => {
    this.compute();
    var pagerStartIndexRangeArr = [];
    for (var i = this.pagerStartIndex; i < this.number; i++) {
      pagerStartIndexRangeArr.push(i);
    }
    return pagerStartIndexRangeArr;
  };
  pagerEndIndexRange = () => {
    var pagerEndIndexRangeArr = [];
    for (var i = this.number + 1; i <= this.pagerEndIndex; i++) {
      pagerEndIndexRangeArr.push(i);
    }
    return pagerEndIndexRangeArr;
  };


  previousClass = () => {
    if (this.number === 1) {
      return 'disabled';
    } else {
      return '';
    }
  };
  nextClass = () => {
    if (this.number === this.totalPages) {
      return 'disabled';
    } else {
      return '';
    }
  };

  private compute() {
    this.pagerStartIndex = this.number - 3;
    this.pagerEndIndex = this.number + 3;

    if (this.pagerStartIndex < 1) {
      this.pagerStartIndex = 1;
    }
    if (this.pagerEndIndex > this.totalPages) {
      this.pagerEndIndex = this.totalPages;
    }
    if (this.pagerEndIndex - this.number < 3 && this.pagerStartIndex !== 1) {
      this.pagerStartIndex = this.pagerStartIndex - (this.number + 3 - this.pagerEndIndex);
      if (this.pagerStartIndex < 1) {
        this.pagerStartIndex = 1;
      }
    }
    if (this.number - this.pagerStartIndex < 3 && this.pagerEndIndex !== this.totalPages) {
      this.pagerEndIndex = this.pagerEndIndex + (this.pagerStartIndex + 3 - this.number);
      if (this.pagerEndIndex > this.totalPages) {
        this.pagerEndIndex = this.totalPages;
      }
    }
  }
}
