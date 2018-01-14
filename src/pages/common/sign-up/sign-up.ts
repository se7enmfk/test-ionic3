import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdmUserProvider } from '../../../providers/providers';
import { UtilProvider } from '../../../providers/common/commonProviders';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  private ftxForm: FormGroup;

  private isShowPassword: boolean = false;
  private isTimerStart: boolean = false;
  private timerText: string = "发送验证码";
  private timerRemainSeconds: number = 60;

  constructor(public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private utilProvider: UtilProvider,
    private admuserProvider: AdmUserProvider,
    private app: App,
    public navParams: NavParams) {

    this.ftxForm = this.formBuilder.group({
      mobile: ['', [Validators.required]],
      code: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passwd: ['', []]
    });
  }

  ionViewDidLoad() {
  }
  sendCode($event) {
    $event.preventDefault();
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
      console.log(this.timerRemainSeconds);
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
  showPassword($event) {
    $event.preventDefault();
    this.isShowPassword = !this.isShowPassword;
  }

  goLoginPage() {
    this.navCtrl.pop();
  }

  goForgetPage() {
    this.navCtrl.push('ForgetPage');
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

    this.admuserProvider.signUp(this.ftxForm.value).subscribe(data => {
      if (data) {
        this.utilProvider.swal('注册成功').then(() => {
          this.app.getRootNav().push('TabsPage');
        });
      }
    });
  }
}
