import { Injectable } from '@angular/core';
import { ToastController, Toast, LoadingController } from 'ionic-angular';

@Injectable()
export class ToastService {
    toast: Toast = null;
    loading: any = null;

    constructor(private toastCtrl: ToastController, public loadingCtrl: LoadingController){ }

    presentToast(text:string):void{
        let toastData = {
            message: text,
            duration: 3000,
            position: 'bottom'
        }

        this.showToast(toastData);
    }
    presentToast1(text:string):void{
        let toastData = {
            message: text,
            duration: 1000,
            position: 'middle',
        }

        this.showToast(toastData);
    }

    presentClosableToast(text:string):void{
        let toastData = {
            message: text,
            showCloseButton: true,
            closeButtonText: 'X',
            position: 'bottom' 
        };

        this.showToast(toastData);
    }
    presentClosableToast2(text:string):void{
        let toastData = {
            message: text,
            showCloseButton: true,
            closeButtonText: 'X',
            position: 'middle' 
        };

        this.showToast(toastData);
    }

    presentClosableToast1(text:string):void{
        let toastData = {
            message: text,
            duration: 3000,
            position: 'top' 
        };

        this.showToast(toastData);
    }
    presentClosableToast4(text:string):void{
        let toastData = {
            message: text,
            duration: 2000,
            position: 'middle' 
        };

        this.showToast(toastData);
    }

    private showToast(data:any):void{
        this.toast ? this.toast.dismiss() : false;
        this.toast = this.toastCtrl.create(data);
        this.toast.present();
    }

    presentLoadingDefault() {
         this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        this.loading.present();

       
    }
    presentLoadingHide() {
        setTimeout(() => {
            this.loading.dismiss();
        },0);

    }

}
