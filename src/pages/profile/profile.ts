import { Component, AfterViewInit  } from '@angular/core';
import { NavController, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { MapplotPage } from '../mapplot/mapplot';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { UserweatherPage } from '../userweather/userweather';
import { Observable } from 'rxjs/Rx'
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { UserserviceProvider } from '../../providers/userservice/userservice';
import { Store } from '@ngrx/store';
import * as ureducer from '../../common/reducer/campaign.reducer';
import * as ureducermessage from '../../common/reducer/fetchmessage.reducer';
import * as useraction from '../../common/reducer/luser.reducer';
import * as userred from '../../common/reducer/luser.reducer';
import * as pinchZoom from 'pinch-zoom';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';

declare var cordova: any;
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})
export class ProfilePage  {
    trfe: any;
    language: any;
    longx: number;
    laty: number;
    placeinfo: any;
    genderer;
    vil: {};
    tal: {};
    language1=[{
        id:1,
        name:"English"
    },
    {
        id:2,
        name:"Hindi"
    }
       


    ]
    cords: any;
    mobilenou: any;
    registered: any;
    statevalue:any;
    dist:any;
    state:any;
    gender1:any;
    gender2:any;
    gender3: any;
    imageUrl: string=null;
    lastImage: string = null;
    loading: Loading;
    valuegphone;
    complexForm : FormGroup;
    service = new google.maps.places.AutocompleteService();
    name = { name: null, image:null,display:null,mobileno:999999999};
    registered1: Observable<Array<ureducer.Campaign>>;
    registered2: Observable<Array<ureducermessage.message>>;
    registered3: Observable<Array<useraction.Iuser>>;
    constructor(public navCtrl: NavController, private _UserserviceProvider: UserserviceProvider, private camera: Camera, private transfer: FileTransfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController,private nativeGeocoder: NativeGeocoder,private _Geolocation:Geolocation,fb: FormBuilder) {
        this.registered = 'true';
        this.complexForm = fb.group({
            // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
            'firstName' : [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]
            
          })
        //this.registered =='false';
        this.platform.ready().then(() => {
            
           
           this._Geolocation.getCurrentPosition().then((resp) => {
            // resp.coords.latitude
            // resp.coords.longitude
            this.laty=resp.coords.latitude;
            this.longx=resp.coords.longitude;
            this.cords=resp;
            this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude)
            .then((result: NativeGeocoderReverseResult) => { this.placeinfo = result; console.log(JSON.stringify(result)) })
            .catch((error: any) => console.log(error));
        }).catch((error) => {
            console.log('Error getting location', error);
        });
          });
        this.callme();

    }
   

    ionViewDidLoad() {
        this.language=this.language1[0].name;
        this._UserserviceProvider.loadstate().then((res)=>{
         
            this.statevalue=res;
            console.log(this.statevalue);
        })
        this._UserserviceProvider.getlanguage().subscribe(res => 
            {this.trfe = res;
             }, err => console.log(err))



    }
    ionViewWillEnter (){
       
    }
    ionViewWillUnload(){
    
    }
    presentLoadingDefault1() {
        let loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
      
        loading.present();
      
        setTimeout(() => {
          loading.dismiss();
        }, 5000);
      }

    updateSelectedValue(e){
        this.loading = this.loadingCtrl.create({
            content: 'Loading...',
        });
       
        this._UserserviceProvider.loaddist(e.stateCode).then((res)=>{
                        console.log(res);
            this.dist=res;
            this.loading.dismissAll();

        }).catch((e)=>{
            
    
        })



    }
    updateSelectedValue1(e){
        this.loading = this.loadingCtrl.create({
            content: 'Loading...',
        });
        this._UserserviceProvider.loadtahsil(e.districtCode).then((res)=>{
         
        this.tal=res;
        this.loading.dismiss();

            }).catch((e)=>{
    

        })



    }
    updateSelectedValue2(e){
        this.loading = this.loadingCtrl.create({
            content: 'Loading...',
        });
        let item=this.gender1.name+','+this.state.name;

//         this._UserserviceProvider.loadvillage(e.tehsilCode).then((res)=>{
//             console.log(res);
//             this.loading.dismissAll();
//             this.vil=res;
//             this.nativeGeocoder.forwardGeocode(item)
//             .then((coordinates: NativeGeocoderForwardResult) => {
//                 this.cords=coordinates;
//             }).catch((e)=>{
//                 console.log(e);

//             })
    
//     }).catch((e)=>{


//     })
 }
    testing(e) {
        console.log(e);

    }

    callme() {
        this.registered1 = this._UserserviceProvider.campaigns;
        this.registered2 = this._UserserviceProvider.messages;
        this.registered3 = this._UserserviceProvider.users;
        this.registered1.subscribe((value) => {
            console.log(value);
        })
        this.registered2.subscribe((value) => {
            console.log(value);
        })
        this.registered3.subscribe((value) => {
            this.mobilenou = value[0].mobileno;
           
        })
      
    }

    public presentActionSheet() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Select Image Source',
            buttons: [
                {
                    text: 'Upload Image',
                    handler: () => {
                        this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Camera',
                    handler: () => {
                        this.takePicture(this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    }
    public takePicture(sourceType) {
        // Create options for the Camera Dialog
        var options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true,
            cameraDirection:1
        };
        this.camera.getPicture(options).then((imagePath) => {
            // Special handling for Android library
            if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
                this.filePath.resolveNativePath(imagePath)
                    .then(filePath => {
                        let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                        let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                    });
            } else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            }
        }, (err) => {
            this.presentToast('Error while selecting image.');
        });
    }


    register() {
       console.log(this.name);
       var pattern=/^[a-zA-Z0-9- ]*$/;
       if (pattern.test(this.name.name) == false) {
        this.presentToast('Please enter valid name');
        return false;
        
        
       }else{
       
        this.registered = 'false';
       }
      
       
    }
    pushpage(){
        
       console.log();
        let a = {
    name: this.name.name,
    mobileno: this.mobilenou,
    image: this.imageUrl?this.imageUrl:'avtar.png',
    StateID:this.placeinfo.administrativeArea,
    DistID:this.placeinfo.subAdministrativeArea,
    TAlukaID:this.placeinfo.locality?this.placeinfo.locality:this.placeinfo.subAdministrativeArea,
    VillageID:this.genderer,
    Hgeo: [this.cords],
    Language:this.language?this.language:this.language='English'

        };
        console.log(a,"user details");
        this._UserserviceProvider.updateuser(a);
    
        this.navCtrl.push(UserweatherPage, { value: a.Hgeo }).then((res)=>{
         
           
        });
    
    }
    private createFileName() {
        var d = new Date(),
            n = d.getTime(),
            newFileName = n + ".jpg";
        return newFileName;
    }

    // Copy the image to a local folder
    private copyFileToLocalDir(namePath, currentName, newFileName) {
        this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
            this.lastImage = newFileName;
        }, error => {
            this.presentToast('Error while storing file.');
        });
    }

    private presentToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    }

    // Always get the accurate path to your apps folder
    public pathForImage(img) {
        if (img === null) {
            return '';
        } else {
            return cordova.file.dataDirectory + img;
        }
    }
    public uploadImage() {
        // Destination URL
        var url = "http://139.59.56.87/brahamdev/image.php";

        // File for Upload
        var targetPath = this.pathForImage(this.lastImage);
       
        // File name only
        var filename = this.lastImage;
       
        this.imageUrl = filename;

        var options = {
            fileKey: "file",
            fileName: filename,
            chunkedMode: false,
            mimeType: "multipart/form-data",
            params: { 'fileName': filename }
        };

        const fileTransfer: FileTransferObject = this.transfer.create();

        this.loading = this.loadingCtrl.create({
            content: 'Uploading...',
        });
        this.loading.present();

        // Use the FileTransfer to upload the image
        fileTransfer.upload(targetPath, url, options).then(data => {
            this.name.display = true;
            this.loading.dismissAll()
            this.presentToast('Image uploaded successfully !');
        }, err => {
            this.loading.dismissAll()
            this.presentToast('Error while uploading file.');
        });
    }

}
