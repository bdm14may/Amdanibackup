import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule,LOCALE_ID  } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MomentModule } from 'angular2-moment';
import { GoogleMaps,LatLng } from '@ionic-native/google-maps';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import {LimitToDirective} from './limit-to_directive';
import {ChangecropeheaderPage} from '../pages/changecropeheader/changecropeheader';
import { Geolocation } from '@ionic-native/geolocation';
import { Dialogs } from '@ionic-native/dialogs';
import { NativeGeocoder} from '@ionic-native/native-geocoder';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NativeAudio } from '@ionic-native/native-audio';
import { Sim } from '@ionic-native/sim';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
//import { LoginPage } from '../pages/login/login';
import { UserweatherPage } from '../pages/userweather/userweather';
import { HeaderComponent } from '../components/header/header';
import { MenuComponent } from '../components/menu/menu';
import { FooterComponent } from '../components/footer/footer';
import { InputboxComponent } from '../components/inputbox/inputbox';
import { GooglemapComponent } from '../components/googlemap/googlemap';
import { CropeswiperComponent } from '../components/cropeswiper/cropeswiper';
import { ProfilePage } from '../pages/profile/profile';
import { EditprofilePage } from '../pages/editprofile/editprofile';
import { Calendar } from '@ionic-native/calendar';
import { Screen1Page } from '../pages/screen1/screen1';
import { ModalPage } from '../pages/modal/modal';

import { PesticidesPage } from '../pages/pesticides/pesticides';
import { WeatherPage } from '../pages/weather/weather';
import { WeatherPage1 } from '../pages/weather1/weather1';
import { NgCalendarModule  } from 'ionic2-calendar';
import { SuggestPage } from '../pages/suggest/suggest';
import { MydetailsPage } from '../pages/mydetails/mydetails';
import { ZoomPage } from '../pages/zoompage/zoompage';

import { PlotdetailsPage } from '../pages/plotdetails/plotdetails';
import { CropdetailsPage } from '../pages/cropdetails/cropdetails';
import { MapplotPage } from '../pages/mapplot/mapplot';
import {GooglepagemodalPage} from '../pages/googlepagemodal/googlepagemodal';
import { D3Service } from 'd3-ng2-service';
import { UserserviceProvider } from '../providers/userservice/userservice';
import { campaigns } from '../common/reducer/campaign.reducer';
import { messages } from '../common/reducer/fetchmessage.reducer';
import { UsersState } from '../common/reducer/luser.reducer';
import { IweatherState } from '../common/reducer/weather.reducer';
import { HomescreenPage } from "../pages/homescreen/homescreen";
import { CropcalenderdPage } from "../pages/cropcalenderd/cropcalenderd";
import { EditcropdtPage } from "../pages/editcropdt/editcropdt";

import { MobileComponent } from '../components/mobile/mobile';
import { OtpComponent } from '../components/otp/otp';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { ToastService } from "../providers/userservice/ToastService";
import { DsortingPipe } from '../pipes/dsorting/dsorting';
import { Network } from '@ionic-native/network';
/*import { Diagnostic } from '@ionic-native/diagnostic';*/
import { Push } from '@ionic-native/push';
import { DeviceAccounts } from '@ionic-native/device-accounts';
/*import { IonicPushApp } from './app';*/

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ListPage,
        HeaderComponent,
        MenuComponent,
        FooterComponent,
        InputboxComponent,
        GooglemapComponent,
        CropeswiperComponent,
        ProfilePage,
        Screen1Page,
        ModalPage,
        PesticidesPage,
        WeatherPage,
        WeatherPage1,
        SuggestPage,
        MydetailsPage,
        PlotdetailsPage,
        CropdetailsPage,
        HomescreenPage,
        MapplotPage,
        ZoomPage,
        MobileComponent,
        UserweatherPage,
        OtpComponent,
        LimitToDirective,
        DsortingPipe,
        ChangecropeheaderPage,
        EditprofilePage,
        GooglepagemodalPage,
        CropcalenderdPage,
        EditcropdtPage
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule ,
        NgCalendarModule,

        MomentModule,
        IonicModule.forRoot(MyApp),
        HttpModule,
        StoreModule.forRoot({
            campaigns,
            messages,
            UsersState,
            IweatherState
        }),
        StoreDevtoolsModule.instrument({
            maxAge: 25 //  Retains last 25 states
        })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        ListPage,
        WeatherPage1,
        HomePage,
        ProfilePage,
        Screen1Page,
        ModalPage,
        PesticidesPage,
        WeatherPage,
        SuggestPage,
        MydetailsPage,
        PlotdetailsPage,
        CropdetailsPage,
        HomescreenPage,
        MapplotPage,
        GooglemapComponent,
        ZoomPage,
        OtpComponent,
        UserweatherPage,
        ChangecropeheaderPage,
        EditprofilePage,
        GooglepagemodalPage,
        CropcalenderdPage,
        EditcropdtPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        GoogleMaps,
        NativeGeocoder,
        Geolocation,
        ScreenOrientation,
        D3Service,
        UserserviceProvider,
        Camera,
        FilePath,
        FileTransfer,
        TextToSpeech,
        NativeAudio,
        Sim,
        File,
        Dialogs,
        LocalNotifications,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        ToastService,
        DsortingPipe,
        Calendar,
        Network,
   /*     Diagnostic,*/
        Push,
        DeviceAccounts,
        { provide: LOCALE_ID, useValue: undefined }
    ]
})
export class AppModule {}
