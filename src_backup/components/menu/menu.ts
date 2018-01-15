import { Component } from '@angular/core';

/**
 * Generated class for the MenuComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'menu',
  templateUrl: 'menu.html'
})
export class MenuComponent {

  text: string;

  constructor() {
    console.log('Hello MenuComponent Component');
    this.text = 'Hello World';
  }

}
