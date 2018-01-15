import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { UserserviceProvider } from '../../providers/userservice/userservice';

/**
 * Generated class for the EditcropdtPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-editcropdt',
  templateUrl: 'editcropdt.html',
})
export class EditcropdtPage {
  Sowing_date: any;
  Irrigation_type: any;
  Crop_name: any;
  Variety_Name: any;
  variety:any;
  irrigation:any;
  cropvalue: any;
  Soil1:any;
  ecrope = [{
    "id": 1,
    "Name": "Potato"
},
{
    "id": 10,
    "Name": "Wheat"
},
{
    "id": 12,
    "Name": "Gram"
},
{
    "id": 6,
    "Name": "Maize"
},
{
    "id": 13,
    "Name": "Mustard"
},
{
"id": 14,
"Name": "Tomato"
},
{
"id": 16,
"Name": "Sugarcane"
},{
"id": 18,
"Name": "Banana"
}


];

  soil=[
    {
        id:1,
        Value:'Sand'
    },
    {
        id:2,
        Value:'Slit'
    },
    {
        id:3,
        Value:'Clay'
    }

]
  constructor(public navCtrl: NavController, public navParams: NavParams,private viewctrl:ViewController,private _UserserviceProvider:UserserviceProvider) {
    this.cropvalue=this.navParams.get('cp');
    console.log(this.cropvalue,'cropvalue');
    this._UserserviceProvider.loaderrigation(1).subscribe(res => this.irrigation = res, err => {
      console.log(err)
  })
  this.Crop_name=this.cropvalue.Crop_name;
  this.Irrigation_type=this.cropvalue.Irrigation_type;
  this.Sowing_date=this.cropvalue.Sowing_date;
  this.Variety_Name=this.cropvalue.Variety_Name;
  this.Soil1=this.cropvalue.Soil?this.cropvalue.Soil:'Clay';
  this._UserserviceProvider.loadvariety().subscribe(res => {
    this.variety = res;
   

},
    err => console.log(err));

}
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditcropdtPage');
  }
  submitval(){
let v={
  Crop_name:this.Crop_name,
  Irrigation_type:this.Irrigation_type,
  Sowing_date:this.Sowing_date,
  Variety_Name:this.Variety_Name,
  Soil1:this.Soil1?this.cropvalue.Soil1:"null"
}
    this.viewctrl.dismiss(v);
  }
  dismiss1() {
    this.viewctrl.dismiss('cancal');
}

}
