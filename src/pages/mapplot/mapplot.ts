import { Component } from '@angular/core';
import { NavController, NavParams,App,ViewController } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { GooglemapComponent } from '../../components/googlemap/googlemap';

import { PesticidesPage } from '../pesticides/pesticides';
import { HomescreenPage } from "../homescreen/homescreen";
import { UserserviceProvider } from '../../providers/userservice/userservice';




@Component({
    selector: 'page-mapplot',
    templateUrl: 'mapplot.html',
})
export class MapplotPage {
    trfe: any;

    constructor(public navCtrl: NavController, public navParams: NavParams,private screenOrientation: ScreenOrientation,private _App:App,private viewctrl:ViewController,private _UserserviceProvider:UserserviceProvider) {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  
    }

    ionViewDidLoad() {
        this._UserserviceProvider.getlanguage().subscribe(res => 
            {this.trfe = res;
             }, err => console.log(err))
    }
    pushpage():any{
       // this.navCtrl.setRoot(GooglemapComponent);
        return  this._App.getRootNav().setRoot(PesticidesPage);
    }
    gotohome(){
        this._App.getRootNav().push(HomescreenPage);
    }

}
