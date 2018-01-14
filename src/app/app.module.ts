import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { IonicApp,  IonicModule } from 'ionic-angular';

import { IonicStorageModule } from '@ionic/storage';

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


import { NgxEchartsModule } from "ngx-echarts";
import { GesturePasswordModule } from 'ngx-gesture-password';

import { MyApp } from './app.component';

import { Providers } from '../providers/providers';
import { AppConfig } from './app.config';
import { AsyncPipe } from '@angular/common';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, AppConfig.WEB_URL + './assets/i18n/', '.json');
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
      name: 'ftx_app_db',
      driverOrder: ['localstorage', 'sqlite', 'websql', 'indexdb', 'localstorage']
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [Providers]
})
export class AppModule { }
