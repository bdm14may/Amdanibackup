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


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
 
  counter:number=0;
  pages: Array<{title: string, component: any}>;
  public unregisterBackButtonAction: any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private _UserserviceProvider: UserserviceProvider, public loadingCtrl: LoadingController, private _ToastService: ToastService,public toastCtrl: ToastController,private alertCtrl: AlertController ) {
    this
    .platform
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

presentToast(gh) {
  const toast = this.toastCtrl.create({
    message: `Press 2 time  to exit`,
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
    
    
    if (localStorage.getItem("uid")) {
        this.rootPage = UserweatherPage;
       
        localStorage.setItem("user_old", "yes");
    } else {
        this.rootPage = HomePage;
       

    }
  }


 
}
