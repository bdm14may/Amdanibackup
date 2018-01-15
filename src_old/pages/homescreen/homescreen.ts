import { Component } from '@angular/core';
import { NavController, NavParams,ModalController } from 'ionic-angular';
import { PlotdetailsPage } from "../plotdetails/plotdetails";
import { CropdetailsPage } from "../cropdetails/cropdetails";
import { WeatherPage } from "../weather/weather";
import { MydetailsPage } from "../mydetails/mydetails";
import { WeatherPage1 } from "../weather1/weather1";
import { NativeAudio } from '@ionic-native/native-audio';

/**
 * Generated class for the HomescreenPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-homescreen',
  templateUrl: 'homescreen.html',
})
export class HomescreenPage {
sound:boolean=true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,private _NativeAudio:NativeAudio) {
    localStorage.getItem('no')=='no'?this.sound=false:this.sound=true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomescreenPage');
  }
  notify(sound){
    if(sound){
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
   let profileModal = this.modalCtrl.create(MydetailsPage);
   profileModal.present();

}

pushweather(){
  // this.viewctrl.dismiss();
  // this._App.getRootNav().setRoot(WeatherPage1);
  let profileModal = this.modalCtrl.create(WeatherPage1);
  profileModal.present();
 
}
pushcrop(){
 //  this.viewctrl.dismiss();
  // this._App.getRootNav().setRoot(CropdetailsPage);
  let profileModal = this.modalCtrl.create(CropdetailsPage);
  profileModal.present();
}  
pushplot(){
   //this.viewctrl.dismiss();
   //this._App.getRootNav().setRoot(PlotdetailsPage);
   //this.navCtrl.push(PlotdetailsPage);
   let profileModal = this.modalCtrl.create(PlotdetailsPage);
   profileModal.present();
}


}
