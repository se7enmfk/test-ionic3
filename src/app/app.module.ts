import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { IonicStorageModule } from '@ionic/storage';

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


import { NgxEchartsModule } from "ngx-echarts";
import { GesturePasswordModule } from 'ngx-gesture-password';

import { MyApp } from './app.component';

import { AdmUserProvider, AdmSysParamProvider } from '../providers/providers';
import { PlatformProvider, Md5Provider, HttpProvider, PopupProvider } from '../providers/common/commonProviders';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxEchartsModule,
    GesturePasswordModule,
    IonicStorageModule.forRoot({
      name: 'drip_db',
      driverOrder: ['sqlite', 'websql', 'indexdb', 'localstorage']
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AdmSysParamProvider,
    AdmUserProvider,
    HttpProvider,
    PopupProvider,
    Md5Provider,
    PlatformProvider
  ]
})
export class AppModule { }
