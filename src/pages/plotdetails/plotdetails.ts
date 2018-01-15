import { Component } from '@angular/core';
import { NavController, NavParams,App,ViewController, AlertController } from 'ionic-angular';
import { MapplotPage } from "../mapplot/mapplot";
import { ModalPage } from "../modal/modal";
import { PesticidesPage } from "../pesticides/pesticides";
import { GooglemapComponent } from "../../components/googlemap/googlemap";
import { UserserviceProvider } from "../../providers/userservice/userservice";
import { Screen1Page } from "../screen1/screen1";
import { ToastService } from '../../providers/userservice/ToastService';
import { Zip } from '@ionic-native/zip';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';


@Component({
  selector: 'page-plotdetails',
  templateUrl: 'plotdetails.html',
})
export class PlotdetailsPage {
  ziped: string;
  trfe: any;
    tr: any;
    fileTransfer: FileTransferObject = this.transfer.create();

    constructor(public navCtrl: NavController, public navParams: NavParams, private _App: App, private viewctrl: ViewController, private _UserserviceProvider: UserserviceProvider,public alertCtrl: AlertController,private _ToastService:ToastService,private transfer: FileTransfer, private file: File,private zip: Zip) {
        this._UserserviceProvider.fetchcropedetails().subscribe(res => { this.tr = res.result; console.log(res.result, "ploatdetails") }, err => console.log(err))
        
  }

    ionViewDidLoad() {
      this._UserserviceProvider.getlanguage().subscribe(res => 
        {this.trfe = res;
         }, err => console.log(err))
       
    }
    presentConfirm2(cp,i) {
      let alert = this.alertCtrl.create({
        title: `${this.trfe.Please_check}`,
        message:`${this.trfe.rm_it}`,
        buttons: [
          {
            text: 'cancel ',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'OK',
            handler: () => {
              this._UserserviceProvider.deletename(cp.land_id).subscribe((res)=>{
                console.log(res);
               // this.trf[i].Crop_adv_id=data.password;
                this._UserserviceProvider.fetchcropedetails().subscribe(res => this.tr = res.result, err => console.log(err))
                this._ToastService.presentLoadingHide();
                this._ToastService.presentClosableToast(this.trfe.Update_Successful);
          
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
        title: `${this.trfe.Update_plot}`,
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
            text: 'cancel',
            role: 'cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Save ',
            handler: data => {
             
                this._ToastService.presentLoadingDefault();
                console.log(data.password,cp,'cp');
                this._UserserviceProvider.updatesowingland(cp.land_id,data.PlotName,data.size).subscribe((res)=>{
                  console.log(res);
                  this.tr[i].Crop_adv_id=data.password;
                  this._UserserviceProvider.fetchcropedetails().subscribe(res => this.tr = res.result, err => console.log(err))
                  this._ToastService.presentLoadingHide();
                  this._ToastService.presentClosableToast(this.trfe.Update_Successful);
    
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
     

      let r='d_'+p.Crop_name;
      
       
       if(!localStorage.getItem(r)){
           this._ToastService.presentLoadingDefault();
           this._ToastService.presentClosableToast1('Please wait image is loading from server');
    
           this._UserserviceProvider.fetchcropimagefromserver(p.Crop_name).subscribe((res)=>{
               console.log(res);
               this.fileTransfer.download(res.server_url, this.file.dataDirectory + res.folder_name+'.zip').then((entry) => {
                   console.log('download complete: ' + entry.toURL(),this.file.dataDirectory);
                   this._ToastService.presentClosableToast1('download complete');
               
                   
                   this.zip.unzip(`${this.file.dataDirectory}+${res.folder_name}.zip`, `${this.file.dataDirectory}/assets/${res.folder_name}`, (progress) => {
                     console.log();
                      this.ziped=Math.round((progress.loaded / progress.total) * 100) +'%';
                      console.log(this.ziped);
                      this._ToastService.presentClosableToast1(this.ziped);
                      this._ToastService.presentLoadingHide();
                      
    
                    })
                    .then((result) => {
                       localStorage.setItem(r,r);
                      if(result === 0) console.log('SUCCESS');
                      if(result === -1) console.log('FAILED');
                      this.dismiss();
                      this._App.getRootNav().push(Screen1Page, {dat: p.Sowing_date,info:p,Crope_name:p.Crop_name,cropindexw:indexw+1,Varietyvalue:p.Variety_Name,land_size:p.Size,Map_name:p.Map_name});
                      this._ToastService.presentLoadingHide();
                    });
                 }, (error) => {
                   this._ToastService.presentLoadingHide();
                 });
               
                                 })
       }else{
        this.dismiss();
        this._App.getRootNav().push(Screen1Page, {dat: p.Sowing_date,info:p,Crope_name:p.Crop_name,cropindexw:indexw+1,Varietyvalue:p.Variety_Name,land_size:p.Size,Map_name:p.Map_name});
       }

     

  }

}
