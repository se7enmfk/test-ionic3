import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MyApp } from './app.component';
import { Api, AdmUserProvider, AdmSysParamProvider } from '../providers/providers';
import { HttpProvider } from '../providers/http/http';
import { NgxEchartsModule } from "ngx-echarts";
import { BackButtonProvider } from '../providers/back-button/back-button';
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
    IonicModule.forRoot(MyApp,{
      doneText:"确定",
      cancelText:"取消1"
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Api,
    AdmSysParamProvider,
    AdmUserProvider,
    HttpProvider,
    BackButtonProvider
  ]
})
export class AppModule { }
