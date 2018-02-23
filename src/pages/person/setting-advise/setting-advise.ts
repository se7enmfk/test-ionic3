import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {IonicPage, NavController, NavParams, ViewController, ActionSheetController} from 'ionic-angular';

import {AdmUserProvider} from '../../../providers/providers';
import {PlatformProvider, UtilProvider, ValidateProvider} from '../../../providers/common/commonProviders';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BasePage} from '../../pages';
import {RegularExpression} from '../../../providers/common/validate/validate';

@IonicPage()
@Component({
  selector: 'page-setting-advise',
  templateUrl: 'setting-advise.html',
})
export class SettingAdvisePage extends BasePage{

  private ftxForm: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public utilProvider: UtilProvider,
              public actionSheetCtrl: ActionSheetController,
              public admUserProvider: AdmUserProvider,
              private formBuilder: FormBuilder,
              private validateProvider: ValidateProvider,
              private platform: PlatformProvider) {

    super(navCtrl, viewCtrl, navParams, utilProvider);

    this.ftxForm = this.formBuilder.group({
      user_code: [this.admUserProvider._admUser.user_code, [Validators.required]],           //用户账号
     /* advice_no: [''],      */     //意见ID,数据库自动生成
      score: ['', [Validators.required]],          //评分
      advice_content: ['', [Validators.required, Validators.minLength(10),Validators.maxLength(200)]]      //反馈内容
    });

    platform.registerBackButtonAction();

  }

  formLabel = {
    advice_no: "意见ID",
    score: "满意度",
    advice_content: "反馈内容",
  };

  doSave = function () {
    if (!this.validateProvider.validate(this.ftxForm, this.formLabel))
      return;

    this.admUserProvider.saveUserAdvice(this.ftxForm.value).subscribe((data) => {
      if (data) {
        this.utilProvider.swal("提交成功");
        this.navCtrl.pop();
      }
    });
  };

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SettingAdvisePage');
  }

}
