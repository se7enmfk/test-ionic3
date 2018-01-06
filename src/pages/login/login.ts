import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Md5 } from 'ts-md5/dist/md5';

import { AdmUserProvider, BackButtonProvider } from '../../providers/providers';
import { Constant } from '../../app/app.config';

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
    public toastCtrl: ToastController,
    public storage: Storage,
    private platform: Platform,
    public backButtonProvider :BackButtonProvider,
    public translateService: TranslateService) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
    platform.ready().then((result) => {
      this.backButtonProvider.registerBackButtonAction(null);
   })
  }

  // Attempt to login in through our User service
  doLogin() {
    this.user.user_code = this.user.user_code.toUpperCase();
    this.user.passwd = this.make(this.user.password);

    this.admUserProvider.login(this.user).then((data) => {

      this.navCtrl.push("TabsPage");
      this.storage.set(Constant.TOKEN, data.entity.token);
    }, (err) => {
      // this.navCtrl.push("TabsPage");
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

  make(remark) {
    return Md5.hashStr(Md5.hashStr(remark + Constant.SYS_NAME + remark.substring(-3)) + Constant.SYS_NAME + remark.substring(-3));
  }
}
