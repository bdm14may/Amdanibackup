import { Component, ViewChild } from '@angular/core';

import { NavController, LoadingController, ToastController, Slides,App,Platform   } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { ProfilePage } from '../profile/profile';
import { Iuser } from '../../common/models/user.state';
import * as ureducer from '../../common/reducer/campaign.reducer';
import * as ureducermessage from '../../common/reducer/fetchmessage.reducer';
import * as useraction from '../../common/reducer/luser.reducer';
import { UserserviceProvider } from '../../providers/userservice/userservice';
import { ToastService } from '../../providers/userservice/ToastService';
import { OtpComponent} from '../../components/otp/otp';
import { Sim  } from '@ionic-native/sim';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { UserweatherPage } from "../userweather/userweather";
declare var cordova: any;
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage  {
    trfe: any;
    numbers: any;
    gphoneno: any;
    resultJson: any;
    ustatus: any;
    utoken: any;
    @ViewChild(Slides) slides: Slides;
    private registered: boolean = true;
    registered1: Observable<Array<ureducer.Campaign>>;
    registered2: Observable<Array<ureducermessage.message>>;
    registered3: Observable<Array<useraction.Iuser>>;
 
   
    constructor(public navCtrl: NavController, private _UserserviceProvider: UserserviceProvider, private _loadingCtrl: LoadingController, private _ToastController: ToastController,private _App:App,private _Platform:Platform,private sim: Sim,private _LocalNotifications: LocalNotifications,private ToastService:ToastService) {
        this._Platform.ready().then(() => {
            this.sim.getSimInfo().then(
                (info) => console.log('Sim info: ', info),
                (err) => console.log('Unable to get sim info: ', err)
              );
              
              this.sim.hasReadPermission().then(
                (info) => console.log('Has permission: ', info)
              );
            
              this.sim.requestReadPermission().then(
                () => console.log('Permission granted'),
                () => console.log('Permission denied')
              );
             const deviceInfo = cordova.require("cordova-plugin-deviceinformation.DeviceInformation");
            deviceInfo.get((result) =>{
               
                if (result) {
                    this.resultJson = JSON.parse(result);
                    if (this.resultJson.phoneNo != "TM.ERROR") {
                        this.gphoneno = this.resultJson.phoneNo ? this.resultJson.phoneNo : this.gphoneno;
                    }
                   
                }

               
                      
                  }, (err) =>{
                      console.log(err);
                  });


        })
        
        this.register1();
        //this.presentLoadingDefault();
    }
    ionViewDidLoad() {
        this._UserserviceProvider.getlanguage().subscribe(res => 
            {this.trfe = res;
             
                console.log(res);
             }, err => console.log(err))
    }

    presentLoadingDefault() {
        let loading = this._loadingCtrl.create({
            spinner: 'dots'
        });
        this.registered1.subscribe((e) => {
            e ? loading.dismiss() : false;
        });

        loading.present();


    }

    ngAfterViewInit() {
        this.slides.freeMode = true;
        this.slides.onlyExternal = true;
    }

    pushotp(value1: any): any {
        console.log(value1.otpno, 'otp', this.ustatus.OTP);
        if (value1.otpno != this.ustatus.OTP) {
            this.presentToast("Please enter valid OTP");
        } else {
            if (this.ustatus.id) {
                this.adduser(true);

            } else {
                this.adduser(false);

            }
        }
       
      
      
        //value1.otpno != this.numbers ? this.presentToast('OTP', this.numbers) : this.adduser();
       
    }
    register(value: any): any {
          this.gphoneno=value;
         
          let value1=value.toString();
          if(value1.length !=10){
              this.ToastService.presentToast("Please enter valid 10 digits mobile no.");
              return false;

          }
        
           this.registered = false;
           this.slides.slideTo(2, 500);
           
           this._UserserviceProvider.getotp(value,true).subscribe(res => this.ustatus=res,
               err => console.log(err) ,
               () => console.log('completed'));
         
       


    }

    generate(){
        this.numbers = this.getRandomInt(1, 10000);
    }
    getRandomInt(min, max)  {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    presentToast(msg) {
        let toast = this._ToastController.create({
            message: `${msg}`,
            duration: 3000,
            position: 'bottom',
            showCloseButton:true
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
    }

    register1(): any {
      
        this.registered1 = this._UserserviceProvider.campaigns;
        this.registered2 = this._UserserviceProvider.messages;
        this.registered3 = this._UserserviceProvider.users;
        this.registered3.subscribe(v=>{
            console.log(v);
        })
        this._UserserviceProvider.loadCampaigns();

        this._UserserviceProvider.loadCampaigns1();


    }
    pushpage() {
        //this.navCtrl.push();
        this._App.getRootNav().setRoot(ProfilePage);
    }

    deleteitem(id) {

        console.log(id);
        this._UserserviceProvider.deleteCampaigns(id);

    }
    adduser(o: boolean) {
        console.log('this.ustatus', this.ustatus,o);
        if (o) {
          
                this._UserserviceProvider.adduser([{
                    'id': this.ustatus.id,
                    'name': 'null',
                    'mobileno': this.gphoneno,
                    'image': 'null',
                    'islogin': true,
                    'password': 'null',
                    'loading': true
                }]);

               this._App.getRootNav().setRoot(ProfilePage,{gphoneno:this.gphoneno});
             
    
        } else {
            console.log(0, 'hi2', this.ustatus.data[0].Name);
            localStorage.setItem("Phone_no",this.ustatus.data[0].Phone_no);
            localStorage.setItem("uid",this.ustatus.data[0].id);
            localStorage.setItem("Languagef", this.ustatus.data[0].Language);
           
             if (this.ustatus.data[0].Name != null) {
                this._UserserviceProvider.adduser([{
                    'id': this.ustatus.data[0].id,
                    'name': this.ustatus.data[0].name,
                    'mobileno': this.ustatus.data[0].Phone_no,
                    'image': this.ustatus.data[0].Image_url,
                    'islogin': true,
                    'password': 'null',
                    'loading': true,
                    'State_Name': this.ustatus.data[0].Image_url,
                    'Dist_Name': this.ustatus.data[0].Image_url,
                    'Taluka_name': this.ustatus.data[0].Image_url,
                    'Village_name': this.ustatus.data[0].Image_url,
                    'Active_crope_Ad': this.ustatus.data[0].Image_url,
                    'User_Reg': this.ustatus.data[0].User_Reg,
                    'Last_Active': this.ustatus.data[0].Last_Active,
                    'Home_Lat': this.ustatus.data[0].Home_Lat,
                    'Home_Lang': this.ustatus.data[0].Home_Lang
                }]);

                this._App.getRootNav().setRoot(UserweatherPage);

             } else {
                 console.log(0, 'hi3');
                 this._UserserviceProvider.adduser([{
                     'id': this.ustatus.id,
                     'name': 'null',
                     'mobileno': this.gphoneno,
                     'image': 'null',
                     'islogin': true,
                     'password': 'null',
                     'loading': true
                 }]);

                 this._App.getRootNav().setRoot(ProfilePage);


             }
          

        }
    }



    
}
