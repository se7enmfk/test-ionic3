import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AdmUserProvider } from '../../../providers/providers';
import { AppConfig } from '../../../app/app.config';
import { BackButtonProvider, PopupProvider, Md5Provider } from '../../../providers/common/commonProviders';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  user = {
    user_code: 'admin',
    password: '123',
    passwd: null
  };
  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public admUserProvider: AdmUserProvider,
    public md5Provider: Md5Provider,
    public storage: Storage,
    private platform: Platform,
    public backButtonProvider: BackButtonProvider,
    public popup: PopupProvider,
    public translateService: TranslateService) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })

    platform.ready().then((result) => {
      this.backButtonProvider.registerBackButtonAction(null);
    })
    popup.toast('aaa');
  }

  // Attempt to login in through our User service
  doLogin() {
    this.user.user_code = this.user.user_code.toUpperCase();
    this.user.passwd = this.md5Provider.make(this.user.password);

    this.admUserProvider.login(this.user).then((data) => {
      this.navCtrl.push("TabsPage");
    }, (err) => {
      this.popup.toast(this.loginErrorString);
    });
  }
}
