import { Component } from '@angular/core';
import { NavController, NavParams,App,ViewController, AlertController } from 'ionic-angular';
import { MapplotPage } from "../mapplot/mapplot";
import { ModalPage } from "../modal/modal";
import { PesticidesPage } from "../pesticides/pesticides";
import { GooglemapComponent } from "../../components/googlemap/googlemap";
import { UserserviceProvider } from "../../providers/userservice/userservice";
import { Screen1Page } from "../screen1/screen1";
import { ToastService } from '../../providers/userservice/ToastService';


@Component({
  selector: 'page-plotdetails',
  templateUrl: 'plotdetails.html',
})
export class PlotdetailsPage {
    tr: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private _App: App, private viewctrl: ViewController, private _UserserviceProvider: UserserviceProvider,public alertCtrl: AlertController,private _ToastService:ToastService) {
        this._UserserviceProvider.fetchcropedetails().subscribe(res => { this.tr = res.result; console.log(res.result, "ploatdetails") }, err => console.log(err))
        
  }

    ionViewDidLoad() {
      
       
    }
    presentConfirm2(cp,i) {
      let alert = this.alertCtrl.create({
        title: 'कृपया जांचें !',
        message: 'Are you sure want to delete ?',
        buttons: [
          {
            text: 'रद्द करे ',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'ठीक',
            handler: () => {
              this._UserserviceProvider.deletename(cp.land_id).subscribe((res)=>{
                console.log(res);
               // this.trf[i].Crop_adv_id=data.password;
                this._UserserviceProvider.fetchcropedetails().subscribe(res => this.tr = res.result, err => console.log(err))
                this._ToastService.presentLoadingHide();
                this._ToastService.presentClosableToast("अद्यतन सफलतापूर्ण हो गया।");
          
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
        title: 'प्लाट  का अद्यतन करें',
        inputs: [
         
          {
            name: 'PlotName',
            placeholder: 'Enter Sowing date',
            type: 'text',
            value:cp.Map_name
          },
          {
            name: 'size',
            placeholder: 'Enter Sowing date',
            type: 'number',
            value:cp.Size
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
             
                this._ToastService.presentLoadingDefault();
                console.log(data.password,cp,'cp');
                this._UserserviceProvider.updatesowingland(cp.land_id,data.PlotName,data.size).subscribe((res)=>{
                  console.log(res);
                  this.tr[i].Crop_adv_id=data.password;
                  this._UserserviceProvider.fetchcropedetails().subscribe(res => this.tr = res.result, err => console.log(err))
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
    
    
  add_plot(){
    this.viewctrl.dismiss();
    this._App.getRootNav().push(PesticidesPage);

  }

  pushpages(){
    this.dismiss();
    this._App.getRootNav().push(PesticidesPage);

  }
  
  back(){
    this._App.getRootNav().push(ModalPage);
  }
  dismiss() {
    this.viewctrl.dismiss();
  }

  crops(p,indexw) {
      localStorage.setItem("L_lang", this.tr[indexw].Lang);
      localStorage.setItem("L_lat", this.tr[indexw].Lat);
      localStorage.setItem("Crop_adv",p.Crop_adv_id);
      this.dismiss();
      this._App.getRootNav().push(Screen1Page, {dat: p.Sowing_date,info:p,Crope_name:p.Crop_name,cropindexw:indexw+1,Varietyvalue:p.Variety_Name,land_size:p.Size,Map_name:p.Map_name});

  }

}
