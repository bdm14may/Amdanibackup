import { Component } from '@angular/core';
import { NavController, NavParams,App,ViewController, AlertController } from 'ionic-angular';
import { Screen1Page } from '../screen1/screen1';
import { UserserviceProvider } from "../../providers/userservice/userservice";
import { ToastService } from "../../providers/userservice/ToastService";

/**
 * Generated class for the ChangecropeheaderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-changecropeheader',
  templateUrl: 'changecropeheader.html',
})
export class ChangecropeheaderPage {
  trfe: any;
  tempfg2: any;
  harvestindex: any;
  tempfg: any;
  showblue: any;
  trf: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _App: App, private viewctrl: ViewController, private _UserserviceProvider: UserserviceProvider,public alertCtrl: AlertController,private _ToastService:ToastService) {
   
  }

  ionViewDidLoad() {

    this._UserserviceProvider.getlanguage().subscribe(res => 
      {this.trfe = res;

      console.log(res,'lang');
       }, err => console.log(err))

    this._UserserviceProvider.fetchcropedetails().subscribe(res => 
      {this.trf = res.result;
        this.tempfg=this.trf[0];}, err => console.log(err))
    
   
  }
  gotoscreen(v,indexu) {
    localStorage.setItem("L_lang", v.Lang)
    localStorage.setItem("L_lat", v.Lat)
    localStorage.setItem("Crop_adv",v.Crop_adv_id);
    this.harvestindex=  this.trf.map(function(e,i) { 
      return e.Crop_adv_id; }).indexOf(v.Crop_adv_id);
     // alert(v);
this.viewctrl.dismiss();
this._App.getRootNav().push(Screen1Page, { dat: v.Sowing_date,info:v,Crope_name:v.Crop_name,cropindexw:this.harvestindex+1,Varietyvalue:v.Variety_Name,land_size:v.Size,Map_name:v.Map_name});

}
  showinfo(v,i){
    this.showblue=i;
    this.tempfg=v;

}

dismiss(){
  this.viewctrl.dismiss();
}

}
