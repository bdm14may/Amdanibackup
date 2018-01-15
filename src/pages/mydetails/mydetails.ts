import { Component } from '@angular/core';
import { NavController, NavParams,App,ViewController,ModalController, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { Observable } from "rxjs/Observable";
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { UserserviceProvider } from '../../providers/userservice/userservice';
import { Store } from '@ngrx/store';
import * as useraction from '../../common/reducer/luser.reducer';

import {EditprofilePage} from "../editprofile/editprofile";
import { ToastService } from '../../providers/userservice/ToastService';

/**
 * Generated class for the MydetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var cordova: any;
@Component({
  selector: 'page-mydetails',
  templateUrl: 'mydetails.html',
})
export class MydetailsPage {
    trfe: any;
    imagePath1: any;
    url: any;
    registered: string;
    lastImage: any;
    imageUrl: any;
    name: any;
    language=localStorage.getItem('Languagef')?localStorage.getItem('Languagef'):'English';
    loading: Loading;
    registered6: Observable<Array<useraction.Iuser>>;
    language1=[{
        id:1,
        name:"English"
    },
    {
        id:2,
        name:"Hindi"
    }
       


    ]

    constructor(public navCtrl: NavController, public navParams: NavParams, _App: App, private viewctrl: ViewController, private _UserserviceProvider: UserserviceProvider,private _ModalController:ModalController, private camera: Camera, private transfer: FileTransfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController,private _ToastService:ToastService) {
        this.registered6 = this._UserserviceProvider.users;
       
    }

    ionViewDidLoad() {
        this._UserserviceProvider.getlanguage().subscribe(res => 
            {this.trfe = res;
             }, err => console.log(err))
        this.registered6.subscribe((res) => {
            let res1=res;
            this.language=res1[0].Language;
            console.log(res[0]);
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
                  this.imagePath1=imagePath;
                  //alert(this.imagePath1);
                  //console.log(this.imagePath1);

                });
        } else {
            var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
            var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
           // alert(this.imagePath1);
           // console.log(this.imagePath1);
        }
    }, (err) => {
        this.presentToast('Error while selecting image.');
    });
}


register() {
   
    this.registered = 'false';
   
}
readUrl(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
    
      reader.onload = (event:any) => {
        this.url = event.target.result;
      }
    
      reader.readAsDataURL(event.target.files[0]);
    }
    }

pushpage(vehicle2v,name){
  
   let a = {
    Active_crope_Ad:null,
    Dist_Name :vehicle2v.Dist_Name,
    Home_Lang : vehicle2v.Home_Lang,
    Home_Lat :vehicle2v.Home_Lat,
    Image_url:this.lastImage?this.lastImage:vehicle2v.Image_url,
    Language:this.language?this.language:'English',
    Last_Active:vehicle2v.Last_Active,
    Name:name?name:vehicle2v.Name,
    Phone_no:vehicle2v.Phone_no,
    State_Name:vehicle2v.State_Name,
    Taluka_name:vehicle2v.Taluka_name,
    User_Reg : vehicle2v.User_Reg,
    Village_name :vehicle2v.Village_name,
    id: vehicle2v.id
    };
    this._ToastService.presentLoadingDefault();
   this._UserserviceProvider.Sentuser1(a).subscribe(res =>{
      if(this.lastImage){
        this._ToastService.presentLoadingHide();
        this.uploadImage(a);
      }else{
        this._ToastService.presentLoadingHide();
        this._UserserviceProvider.getlanguage().subscribe(res => 
            
               {this.trfe = res;
                }, err => console.log(err))

        this._ToastService.presentClosableToast(this.trfe.Update_Successful);
        this._UserserviceProvider.updateuser1(a);
       
       
      }
      
   },err => {
    this._ToastService.presentLoadingHide();
    this.presentToast(this.trfe.Update_Successful);
       console.log(err);
   });

   
//     let a = {
// name: this.name.name,
// mobileno: this.mobilenou,
// image: this.imageUrl?this.imageUrl:'avtar.png',
// StateID:this.placeinfo.administrativeArea,
// DistID:this.placeinfo.subAdministrativeArea,
// TAlukaID:this.placeinfo.locality?this.placeinfo.locality:this.placeinfo.subAdministrativeArea,
// VillageID:this.genderer,
// Hgeo: [this.cords],
// Language:this.language?this.language:this.language='English'

//     };
   // console.log(vehicle2v,"user details");
   // this._UserserviceProvider.updateuser(vehicle2v);

    //this.navCtrl.push(UserweatherPage, { value: a.Hgeo }).then((res)=>{
     
       
    //});

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
        console.log(success);
        this.lastImage = newFileName;
        //this.presentToast('Image Uploaded Successfully');
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
public uploadImage(v) {
   // alert(v);
   // console.log(v);
    //return false;
let v2=v;
    // Destination URL
    var url = "http://139.59.56.87/brahamdev/image.php";

    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);
   
    // File name only
    var filename = this.lastImage;
    console.log(this.lastImage);
   
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
        //this.name.display = true;
        this._UserserviceProvider.updateuser1(v2);
        this.loading.dismissAll()
        this.presentToast('successfully updated !');
    }, err => {
        this.loading.dismissAll()
        this.presentToast('Error while uploading file.');
    });
}

  editme(vehicle2){
   
        let profileModal = this._ModalController.create(EditprofilePage, { value: vehicle2 });
        profileModal.onDidDismiss(()=>{
            this._UserserviceProvider.getlanguage().subscribe(res => 
                
                   {this.trfe = res;  
                    }, err => console.log(err))
        })
        profileModal.present();
      
     


  }

  dismiss() {
   
    this.viewctrl.dismiss().then(()=>{
        this._UserserviceProvider.getlanguage().subscribe(res => 
            
               {this.trfe = res;
                }, err => console.log(err))

    });
}

}
