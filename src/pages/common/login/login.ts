import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AdmUserProvider } from '../../../providers/providers';
import { PopupProvider, Md5Provider, PlatformProvider } from '../../../providers/common/commonProviders';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  private ftxForm: FormGroup;

  constructor(public navCtrl: NavController,
    public admUserProvider: AdmUserProvider,
    private formBuilder: FormBuilder,
    public md5Provider: Md5Provider,
    public storage: Storage,
    private platform: PlatformProvider,
    public popup: PopupProvider,
    public translateService: TranslateService) {

    this.ftxForm = this.formBuilder.group({
      mobile: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passwd: ['', []]
    });

    platform.registerBackButtonAction();
  }
 
  doLogin() {
    if (!this.ftxForm.valid) {
      if (!this.ftxForm.controls.mobile.valid || this.ftxForm.controls.mobile.errors) {
        this.popup.toast('请输入正确的手机号码')
        return;
      }
      if (!this.ftxForm.controls.password.valid) {
        this.popup.toast('请输入密码')
        return;
      }
    }

    this.ftxForm.value.passwd = this.md5Provider.make(this.ftxForm.value.password);

    this.admUserProvider.login(this.ftxForm.value).subscribe((data) => {
      if (data)
        this.navCtrl.pop();
    });
  }
  goSignUpPage() {
    this.navCtrl.push("SignUpPage");
  }
  goForgetPage() {
    this.navCtrl.push("ForgetPage");
  }
}
