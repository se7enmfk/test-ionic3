import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {BasePage} from '../../pages';
import {UtilProvider, ValidateProvider} from '../../../providers/common/commonProviders';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AdmUserProvider} from '../../../providers/providers';
import {RegularExpression} from '../../../providers/common/validate/validate';

@IonicPage()
@Component({
  selector: 'page-person-mobile',
  templateUrl: 'person-mobile.html',
})
export class PersonMobilePage extends BasePage {

  private ftxForm: FormGroup;
  mobileRepeatCheck: boolean = false;   //手机号重复判定，false表示重复

  isShowPassword: boolean = false;
  private isTimerStart: boolean = false;
  private timerText: string = "发送验证码";
  private timerRemainSeconds: number = 60;

  formLabel = {
    mobile: "label.person-detail.mobile",
    mobile_code: "验证码"
  };

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public navParams: NavParams,
              public validateProvider: ValidateProvider,
              public admUserProvider: AdmUserProvider,
              private formBuilder: FormBuilder,
              public utilProvider: UtilProvider) {
    super(navCtrl, viewCtrl, navParams, utilProvider);

    this.ftxForm = this.formBuilder.group({
      user_code: [this.admUserProvider._admUser.user_code],
      mobile: ['', [Validators.required, Validators.pattern(RegularExpression.mobile)]],
      mobile_code: ['', [Validators.required,Validators.minLength(4),Validators.maxLength(6)]]
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

    this.admUserProvider.getCode(this.ftxForm.value.mobile).then((response) => {
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

  doSave() {

    if (!this.validateProvider.validate(this.ftxForm, this.formLabel))
      return;

    if (!this.mobileRepeatCheck) {
      this.utilProvider.toast('当前手机号已被注册，请选择别的手机号');
      return;
    }


    this.admUserProvider.save(this.ftxForm.value).subscribe((data) => {
      if (data) {
        this.utilProvider.swal("修改成功");
        this.popPage();
      }
    });
  }

  //手机号重复校验
  doMobileRepeatCheck() {
    this.admUserProvider.mobileRepeatCheck(this.ftxForm.value).subscribe(data => {
      if (data) {
        this.mobileRepeatCheck = true;      //手机号未被注册，可以使用
        this.utilProvider.toast('该手机号未被注册，可以使用');
      } else {
        this.mobileRepeatCheck = false;      //手机号已被注册，不可以使用
        this.utilProvider.toast('该手机号已被注册，请选择别的手机号');
      }
    });
  };
}
