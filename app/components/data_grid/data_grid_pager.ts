import {Component, View, Input, Output, EventEmitter, Event} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

@Component({
  selector: 'data-grid-pager'
})
@View({
  templateUrl: 'components/data_grid/data_grid_pager.html',
  directives: [CORE_DIRECTIVES]
})
export class DataGridPager {
  @Input() last: boolean;
  @Input() totalPages: number;
  @Input() totalElements: number;
  @Input() size: number;
  @Input() number: number; // Page number starts from zero
  @Input() first: boolean;
  @Input() numberOfElements: number;
  @Input() pageSizes: Array<number> = [10, 20, 50, 100, 200];

  pageNumber: number; //Page number starts from 1
  pagerStartIndex: number;
  pagerEndIndex: number;

  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
  pagerStartIndexRange: Array<number>;
  pagerEndIndexRange: Array<number>;
  elementStart: number;
  elementEnd: number;

  @Output() private pageChanged: EventEmitter<number> = new EventEmitter();
  @Output() private pageSizeChanged: EventEmitter<number> = new EventEmitter();

  ngOnChanges() {
    this.compute();
  }

  selectPage(page: number, event?: MouseEvent) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (page !== this.pageNumber && page > 0 && page <= this.totalPages) {
      console.log('Navigating to page' + page);
      this.pageChanged.next(page);
    } else {
      console.log('Invalid navigation');
    }
  }

  onPageSizeChange(event?: Event) {
    if (event.target.value > 0) {
      console.log('New page size:' + event.target.value);
      this.pageSizeChanged.next(+(event.target.value));
    }
  }

  private _isPreviousDisabled() {
    if (this.pageNumber === 1) {
      return true;
    }
    return false;
  };

  private _isNextDisabled() {
    if (this.pageNumber === this.totalPages) {
      return true;
    } else {
      return false;
    }
  };

  private compute() {
    this.pageNumber = this.number + 1;
    this.pagerStartIndex = this.pageNumber - 3;
    this.pagerEndIndex = this.pageNumber + 3;

    if (this.pagerStartIndex < 1) {
      this.pagerStartIndex = 1;
    }
    if (this.pagerEndIndex > this.totalPages) {
      this.pagerEndIndex = this.totalPages;
    }
    if (this.pagerEndIndex - this.pageNumber < 3 && this.pagerStartIndex !== 1) {
      this.pagerStartIndex = this.pagerStartIndex - (this.pageNumber + 3 - this.pagerEndIndex);
      if (this.pagerStartIndex < 1) {
        this.pagerStartIndex = 1;
      }
    }
    if (this.pageNumber - this.pagerStartIndex < 3 && this.pagerEndIndex !== this.totalPages) {
      this.pagerEndIndex = this.pagerEndIndex + (this.pagerStartIndex + 3 - this.pageNumber);
      if (this.pagerEndIndex > this.totalPages) {
        this.pagerEndIndex = this.totalPages;
      }
    }
    var pagerStartIndexRangeArr = [];
    for (var i = this.pagerStartIndex; i < this.pageNumber; i++) {
      pagerStartIndexRangeArr.push(i);
    }
    var pagerEndIndexRangeArr = [];
    for (var i = this.pageNumber + 1; i <= this.pagerEndIndex; i++) {
      pagerEndIndexRangeArr.push(i);
    }

    this.isPreviousDisabled = this._isPreviousDisabled();
    this.isNextDisabled = this._isNextDisabled();

    this.elementStart = ((this.pageNumber - 1) * this.size) + 1;
    this.elementEnd = ((this.pageNumber - 1) * this.size) + this.numberOfElements;

    //console.log('Page size:'+ this.size);
    //console.log('Page sizes:'+ this.pageSizes);

    if (this.size > 0 && this.pageSizes.indexOf(this.size) <= -1) {
      //Size does not exist. Insert and sort
      console.log('Page size to add:' + this.size);
      console.log('Page sizes:' + this.pageSizes);
      this.pageSizes.push(this.size);
      this.pageSizes.sort((a, b) => a - b);
    }
  }
}

export interface PageSizeChangeEvent {
  pageSize: number;
}

export interface PageChangeEvent {
  page: number;
}
