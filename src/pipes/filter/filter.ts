import { Pipe, PipeTransform } from '@angular/core';
import { UtilProvider } from '../../providers/common/commonProviders';

/**
 * 根据list object中object属性返回filter后的list
 */
@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {

  constructor(private utilProvider: UtilProvider) { }
  transform(value: any, ...args) {
   return this.utilProvider.getFilterList(value,args[0]);
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