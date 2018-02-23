import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {BasePage} from '../../pages';
import {UtilProvider, ValidateProvider} from '../../../providers/common/commonProviders';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AdmUserProvider} from '../../../providers/providers';
import {AdmNoticeProvider} from '../../../providers/providers';
import {RegularExpression} from '../../../providers/common/validate/validate';

@IonicPage()
@Component({
  selector: 'page-setting-notice-group-pofit-loss',
  templateUrl: 'setting-notice-group-pofit-loss.html',
})
export class SettingNoticeGroupPofitLossPage extends BasePage {

  private ftxForm: FormGroup;

  formLabel = {
    profit_exceed: "盈利超过",
    loss_exceed: "亏损超过",
  };

  admNoticeUsersetItem = {
    user_code: this.admUserProvider._admUser.user_code,
    notice_type: 'group_profit_loss'
  };

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public navParams: NavParams,
              public validateProvider: ValidateProvider,
              public admUserProvider: AdmUserProvider,
              public admNoticeProvider: AdmNoticeProvider,
              private formBuilder: FormBuilder,
              public utilProvider: UtilProvider) {
    super(navCtrl, viewCtrl, navParams, utilProvider);

    this.ftxForm = this.formBuilder.group({
      profit_exceed: ['', [Validators.required,Validators.pattern(RegularExpression.profitOrLoss)]],
      loss_exceed: ['', [Validators.required,Validators.pattern(RegularExpression.profitOrLoss)]]
    });

  }


  ionViewDidLoad() {
//获取通知设定值列表
    this.admNoticeProvider.getNoticeUsersetItemList(this.admNoticeUsersetItem).subscribe((data) => {
      if (data) {
        this.admNoticeProvider.noticeUsersetItemList.forEach(data => {
          if ('profit_exceed' == data.item_type) {
            this.ftxForm.controls.profit_exceed.setValue(data.item_value);
          }
          if ('loss_exceed' == data.item_type) {
            this.ftxForm.controls.loss_exceed.setValue(data.item_value);
          }
        });
      }
    });
  }

  //储存设定值
  doSave() {
    if (!this.validateProvider.validate(this.ftxForm, this.formLabel)){
      return;
    }
    //储存上限值
    this.admNoticeProvider.saveNoticeUsersetItem(this.admNoticeUsersetItem, 'profit_exceed', this.ftxForm.value.profit_exceed).subscribe((data) => {
      console.log('1');
      console.log(data);
      if (data) {
        //储存下限值
        this.admNoticeProvider.saveNoticeUsersetItem(this.admNoticeUsersetItem, 'loss_exceed', this.ftxForm.value.loss_exceed).subscribe((data) => {
          console.log('2');
          console.log(data);
          if (data) {
            //存储开关状态
            let notice_yn = 'Y';
            this.admNoticeProvider.saveNoticeStatus(this.admNoticeUsersetItem, notice_yn).subscribe((data) => {
              console.log('存储开关状态');
              console.log(data);
              if (data) {
                //更新全局快关状态
                this.admNoticeProvider.settingNoticeList.forEach(data => {
                  if ('group_profit_loss' == data.notice_type) {
                    data.notice_yn = 'Y';
                  }
                });
                this.utilProvider.swal("设置成功");
                this.popPage();
                /*this.dismiss(true);*/
              }
            });

          }
        });
      }
    });
  }

}
