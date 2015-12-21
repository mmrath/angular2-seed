export class Page<T>{
  content:Array<T>;
  last:boolean;
  totalPages:number;
  totalElements:number;
  size:number;
  number:number; // Page number
  first:boolean;
  numberOfElements:number; //Number of elements in current page
}
