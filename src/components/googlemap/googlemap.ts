import { Component, NgZone } from '@angular/core';
import {
    GoogleMaps,
    GoogleMap,
    GoogleMapOptions,
    GoogleMapsEvent,
    LatLng,
    CameraPosition,
    MarkerOptions,
    Marker
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { Zip } from '@ionic-native/zip';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { Platform, NavController, AlertController, ToastController,App, ModalController } from 'ionic-angular';
import { Dialogs } from '@ionic-native/dialogs';
import {GooglepagemodalPage} from '../../pages/googlepagemodal/googlepagemodal';
import * as weather from '../../common/reducer/weather.reducer';
import { googlemapmodule } from './googlemap.module';
import { PesticidesPage } from '../../pages/pesticides/pesticides';
import 'rxjs/add/operator/filter';
import { Observable } from "rxjs/Observable";
import { UserserviceProvider } from "../../providers/userservice/userservice";
import { ToastService } from '../../providers/userservice/ToastService';
import { Screen1Page } from '../../pages/screen1/screen1';


@Component({
    selector: 'googlemap',
    templateUrl: 'googlemap.html'
})
export class GooglemapComponent {
    ziped: any;
    trfe: any;
    area: number;
    latlm:Array<any>;
    weathers: Observable<Array<weather.Iweather>>;
    map: GoogleMap;
    mapElement: HTMLElement;
    autocompleteItems;
    autocomplete;
    fileTransfer: FileTransferObject = this.transfer.create();
    savepoint = [];
    service = new google.maps.places.AutocompleteService();
    constructor(private googleMaps: GoogleMaps, public platform: Platform, private Geolocation: Geolocation, private zone: NgZone, private nativeGeocoder: NativeGeocoder, public navCtrl: NavController, private _AlertController: AlertController, private _UserserviceProvider: UserserviceProvider, public toastCtrl: ToastController,private _ToastService:ToastService,private _App:App,private dialogs: Dialogs,public modalCtrl: ModalController,private transfer: FileTransfer, private file: File,private zip: Zip) {
       
        this.autocompleteItems = [];
        this.autocomplete = {
            query: ''
        };
        // Wait the native plugin is ready.
        platform.ready().then(() => {
            
            this.Geolocation.getCurrentPosition().then((resp) => {
                // resp.coords.latitude
                // resp.coords.longitude
                this.loadMap(resp.coords.latitude, resp.coords.longitude);
            }).catch((error) => {
                console.log('Error getting location', error);
            });

        });
    }

    // Don't use the ngAfterViewInit(). The native plugin is not ready.
    //ngAfterViewInit() {
    // this.loadMap();
    //}
    ionViewDidLoad() {
        this._UserserviceProvider.getlanguage().subscribe(res => 
          {this.trfe = res;
           }, err => console.log(err))
      }

    ionViewWillEnter(){
        this._UserserviceProvider.loadlatlongrange().subscribe((res) =>{
            this.latlm=res;
        },err =>{
            console.log(err);
        })
    }

    loadMap(latitude, longitude) {
        this.mapElement = document.getElementById('map');
        var label: HTMLElement = document.getElementById("label");
        // this.savepoint.push({
        //           lat: latitude,
        //           lng: longitude
        //         });
        let mapOptions: GoogleMapOptions = {
           
            camera: {
                target: {
                    lat: latitude,
                    lng: longitude
                },
                zoom: 18,
                tilt: 30,
                
              
            }
          
           
        };

        this.map = this.googleMaps.create(this.mapElement, mapOptions);


        this.map.one(GoogleMapsEvent.MAP_READY)
            .then(() => {
               this.map.setMapTypeId("MAP_TYPE_SATELLITE");


               this.addmarker1(latitude, longitude);


                this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe((latLng) => {
                  
                    this.addmarker(latLng.lat, latLng.lng)

                });

                // this.map.addMarker({
                //     title: 'testing',
                //     icon: 'blue',
                //     animation: 'DROP',
                //     'draggable': true,
                //     position: {
                //       lat: latitude,
                //       lng: longitude
                //     }
                //   })
                //   .then(marker => {
                //     marker.on(GoogleMapsEvent.MARKER_CLICK)
                //       .subscribe(() => {
                //         alert('clicked');
                //       });
                //   });

            });
    }

    clearOverlays() {
        for (var i = 0; i < this.savepoint.length; i++) {
            this.savepoint[i].setMap(null);
        }
        this.savepoint.length = 0;
    }
    presentPrompt1() {
     // alert(this.savepoint.length);
        if (this.savepoint.length >= 2) {
            this.showmodal();

        } else {
            this.showdialogemsg("Please map ploat");

        }

    }

    showmodal(){
        let r=this.round(this.area,2);
        let ghjk= localStorage.getItem('cropdetails');
        let ghjk1=JSON.parse(ghjk);
        let y=(Number(localStorage.getItem("crope_length")))+1;
        let cropindexer=(Number(localStorage.getItem("crope_length")));
        let profileModal = this.modalCtrl.create(GooglepagemodalPage, { area: r,cropvale:ghjk1,cropk:cropindexer });
        profileModal.onDidDismiss((lang,area)=>{
            lang!='cancel'?this.showconfirmdialoge1(lang,area):false;
            
        })

        profileModal.present();
    }
    showdialogemsg(a) {
        const toast = this.toastCtrl.create({
            message: 'a',
            duration: 3000,
            position: 'bottom'
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();

    }

     round(value, precision) {
        var multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }

    showconfirmdialoge1(lang,area){ {
        let data1=lang;
        let alert = this._AlertController.create({
          //title: 'Please Check !',
          message: `${this.trfe.sure_ha}`,
          buttons: [
            {
              text: 'cancel  ',
              role: 'cancel',
              handler: () => {
               
                
                this.showmodal();
              }
            },
            {
              text: 'Save',
              handler: () => {
                let a: weather.Iweather[];
                let d = new Date();
                let n = d.valueOf();
                let yujk;
                let r=this.round(this.area,2);
                let ghjk= localStorage.getItem('cropdetails');
                let ghjk1=JSON.parse(ghjk);
                let y=(Number(localStorage.getItem("crope_length")))+1;
                let cropindexer=(Number(localStorage.getItem("crope_length")));
                a = [{ landdetails: this.savepoint, name: data1, id: null, size: this.area }];
                
                let res1;
                this._ToastService.presentLoadingDefault();
                this._UserserviceProvider.savemap(a).subscribe((res) => {
                    res1=res;
                    yujk=res.id;
                    this._ToastService.presentLoadingHide();
                    if(res1.length==0){
                        this._ToastService.presentClosableToast1('Please enter unique Ploat name');
                        return false;
                    }
                
                    a[0].id = res.id;
                  
                    console.log(res.id,'landid');
                
                    console.log(a);
                    this._UserserviceProvider.addland(a);
                   
                    localStorage.setItem("crope_length",JSON.stringify(y));
                      this._UserserviceProvider.savemapbycrope(ghjk1.sowingdate,yujk, ghjk1.Variety.Value, ghjk1.Irrigation,ghjk1.cropevalue,ghjk1.Soil.Value).subscribe((res) => {
                         
                            console.log(res,'land');
                            localStorage.setItem('Crop_adv', res.id);
                            let ghjk= localStorage.getItem('cropdetails');
                            let ghjk1=JSON.parse(ghjk);
                            let r='d_'+ghjk1.cropevalue;
                           
                            
                            if(!localStorage.getItem(r)){
                                this._ToastService.presentLoadingDefault();
                                this._ToastService.presentClosableToast1('Please wait image is loading from server');
            
                                this._UserserviceProvider.fetchcropimagefromserver(ghjk1.cropevalue).subscribe((res)=>{
                                    console.log(res);
                                    this.fileTransfer.download(res.server_url, this.file.dataDirectory + res.folder_name+'.zip').then((entry) => {
                                        console.log('download complete: ' + entry.toURL(),this.file.dataDirectory);
                                        this._ToastService.presentClosableToast1('download complete');
                                    
                                        
                                        this.zip.unzip(`${this.file.dataDirectory}+${res.folder_name}.zip`, `${this.file.dataDirectory}/assets/${res.folder_name}`, (progress) => {
                                          console.log();
                                           this.ziped=Math.round((progress.loaded / progress.total) * 100) +'%';
                                           console.log(this.ziped);
                                           this._ToastService.presentClosableToast1(this.ziped);
                                           this._ToastService.presentLoadingHide();
                                           

                                         })
                                         .then((result) => {
                                            localStorage.setItem(r,r);
                                           if(result === 0) console.log('SUCCESS');
                                           if(result === -1) console.log('FAILED');
                                           this._App.getRootNav().setRoot(Screen1Page, { dat: ghjk1.sowingdate,Crope_name:ghjk1.cropevalue,cropindexw:y,Varietyvalue:ghjk1.Variety.Value,land_size:this.area,Map_name:data1 });
                                           this._ToastService.presentLoadingHide();
                                         });
                                      }, (error) => {
                                        this._ToastService.presentLoadingHide();
                                      });
                                    
                                                      })
                            }else{
                                this._App.getRootNav().setRoot(Screen1Page, { dat: ghjk1.sowingdate,Crope_name:ghjk1.cropevalue,cropindexw:y,Varietyvalue:ghjk1.Variety.Value,land_size:this.area,Map_name:data1 });
                            }
                           
                        },() =>{
                           this._ToastService.presentLoadingHide();
                            this._ToastService.presentClosableToast1('Opps something went wrong');
                        })
                    })
                
                    this._UserserviceProvider.savegooglestate();
              
              }
            }
          ]
        });
        alert.present();
      }
    }

    presentPrompt() {
let r=this.round(this.area,2);
let ghjk= localStorage.getItem('cropdetails');
let ghjk1=JSON.parse(ghjk);
let y=(Number(localStorage.getItem("crope_length")))+1;
let cropindexer=(Number(localStorage.getItem("crope_length")));
        let alert = this._AlertController.create({
           title: `Total Area : ${r}  Ha`,
            enableBackdropDismiss: false,
            inputs: [
                {
                    name: 'LandDetail',
                    placeholder: 'Enter Plot Name',
                    value:`${ghjk1.cropevalue}_${y}`
                },
                {
                    name: 'area',
                    placeholder: 'Username',
                    type:'number',
                    value:`${r}`
                  },

            ],
            buttons: [
           
                {
                    text: 'cancel  ',
                    role: 'cancel',
                    handler: data => {

                    }
                },
                {
                    text: 'Save ',
                    handler: data => {
                       if(data.area > 0){
                        this.area=this.round(data.area,2);
                       }else{
                        this._ToastService.presentToast('enter valid plot size');
                           return false;
                       }
                      

                      
                       if(data.LandDetail.length > 0){
                        console.log(data.LandDetail);
                       }else{
                         this._ToastService.presentToast('enter a valid plot name');
                       }

                       //this.showconfirmdialoge1(data);
                        
                    
                }
                }
            ]
        });
        alert.present();
    }

    chooseItem(item: any) {

        this.autocomplete.query = item;
        this.autocompleteItems = [];
        this.nativeGeocoder.forwardGeocode(item)
            .then((coordinates: NativeGeocoderForwardResult) => {
                let position: CameraPosition = {
                    target: {
                        lat: parseFloat(coordinates.latitude),
                        lng: parseFloat(coordinates.longitude)
                    },
                    zoom: 18,
                    tilt: 30
                };

                // move the map's camera to position
                this.map.moveCamera(position);
                //  this.addmarker(coordinates.latitude,coordinates.longitude)
            })
            .catch((e) => {
                if (e) throw new Error('Something went Wrong');

            })

    }

    updateSearch() {
        if (this.autocomplete.query == '') {
            this.autocompleteItems = [];
            return;
        }
        let me = this;
        this.service.getPlacePredictions({ input: this.autocomplete.query, componentRestrictions: { country: 'IN' } }, function (predictions, status) {
            me.autocompleteItems = [];
            me.zone.run(function () {
                predictions.forEach(function (prediction) {
                    me.autocompleteItems.push(prediction.description);
                });
            });
        });
    }

    pushpage() {
        this.navCtrl.setRoot(PesticidesPage);
    }

     distance(lat1, lon1, lat2, lon2) {
        var p = 0.017453292519943295; 
        var c = Math.cos;
        var a = 0.5 - c((lat2 - lat1) * p)/2 + 
                c(lat1 * p) * c(lat2 * p) * 
                (1 - c((lon2 - lon1) * p))/2;
      
        return 12742 * Math.asin(Math.sqrt(a));
      }
addmarker1(lat, lang){
    this.map.addMarker({
        position: { lat: lat, lng: lang },
        title:'वर्तमान स्थान',
        animation: 'DROP',
        'draggable': true
    });
}
    addmarker(lat, lang) {
       // let lk=Math.trunc(lat)
       // let lk1=Math.trunc(lang)    
       // let harvestp=0 ;
       // let calculatedistance=0;
      //  let calculatedistance1=null;  
        
    //   for(let io=0;io< this.latlm.length;io++){
    //     if(this.latlm[io].Min == lk &&  (this.latlm[io].Max==lk1)){
    //         harvestp=harvestp+1;
    //         calculatedistance=this.distance(this.latlm[io].Lattitude,this.latlm[io].Longitude,lat,lang);
    //         console.log(calculatedistance,'calculatedistance');
    //        if(!calculatedistance1){
    //         calculatedistance1=calculatedistance;
    //        }else{
    //            if(calculatedistance1 > calculatedistance){
    //             calculatedistance1=calculatedistance;
               
    //            }
    //        }
    //     }
    //   }
     
//console.log(calculatedistance1,'calculatedistance1');
      //if(harvestp > 0){
         // if((calculatedistance1 <= 10)){
            localStorage.setItem("L_lang", lang);
            localStorage.setItem("L_lat", lat);
            this.savepoint.push({ lat: lat, lng: lang });
            
            this.map.addMarker({
                position: { lat: lat, lng: lang },
                title: lat + '' + lang,
                animation: 'DROP',
                'draggable': true
            });
            this.map.addPolygon({
                'points': this.savepoint,
                'strokeColor': '#AA00FF',
                'strokeWidth': 5,
                'fillColor': '#880000'
            }).then((polygon) => {
                let a = this.googleMaps.spherical();
                var area = a.computeArea(polygon.getPoints().getArray());
                this.area = area / 10000;
      
      
            });
         // }else{
          //  this._ToastService.presentClosableToast1('App is still not available for this location.your nearest location near by'+this.round(calculatedistance1,2)+' KM');
         // }
     
  //} else {
    //  this._ToastService.presentClosableToast1('App is still not available for this location. Try other location.');
 // }
       
    }
    ionViewWillLeave() {
        

      }
}
