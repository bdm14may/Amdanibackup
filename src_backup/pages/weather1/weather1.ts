import { Component,PipeTransform, Pipe,ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, App, Platform,Slides } from 'ionic-angular';
import * as useraction from '../../common/reducer/luser.reducer';
import { Observable } from "rxjs/Observable";
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { UserserviceProvider } from "../../providers/userservice/userservice";
import { ToastService } from "../../providers/userservice/ToastService";
/**
* Generated class for the WeatherPage page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/


@Component({
    selector: 'page-weather1',
    templateUrl: 'weather1.html',
})


export class WeatherPage1 {
    showblue:number=0;
    tempfg: any;
    weatherinfo1: any;
    weatherinfo: any[];
    reg: any;
    value;
    hj: any;
    lastUpdated: any;
    @ViewChild(Slides) slides: Slides;
    registered8: Observable<Array<useraction.Iuser>>;
            display:any;
            constructor(public navCtrl: NavController, private viewctrl: ViewController, public navParams: NavParams, private _ScreenOrientation: ScreenOrientation, private _UserserviceProvider: UserserviceProvider, private _App: App, private _Platform: Platform, private _ToastService: ToastService) {
                this.registered8 = this._UserserviceProvider.users;
               
        
    }
    ngOnInit() {
        this.display=this.navParams.get('deviceNum');
        console.log(this.display);
    }
    ngAfterViewInit() {
      
       // this.slides.slidesPerView=4;
      }

    dismiss() {
        this.viewctrl.dismiss();
    }
    ionViewDidLoad() {
      
        this._UserserviceProvider.fetchusers(localStorage.getItem("Phone_no")).subscribe((res) => {
            console.log(res);
            this._UserserviceProvider.adduser(res);

            

        },
            err => {
               
                this._ToastService.presentClosableToast("Opps something went wrong");

            });


    }
    ionViewDidEnter() {


        this.weatherinfo = [];
        let lat, lang, res1;

        this.registered8.subscribe(res => {

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
      
        this._UserserviceProvider.fetchweather(lat, lang,'15day_expanded_forecast').subscribe(resrt => {
           
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
        this.lastUpdated = new Date();


    }
    showinfo(v,i){
        this.showblue=i;
        this.tempfg=v;

    }

}
