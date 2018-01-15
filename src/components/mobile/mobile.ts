import { Component,Input,Output,EventEmitter,OnInit,ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {UserserviceProvider} from '../../providers/userservice/userservice'
import {LimitToDirective} from '../../app/limit-to_directive';

/**
 * Generated class for the MobileComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'mobile',
  templateUrl: 'mobile.html'
})
export class MobileComponent implements OnInit {
    trfe: any;
    valueToPass1: any;
    public myForm: FormGroup;
    public submitted: boolean;
    public ghj=[];
    public events: any[] = [];
  text: string;
  @Output() private onRegister = new EventEmitter();
  @Input() valueToPass: any;
  constructor(private _fb: FormBuilder, private _UserserviceProvider: UserserviceProvider,private ref: ChangeDetectorRef) {
      
  }
  ionViewDidLoad() {
    this._UserserviceProvider.getlanguage().subscribe(res => 
        {this.trfe = res;
            console.log(this.trfe);
         }, err => console.log(err))
         
  

    
}
  register(ab) {
     this.onRegister.emit(ab)
        
  }

  change(value){
    //manually launch change detection
    this.ref.detectChanges();
    this.valueToPass = value.length > 10 ? value.substring(0,10) : value;
  }
  ngOnInit() {
      this.myForm = new FormGroup({
          mobileno: new FormControl('', [<any>Validators.required, <any>Validators.minLength(10)]),

      });
      console.log(this.myForm);
      this.myForm.valueChanges.subscribe((form: any) => {
          console.log('form changed to:', form);
      }
      );
      

  }
   maxLengthCheck(valueToPass)
  {
    var str = this.valueToPass; 
    var str3=str.toString();
    var str2=str3.length;
    console.log(str2);
    if (str2  > 10){
        var res = str3.slice(0, 10);
        console.log(res);
        this.valueToPass1=Number(res);
        //this.valueToPass =Number(res);
    }
  
  }

}
