import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { cropevalue } from '../pesticides/dummy';

/**
 * Generated class for the GooglepagemodalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-googlepagemodal',
  templateUrl: 'googlepagemodal.html',
})
export class GooglepagemodalPage {
  indexer: any;
  cropvale: any;
  area: any;
  language:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private viewctrl: ViewController) {
    this.area=this.navParams.get('area');
    this.cropvale=this.navParams.get('cropvale');
    this.indexer=this.navParams.get('cropk');
    this.language=this.cropvale.cropevalue+this.indexer;
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GooglepagemodalPage');
  }
submitval(lang,area){
  this.viewctrl.dismiss(lang,area);
}
 dismiss1() {
      this.viewctrl.dismiss('cancel','cancel');
  }


}
