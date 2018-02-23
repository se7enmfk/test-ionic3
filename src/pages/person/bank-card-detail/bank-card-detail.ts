import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {IonicPage, NavController, NavParams, ViewController, ActionSheetController} from 'ionic-angular';

import {AdmUserProvider, CusBasicProvider} from '../../../providers/providers';
import {PlatformProvider, UtilProvider, ValidateProvider} from '../../../providers/common/commonProviders';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BasePage} from '../../pages';
import {RegularExpression} from '../../../providers/common/validate/validate';

/**
 * Generated class for the BankCardDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bank-card-detail',
  templateUrl: 'bank-card-detail.html',
})
export class BankCardDetailPage extends BasePage {

  private ftxForm: FormGroup;

  private isShowPassword: boolean = false;
  private isTimerStart: boolean = false;
  private timerText: string = "发送验证码";
  private timerRemainSeconds: number = 60;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public utilProvider: UtilProvider,
              public actionSheetCtrl: ActionSheetController,
              public admUserProvider: AdmUserProvider,
              public cusBasicProvider: CusBasicProvider,
              private formBuilder: FormBuilder,
              private validateProvider: ValidateProvider,
              private platform: PlatformProvider) {

    super(navCtrl, viewCtrl, navParams, utilProvider);

    this.ftxForm = this.formBuilder.group({
      reserved_mobile: ['', [Validators.required,Validators.pattern(RegularExpression.mobile)]],
      check_code: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(6)]]
    });

    platform.registerBackButtonAction();

  }


  formLabel = {
    reserved_mobile: "label.person-detail.mobile",
    check_code: "验证码",
  };

//获取验证码
  sendCode($event) {
    $event.preventDefault();
    if (!this.ftxForm.controls.reserved_mobile.valid || this.ftxForm.controls.reserved_mobile.errors) {
      this.utilProvider.toast('请输入正确的手机号码')
      return;
    }

    this.admUserProvider.getCode(this.ftxForm.value.reserved_mobile).then((response) => {

      if (response) {
        this.utilProvider.toast('验证码已发送，请注意查收', 'success')
        this.isTimerStart = true;
        this.timerTracker();
      }
    });

  }

  //验证码计时
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

  nextStep() {
    if (!this.validateProvider.validate(this.ftxForm, this.formLabel))
      return;

    //值写入provide实体
    this.cusBasicProvider.saveBindingBankcard(this.ftxForm.value).subscribe(data => {
      if (data) {
        /*this.utilProvider.swal("修改成功");
         this.popPage();*/
        this.navCtrl.push('BankCardIdPage');
      }
    });

  }


}
