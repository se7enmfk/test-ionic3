import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AdmUserProvider } from '../../../providers/providers';
import { PopupProvider, FtxUtilProvider, PlatformProvider } from '../../../providers/common/commonProviders';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasePage } from '../../pages';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage extends BasePage {

  private ftxForm: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public popup: PopupProvider,
    public admUserProvider: AdmUserProvider,
    private formBuilder: FormBuilder,
    public ftxUtilProvider: FtxUtilProvider,
    public storage: Storage,
    private platform: PlatformProvider,
    public translateService: TranslateService) {

    super(navCtrl, viewCtrl, navParams, popup);
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

    this.ftxForm.value.passwd = this.ftxUtilProvider.make(this.ftxForm.value.password);

    this.admUserProvider.login(this.ftxForm.value).subscribe((data: any) => {
      if (data) {
        this.dismiss();
        if (this.admUserProvider._admUser.gesture_ind)
          this.showModal('GesturePasswordPage', { type: 'recorder' });
      }
    });
  }

  goHomePage() {
    this.dismiss();
    this.navCtrl.setRoot('TabsPage');
  }
}
