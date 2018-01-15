import { Component, AfterViewInit } from '@angular/core';
import { NavController, NavParams, ViewController,Platform } from 'ionic-angular';
import { TextToSpeech, TTSOptions } from '@ionic-native/text-to-speech';
//import * as  translate from 'google-translate-api';
import { ToastService } from "../../providers/userservice/ToastService";
import { UserserviceProvider } from "../../providers/userservice/userservice";



@Component({
  selector: 'page-suggest',
  templateUrl: 'suggest.html',
})
export class SuggestPage  {
    trfe: any;
    dh: string='null';
    valuid: any;
    value2: any;
    indexh: any;
    value1: any;
    showingDate: any;
    valuider=true;
    displayvalue: any;
    heading: any;
    showbtn: any='null';
    auto:any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public tts: TextToSpeech, private viewctrl: ViewController, private _Platform: Platform, private _UserserviceProvider:UserserviceProvider,private _ToastService:ToastService) {
        this.displayvalue = navParams.get('value');
        this.showingDate = navParams.get('showingDate');

        this.auto=navParams.get('autoplay');
        this.value1 = navParams.get('value1');
        this._UserserviceProvider.getcroperesponse(this.displayvalue.id, localStorage.getItem('Crop_adv')).subscribe((res) => {
            if (res) {
                console.log(res,'k');
                if (res.result[0].response == 1) {
                    this.showbtn = res.result[0].response;

                } else {
                    this.showbtn = res.result[0].response;
                }

            }
           
           
        })
        this.indexh = navParams.get('indexh');
        this.value2 = this.value1;
        var dateTime = new Date(this.value2.showingDate);
        console.log(this.displayvalue, this.showingDate, this.value1, this.indexh,"modal");
        this.heading=this.displayvalue.Practices;

       
       
     
    }

    ngAfterViewInit() {
      
       
      
    }

  ionViewDidLoad() {
    this._UserserviceProvider.getlanguage().subscribe(res => 
        {this.trfe = res;
         }, err => console.log(err))
    var d1 = new Date();
   let sd= Number(this.showingDate);
   console.log(this.showingDate,'this.showingDate');
  
    let dateOffset = (24*60*60*1000) * Number(this.displayvalue.DAP);
   let  gjhk=new Date(dateOffset + (sd* 1000));
    let today =new Date(d1.getFullYear(), d1.getMonth(), d1.getDate(), 0, 0, 0);
    let myToday = new Date(gjhk.getFullYear(), gjhk.getMonth(), gjhk.getDate(), 0, 0, 0);
    console.log(today,myToday,'value');
   if(myToday >  today){
      this.dh='nnull';
   }
   
    let a=`${this.value2.Growth}`;
    if(localStorage.getItem('Languagef')=="Hindi"){
        this._ToastService.presentLoadingDefault();
    this._UserserviceProvider.converttexttohindi(this.displayvalue.Growth).subscribe(res=>{
        //alert(res);
        //console.log(res,'hindi');

       
      
        this.displayvalue.Growth=res;
        this._UserserviceProvider.converttexttohindi(this.value2.Growth).subscribe(res=>{

                this.value2.Growth=res;
                //console.log(res,'hindi');
        });
        this._ToastService.presentLoadingHide();
    
        this.startspeech(res);

    },err =>{
        this._ToastService.presentLoadingHide();
    })
    }
    this.startspeech1(this.value2.Growth);
    
    // translate(this.displayvalue.Growth, {from: 'en', to: 'hin'}).then(res => {
    //     console.log(res.text);
    //     //=> Ik spreek Nederlands!
    //     this.displayvalue.Growth=res.text?res.text:this.displayvalue.Growth;
    //     console.log(res.from.text.autoCorrected);
    //     //=> true
    //     console.log(res.from.text.value);
    //     //=> I [speak] Dutch!
    //     console.log(res.from.text.didYouMean);
    //     //=> false
    // }).catch(err => {
    //     console.error(err);
    // });

    
  }

  //en-mr
  startspeech(res) {
    this._Platform.ready().then(() => {
        let txt={
            text:this.displayvalue.Growth,
            locale:'hin-IND'

        }
        this.tts.speak(txt);
       
    })
  }

  startspeech1(res) {
    this._Platform.ready().then(() => {
        let txt={
            text:this.displayvalue.Growth,
           

        }
        this.tts.speak(txt);
       
    })
  }
  stopspeech(): any {
      this.tts.stop().then((val) => { },
          (reject) => { console.warn(reject); })
          .catch((err) => { console.error(err); });
  
  }
  async sayText():Promise<any>{
    try{
      await this.tts.speak('Hello how are you?');
    }
    catch(e){
      console.log(e);
    }
  }
  dismiss1() {
      this.viewctrl.dismiss();
  }
  stop(v){
      this.valuider=v;
      localStorage.setItem("stop","stop");
  }
  dismiss(value) {
      localStorage.getItem('Crop_adv');
     
      let d = {
          id: localStorage.getItem('Crop_adv'),
          response: value,
          Crop_Name: this.displayvalue.name,
          Irid: this.displayvalue.id

      }

     
      this.tts.speak({ text: '' });
      console.log(this.displayvalue.Development,'developmnet');
      
      if(this.showbtn!='null'){
        this.viewctrl.dismiss(this.valuider)
      }else{
        this._UserserviceProvider.savecropewiseuserresponse(d).subscribe(res =>
            { console.log('success');  this.viewctrl.dismiss(this.valuider)},
                err => console.log('something went wrong'))
      }
      
     
  }

}
