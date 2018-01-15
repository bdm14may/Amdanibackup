import { Component } from '@angular/core';
import { NavController, NavParams,App,ViewController,ModalController, ActionSheetController, ToastController, Platform, LoadingController, Loading} from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { UserserviceProvider } from "../../providers/userservice/userservice";
import { Camera } from '@ionic-native/camera';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
/**
 * Generated class for the EditprofilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var cordova: any;

@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage {
    trfe: any;
  loading: Loading;
  imageUrl: any;
  lastImage: any;
  value2: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private _ViewController:ViewController,private _UserserviceProvider:UserserviceProvider,private camera: Camera, private transfer: FileTransfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController,private nativeGeocoder: NativeGeocoder) {
    console.log('value', navParams.get('value'));
  }

  ionViewDidLoad() {
    this._UserserviceProvider.getlanguage().subscribe(res => 
        {this.trfe = res;
         }, err => console.log(err))
    this.value2=this.navParams.get('value');
   
  }
  change(){
    this.presentActionSheet();
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
        //this.name.display = true;
        this.loading.dismissAll()
        this.presentToast('Image uploaded successfully !');
    }, err => {
        this.loading.dismissAll()
        this.presentToast('Error while uploading file.');
    });
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
      this.uploadImage();
  }, (err) => {
      this.presentToast('Error while selecting image.');
  });
}


  update(Update){
    console.log(Update);
    
  }
  dismiss() {
    this._ViewController.dismiss();
}

}
