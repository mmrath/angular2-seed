export class Page<T>{
  content: Array<T> = new Array();
  last: boolean = true;
  totalPages: number = 0;
  totalElements: number=0;
  size: number=0;
  number: number=0; // Page number
  first: boolean=true;
  numberOfElements: number=0; //Number of elements in current page
}
