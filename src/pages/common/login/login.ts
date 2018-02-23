import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {IonicPage, NavController, ViewController, NavParams} from 'ionic-angular';

import {AdmUserProvider, CusBasicProvider} from '../../../providers/providers';
import {PlatformProvider, UtilProvider, ValidateProvider} from '../../../providers/common/commonProviders';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BasePage} from '../../pages';
import {RegularExpression} from '../../../providers/common/validate/validate';
import {ImageConfig} from '../../../app/app.config';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage extends BasePage {

  private ftxForm: FormGroup;

  logo = ImageConfig.logo;
  isShowPassword: boolean = false;

  /*formLabel = {
   user_name: "label.admUser.user_name",
   password: "label.admUser.password",
   };*/

  formLabel = {
    user_code: "用户名",
    password: "密码",
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public utilProvider: UtilProvider,
              public admUserProvider: AdmUserProvider,
              public cusBasicProvider: CusBasicProvider,
              private formBuilder: FormBuilder,
              private validateProvider: ValidateProvider,
              private platform: PlatformProvider) {

    super(navCtrl, viewCtrl, navParams, utilProvider);

    this.ftxForm = this.formBuilder.group({
      user_code: ['', [Validators.required,Validators.minLength(1)]],
      password: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(16)]],
      passwd: ['', []]
    });

    platform.registerBackButtonAction();
  }

  /**
   * 登录
   */
  doLogin() {

    if (!this.validateProvider.validate(this.ftxForm, this.formLabel))
      return;

    this.ftxForm.value.passwd = this.utilProvider.make(this.ftxForm.value.password);

    this.utilProvider.showLoading();
    this.admUserProvider.login(this.ftxForm.value).subscribe((data: any) => {
      if (data) {
        this.cusBasicProvider.getCustomer({user_code: this.admUserProvider._admUser.user_code}).subscribe((data) => {

        });
        this.utilProvider.hideLoading();
        this.navCtrl.push('TabsPage');
        if (this.admUserProvider._admUser.gesture_ind)
          this.showModal('GesturePasswordPage', {type: 'first'});
      } else {

        this.utilProvider.hideLoading();
      }
    });
  }

  /**
   *显示密码
   */
  showPassword() {
    this.isShowPassword = !this.isShowPassword;
  }

  goHomePage() {
    this.dismiss(false);
  }
}
