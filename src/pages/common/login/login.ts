import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';

import { AdmUserProvider } from '../../../providers/providers';
import { PlatformProvider, UtilProvider, ValidateProvider } from '../../../providers/common/commonProviders';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasePage } from '../../pages';
import { RegularExpression } from '../../../providers/common/validate/validate';

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
    public admUserProvider: AdmUserProvider,
    private formBuilder: FormBuilder,
    private validateProvider: ValidateProvider,
    private platform: PlatformProvider) {

    super(navCtrl, viewCtrl, navParams, utilProvider);

    this.ftxForm = this.formBuilder.group({
      mobile: ['13712345678', [Validators.required, Validators.pattern(RegularExpression.mobile)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      passwd: ['', []]
    });

    platform.registerBackButtonAction();
  }

  formLabel = {
    mobile: "label.person-detail.mobile",
    password: "label.person-detail.password",
  }
  doLogin() {

    if (!this.validateProvider.validate(this.ftxForm, this.formLabel))
      return;

    this.ftxForm.value.passwd = this.utilProvider.make(this.ftxForm.value.password);

    this.admUserProvider.login(this.ftxForm.value).subscribe((data: any) => {
      if (data) {
        this.dismiss();
        if (this.admUserProvider._admUser.gesture_ind)
          this.showModal('GesturePasswordPage', { type: 'first' });
      }
    });
  }

  goHomePage() {
    this.dismiss();
    this.navCtrl.setRoot('TabsPage');
  }
}
