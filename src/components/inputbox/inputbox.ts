import { Component } from '@angular/core';

/**
 * Generated class for the InputboxComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'inputbox',
  templateUrl: 'inputbox.html'
})
export class InputboxComponent {

    text: string;
    value: boolean;

  constructor() {
    console.log('Hello InputboxComponent Component');
    this.text = 'Hello World';
  }

}
