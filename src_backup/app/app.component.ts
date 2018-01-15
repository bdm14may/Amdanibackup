import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController,ToastController,AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {GooglemapComponent } from  '../components/googlemap/googlemap';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Screen1Page } from '../pages/screen1/screen1';
import { ProfilePage } from "../pages/profile/profile";
import { UserweatherPage } from '../pages/userweather/userweather';
import { UserserviceProvider } from "../providers/userservice/userservice";
import { ToastService } from "../providers/userservice/ToastService";
import { Network } from '@ionic-native/network';
/*import { Diagnostic } from '@ionic-native/diagnostic';*/
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { DeviceAccounts } from '@ionic-native/device-accounts';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
     rootPage: any;
     counter:number=0;
     pages: Array<{title: string, component: any}>;
     public unregisterBackButtonAction: any;

     constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private _UserserviceProvider: UserserviceProvider, public loadingCtrl: LoadingController, private _ToastService: ToastService,public toastCtrl: ToastController,private alertCtrl: AlertController,private network:Network,public push: Push,private deviceAccounts: DeviceAccounts) {
         this.platform
             .ready()
             .then(() => {
             platform.registerBackButtonAction(()=>this.myHandlerFunction());
             statusBar.hide();
             splashScreen.hide();
             
         });
         this.initializeApp();
         // used for an example of ngFor and navigation
         this.pages = [
             { title: 'Home', component: HomePage },
             { title: 'List', component: ListPage }
         ];
     }


     checkNetwork() {
         this.platform.ready().then(() => {
             var networkState = this.network.type;
             let alert = this.alertCtrl.create({
                 title: "network was disconnected",
                 //subTitle: networkState,
                 buttons: ["OK"]
             });
             alert.present();
         });
     }

     myHandlerFunction() {
         //this.viewctrl.dismiss();
         let alert = this.alertCtrl.create({
             title: 'Alert !!',
             message: 'Are you sure you want to exit ?',
             buttons: [
                 {
                     text: 'Yes',
                     handler: () => {
                         this.platform.exitApp();
                     }
                 },
                 {
                     text: 'No',
                     handler: () => {
                         alert.dismiss();
                     }
                 }
             ]
         });
         alert.present();
     }
     ionViewDidEnter() {

     }
     public initializeBackButtonCustomHandler(): void {
         this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
             this.customHandleBackButton();
         }, 10);
     }

     private customHandleBackButton(): void {
         this.counter=this.counter+1;
         alert(this.counter);
         if(this.counter <=1){
             this.presentToast(this.counter);
         }else{
             this.platform.exitApp();
         }
     }

     private updateUser(){
        let userdata = {
            GCM_Key: localStorage.getItem('GCM_Key'),
            Email_id: localStorage.getItem('emailId'),
            Phone_no: localStorage.getItem('Phone_no')
        
        }
         this._UserserviceProvider.userUpdate(userdata).subscribe((data)=>{
            console.log(data)
         },error=>{
             console.log(error)
         })
     }

     presentToast(gh) {
         const toast = this.toastCtrl.create({
             message: `Press 2 times to exit`,
             duration: 3000,
             position: 'top'
         });
         toast.onDidDismiss(() => {
             console.log('Dismissed toast');
         });
         toast.present();
     }

     initializeApp() {
         this.platform.ready().then(() => {
             this.statusBar.styleDefault();
             this.splashScreen.hide();
         });
         let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
             this.checkNetwork();
             console.log('network was disconnected :-(');
         });
         if (localStorage.getItem("uid")) {
             this.rootPage = UserweatherPage;
             localStorage.setItem("user_old", "yes");
         } else {
             this.rootPage = HomePage;
         }




   /*      this.diagnostic.isLocationEnabled().then(
             (isAvailable) => {
                 if(isAvailable){
                     this.onSuccess();
                 }else{
                     this.onError();
                 }

             }).catch( (e) => {
             console.log(e);
             alert(JSON.stringify(e));
         });
*/
       

     }

     onSuccess() {
         let alert = this.alertCtrl.create({
             title: "GPS was onSuccess",
             //subTitle: networkState,
             buttons: ["OK"]
         });
         alert.present();
     }

     // onError Callback receives a PositionError object

     onError() {
         let alert = this.alertCtrl.create({
             title: "GPS was onError",
             //subTitle: networkState,
             buttons: ["OK"]
         });
         alert.present();
     }




     initPushNotification() {
         if (!this.platform.is('cordova')) {
             console.warn('Push notifications not initialized. Cordova is not available - Run in physical device');
             return;
         }
         const options: PushOptions = {
             android: {
                 senderID: '43633870124'
             },
             ios: {
                 alert: 'true',
                 badge: false,
                 sound: 'true'
             },
             windows: {}
         };
         
         const pushObject: PushObject = this.push.init(options);

         pushObject.on('registration').subscribe((data: any) => {
             console.log('device token -> ' + data.registrationId);
             if(data.registrationId){
                localStorage.setItem('GCM_Key', data.registrationId)
                this.updateUser();
             }
                
             //TODO - send device token to server
         });

         

         pushObject.on('notification').subscribe((data: any) => {
             console.log('message -> ' + data.message);
             //if user using app and push notification comes
             if (data.additionalData.foreground) {
                 // if application open, show popup
                 let confirmAlert = this.alertCtrl.create({
                     title: 'New Notification',
                     message: data.message,
                     buttons: [{
                         text: 'Ignore',
                         role: 'cancel'
                     }, {
                         text: 'View',
                         handler: () => {
                             //TODO: Your logic here
                             /*this.nav.push(DetailsPage, { message: data.message });*/
                         }
                     }]
                 });
                 confirmAlert.present();
             } else {
                 //if user NOT using app and push notification comes
                 //TODO: Your logic on click of push notification directly
              /*   this.nav.push(DetailsPage, { message: data.message });*/
                 console.log('Push notification clicked');
             }
         });

         pushObject.on('error').subscribe(error => console.error('Error with Push plugin' + error));
         
     }










    }
