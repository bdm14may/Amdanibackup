import { Component } from '@angular/core';
import { NavController, NavParams,App,Platform,AlertController } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
import { MapplotPage } from '../mapplot/mapplot';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Observable } from 'rxjs/Rx'
import * as useraction from '../../common/reducer/luser.reducer';
import { UserserviceProvider } from '../../providers/userservice/userservice';
import { ToastService } from "../../providers/userservice/ToastService";
import { HomescreenPage } from "../homescreen/homescreen";
import { Network } from '@ionic-native/network';

@Component({
    selector: 'page-userweather',
    templateUrl: 'userweather.html',
})
export class UserweatherPage {
    trfe: any;
    placeinfo: NativeGeocoderReverseResult;


reg:any;
value;
laty:any;
longx:any;
hj: any;
lastUpdated:any;
weatherinfo: any;
registered4: Observable<Array<useraction.Iuser>>;

constructor(public navCtrl: NavController, public navParams: NavParams, private _ScreenOrientation: ScreenOrientation, private _UserserviceProvider: UserserviceProvider, private _App: App, private _NativeAudio: NativeAudio, private _Platform: Platform, private _ToastService:ToastService,private _Geolocation:Geolocation,private _NativeGeocoder:NativeGeocoder,private network:Network,private alertCtrl:AlertController) {


    this._Platform.ready().then(() => {
        this._ScreenOrientation.lock(this._ScreenOrientation.ORIENTATIONS.LANDSCAPE);

        localStorage.getItem('no')?localStorage.getItem('no'):localStorage.setItem('no','yes');

        this._NativeAudio.preloadComplex('uniqueId1', 'audio/sm.mp3',0.5,1,0).then((res)=>{
            this._NativeAudio.setVolumeForComplexAsset('uniqueId1', 0.2);
            if(localStorage.getItem('no')){
                if (localStorage.getItem('no')=='no') return false;
                this._NativeAudio.loop('uniqueId1').then(()=>{
                    console.log('success');
                }, ()=>{
                    console.log('error');
                });
            }


        }, (err)=>{
            console.log(err);

        });
        this._Geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((resp) => {
            // resp.coords.latitude
            // resp.coords.longitude
            this.laty=resp.coords.latitude;
            this.longx=resp.coords.longitude;
            this._UserserviceProvider.fetchweather(resp.coords.latitude, resp.coords.longitude,"day1_forecast").subscribe(res => {

                console.log(res.locations,"locations");
                this.weatherinfo=res.locations;
                console.log(this.weatherinfo);
            }, err => {
                this._ToastService.presentLoadingHide();
                this._ToastService.presentClosableToast("Opps something went wrong");

            })
            this._NativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude)
                .then((result: NativeGeocoderReverseResult) => { this.placeinfo = result; console.log(JSON.stringify(result)) })
                .catch((error: any) => console.log(error));
        }).catch((error) => {
            console.log('Error getting location', error);
        });
    });
    this.callv();


    // document.addEventListener("offline", this.Offline() , false);
/*
    console.log(this.network.type);
    this.checkNetwork();*/

}

/*checkNetwork() {
    if(this.network.type =='none'){
        this._Platform.ready().then(() => {
            var networkState = this.network.type;
            let alert = this.alertCtrl.create({
                title: "Connection Status",
                subTitle: networkState,
                buttons: ["OK"]
            });
            alert.present();
        });
    }
}*/

callv(): any {
    this.registered4=this._UserserviceProvider.users;
    this.registered4.subscribe((res)=>{
        this.reg=res;
    },(err)=>{
        console.log(err);
    })

}
ionViewDidLoad() {






}
ionViewDidEnter() {
    this.weatherinfo = [];
    let lat, lang, res1;






}
ionViewWillEnter() {
   
    this._ToastService.presentLoadingDefault();
    this._UserserviceProvider.fetchusers(localStorage.getItem("Phone_no")).subscribe((res) => {
        console.log(res[0].Language);
        localStorage.setItem('Languagef',res[0].Language)
        this._UserserviceProvider.adduser(res);


        this._ToastService.presentLoadingHide();
        this._UserserviceProvider.getlanguage().subscribe(res => 
            {this.trfe = res;
             }, err => console.log(err));

        this.registered4.subscribe(res => {
            let lat, lang, res1;
            res1 = res[0];
            if (res1.Hgeo) {
                this.hj = false;
                lat = res1.Hgeo[0].latitude;
                lang = res1.Hgeo[0].longitude;
            } else {
                this.hj = true;
                lat = res1.Home_Lat;
                lang = res1.Home_Lang;
            }

        })

    },
                                                                                     err => {
        this._ToastService.presentLoadingHide();
        this._ToastService.presentClosableToast("Opps something went wrong");

    });

    this.lastUpdated = new Date();


}

/*Offline() {
    // Handle the offline event
    let alert = this.alertCtrl.create({
        title: 'New Friend!',
        subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
        buttons: ['OK']
    });
    alert.present();
}*/


ngOnInit() {      

}
nextpage() {
    if (this.hj) {
        this._UserserviceProvider.fetchcropedetails().subscribe(res => { res.result;
                                                                        //alert(res.result);
                                                                        localStorage.setItem("crope_length",res.result.length)
                                                                        console.log(res.result.length);
                                                                        if(res.result.length > 0){
                                                                            this._App.getRootNav().push(HomescreenPage);
                                                                        }else{
                                                                            this._App.getRootNav().push(MapplotPage);
                                                                        }

                                                                       }, err => console.log(err))

    } else {
        this._App.getRootNav().push(HomescreenPage);
    }


}

}
