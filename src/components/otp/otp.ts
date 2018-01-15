import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ProfilePage } from '../../pages/profile/profile';
import { NavController, LoadingController } from 'ionic-angular';
import { UserserviceProvider } from '../../providers/userservice/userservice';
/**
 * Generated class for the OtpComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'otp',
  templateUrl: 'otp.html'
})
export class OtpComponent {
    trfe: any;
   
    public myForm: FormGroup;
    public submitted: boolean;
    public events: any[] = [];
    @Input() Otpnumbers = 0;
    @Output() private onPush = new EventEmitter();
    constructor(private _NavController: NavController, private _fb: FormBuilder,private _UserserviceProvider:UserserviceProvider) {
        this.myForm = new FormGroup({
            otpno: new FormControl('', [<any>Validators.required, <any>Validators.minLength(4)]),
            checkbox: new FormControl('', [Validators.required])

        });
        console.log(this.myForm);
        this.myForm.valueChanges.subscribe((form: any) => {
            console.log('form changed to:', form);
        }
        );
  }

    pushpage(value) {

      
this.onPush.emit(value);
        
  }
  ionViewDidLoad() {
    this._UserserviceProvider.getlanguage().subscribe(res => 
        {this.trfe = res;
         }, err => console.log(err))
}

}
