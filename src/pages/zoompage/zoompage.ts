import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';


/**
* Generated class for the ZoompagePage page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/

@Component({
    selector: 'page-zoompage',
    templateUrl: 'zoompage.html',
})
export class ZoomPage {
    public imagestoshow;

    constructor(public navCtrl: NavController, public navParams: NavParams,private viewctrl:ViewController) {
    }

    ionViewDidLoad() {
        this.imagestoshow=this.navParams.get('showimage');
        console.log('ionViewDidLoad ZoompagePage');
    }
    dismiss() {
        this.viewctrl.dismiss();
    }
}
