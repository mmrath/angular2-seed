import { Pipe } from 'angular2/core';

@Pipe({
  name: 'array',
  pure: false
})
export class ObjToArray {
  transform(object:any) {
    var newArray = [];
    for (var key in object) {
        newArray.push(object[key]);
    }
    return newArray;
  }
}
