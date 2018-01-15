import { Component } from '@angular/core';
import { NavController, NavParams,App,ViewController, AlertController } from 'ionic-angular';
import { Screen1Page } from '../screen1/screen1';
import { UserserviceProvider } from "../../providers/userservice/userservice";
import { ToastService } from "../../providers/userservice/ToastService";
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { ChangecropeheaderPage } from '../changecropeheader/changecropeheader';
import { EditcropdtPage } from '../editcropdt/editcropdt';
import { Zip } from '@ionic-native/zip';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

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
  ziped: string;
  trfe: any;
    trf: any;
    fileTransfer: FileTransferObject = this.transfer.create();
    constructor(public navCtrl: NavController, public navParams: NavParams, private _App: App, private viewctrl: ViewController, private _UserserviceProvider: UserserviceProvider,public alertCtrl: AlertController,private _ToastService:ToastService,private modalCtrl:ModalController,private transfer: FileTransfer, private file: File,private zip: Zip ) {
        this._UserserviceProvider.fetchcropedetails().subscribe(res => this.trf = res.result, err => console.log(err))
  }

    ionViewDidLoad() {

      this._UserserviceProvider.getlanguage().subscribe(res => 
        {this.trfe = res;
         }, err => console.log(err))
  }
  dismiss() {
    this.viewctrl.dismiss();
}
  gotoscreen(v,indexu) {
      localStorage.setItem("L_lang", this.trf[indexu].Lang)
      localStorage.setItem("L_lat", this.trf[indexu].Lat)
      localStorage.setItem("Crop_adv",v.Crop_adv_id);
  
  let r='d_'+v.Crop_name;
  
   
   if(!localStorage.getItem(r)){
       this._ToastService.presentLoadingDefault();
       this._ToastService.presentClosableToast1('Please wait image is loading from server');

       this._UserserviceProvider.fetchcropimagefromserver(v.Crop_name).subscribe((res)=>{
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
                  this.viewctrl.dismiss();
                  this._App.getRootNav().setRoot(Screen1Page, { dat: v.Sowing_date,info:v,Crope_name:v.Crop_name,cropindexw:indexu+1,Varietyvalue:v.Variety_Name,land_size:v.Size,Map_name:v.Map_name});
                  this._ToastService.presentLoadingHide();
                });
             }, (error) => {
               this._ToastService.presentLoadingHide();
             });
                             })
   }else{
    this.viewctrl.dismiss();
    this._App.getRootNav().setRoot(Screen1Page, { dat: v.Sowing_date,info:v,Crope_name:v.Crop_name,cropindexw:indexu+1,Varietyvalue:v.Variety_Name,land_size:v.Size,Map_name:v.Map_name});
   }
  //this._App.getRootNav().setRoot(Screen1Page, { dat: v.Sowing_date,info:v,Crope_name:v.Crop_name,cropindexw:indexu+1,Varietyvalue:v.Variety_Name,land_size:v.Size,Map_name:v.Map_name});
  
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
      this._ToastService.presentClosableToast(this.trfe.Update_Successful);

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
    title: `${this.trfe.Please_check}`,
    message:`${this.trfe.rm_it}`,
    buttons: [
      {
        text: 'cancel  ',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'OK',
        handler: () => {

          this._UserserviceProvider.deletecrop(cp.Crop_adv_id).subscribe((res)=>{
            console.log(res);
           // this.trf[i].Crop_adv_id=data.password;
            this._UserserviceProvider.fetchcropedetails().subscribe(res => this.trf = res.result, err => console.log(err))
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
        text: 'cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save ',
        handler: data => {
          if (data.password) {
            this._ToastService.presentLoadingDefault();
            console.log(data.password,cp,'cp');
            this._UserserviceProvider.updatesowing(cp.Crop_adv_id,data.password).subscribe((res)=>{
              console.log(res);
              this.trf[i].Crop_adv_id=data.password;
              this._UserserviceProvider.fetchcropedetails().subscribe(res => this.trf = res.result, err => console.log(err))
              this._ToastService.presentLoadingHide();
              this._ToastService.presentClosableToast(this.trfe.Update_Successful);

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
