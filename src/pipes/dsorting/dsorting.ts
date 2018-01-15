import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the DsortingPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'dsorting',
  pure: false
})
export class DsortingPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(items: any[], filters: any): any {
    // ES6 array destructuring
    console.log(items,filters,'filters');
    if (!items || !filters) {
      return items;
  }
    
    
  return items.filter(item => item.Development.indexOf(filters) !== -1);
  
}
}
