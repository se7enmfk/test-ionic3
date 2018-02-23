import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {IonicPage, NavController, NavParams, ViewController, ActionSheetController} from 'ionic-angular';

import {CusBasicProvider} from '../../../providers/providers';
import {AdmUserProvider} from '../../../providers/providers';
import {PlatformProvider, UtilProvider, ValidateProvider} from '../../../providers/common/commonProviders';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BasePage} from '../../pages';

@IonicPage()
@Component({
  selector: 'page-referee',
  templateUrl: 'referee.html',
})
export class RefereePage extends BasePage {

  private ftxForm: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public utilProvider: UtilProvider,
              public actionSheetCtrl: ActionSheetController,
              public cusBasicProvider: CusBasicProvider,
              public admUserProvider: AdmUserProvider,
              private formBuilder: FormBuilder,
              private validateProvider: ValidateProvider,
              private platform: PlatformProvider) {

    super(navCtrl, viewCtrl, navParams, utilProvider);

    this.ftxForm = this.formBuilder.group({
      cus_no:[this.admUserProvider._admUser.user_code],
      user_code:[this.admUserProvider._admUser.user_code],
      referee_desc: [this.cusBasicProvider._cus.referee_desc, [Validators.required,Validators.maxLength(11)]]
    });
  }

  formLabel = {
    referee_desc: "推荐人",
  };

  doSave = function () {
    if (!this.validateProvider.validate(this.ftxForm, this.formLabel)) {
      return;
    }

    this.cusBasicProvider.save(this.ftxForm.value).subscribe((data) => {
      if (data) {
        this.utilProvider.swal("提交成功");
        this.navCtrl.pop();
      }
    });
  };


}
