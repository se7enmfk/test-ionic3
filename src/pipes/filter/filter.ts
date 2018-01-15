import { Pipe, PipeTransform } from '@angular/core';

/**
 * 根据list object中object属性返回filter后的list
 */
@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {

  transform(value: any, ...args) {
    let filter = args[0];
 
    if (filter && Array.isArray(value)) {
      let filterKeys = Object.keys(filter);
      
      return value.filter(item =>
        filterKeys.reduce((memo, keyName) =>
          memo && item[keyName].toLowerCase() === filter[keyName].toLowerCase(), true));
    } else {
      return value;
    }



  }
}
/* class Person {
  constructor (public Name : string, public Age: number) {}
}
var list = new Array<Person>();
list.push(new Person("Baby", 1));
list.push(new Person("Toddler", 2));
list.push(new Person("Teen", 14));
list.push(new Person("Adult", 25));

var oldest_person = list.reduce( (a, b) => a.Age > b.Age ? a : b );
alert(oldest_person.Name); */