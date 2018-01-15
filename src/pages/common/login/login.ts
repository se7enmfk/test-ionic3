import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';

import { AdmUserProvider } from '../../../providers/providers';
import { PlatformProvider, UtilProvider } from '../../../providers/common/commonProviders';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasePage } from '../../pages';

/**
 * 登录页面
 */
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
    public utilProvider: UtilProvider,
    private admUserProvider: AdmUserProvider,
    private formBuilder: FormBuilder,
    private platform: PlatformProvider) {

    super(navCtrl, viewCtrl, navParams, utilProvider);

    this.ftxForm = this.formBuilder.group({
      mobile: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passwd: ['', []]
    });

    platform.registerBackButtonAction();
  }

  /**
   * 登录
   */
  doLogin() {
    if (!this.ftxForm.valid) {
      if (!this.ftxForm.controls.mobile.valid) {
        this.utilProvider.toast('请输入正确的手机号码')
        return;
      }
      if (!this.ftxForm.controls.password.valid) {
        this.utilProvider.toast('请输入密码')
        return;
      }
    }

    this.ftxForm.value.passwd = this.utilProvider.make(this.ftxForm.value.password);

    this.admUserProvider.login(this.ftxForm.value).subscribe((data: any) => {
      if (data) {
        this.dismiss();
        if (this.admUserProvider._admUser.gesture_ind)
          this.showModal('GesturePasswordPage', { type: 'recorder' });
      }
    });
  }

  /**
   * 跳转到TabsPage
   */
  goTabsPage() {
    this.dismiss();
    this.navCtrl.setRoot('TabsPage');
  }
}
