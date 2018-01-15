import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { cropevalue } from '../pesticides/dummy';
import { UserserviceProvider } from '../../providers/userservice/userservice';

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
  trfe: any;
  indexer: any;
  cropvale: any;
  area: any;
  language:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private viewctrl: ViewController,private _UserserviceProvider:UserserviceProvider) {
    this.area=this.navParams.get('area');
    this.cropvale=this.navParams.get('cropvale');
    this.indexer=this.navParams.get('cropk');
    this.language=this.cropvale.cropevalue+this.indexer;
    
  }

  ionViewDidLoad() {
    this._UserserviceProvider.getlanguage().subscribe(res => 
      {this.trfe = res;
       }, err => console.log(err))
  }
submitval(lang,area){
  this.viewctrl.dismiss(lang,area);
}
 dismiss1() {
      this.viewctrl.dismiss('cancel','cancel');
  }


}
