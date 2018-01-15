import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import * as ureducer from '../../common/reducer/campaign.reducer';
import * as ureducermessage from '../../common/reducer/fetchmessage.reducer';
import * as userred from '../../common/reducer/luser.reducer';
import * as iweather from '../../common/reducer/weather.reducer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import 'rxjs/add/observable/throw';
import { Icrope } from "../../common/reducer/Icrope";
import { Iirrigation } from "../../common/reducer/Iirrigation";
import { Ifaremerland } from "../../common/reducer/IfarmerLand";
import { Isessioninfo } from "../../common/reducer/Isessioninfo";
import { Iuser } from "../../common/models/user.state";
import { Ivariety } from "../../common/reducer/Ivariety";
import { Iweather } from "../../common/reducer/weather.reducer";

@Injectable()
export class UserserviceProvider {
    private commentsUrl = 'https://dingo-api.codingo.me/campaign';
    campaigns: Observable<Array<ureducer.Campaign>>;
    messages: Observable<Array<ureducermessage.message>>
    users: Observable<Array<userred.Iuser>>
    iweathers: Observable<iweather.Iweather>

    constructor(public _http: Http, private store: Store<ureducer.AppStore>) {

        this.campaigns = store.select(store => store.campaigns);
        this.messages = store.select(store => store.messages);
        this.users = store.select(store => store.UsersState);
        this.iweathers = store.select(store => store.IweatherState);



    }

    loadCampaigns() {
        this.store.dispatch({ type: 'LOAD_STARTED', payload: null });
        return this._http.get(this.commentsUrl)
            .map((res: Response) => {
                let body = res.json();
                this.store.dispatch({ type: 'LOAD_SUCCESS', payload: null });
                return body.data || {};
            })
            .map((payload: ureducer.Campaign[]) => {
                return { type: 'ADD_CAMPAIGNS', payload };
            })
            .subscribe((action) => {
                this.store.dispatch(action);
            });
    }

    verifyotp(m) {
        return this._http.get(`http://139.59.64.195:3000/api/user/${m}`)
            .map((res: Response) => {  console.log(res); return res.json() })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }


    fetchusers(mobile): Observable<any> {
        let mobile1 = mobile;
        if (!mobile) {
            mobile1 = 58;
        }
        return this._http.get(`http://139.59.64.195:3000/api/user/${mobile1}/false`)
            .map((res: Response) => { console.log(res); return res.json().data })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

    }

    fetchcropedetails(): Observable<any> {
        let id;
        this.users.subscribe((res) => {
            id = res[0].id;
        })
        return this._http.get(`http://139.59.64.195:3000/api/user_map_by_crope/${id}`)
            .map((res: Response) => {  console.log(res); return res.json() })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
      

    }

    verifyotpforold(m, o) {
        let a = {
            "code": o,
            "phoneNumber": m
        }
        let bodyString = JSON.stringify(a); // Stringify payload
       
        console.log(a);
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        return this._http.post('http://192.168.1.88/MyAsp//api/Auth/token', bodyString, options)
            .map((res: Response) => { return res.json() })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }



   

    loadweatherdata(lat, lang) {

        let url = `https://api.darksky.net/forecast/4078ccce1f48882640714d41e128789b/${lat},${lang}`;
        console.log(lat, lang);
        return this._http.get(url)
            .map((res: Response) => {
                console.log(res);
                let body = res.json();
                console.log(body.currently);
                return body.currently || {};
            })
            .map((payload: iweather.Iweather) => {
                console.log(payload);
                return { type: 'UPDATE_DETAILS', payload };
            })
            .subscribe((action) => {
                this.store.dispatch(action);
            });


    }
    
        loadweatherdatabyyahoo(lat, lang): Observable < iweather.Iweather[] > {
            let stmt = `select * from weather.forecast where woeid in (SELECT woeid FROM geo.places WHERE text="(${lat},${lang})")`;
            let url = 'https://query.yahooapis.com/v1/public/yql?format=json&q=' + stmt;
            return this._http.get(url)
                .map((res: Response) => { return res.json().query })
                .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
         
        
    }

    loadstate() {
        return new Promise((resolve, reject) => {
            this._http.get('http://139.59.64.195:3000/api/State').subscribe((res) => {
                resolve(res.json().result);
            },
                ((e) => {
                    reject(e);
                })
            )






        });


    }
 loadcrope(): Observable<Icrope[]>{
        return this._http.get('http://192.168.1.88/MyAsp/api/Crops') 
        .map((res: Response) => res.json()) 
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
}   

 loaderrigation(id): Observable<Iirrigation[]> {
    
     return this._http.get(`assets/Irrigatio.json`)
         .map((res: Response) => res.json())
         .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
 }

 loadfarmerland(id): Observable<Ifaremerland[]> {
    
     return this._http.get(`http://192.168.1.88/MyAsp/api/LocationsInfo/GetLocationInfoFarmerId/${id}`)
         .map((res: Response) => res.json())
         .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
 }

