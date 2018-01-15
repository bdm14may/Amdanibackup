import { Component } from '@angular/core';
import { NavController, NavParams,ViewController,App,ModalController } from 'ionic-angular';
import { MydetailsPage } from '../mydetails/mydetails';
import { WeatherPage } from '../weather/weather';
import { PlotdetailsPage } from '../plotdetails/plotdetails';
import { CropdetailsPage } from '../cropdetails/cropdetails';
import { WeatherPage1 } from "../weather1/weather1";
import { NativeAudio } from '@ionic-native/native-audio';
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
    sound:boolean=true;
    constructor(public navCtrl: NavController, public navParams: NavParams,private viewctrl:ViewController,private _App:App, public modalCtrl: ModalController,private _NativeAudio:NativeAudio) {
        localStorage.getItem('no')=='no'?this.sound=false:this.sound=true;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ModalPage');
    }

    dismiss() {
       
        this.viewctrl.dismiss();
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
        this.dismiss();
        let profileModal = this.modalCtrl.create(MydetailsPage);
        profileModal.present();

    }

    pushweather(){
        this.dismiss();
       // this.viewctrl.dismiss();
       // this._App.getRootNav().setRoot(WeatherPage1);
       let profileModal = this.modalCtrl.create(WeatherPage1);
       profileModal.present();
      
    }
    pushcrop(){
        this.dismiss();
      //  this.viewctrl.dismiss();
       // this._App.getRootNav().setRoot(CropdetailsPage);
       let profileModal = this.modalCtrl.create(CropdetailsPage);
       profileModal.present();
    }  
    pushplot(){
        this.dismiss();
        //this.viewctrl.dismiss();
        //this._App.getRootNav().setRoot(PlotdetailsPage);
        //this.navCtrl.push(PlotdetailsPage);
        let profileModal = this.modalCtrl.create(PlotdetailsPage);
        profileModal.present();
    }



}
