import {
    Component,
    ViewChild,
    ElementRef
} from '@angular/core';
import {
    DomSanitizer
} from '@angular/platform-browser';
import {
    NavController,
    NavParams,
    ModalController,
    Slides,
    AlertController,
    ViewController,
    Gesture,
    ToastController,
    Platform
} from 'ionic-angular';
import {
    ScreenOrientation
} from '@ionic-native/screen-orientation';
import {
    ModalPage
} from '../modal/modal';
import {
    WeatherPage
} from '../weather/weather';
import * as weather from '../../common/reducer/weather.reducer';
import {
    UserserviceProvider
} from "../../providers/userservice/userservice";
import {
    Observable
} from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import {
    ToastService
} from "../../providers/userservice/ToastService";
import {
    NativeGeocoder,
    NativeGeocoderReverseResult,
    NativeGeocoderForwardResult
} from '@ionic-native/native-geocoder';
import {
    DsortingPipe
} from '../../pipes/dsorting/dsorting';
import {
    ChangecropeheaderPage
} from '../changecropeheader/changecropeheader';
import {
    ZoomPage
} from '../zoompage/zoompage';
import * as pinchZoom from 'pinch-zoom';
import {
    SuggestPage
} from "../suggest/suggest";
import * as hm from 'hammerjs';
import * as ht from 'hammer-timejs';
import {
    TextToSpeech
} from '@ionic-native/text-to-speech';
import {
    NativeAudio
} from '@ionic-native/native-audio';
import {
    Calendar
} from '@ionic-native/calendar';
import {
    CropcalenderdPage
} from '../cropcalenderd/cropcalenderd';


@Component({
    selector: 'page-screen1',
    templateUrl: 'screen1.html',
})
export class Screen1Page {
    landyield1: any;
    eventSource: any;
    autoplayk: string;
    Map_namegh: any;
    items: any;
    vtvalue: any;
    placeinfo: any;
    ndrt: number;
    weatherinfo1: any;
    c1: Date;
    landyield: any;
    coin: any;
    indexcv1: any;
    resume: string = "yes";
    showcropeimage: any;
    detailsrt: weather.Iweather[];
    imagebkg: any;
    indexcv: number = -1;
    nd: number;
    hm: any;
    harvestindex;
    devalue: any;

    indef: number = 0;
    zoomimage: any;
    @ViewChild(Slides) slides: Slides;
    private gesture: Gesture;

    closeme: any;
    weathers: Observable < weather.Iweather > ;
    img1;
    one;
    label;
    img;
    pzoom;
    count1 = 0;
    isClass1Visible = false;
    isClass2Visible = false;
    zoom1 = false;
    zoom2 = false;
    zoom;
    count;
    showbtnrt: boolean = true;


