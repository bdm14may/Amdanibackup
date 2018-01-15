import { Component } from '@angular/core';
import { NavController, NavParams,App } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Screen1Page } from '../screen1/screen1';
import { UserserviceProvider } from '../../providers/userservice/userservice';
import { Icrope } from '../../common/reducer/Icrope';
import { cropevalue } from "./dummy";
import { Ivariety } from "../../common/reducer/Ivariety";
import { Iirrigation } from "../../common/reducer/Iirrigation";
import { Observable } from "rxjs/Observable";
import * as weather from '../../common/reducer/weather.reducer';
import { ToastService } from '../../providers/userservice/ToastService';
import { GooglemapComponent } from '../../components/googlemap/googlemap';
/**
 * Generated class for the PesticidesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
    selector: 'page-pesticides',
    templateUrl: 'pesticides.html',
})
export class PesticidesPage {
    seli: number;
    myDate: String = new Date().toISOString();
    details: any;
    Variety: any;
    cropevalue:any;
    Soil:any;
    variety: Ivariety[];
    irrigation: Iirrigation[];
    Irrigation: any;
    fweathers:Observable<Array<weather.Iweather>>;

    ecrope = [{
        "id": 1,
        "Name": "Potato"
    },
    {
        "id": 10,
        "Name": "Wheat"
    },
    {
        "id": 12,
        "Name": "Gram"
    },
    {
        "id": 6,
        "Name": "Maize"
    },
    {
        "id": 13,
        "Name": "Mustard"
    },
    {
    "id": 14,
    "Name": "Tomato"
},
{
    "id": 16,
    "Name": "Sugarcane"
},{
    "id": 18,
    "Name": "Banana"
    }


    ];
    soil=[
        {
            id:1,
            Value:'Sand'
        },
        {
            id:2,
            Value:'Slit'
        },
        {
            id:3,
            Value:'Clay'
        }

    ]
    constructor(public navCtrl: NavController, public navParams: NavParams, private screenOrientation: ScreenOrientation, private _App: App, private _UserserviceProvider: UserserviceProvider,private _ToastService:ToastService) {
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
        this.fweathers=this._UserserviceProvider.iweathers;
    }

    ionViewDidLoad() {
        this.fweathers.subscribe((res) => {
            this.details = res;
            console.log(this.details,'land');
        })

        
    }
    ionViewWillEnter() {
        this._UserserviceProvider.loadvariety().subscribe(res => {
            this.variety = res;
            this.loaderrigatione();

        },
            err => console.log(err));
        console.log(this.ecrope);
    }
    pushpage() {
      
        if(this.Variety && (this.cropevalue && this.Irrigation)){


       
           // this._ToastService.presentLoadingDefault();
            let abhj={
                sowingdate:this.myDate,
                id:null,
                Variety:this.Variety,
                Irrigation:this.Irrigation,
                cropevalue:this.cropevalue,
                Soil:this.Soil



            }
            localStorage.setItem('cropdetails',JSON.stringify(abhj))
            // this._UserserviceProvider.savemapbycrope(this.myDate, this.details[0].id, this.Variety, this.Irrigation,this.cropevalue).subscribe((res) => {
              
            //     localStorage.setItem('Crop_adv', res.id);
            //     this._ToastService.presentLoadingHide();
            
                this._App.getRootNav().push(GooglemapComponent, { dat: this.myDate,Crope_name:this.cropevalue });
            // },() =>{
            //     this._ToastService.presentLoadingHide();
            //     this._ToastService.presentToast('Opps something went wrong');
            // })
        
        }else{
            this._ToastService.presentToast('Please select all values');
        }
        
    }
    selectcrope(value, i): any {
        this.cropevalue=value.Name;
        this.seli = i;
      
       

    }
    updateSelectedValue2(event): any {
      

    }
    loaderrigatione() {
        this._UserserviceProvider.loaderrigation(1).subscribe(res => this.irrigation = res, err => {
            console.log(err)
        })
    }

}
