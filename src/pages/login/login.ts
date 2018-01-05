import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AdmUserProvider } from '../../providers/providers';
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
    passwd: 'fe185c2abb880b7bbdb6060713b41d90'
  };
  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public admUserProvider: AdmUserProvider,
    public toastCtrl: ToastController,
    public storage: Storage,
    public translateService: TranslateService) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  // Attempt to login in through our User service
  doLogin() {
    this.user.user_code = this.user.user_code.toUpperCase();
    this.admUserProvider.login(this.user).then((data) => {
      console.log(data);
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
}
