import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams, App, Platform, ViewController,Slides } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
import { MapplotPage } from '../mapplot/mapplot';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Observable } from 'rxjs/Rx'
import * as useraction from '../../common/reducer/luser.reducer';
import { UserserviceProvider } from '../../providers/userservice/userservice';
import { ToastService } from "../../providers/userservice/ToastService";
import { HomescreenPage } from "../homescreen/homescreen";
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
@Component({
    selector: 'page-weather',
    templateUrl: 'weather.html',
})



export class WeatherPage{
    tempfg: any;
    placeinfo: any;
    g: any;
    showblue:number=0;
    reg: any;
    value;
    hj: any;
    lastUpdated: any;
    weatherinfo1: any;
    registered4: Observable<Array<useraction.Iuser>>;
    @ViewChild(Slides) slides: Slides;

    constructor(public navCtrl: NavController, public navParams: NavParams, private _ScreenOrientation: ScreenOrientation, private _UserserviceProvider: UserserviceProvider, private _App: App, private _NativeAudio: NativeAudio, private _Platform: Platform, private _ToastService: ToastService, private viewctrl: ViewController, private nativeGeocoder: NativeGeocoder) {
      

        this._Platform.ready().then(() => {
            this._ScreenOrientation.lock(this._ScreenOrientation.ORIENTATIONS.LANDSCAPE);
            //alert(localStorage.getItem("L_lat"));
            this.nativeGeocoder.reverseGeocode(Number(localStorage.getItem("L_lat")), Number(localStorage.getItem("L_lang")))
                .then((result: NativeGeocoderReverseResult) => { this.placeinfo = result; console.log(JSON.stringify(result)) })
                .catch((error: any) => console.log(error));
            localStorage.getItem('no') ? localStorage.getItem('no') : localStorage.setItem('no', 'yes');

            this._NativeAudio.preloadComplex('uniqueId1', 'audio/sm.mp3', 1, 1, 0).then((res) => {

                if (localStorage.getItem('no')) {
                    if (localStorage.getItem('no') == 'no') return false;
                    this._NativeAudio.loop('uniqueId1').then(() => {
                        console.log('success');
                    }, () => {
                        console.log('error');
                    });
                }


            }, (err) => {
                console.log(err);

            });
        });
        this.callv();
    }
    ngAfterViewInit() {
       
       // this.slides.slidesPerView=4;
      }

    callv(): any {
        this.registered4 = this._UserserviceProvider.users;
        this.registered4.subscribe((res) => {
            this.reg = res;
        }, (err) => {
            console.log(err);
        })

    }
    

    ionViewDidEnter() {


       
        let lat, lang, res1;

        this.registered4.subscribe(res => {

            res1 = res[0];
            if (res1.Hgeo) {
                this.hj = true;
                lat = res1.Hgeo[0].latitude;
                lang = res1.Hgeo[0].longitude;
            } else {
                this.hj = false;
                lat = res1.Home_Lat;
                lang = res1.Home_Lang;
            }

        })
        
        
        this._ToastService.presentLoadingDefault();
        this._UserserviceProvider.fetchweather(Number(localStorage.getItem("L_lat")), (Number(localStorage.getItem("L_lang"))),'15day_expanded_forecast').subscribe(resrt => {
           
            console.log(resrt);
            this.weatherinfo1 = resrt.locations;
            this.tempfg=this.weatherinfo1[0];
            this.tempfg=this.tempfg.time_segments[0];
            this._ToastService.presentLoadingHide();
          
        }, err => {
            console.log(err);
            this._ToastService.presentLoadingHide();
        })



    }
    ionViewWillEnter() {
       
        this._UserserviceProvider.fetchusers(localStorage.getItem("Phone_no")).subscribe((res) => {
          
            this._UserserviceProvider.adduser(res);

         

        },
            err => {
            
                this._ToastService.presentClosableToast("Opps something went wrong");

            });
            
        // this.nativeGeocoder.reverseGeocode(Number(localStorage.getItem("L_lat")), Number(localStorage.getItem("L_lang")))
        //     .then((result: NativeGeocoderReverseResult) => { console.log(result); this.placeinfo = result })
        //     .catch((error: any) => console.log(error));
        this.lastUpdated = new Date();


    }
    ngOnInit() {

    }
    showinfo(v,i){
        this.showblue=i;
        this.tempfg=v;

    }
    nextpage() {
        if (this.hj) {
            this._App.getRootNav().push(MapplotPage);
        } else {
            this._App.getRootNav().push(HomescreenPage);
        }


    }
    dismiss() {
        this.viewctrl.dismiss();
    }


}
