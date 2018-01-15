import { Component } from '@angular/core';
import { NavController, NavParams,ViewController,App,ModalController, ToastController } from 'ionic-angular';
import { MydetailsPage } from '../mydetails/mydetails';
import { WeatherPage } from '../weather/weather';
import { PlotdetailsPage } from '../plotdetails/plotdetails';
import { CropdetailsPage } from '../cropdetails/cropdetails';
import { WeatherPage1 } from "../weather1/weather1";
import { NativeAudio } from '@ionic-native/native-audio';
import { UserserviceProvider } from '../../providers/userservice/userservice';
import { ToastService } from '../../providers/userservice/ToastService';
/**
 * Generated class for the ModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
    selector: 'page-modal',
    templateUrl: 'modal.html',
})
export class ModalPage {
    language=localStorage.getItem('Languagef')?localStorage.getItem('Languagef'):'English';
   
    language1=[{
      id:1,
      name:"English"
    },
    {
      id:2,
      name:"Hindi"
    }
     
    
    
    ]
    trfe: any;
  
    sound:boolean=true;
    constructor(public navCtrl: NavController, public navParams: NavParams,private viewctrl:ViewController,private _App:App, public modalCtrl: ModalController,private _NativeAudio:NativeAudio,private _UserserviceProvider:UserserviceProvider,private _ToastService:ToastService, public toastCtrl: ToastController) {
        localStorage.getItem('no')=='no'?this.sound=false:this.sound=true;
    }

    ionViewDidLoad() {
        this._UserserviceProvider.getlanguage().subscribe(res => 
            {this.trfe = res;
             }, err => console.log(err))
    }

    dismiss() {
       
        this.viewctrl.dismiss();
        this._UserserviceProvider.getlanguage().subscribe(res => 
            {this.trfe = res;
             }, err => console.log(err))
    }

    notify(sound){
        if(sound){
            this._NativeAudio.setVolumeForComplexAsset('uniqueId1',0.2);
            this._NativeAudio.loop('uniqueId1').then(()=>{
                
                            },()=>{
                                
                            });
                            localStorage.setItem('no','yes');

        }else{
            this._NativeAudio.stop('uniqueId1').then(()=>{

            },()=>{
                
            });
            localStorage.setItem('no','no');
        }
    }

    pushmydetails(){
         // this._App.getRootNav().setRoot(MydetailsPage);
        //this.navCtrl.push(MydetailsPage);
       // this.dismiss();
        let profileModal = this.modalCtrl.create(MydetailsPage);
        profileModal.onDidDismiss(()=>{
            this._UserserviceProvider.getlanguage().subscribe(res => 
                {this.trfe = res;
                 }, err => console.log(err))

        })

        profileModal.present();

    }

    pushweather(){
        //this.dismiss();
       // this.viewctrl.dismiss();
       // this._App.getRootNav().setRoot(WeatherPage1);
       
       let profileModal = this.modalCtrl.create(WeatherPage1);
       profileModal.onDidDismiss(()=>{
        this._UserserviceProvider.getlanguage().subscribe(res => 
            {this.trfe = res;
             }, err => console.log(err))

    })
       profileModal.present();
      
    }
    pushcrop(){
        this.dismiss();
      //  this.viewctrl.dismiss();
       // this._App.getRootNav().setRoot(CropdetailsPage);
       let profileModal = this.modalCtrl.create(CropdetailsPage);
       profileModal.onDidDismiss(()=>{
        this._UserserviceProvider.getlanguage().subscribe(res => 
         
            {this.trfe = res; 
             }, err => console.log(err))

    })
       profileModal.present();
    }
    private presentToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
      }
      save(){
        this._ToastService.presentLoadingDefault();
        this._UserserviceProvider.Sentuser2(this.language).subscribe(res =>{
          this._ToastService.presentLoadingHide();
          localStorage.setItem('Languagef',this.language);
          this.presentToast(this.trfe.Update_Successful);
          this._UserserviceProvider.getlanguage().subscribe(res => 
            {this.trfe = res;
             }, err => console.log(err))
        },err => {
         this._ToastService.presentLoadingHide();
         this.presentToast('Something went wrong.');
            console.log(err);
        });
      }  
    pushplot(){
        this.dismiss();
        //this.viewctrl.dismiss();
        //this._App.getRootNav().setRoot(PlotdetailsPage);
        //this.navCtrl.push(PlotdetailsPage);
        let profileModal = this.modalCtrl.create(PlotdetailsPage);
        profileModal.onDidDismiss(()=>{
            this._UserserviceProvider.getlanguage().subscribe(res => 
                {this.trfe = res;
                 }, err => console.log(err))

        })
        profileModal.present();
    }



}
