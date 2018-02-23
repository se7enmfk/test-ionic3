import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {IonicPage, NavController, NavParams, ViewController, ActionSheetController} from 'ionic-angular';

import {AdmUserProvider} from '../../../providers/providers';
import {CusBasicProvider} from '../../../providers/providers';
import {PlatformProvider, UtilProvider, ValidateProvider} from '../../../providers/common/commonProviders';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BasePage} from '../../pages';
import {RegularExpression} from '../../../providers/common/validate/validate';

/**
 * Generated class for the BankCardIdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bank-card-id',
  templateUrl: 'bank-card-id.html',
})
export class BankCardIdPage extends BasePage {

  private ftxForm: FormGroup;
  showPass = true;

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
      cus_no: [this.cusBasicProvider._cus.cus_no, [Validators.required]],
      account_name: [this.admUserProvider._admUser.user_name, [Validators.required]],
      id_type: ['身份证', [Validators.required]],
      id_no: ['', [Validators.required, Validators.pattern(RegularExpression.idCard)]],
      payment_passwd: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]]
    });

    platform.registerBackButtonAction();

  }

  formLabel = {
    cus_no: "用户账号",
    account_name: "户名",
    id_type: "证件类型",
    id_no: "证件号码",
    payment_passwd: "交易密码",
  };


  //存储银行卡信息
  doSave = function () {
    //表单判空
    if (!this.validateProvider.validate(this.ftxForm, this.formLabel))
      return;

    //判断交易密码是否正确
    let payment_passwd = this.utilProvider.make(this.ftxForm.value.payment_passwd);
    //调用判断交易密码方法
    if (this.cusBasicProvider._cus.payment_passwd != payment_passwd) {
      this.utilProvider.toast("交易密码输入错误");
      return;
    }

    //执行存储银行卡
    this.cusBasicProvider.saveCardInfo(this.ftxForm.value).subscribe((data) => {
      if (data) {
        this.utilProvider.swal("绑定成功");
        this.cusBasicProvider.countBlindCardNumber().subscribe((data) => {
            this.navCtrl.popToRoot();
          /*if (data) {
          }*/
        });
      }
    });
  };

  showPassword() {
      this.showPass = !this.showPass;
  }

}