    fweathersrt: Observable < Array < weather.Iweather >> ;
    showdate: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private screenOrientation: ScreenOrientation, private _ViewController: ViewController, private el: ElementRef, private _UserserviceProvider: UserserviceProvider, private _DomSanitizer: DomSanitizer, private _ToastService: ToastService, public toastCtrl: ToastController, public tts: TextToSpeech, private _Platform: Platform, public alertCtrl: AlertController, private NativeGeocoder: NativeGeocoder, private _DsortingPipe: DsortingPipe, private _NativeAudio: NativeAudio, private Calendar: Calendar) {
        this.one = 1;
        this.count = 0;
        this.zoom = true;
        this.imagebkg = 'day';


        this.fweathersrt = this._UserserviceProvider.iweathers;
        this.fweathersrt.subscribe((res) => {
            this.detailsrt = res;
            console.log(this.detailsrt, 'land');
        })
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE).then(() => {
            console.log('called');
        });
        console.log(navParams.get('dat'));

    }

    ngAfterViewInit() {


        this.slides.slidesPerView = 5;
        var el = document.querySelector('.wrapper')
        this.pzoom = pinchZoom(el, {
            tapreset: true,
            draggable: true,
            maxScale: 3

        })
        this.isClass2Visible = false;
        this.hm = new Hammer.Manager(el);

    }



    cropcalender() {

        let profileModal4 = this.modalCtrl.create(CropcalenderdPage);
        profileModal4.present();

    }
    ionViewDidEnter() {
        let k = this.indexcv;
        this.slides.slideTo(k, 500);

    }
    ionViewWillEnter() {
        this.showcropeimage = this.navParams.get('Crope_name');
        this.Map_namegh = this.navParams.get('Map_name');
        this._UserserviceProvider.getcountuserresponse(this.showcropeimage, this.navParams.get('land_size')).then((res) => {

            console.log(res[0].size, 'size');
            console.log(res[0].positive, 'positive');
            this.landyield = res[0].size;
            this.landyield1 = res[0].yield;

            this.coin = res[0].positive * 100;

        })
        this.vtvalue = this.navParams.get('Varietyvalue');
        let rt = this.navParams.get('dat');
        //let yjkl=[];
        this.nd = Date.parse(rt);
        this.nd = this.nd / 1000;
        this._UserserviceProvider.loaddummymessage(this.showcropeimage, this.vtvalue).then((res) => {
            let res1 = res;
            this.showdate = res1;

            this.harvestindex = this.showdate.map(function (e, i) {
                return e.Growth;
            }).indexOf('Harvest');
            // alert(this.harvestindex);

            console.log(res, 'crope');

            var d1 = new Date();
            var d2 = new Date(d1);
            var same = d1.getTime() === d2.getTime();
            console.log();
            this.ndrt = Date.parse(rt);
            console.log(this.ndrt, 'this.ndrt');
            var d = new Date(this.ndrt);
            var gjhk;
            var dateOffset;
            var date1 = new Date();
            let diff: number = 0;
            var diffDays;
            let lllk = false;
            var closest = 0;
            for (let k = 0; k < this.showdate.length; k++) {
                dateOffset = (24 * 60 * 60 * 1000) * Number(this.showdate[k].DAP);
                gjhk = new Date(dateOffset + this.ndrt);
                let today = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate(), 0, 0, 0);
                let myToday = new Date(gjhk.getFullYear(), gjhk.getMonth(), gjhk.getDate(), 0, 0, 0);

                diff = Math.abs(today.getTime() - myToday.getTime());
                console.log(diff, 'diff');
                diffDays = Math.ceil(diff / (1000 * 3600 * 24));
                if (diffDays == 0) {
                    this.indexcv = k;
                    this.devalue = this.showdate[k].Development;

                    this.setFilteredItems(this.devalue)
                    setTimeout(() => {
                        lllk = true;
                    }, 1000);
                    break;

                } else if (myToday.getTime() > today.getTime()) {


                    this.indexcv = k;
                    //this._ToastService.presentClosableToast2("No activity to be performed on plot today");
                    this.devalue = this.showdate[k].Development;
                    this.setFilteredItems(this.devalue);
                    setTimeout(() => {
                        lllk = true;

                    }, 1000);
                    break;
                    //     if(this.showdate.length==(k+1)){
                    //         if(!lllk){
                    //             this._ToastService.presentClosableToast("No activity to be performed on plot today");
                    //             //this.indexcv=k;
                    //         }
                    // }


                }



                if (this.showdate.length == (k + 1)) {
                    if (!lllk) {
                        this._ToastService.presentClosableToast2("आज प्लाट  पर कोई गतिविधि नहीं होगी");
                        //this.indexcv=k;
                    }
                }
                console.log(k == this.showdate.length, 'cropkl', this.showdate.length, k);

            }

        })

        let c = new Date().getHours();


        console.log(c, "c");
        if (this.imagebkg == "day") {
            if (c >= 6 && c < 7) {
                this.imagebkg = 'suny';
            } else if (c >= 18 && c < 19) {
                this.imagebkg = 'suny';
            } else if (c >= 19 && c < 24) {
                this.imagebkg = 'night';
            } else {
                this.imagebkg = "day";
            }
        }


        var newdate = new Date();


    }
    pinchout(e: any): any {
        this.count > 1 ? this.count-- : this.count = 1;
        console.log(this.count);

    }
    setFilteredItems(value) {
        //alert(value);
        this.devalue = value;
        let itemser = null;



        itemser = this.showdate.filter(item => item.Development.indexOf(value) !== -1);

        this.items = itemser;
        this._ToastService.presentToast1(value);


        var d1 = new Date();
        var d2 = new Date(d1);

        let rt = this.navParams.get('dat');
        this.ndrt = Date.parse(rt);
        var d = new Date(this.ndrt);
        var gjhk;
        var dateOffset;
        var date1 = new Date();
        let diff: number = 0;
        var diffDays;
        let lllk = false;
        var closest = 0;
        for (let k = 0; k < this.items.length; k++) {
            dateOffset = (24 * 60 * 60 * 1000) * Number(this.items[k].DAP);
            gjhk = new Date(dateOffset + this.ndrt);
            let today = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate(), 0, 0, 0);
            let myToday = new Date(gjhk.getFullYear(), gjhk.getMonth(), gjhk.getDate(), 0, 0, 0);

            diff = Math.abs(today.getTime() - myToday.getTime());
            console.log(diff, 'diff');
            diffDays = Math.ceil(diff / (1000 * 3600 * 24));

            if (diffDays == 0) {
                this.indexcv = k;
                this.items[k].img ? this.img = this.items[k].img : this.img = null;
                this.items[k].img_zoom ? this.zoomimage = this.items[k].img_zoom : this.zoomimage = null;
                //alert(this.indexcv);


                lllk = true;
                this.slides.slideTo(this.indexcv, 100);

                break;

            } else if (myToday.getTime() > today.getTime()) {


                this.indexcv = k;
                this.items[k].img ? this.img = this.items[k].img : this.img = null;
                this.items[k].img_zoom ? this.zoomimage = this.items[k].img_zoom : this.zoomimage = null;
                this._ToastService.presentClosableToast4("आज प्लाट  पर कोई गतिविधि नहीं होगी");



                lllk = true;
                this.slides.slideTo(this.indexcv, 100);

                break;
                //     if(this.showdate.length==(k+1)){
                //         if(!lllk){
                //             this._ToastService.presentClosableToast("No activity to be performed on plot today");
                //             //this.indexcv=k;
                //         }
                // }


            } else {
                this.indexcv = -1;

                this.items[k].img ? this.img = this.items[k].img : this.img = null;
                this.items[k].img_zoom ? this.zoomimage = this.items[k].img_zoom : this.zoomimage = null;
            }

        }

    }
    presentAlerter() {
        let valuer;
        let dateOffset = (24 * 60 * 60 * 1000) * Number(this.showdate[this.harvestindex].DAP);
        let gjhk = new Date(dateOffset + this.ndrt);
        let monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];
        let gjhk2 = new Date(this.navParams.get('dat'));
        let day2 = gjhk2.getDate();
        let monthIndex2 = gjhk2.getMonth();
        let year2 = gjhk2.getFullYear();
        let day = gjhk.getDate();
        let monthIndex = gjhk.getMonth();
        let year = gjhk.getFullYear();
        let ik = this.navParams.get("cropindexw") - 1;
        //alert(ik);


        this._ToastService.presentLoadingDefault();
        this._UserserviceProvider.fetchcropedetails().subscribe((res) => {
                valuer = res.result;

                this.NativeGeocoder.reverseGeocode(Number(localStorage.getItem("L_lat")), Number(localStorage.getItem("L_lang")))
                    .then((result: NativeGeocoderReverseResult) => {
                        this.placeinfo = result;
                        console.log(JSON.stringify(result))
                        let yield1 = this.round(this.landyield1, 2);
                        const alert = this.alertCtrl.create({
                            title: `${this.showcropeimage}`,
                            message: `<p><b>फसल ज़मीन का नाम:</b> ${valuer[ik].Map_name}<br><b>शुरुआती उपज :${yield1}  (Kg/ha)<br>
अभी का उपज : ${this.landyield} (Kg/ha)</b><br> <b>फसल ज़मीन का क्षेत्र:</b> ${valuer[ik].Size} HA </p><p><b>बुवाई की तारीख:</b> ${day2}    ${monthNames[monthIndex2]}  ${year2}</p><p><b>हार्वेस्ट तिथि:</b> ${day}    ${monthNames[monthIndex]}  ${year}</p><br>
<b>स्थान:</b> ${this.placeinfo.subLocality?this.placeinfo.subLocality:this.placeinfo.thoroughfare},${this.placeinfo.locality},${this.placeinfo.subAdministrativeArea},${this.placeinfo.administrativeArea}<br>`,
                            buttons: ['खारिज']
                        });
                        alert.present();
                        this._ToastService.presentLoadingHide();

                    })
                    .catch((error: any) => console.log(error));
                this._ToastService.presentLoadingHide();
                //this._ToastService.presentClosableToast("Opps something went wrong");

            },
            err => {
                this._ToastService.presentLoadingHide();
                // this._ToastService.presentClosableToast("Opps something went wrong");

            });
    }

    changeheadermodal() {
        let profileModal2 = this.modalCtrl.create(ChangecropeheaderPage);
        profileModal2.present();

    }

    playslider() {
        //this.indexcv > 0 ? this.indexcv=0:this.indexcv;

        if (this.count1 == 0) {
            this.autoplayk = 'yes';
            this.indexcv = this.showdate.map(function (e, i) {
                return e.Development;
            }).indexOf(this.devalue);


            this.items = this.showdate;
            //this._DsortingPipe.transform(this.showdate,null);
            this._NativeAudio.stop('uniqueId1').then(() => {

            }, () => {

            });
            // this.indexcv=-1;
        }
        this.count1 = this.count1 + 1;
        localStorage.setItem("stop", "start");

        this.showbtnrt = false;
        this.resume = "yes";
        //this.indexcv=this.indexcv+1;
        let z = this.indexcv % 6;
        this.slides.slideTo(this.indexcv, 100);
        if (this.items.length == this.indexcv) {
            console.log('done');
            this.indexcv = -1;
            this.count1 = 0;
            this.resume = "no";
            this.showbtnrt = true;
            if (localStorage.getItem('no') != 'no') {

                this._NativeAudio.setVolumeForComplexAsset('uniqueId1', 0.2);
                this._NativeAudio.loop('uniqueId1').then(() => {

                }, () => {

                });
            }
        } else {
            if (this.resume == "yes") {

                this.showsuggest1(this.items[this.indexcv], this.indexcv);

            }
        }




    }
    stopslider() {
        this.count1 = 0;
        this.indexcv = -1;
        this.autoplayk = 'no';
        localStorage.setItem("stop", "stop");
        if (localStorage.getItem('no') != 'no') {
            this._NativeAudio.setVolumeForComplexAsset('uniqueId1', 0.2);
            this._NativeAudio.loop('uniqueId1').then(() => {

            }, () => {

            });
        }
        this.showbtnrt = true;
        console.log('no', 'no');
        this.resume = "no";
    }

    ionViewDidLoad() {
        let b: weather.Iweather[];
        this.gesture = new Gesture(this.el.nativeElement);

        //listen for the gesture
        this.gesture.listen();

        //turn on listening for pinch or rotate events
        this.gesture.on('pinch', e => this.pinchEvent(e));

        let rg, rg1;

        let pinch = new Hammer.Pinch();
        this.hm.add([pinch]);
        this.hm.on('pinchin', e => this.pinchout(e));
        this.hm.on('pinchout', e => this.pinchEvent(e));
        this.weathers = this._UserserviceProvider.iweathers;

        let a = 1;
        let res1;


        if (a <= 1) {
            //     this._UserserviceProvider.loadweatherdatabyyahoo("21.38", "74.24").subscribe((res) => {
            //         rg = res;
            //         console.log(res,'loadweatherdatabyyahoo');
            //         rg1 = rg.results;
            //         console.log(rg1,'rg1');
            //         this._UserserviceProvider.addland(rg1);
            //         if (rg1.channel) {

            //            /* switch (parseInt(rg1.channel.item.condition.code)) {
            //                 case 25: this.imagebkg = "day"; // cold
            //                 case 32: this.imagebkg = "day"; // sunny
            //                 case 33: this.imagebkg = "day"; // fair (night)
            //                 case 34: this.imagebkg = "day"; // fair (day)
            //                 case 36: this.imagebkg = "day"; // hot
            //                 case 3200: this.imagebkg = "day"; // not available
            //                     return 'clear-day';
            //                 case 0:
            //                     this.imagebkg = "rain";
            //                     this.one = 4;
            //                     this.one == 4 ? this.isClass2Visible = true : this.isClass2Visible = false;
            //                 case 1: this.imagebkg = "day"; this.one = 4;
            //                     this.one == 4 ? this.isClass2Visible = true : this.isClass2Visible = false;
            //                 case 2: this.imagebkg = "day"; this.one = 4;
            //                     this.one == 4 ? this.isClass2Visible = true : this.isClass2Visible = false;
            //                 case 6: this.imagebkg = "day"; this.one = 4;
            //                     this.one == 4 ? this.isClass2Visible = true : this.isClass2Visible = false;
            //                 case 8: this.imagebkg = "day"; this.one = 4;
            //                     this.one == 4 ? this.isClass2Visible = true : this.isClass2Visible = false;
            //                 case 9: this.imagebkg = "day"; this.one = 4;
            //                     this.one == 4 ? this.isClass2Visible = true : this.isClass2Visible = false;
            //                 case 10: this.imagebkg = "day"; this.one = 4;
            //                     this.one == 4 ? this.isClass2Visible = true : this.isClass2Visible = false;
            //                 case 11: this.imagebkg = "day";
            //                     this.one = 4;
            //                     this.one == 4 ? this.isClass2Visible = true : this.isClass2Visible = false;
            //                 case 12: this.imagebkg = "day"; this.one = 4;
            //                     this.one == 4 ? this.isClass2Visible = true : this.isClass2Visible = false;
            //                 case 17: this.imagebkg = "day"; this.one = 4;
            //                     this.one == 4 ? this.isClass2Visible = true : this.isClass2Visible = false;
            //                 case 35: this.imagebkg = "day"; this.one = 4;
            //                     this.one == 4 ? this.isClass2Visible = true : this.isClass2Visible = false;
            //                 case 40: this.imagebkg = "day"; this.one = 4;
            //                     this.one == 4 ? this.isClass2Visible = true : this.isClass2Visible = false;
            //                     return 'rain';
            //                 case 3: this.imagebkg = "day"; this.one = 4;
            //                     this.one == 4 ? this.isClass2Visible = true : this.isClass2Visible = false;
            //                 case 4: this.imagebkg = "day";this.one = 4;
            //                     this.one == 4 ? this.isClass2Visible = true : this.isClass2Visible = false;
            //                 case 37: this.imagebkg = "day"; this.one = 4;
            //                     this.one == 4 ? this.isClass2Visible = true : this.isClass2Visible = false;
            //                 case 38: this.imagebkg = "day";this.one = 4;
            //                     this.one == 4 ? this.isClass2Visible = true : this.isClass2Visible = false;
            //                 case 39: this.imagebkg = "day"; this.one = 4;
            //                     this.one == 4 ? this.isClass2Visible = true : this.isClass2Visible = false;
            //                 case 45: this.imagebkg = "day"; this.one = 4;
            //                     this.one == 4 ? this.isClass2Visible = true : this.isClass2Visible = false;
            //                 case 47: this.imagebkg = "day"; this.one = 4;
            //                     this.one == 4 ? this.isClass2Visible = true : this.isClass2Visible = false;
            //                     return 'thunderstorms';
            //                 case 5: this.imagebkg = "day"; this.one = 6;
            //                 case 7: this.one = 6;
            //                 case 13: this.one = 6;
            //                 case 14: this.one = 6;
            //                 case 16: this.one = 6;
            //                 case 18: this.one = 6;
            //                 case 41: this.one = 6;
            //                 case 42: this.one = 6;
            //                 case 43: this.one = 6;
            //                 case 46: this.one = 6;
            //                     return 'snow';
            //                 case 15: // blowing snow
            //                 case 19: // dust
            //                 case 20: // foggy
            //                 case 21: // haze
            //                 case 22: // smoky
            //                     return 'fog';
            //                 case 24: // windy
            //                 case 23: // blustery
            //                     return 'windy';
            //                 case 26: // cloudy
            //                 case 27: // mostly cloudy (night)
            //                 case 28: // mostly cloudy (day)
            //                 case 31: // clear (night)
            //                     return 'cloudy';
            //                 case 29: // partly cloudy (night)
            //                 case 30: // partly cloudy (day)
            //                 case 44: // partly cloudy
            //                     return 'partly-cloudy-day';
            //             }*/
            //         }





            // a++;

            // var numbers1 = Observable.timer(60000); // Call after 10 second.. Please set your time
            // numbers1.subscribe(x => {
            //     this.c1 = new Date();

            // })
            //     let c = new Date().getHours();

            //     var numbers = Observable.timer(10000); // Call after 10 second.. Please set your time
            //     numbers.subscribe(x => {
            //         c = new Date().getHours();
            //         if (this.imagebkg == "day") {
            //             if (c >= 6 && c < 7) {
            //                 this.imagebkg = 'suny';
            //             } else if (c >= 18 && c < 19) {
            //                 this.imagebkg = 'suny';
            //             } else if (c >= 19 && c < 24) {
            //                 this.imagebkg = 'night';
            //             } else {
            //                 this.imagebkg = "day";
            //             }
            //         }
            //     });
            //      console.log(c,"c");
            //      if (this.imagebkg == "day") {
            //          if (c >= 6 && c < 7) {
            //              this.imagebkg = 'suny';
            //          } else if (c >= 18 && c < 19) {
            //              this.imagebkg = 'suny';
            //          } else if (c >= 19 && c < 24) {
            //              this.imagebkg = 'night';
            //          } else {
            //              this.imagebkg = "day";
            //          }
            //      }

            //     }, err => {
            //         console.log(err);
            //     })

            this._UserserviceProvider.fetchweather(Number(localStorage.getItem('L_lat')), (Number(localStorage.getItem('L_lang'))), "day1_forecast").subscribe(res => {
                let c = new Date().getHours();
                console.log(res.locations, "locations");
                this.weatherinfo1 = res.locations;
                console.log(this.weatherinfo1);
                if (this.imagebkg == "day") {
                    if (c >= 6 && c < 7) {
                        this.imagebkg = 'suny';
                    } else if (c >= 18 && c < 19) {
                        this.imagebkg = 'suny';
                    } else if (c >= 19 && c < 24) {
                        this.imagebkg = 'night';
                    } else if (c >= 0 && c < 6) {
                        this.imagebkg = 'night';
                    } else {
                        this.imagebkg = "day";
                    }
                }
            }, err => {
                this._ToastService.presentLoadingHide();
                this._ToastService.presentClosableToast("Opps something went wrong");

            })

            this._ToastService.presentLoadingHide();
        }





    }
    value() {
        this.weathers.subscribe((res) => {

            return res;

        })
    }
    private pinchEvent(event) {
        console.log(event, 'event');
        this.zoomimage ? this.count++ : this.count = 1;
        console.log(this.count, 'count');
        if (this.count == 20 && this.zoomimage) {
            this.closeme = this.modalCtrl.create(ZoomPage, {
                showimage: this.zoomimage
            });
            this.closeme.onDidDismiss(e => {
                this.pzoom.reset();
                this.count = 1;
            });
            this.closeme.present();
        }
    }
    end(e) {

        this.isClass2Visible = false;
    }

    change() {
        this.img1 = 'assets/register/wheat';
        this.img = this.img1 + this.one + '.png';
        this.one <= 6 ? this.one++ : this.one = 1;
        this.one >= 7 ? this.one = 0 : this.one;
        //this.one == 6 ? this.isClass1Visible = true : this.isClass1Visible = false;
        //this.one == 4 ? this.isClass2Visible = true : this.isClass2Visible = false;


    }
    onPanStart(event: any): void {

        this.count++;
        console.log(this.count);
        event.preventDefault();
        if (this.count == 1) {
            this.zoom1 = true;
            this.zoom2 = false;
            this.zoom = false;
        }
        if (this.count == 2) {
            this.zoom1 = false;
            this.zoom2 = true;
            this.zoom = false;
            this.closeme = this.modalCtrl.create(ZoomPage);
            this.closeme.onDidDismiss(e => {
                this.pzoom.reset();
                this.count = 1;
            });
            this.closeme.present();
        }
        if (this.count == 3) {
            //  let profileModal = this.modalCtrl.create(ZoomPage);
            // profileModal.present();
            this.zoom1 = false;
            this.zoom2 = false;
            this.zoom = true;
            this.count > 4 ? this.count++ : this.count = 0;
        }
        //    if(this.count==4){
        //        this.zoom1 = false;
        //        this.zoom2 = true;
        //    } 
        //    if(this.count==5){
        //        this.zoom1 =true ;
        //        this.zoom2 = false;
        //    } 
        //    if(this.count==6){
        //        this.zoom1 =false ;
        //        this.zoom2 = false;
        //        this.count > 6 ? this.count++ : this.count = 0;ad
        //    }
    }
    modal() {
        let profileModal = this.modalCtrl.create(ModalPage);
        profileModal.present();
    }
    weather(t) {
        console.log(t);
        let profileModal = this.modalCtrl.create(WeatherPage, {
            deviceNum: t
        });
        profileModal.present();
    }

    myFunction() {

    }
    showsuggest(r, i): any {
        let jk = 0;
        this.indexcv1 = i;
        jk = this.showdate.map(function (e, i) {
            return e.id;
        }).indexOf(r.id);
        if (r.img) {
            r.img ? this.img = r.img : this.img;
            r.img_zoom ? this.zoomimage = r.img_zoom : false;
        } else {
            this.img = null;
            this.zoomimage = null;
        }


        this.isClass2Visible = false;
        this.isClass1Visible = false;
        this.one = 0;
        let h = this.nd.toString();

        var unixtime = Math.round(new Date().getTime() / 1000);
        var d = (Number(unixtime) - (Number(r.DAP)));
        console.log(d);

        this.callmodalh(r, jk);



    }
    round(value, precision) {
        var multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }
    startspeech(v) {

        let txt = {
            text: v,
            locale: 'hin-IND'

        }
        this.tts.speak(txt);


    }

    showsuggest1(r, i): any {


        r.img ? this.img = r.img : this.img = null;
        r.img_zoom ? this.zoomimage = r.img_zoom : false;
        r.Development == this.devalue ? this.devalue : this.devalue = r.Development;

        this.isClass2Visible = false;
        this.isClass1Visible = false;
        this.one = 0;
        let h = this.nd.toString();

        var unixtime = Math.round(new Date().getTime() / 1000);
        var d = (Number(unixtime) - (Number(r.DAP)));


        this.presentToastre(r, i);




    }


    presentToastre(r, i) {

        let dateOffset = (24 * 60 * 60 * 1000) * Number(this.items[i].DAP);
        let monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];
        let gjhk2 = new Date(dateOffset + this.ndrt);
        let day2 = gjhk2.getDate();
        let monthIndex2 = gjhk2.getMonth();
        let year2 = gjhk2.getFullYear();
        //let gjhk=new Date(dateOffset + this.ndrt);
        this._UserserviceProvider.converttexttohindi(this.items[i].Growth).subscribe(res => {
            //alert(res);
            this.items[i].Growth = res;
            this.startspeech(this.items[i].Growth);
            this._ToastService.presentLoadingHide();

            let toast = this.toastCtrl.create({
                message: `${this.items[i].Growth} , ${day2}  ${monthNames[monthIndex2]}  ${year2} `,
                position: 'middle'
            });
            setTimeout(() => {
                toast.dismiss();
            }, 3000);
            toast.onDidDismiss(() => {
                if (localStorage.getItem("stop") != "stop") {
                    this.indexcv = this.indexcv + 1;
                    this.playslider();
                } else {
                    this.showbtnrt = true;
                }
            });

            toast.present();
        })

    }

    callmodalh1(r, i) {
        let profileModal2 = this.modalCtrl.create(SuggestPage, {
            value: r,
            value1: this.showdate[i + 1],
            indexh: i,
            showingDate: this.nd,
            autoplay: true
        });
        profileModal2.present();
        setTimeout(() => {
            profileModal2.dismiss();
        }, 5000);

        profileModal2.onDidDismiss((v) => {

            if (localStorage.getItem("stop") != "stop") {

                this.playslider();
            } else {
                this.showbtnrt = true;
            }

        })




    }

    callmodalh(r, i) {
        let profileModal = this.modalCtrl.create(SuggestPage, {
            value: r,
            value1: this.showdate[i + 1],
            indexh: i,
            showingDate: this.nd,
            autoplay: false
        });
        profileModal.onDidDismiss(() => {
            this._UserserviceProvider.getcountuserresponse(this.showcropeimage, this.navParams.get('land_size')).then((res) => {

                console.log(res[0].size, 'size');
                console.log(res[0].positive, 'positive');
                this.landyield = res[0].size;
                this.coin = res[0].positive * 100;

            })
        })

        profileModal.present();

    }

}
