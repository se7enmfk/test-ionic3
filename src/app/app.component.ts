import { Component } from '@angular/core';
import { Config, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { AdmSysParamProvider } from '../providers/providers';
import { Constant } from './app.config';
import { FirstPage } from '../pages/pages';

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
    public admSysParam: AdmSysParamProvider,
    private storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.initTranslate();
    this.storage.set(Constant.TOKEN, null);

    admSysParam.retrieveSysParamList();
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

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }
}

