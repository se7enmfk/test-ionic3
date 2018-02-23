import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, App} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdmUserProvider} from '../../../providers/providers';
import {UtilProvider, ValidateProvider} from '../../../providers/common/commonProviders';
import {BasePage} from '../../pages';
import {ViewController} from 'ionic-angular/navigation/view-controller';
import {RegularExpression} from '../../../providers/common/validate/validate';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage extends BasePage {

  private ftxForm: FormGroup;
  repeatCkeck: boolean = false;   //账号重复判定，false表示重复
  mobileRepeatCheck: boolean = false;   //手机号重复判定，false表示重复

  isShowPassword: boolean = false;
  private isTimerStart: boolean = false;
  private timerText: string = "发送验证码";
  private timerRemainSeconds: number = 60;

  constructor(public navCtrl: NavController,
              private formBuilder: FormBuilder,
              public utilProvider: UtilProvider,
              public viewCtrl: ViewController,
              private admuserProvider: AdmUserProvider,
              private validateProvider: ValidateProvider,
              public navParams: NavParams) {
    super(navCtrl, viewCtrl, navParams, utilProvider);

    this.ftxForm = this.formBuilder.group({
      user_code: ['', [Validators.required, Validators.minLength(1)]],
      mobile: ['', [Validators.required, Validators.pattern(RegularExpression.mobile)]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
      mobile_code: ['', [Validators.required]],
      passwd: ['', []],
      referee_desc: ['', []]
    });
  }

  formLabel = {
    user_code: "账号",
    mobile: "手机号",
    password: "登录密码",
    mobile_code: "验证码",
    referee_desc: "推荐人",
  };


  /*formLabel = {
   user_code: "label.admUser.user_code",
   mobile: "label.admUser.mobile",
   password: "label.admUser.password",
   mobile_code: "label.admUser.mobile_code",
   referee_desc: "label.cusBasic.referee_desc",
   }
   */
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

  doSignUp() {

    if (!this.repeatCkeck) {
      this.utilProvider.toast('当前账号重复，请先进行修改');
      return;
    }

    if (!this.mobileRepeatCheck) {
      this.utilProvider.toast('当前手机号已被注册，请选择别的手机号');
      return;
    }

    if (!this.validateProvider.validate(this.ftxForm, this.formLabel))
      return;

    this.ftxForm.controls.passwd.setValue(this.utilProvider.make(this.ftxForm.controls.password.value));

    this.admuserProvider.signUp(this.ftxForm.value).subscribe(data => {
      if (data) {
        this.utilProvider.swal('注册成功');
        this.pushPage('LoginPage');
      }
    });
  }

  //账号重复校验
  doRepeatCheck() {
    this.admuserProvider.repeatCheck(this.ftxForm.value).subscribe(data => {
      if (data) {
        this.repeatCkeck = true;      //账号唯一，可以使用
        this.utilProvider.toast('账号唯一，可以使用');
      } else {
        this.repeatCkeck = false;      //账号重复，不可以使用
        this.utilProvider.toast('账号已存在重复，请重新输入');
      }
    });
  };

  //手机号重复校验
  doMobileRepeatCheck() {
    this.admuserProvider.mobileRepeatCheck(this.ftxForm.value).subscribe(data => {
      if (data) {
        this.mobileRepeatCheck = true;      //手机号未被注册，可以使用
        this.utilProvider.toast('该手机号未被注册，可以使用');
      } else {
        this.mobileRepeatCheck = false;      //手机号已被注册，不可以使用
        this.utilProvider.toast('该手机号已被注册，请选择别的手机号');
      }
    });
  };

  /**
   *显示密码
   */
  showPassword() {
    this.isShowPassword = !this.isShowPassword;
  }


}
