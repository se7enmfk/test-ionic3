import { Component } from '@angular/core';
import { Config, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { AdmSysParamProvider, AdmUserProvider } from '../providers/providers';
import { AppConfig } from './app.config';
import { FirstPage } from '../pages/pages';
import { UtilProvider } from '../providers/common/commonProviders';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: string = FirstPage;

  constructor(private translate: TranslateService,
    private config: Config,
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public admSysParamProvider: AdmSysParamProvider,
    public utilProvider: UtilProvider,
    public admUserProvider: AdmUserProvider,
    private storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.initTranslate();

    this.admSysParamProvider.getSysParamList();

   /*  this.storage.get(AppConfig.SYS_USER).then((data) => {
      admUserProvider._admUser = data;
    }) */

    config.set('backButtonIcon', 'ios-arrow-back');
    config.set('iconMode', 'ios');
    config.set('modalEnter', 'modal-slide-in');
    config.set('modalLeave', 'modal-slide-out');
    config.set('pageTransition', 'ios');
    config.set('mode', 'ios');
    config.set('backButtonText', '');
  }

  //init translate
  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();


        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en'); // Set your language here
    }
  }
}

