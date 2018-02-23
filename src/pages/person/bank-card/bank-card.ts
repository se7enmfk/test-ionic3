import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {IonicPage, NavController, NavParams, ViewController, ActionSheetController} from 'ionic-angular';

import {AdmSysParamProvider, CusBasicProvider} from '../../../providers/providers';
import {PlatformProvider, UtilProvider, ValidateProvider} from '../../../providers/common/commonProviders';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BasePage} from '../../pages';
import {RegularExpression} from '../../../providers/common/validate/validate';

@IonicPage()
@Component({
  selector: 'page-bank-card',
  templateUrl: 'bank-card.html',
})

export class BankCardPage extends BasePage {

  private ftxForm: FormGroup;
  checkBoxFitstStatus=false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public utilProvider: UtilProvider,
              public actionSheetCtrl: ActionSheetController,
              public cusBasicProvider: CusBasicProvider,
              public admSysParamProvider: AdmSysParamProvider,
              private formBuilder: FormBuilder,
              private validateProvider: ValidateProvider,
              private platform: PlatformProvider) {

    super(navCtrl, viewCtrl, navParams, utilProvider);

    this.ftxForm = this.formBuilder.group({
      bank_code: ['', [Validators.required]],
      bankcard_code: ['', [Validators.required, Validators.pattern(RegularExpression.bankCard)]],
      valid_yn: ['', [Validators.required]]
    });
  }

  /*formLabel = {
   bank_code: "label.bank-card.bank",
   bankcard_code: "label.bank-card.card_number",
   valid_yn: "同意授权",
   };*/

  formLabel = {
    bank_code: "银行名称",
    bankcard_code: "银行卡号",
    valid_yn: "授权意愿",
  };

  bankSelect() {

    //获取银行名称及银行代码列表
    let list = this.admSysParamProvider.getFilterList({param_type: 'BANK_CODE'});

    let buttons = [];
    list.forEach(element => {
      buttons.push({
        text: element.param_name,
        handler: () => {
          this.ftxForm.controls.bank_code.setValue(element.param_code);
        }
      });
    });
    buttons.push({
      text: '取消',
      role: 'cancel',
      handler: () => {
      }
    });

    let actionSheet = this.actionSheetCtrl.create({
      title: '请选择',
      buttons: buttons
    });

    actionSheet.present();
  }

  //阅读和授权
  readingAndAuthorization(value) {
    if (!value) {
      this.ftxForm.controls.valid_yn.setValue('Y');
    } else {
      this.ftxForm.controls.valid_yn.setValue('');
    }
    this.checkBoxFitstStatus=!this.checkBoxFitstStatus;
  }


  nextStep() {
    if (!this.validateProvider.validate(this.ftxForm, this.formLabel))
      return;

    //值写入provide实体
    this.cusBasicProvider.saveBindingBankcard(this.ftxForm.value).subscribe(data => {
      if (data) {
        /*this.utilProvider.swal("修改成功");
         this.popPage();*/
        this.navCtrl.push('BankCardDetailPage');
      }
    });

  }
}