 loadsessioninfo(): Observable<Isessioninfo[]> {
    
     return this._http.get(`http://192.168.1.88/MyAsp//api/SeasonsInfo`)
         .map((res: Response) => res.json())
         .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
 }

 getotp(phoneno,value):Observable<Iuser[]>{
     return this._http.get((`http://139.59.64.195:3000/api/user/${phoneno}/value`))
         .map((res: Response) => res.json())
         .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
 }
 loadlatlongrange():Observable<any>{
    return this._http.get((`assets/convertcsv.json`))
    .map((res: Response) => res.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

 }
 
 

 Sentuser(body): Observable<Iuser> {
     let id,hj;
     this.users.subscribe(res => {
         console.log(res[0].id);
         hj = res[0].id
         id = res[0].mobileno;
     })
     localStorage.setItem("uid", hj);
     localStorage.setItem("Phone_no", id);
     let a = {
         "Phone_no": id,
         "name": body.name,
         "Image": body.image,
         "Taluka": body.TAlukaID,
         "State": body.StateID,
         "Dist": body.DistID,
         "Village": body.VillageID,
         "Home_Lat": body.Hgeo[0].coords.latitude,
         "Home_Lang": body.Hgeo[0].coords.longitude,
         "Language":body.Language
     }
     
     console.log(a,"sent to server"); 
              
    
     let bodyString = JSON.stringify(a); // Stringify payload
   
     let headers = new Headers({ 'Content-Type': 'application/json'}); // ... Set content type to JSON
     let options = new RequestOptions({ headers: headers });
     return this._http.post('http://139.59.64.195:3000/api/user', bodyString, options)
         .map((res: Response) => { console.log(res);return res.json()})
         .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    Sentuser1(body): Observable<Iuser> {
       
       
      
        let a = {
            "Phone_no": body.Phone_no,
            "name": body.Name,
            "Image_url": body.Image_url
            
        }
        
        console.log(a,"sent to server"); 
                 
       
        let bodyString = JSON.stringify(a); // Stringify payload
      
        let headers = new Headers({ 'Content-Type': 'application/json'}); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        return this._http.post('http://139.59.64.195:3000/api/updateuser', bodyString, options)
            .map((res: Response) => { console.log(res);return res.json()})
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
       }

converttexttohindi(value){
    
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded','Content-Length':170}); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers });
    return this._http.get(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20171101T064936Z.ad8ce76e7ee0ea03.9ee736603126db68a2ac3f6e9dace46135953b59&text=${value}&lang=en-hi&format=plain`)
        .map((res: Response) => { console.log(res);return res.json().text})
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
   

}

 weatherinfo(lat, lang): Observable<Iweather[]> {

     return this._http.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lang}&units=metric&APPID=266e5d961a61ab76bc6d9bd9f3acd668 `)
         .map((res: Response) => res.json())
         .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
 }

 fetchweather(lat,lang,vp) {
     return this._http.get(`http://xml.customweather.com/xml?client=mahindra&client_password=j2SV7mq&product=${vp}&format=json&latitude=${lat}&longitude=${lang}`)
         .map((res: Response) => res.json().weather_report)
         .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
 }

 updatesowing(id,sowing):Observable<any>{
   
    return this._http.get(`http://139.59.64.195:3000/api/updatesowing/${id}/${sowing.Crop_name}/${sowing.Irrigation_type}/${sowing.Sowing_date}/${sowing.Variety_Name}/${sowing.Soil1}`)
    .map((res: Response) => res.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
 }
 updatesowingland(id,PlotName,size):Observable<any>{
    
     return this._http.get(`http://139.59.64.195:3000/api/updatesowingland/${id}/${PlotName}/${size}`)
     .map((res: Response) => res.json())
     .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
 deletecrop(id){
    return this._http.get(`http://139.59.64.195:3000/api/deletecrope/${id}`)
    .map((res: Response) => res.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

 }
 deletename(id){
    return this._http.get(`http://139.59.64.195:3000/api/deleteland/${id}`)
    .map((res: Response) => res.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

 }

 getuser(id): Observable<Iuser[]> {
    
     return this._http.get(`http://localhost/MyAsp/api/FarmersInfo/${id}`)
         .map((res: Response) => res.json())
         .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
 }


 getcroperesponse(id, cp): Observable<any> {
     console.log();

     return this._http.get(`http://139.59.64.195:3000/api/user_map_by_crope_response/${id}/${cp}`)
         .map((res: Response) => res.json())
         .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
 }

 savemap(b): Observable<Iuser> {
     console.log(b,'b');
     let id;
     this.users.subscribe(res => {
         console.log(res);
         console.log(res[0].id);
         id = res[0].id;
     })
     let a = {
         Map_name: b[0].name,
         Size: b[0].size,
         User_id: id,
         cordinates: b[0].landdetails
     }
     let bodyString =a; // Stringify payload
    
   
     console.log(a,'a');
     let headers = new Headers({ 'Content-Type': 'application/json'});
     let options = new RequestOptions({ headers: headers });
     return this._http.post('http://139.59.64.195:3000/api/user_map/', bodyString, options)
         .map((res: Response) => res.json())
         .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
 }

 savemapbycrope(b,id,v,i,valuer,soil): Observable<any> {
    
     let a = {
         Crop_Name:valuer,
         Irrigation_type: i.Value,
         Sowing_date: b,
         Land_id: id,
         Variety_Name:v,
         Soil:soil
     }
     let bodyString = a; // Stringify payload

    
     console.log(a, 'a');
     let headers = new Headers({ 'Content-Type': 'application/json' });
     let options = new RequestOptions({ headers: headers });
     return this._http.post('http://139.59.64.195:3000/api/user_map_by_crope/', bodyString, options)
         .map((res: Response) => res.json())
         .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
 }
 savecropewiseuserresponse(c): Observable<any> {
    let  lk
    if (localStorage.getItem('Crop_adv')) {
        lk = localStorage.getItem('Crop_adv')

    } else {
        lk = 83;
        localStorage.setItem('Crop_adv','83')
    }
    console.log(c,'c');
     let d = {
         "crope_Advisory_id": lk,
         "response":c.response,
         "Crop_Name": c.Crop_Name,
         "Irid": c.Irid

        
     }
     console.log(d,'d');

    
     let headers = new Headers({ 'Content-Type': 'application/json' });
     let options = new RequestOptions({ headers: headers });
     return this._http.post('http://139.59.64.195:3000/api/user_map_by_crope_response/', d, options)
         .map((res: Response) => res.json())
         .catch((error: any) => Observable.throw(error.json().error || 'Server error'));


 }
loaddist(id){
    return new Promise((resolve, reject) => {
        this._http.get(`http://139.59.64.195:3000/api/Dist/${id}`).subscribe((res)=>{
            resolve(res.json().result);
        },
        ((e)=>{
            reject(e);
        })
    )
});
}
getcountuserresponse(cn,size){
    let b=localStorage.getItem('Crop_adv');
        return new Promise((resolve, reject) => {
            this._http.get(`http://139.59.64.195:3000/api/countuserresponse/${b}/${cn}/${size}`).subscribe((res)=>{
                resolve(res.json().result);
            },
            ((e)=>{
                reject(e);
            })
        )
    }); 
    
}

loadtahsil(id){
    return new Promise((resolve, reject) => {
        this._http.get(`http://139.59.64.195:3000/api/Taluka/${id}`).subscribe((res)=>{
            resolve(res.json().result);
        },
        ((e)=>{
            reject(e);
        })
    )
}); 
}
loaddummymessage(a,v){
    return new Promise((resolve, reject) => {
        this._http.get(`http://139.59.64.195:3000/api/CropeAdvsory/${a}/${v}`).subscribe((res)=>{
            resolve(res.json().result);
        },
        ((e)=>{
            reject(e);
        })
    )
}); 

}

    loadvillage(id) {
        console.log(id);
        return new Promise((resolve, reject) => {
      
            this._http.get(`http://139.59.64.195:3000/api/Village/${id}`).subscribe((res)=>{
            resolve(res.json().result);
        },
        ((e)=>{
            reject(e);
        })
    )
}); 
    }

    loadvariety(): Observable<Ivariety[]> {
        return this._http.get(`assets/Variety.json`)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }



    loadCampaigns1() {
        return this._http.get(this.commentsUrl)
            .map((res: Response) => {
                let body = res.json();
                return body.data || {};
            })
            .map((payload: ureducermessage.message[]) => {
                return { type: 'ADD_CAMPAIGNS1', payload };
            })
            .subscribe((action) => {
                this.store.dispatch(action);
            });
    }
    deleteCampaigns(payload: ureducer.Campaign) {
        return this.store.dispatch({ type: 'DELETE_CAMPAIGN', payload });

    }

    adduser(payload: userred.Iuser[]) {
        return this.store.dispatch({ type: 'ADD_USER', payload });
    }
    addland(payload: iweather.Iweather[]) {
        return this.store.dispatch({ type: 'ADD_DETAILS', payload });
    }
    updateuser(payload: userred.Iuser) {
        console.log(payload,"payload");
        this.store.dispatch({ type: 'UPDATE_USER', payload });
        this.Sentuser(payload).subscribe(res => {  console.log(res) }, err => {
           });
       
    }
    updateuser1(payload: userred.Iuser) {
        console.log(payload,"payload");
        this.store.dispatch({ type: 'UPDATE_USER', payload });
       // this.Sentuser(payload).subscribe(res => {  console.log(res) }, err => {
         //  });
       
    }
    

}
