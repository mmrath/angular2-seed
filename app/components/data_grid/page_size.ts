import {Component, View, Input, Output, EventEmitter} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

@Component({
  selector: 'page-size'
})
@View({
  template: `<div>
    <label>Show
      <select [(ngModel)]="size" (change)="onPageSizeChange($event)">
        <option *ngFor="#pageSize of pageSizes">{{pageSize}}</option>
       </select> entries</label>
       </div>`,
  directives: [CORE_DIRECTIVES]
})
export class PageSizeCmp {
  @Input() size: number;
  @Input() pageSizes: Array<number> = [10, 20, 50, 100, 200];

  @Output() private pageSizeChanged: EventEmitter<number> = new EventEmitter();

  ngOnChanges() {
    if (typeof this.size === 'undefined' || typeof this.pageSizes === 'undefined') {
      return;
    }
    if (this.size > 0 && this.pageSizes.indexOf(this.size) <= -1) {
      //Size does not exist. Insert and sort
      console.log('Page size to add:' + this.size);
      console.log('Page sizes:' + this.pageSizes);
      this.pageSizes.push(this.size);
      this.pageSizes.sort((a, b) => a - b);
    }
  }

  onPageSizeChange(event?: Event) {
    if (event) {
      var targetValue: number = (event.target as any).value as number;
      if (targetValue > 0) {
        console.log('New page size:' + targetValue);
        this.pageSizeChanged.next(targetValue);
      }
    }
  }
}
