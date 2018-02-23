import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, App} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdmUserProvider} from '../../../providers/providers';
import {UtilProvider} from '../../../providers/common/commonProviders';
import {BasePage} from '../../pages';
import {ViewController} from 'ionic-angular/navigation/view-controller';
import {RegularExpression} from '../../../providers/common/validate/validate';

/*import {Component} from '@angular/core';
 import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
 import {BasePage} from '../../pages';
 import {UtilProvider} from '../../../providers/common/commonProviders';*/

@IonicPage()
@Component({
  selector: 'page-forget',
  templateUrl: 'forget.html',
})
export class ForgetPage extends BasePage {

  private ftxForm: FormGroup;

  isShowPassword: boolean = false;
  private isTimerStart: boolean = false;
  private timerText: string = "发送验证码";
  private timerRemainSeconds: number = 60;


  constructor(public navCtrl: NavController,
              private formBuilder: FormBuilder,
              public utilProvider: UtilProvider,
              public viewCtrl: ViewController,
              private admuserProvider: AdmUserProvider,
              public navParams: NavParams) {
    super(navCtrl, viewCtrl, navParams, utilProvider);

    this.ftxForm = this.formBuilder.group({
      mobile: ['', [Validators.required, Validators.pattern(RegularExpression.mobile)]],
      code: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(6)]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
      passwd: ['', []]
    });
  }

  sendCode() {
    if (!this.ftxForm.controls.mobile.valid || this.ftxForm.controls.mobile.errors) {
      this.utilProvider.toast('请输入正确的手机号码')
      return;
    }

    this.admuserProvider.getCode(this.ftxForm.value.mobile).then((response) => {
      console.log(response);

      if (response) {
        this.utilProvider.toast('验证码已发送，请注意查收', 'success')
        this.isTimerStart = true;
        this.timerTracker();
      }
    });

  }

  timerTracker() {
    setTimeout(() => {
      /*console.log(this.timerRemainSeconds);*/
      if (this.timerRemainSeconds > 0) {
        this.timerRemainSeconds--;
        this.timerText = this.timerRemainSeconds + "s后再次发送";
        this.timerTracker();
      }
      else {
        this.timerText = "再次发送";
        this.timerRemainSeconds = 60;
        this.isTimerStart = false;
      }
    }, 1000);
  }

  showPassword() {
    this.isShowPassword = !this.isShowPassword;
  }

  doSignUp() {
    if (!this.ftxForm.valid) {
      if (!this.ftxForm.controls.mobile.valid || this.ftxForm.controls.mobile.errors) {
        this.utilProvider.toast('请输入正确的手机号码')
        return;
      }
      if (!this.ftxForm.controls.password.valid) {
        this.utilProvider.toast('请输入密码')
        return;
      }

      /* if (!this.ftxForm.controls.code.valid) {
       this.utilProvider.toast('请输入验证码')
       return;
       } */
    }

    this.ftxForm.controls.passwd.setValue(this.utilProvider.make(this.ftxForm.controls.password.value));

    this.admuserProvider.resetPassword(this.ftxForm.value).subscribe(data => {
      if (data) {
        this.utilProvider.swal('重置密码成功');
        this.navCtrl.setRoot('LoginPage');
      } else {
        this.utilProvider.toast('请输入正确的手机号');
      }
    });
  }


}
