import { Component } from '@angular/core';
import { NavController, NavParams,App,ViewController, AlertController } from 'ionic-angular';
import { Screen1Page } from '../screen1/screen1';
import { UserserviceProvider } from "../../providers/userservice/userservice";
import { ToastService } from "../../providers/userservice/ToastService";
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { ChangecropeheaderPage } from '../changecropeheader/changecropeheader';
import { EditcropdtPage } from '../editcropdt/editcropdt';

/**
 * Generated class for the CropdetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-cropdetails',
  templateUrl: 'cropdetails.html',
})
export class CropdetailsPage {
    trf: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private _App: App, private viewctrl: ViewController, private _UserserviceProvider: UserserviceProvider,public alertCtrl: AlertController,private _ToastService:ToastService,private modalCtrl:ModalController ) {
        this._UserserviceProvider.fetchcropedetails().subscribe(res => this.trf = res.result, err => console.log(err))
  }

    ionViewDidLoad() {

    console.log('ionViewDidLoad CropdetailsPage');
  }
  dismiss() {
    this.viewctrl.dismiss();
}
  gotoscreen(v,indexu) {
      localStorage.setItem("L_lang", this.trf[indexu].Lang)
      localStorage.setItem("L_lat", this.trf[indexu].Lat)
      localStorage.setItem("Crop_adv",v.Crop_adv_id);
  this.viewctrl.dismiss();
  this._App.getRootNav().push(Screen1Page, { dat: v.Sowing_date,info:v,Crope_name:v.Crop_name,cropindexw:indexu+1,Varietyvalue:v.Variety_Name,land_size:v.Size,Map_name:v.Map_name});
  
}
editsowing(cp,i){
  console.log(cp);
  //this.presentPrompt(cp,i)
  let profileModal2 = this.modalCtrl.create(EditcropdtPage,{cp:cp});
  profileModal2.onDidDismiss((data)=>{
    if(data=='cancal'){
      return false;
    }
    this._ToastService.presentLoadingDefault();
    console.log(data.password,cp,'cp');
    this._UserserviceProvider.updatesowing(cp.Crop_adv_id,data).subscribe((res)=>{
      console.log(res);
     // this.trf[i].Crop_adv_id=data.password;
      this._UserserviceProvider.fetchcropedetails().subscribe(res => this.trf = res.result, err => console.log(err))
      this._ToastService.presentLoadingHide();
      this._ToastService.presentClosableToast("अद्यतन सफलतापूर्ण हो गया.");

    },err =>{console.log(err);  this._ToastService.presentClosableToast("ओह! कुछ गलत हो गया है.");
            this._ToastService.presentLoadingHide();})


  })

  profileModal2.present();

}
delete(cp,i){
  this.presentConfirm2(cp,i);
}

presentConfirm2(cp,i) {
  let alert = this.alertCtrl.create({
    title: 'कृपया जांचें !',
    message: 'क्या आप वाकईहटाए चाहते हैं?',
    buttons: [
      {
        text: 'रद्द करे  ',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'ठीक',
        handler: () => {

          this._UserserviceProvider.deletecrop(cp.Crop_adv_id).subscribe((res)=>{
            console.log(res);
           // this.trf[i].Crop_adv_id=data.password;
            this._UserserviceProvider.fetchcropedetails().subscribe(res => this.trf = res.result, err => console.log(err))
            this._ToastService.presentLoadingHide();
            this._ToastService.presentClosableToast("अद्यतन सफलतापूर्ण हो गया.");
      
          },err =>{console.log(err);  this._ToastService.presentClosableToast("ओह! कुछ गलत हो गया है.");
                  this._ToastService.presentLoadingHide();})
      
        
        
          
        }
      }
    ]
  });
  alert.present();
}

presentPrompt(cp,i) {
  const alert = this.alertCtrl.create({
    title: 'Enter Sowing Date',
    inputs: [
     
      {
        name: 'password',
        placeholder: 'Enter Sowing date',
        type: 'date'
      }
    ],
    buttons: [
      {
        text: 'रद्द करे',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'सुरक्षित करे ',
        handler: data => {
          if (data.password) {
            this._ToastService.presentLoadingDefault();
            console.log(data.password,cp,'cp');
            this._UserserviceProvider.updatesowing(cp.Crop_adv_id,data.password).subscribe((res)=>{
              console.log(res);
              this.trf[i].Crop_adv_id=data.password;
              this._UserserviceProvider.fetchcropedetails().subscribe(res => this.trf = res.result, err => console.log(err))
              this._ToastService.presentLoadingHide();
              this._ToastService.presentClosableToast("अद्यतन सफलतापूर्ण हो गया.");

            },err =>{console.log(err);  this._ToastService.presentClosableToast("ओह! कुछ गलत हो गया है.");
                    this._ToastService.presentLoadingHide();})

          
          } else {
           
            return false;
          }
        }
      }
    ]
  });
  alert.present();
}

     
}
