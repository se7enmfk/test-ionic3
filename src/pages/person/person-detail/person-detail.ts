import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, ActionSheetController} from 'ionic-angular';
import {BasePage} from "../../pages";
import {UtilProvider, ValidateProvider} from '../../../providers/common/commonProviders';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AdmUserProvider, AdmSysParamProvider} from '../../../providers/providers';
import {concat} from '../../../../node_modules/rxjs/operator/concat';

@IonicPage()
@Component({
  selector: 'page-person-detail',
  templateUrl: 'person-detail.html',
})
export class PersonDetailPage extends BasePage {

  private ftxForm: FormGroup;

  formLabel = {
    user_name: "label.person-detail.user_name",
    gender: "label.person-detail.gender",
    mobile: "label.person-detail.mobile",
    email: "label.person-detail.email",
  }

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public navParams: NavParams,
              public utilProvider: UtilProvider,
              public actionSheetCtrl: ActionSheetController,
              public admUserProvider: AdmUserProvider,
              public admSysParamProvider: AdmSysParamProvider,
              public validateProvider: ValidateProvider,
              private formBuilder: FormBuilder) {

    super(navCtrl, viewCtrl, navParams, utilProvider);

    this.ionViewDidEnter();
  }

  ionViewDidEnter() {
    this.ftxForm = this.formBuilder.group({
      user_code: [this.admUserProvider._admUser.user_code],
      user_name: [this.admUserProvider._admUser.user_name, [Validators.required,Validators.maxLength(12)]],
      gender: [this.admUserProvider._admUser.gender, [Validators.required]],
      mobile: [this.admUserProvider._admUser.mobile, [Validators.required]],
      email: [this.admUserProvider._admUser.email, [Validators.required, Validators.email]]
    });
  }

  openActionSheet() {

    let list = this.admSysParamProvider.getFilterList({param_type: 'GENDER'});

    let buttons = [];
    list.forEach(element => {
      buttons.push({
        text: element.param_name,
        handler: () => {
          this.ftxForm.controls.gender.setValue(element.param_code);
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

  doSave() {

    if (!this.validateProvider.validate(this.ftxForm, this.formLabel))
      return;

    this.admUserProvider.save(this.ftxForm.value).subscribe((data) => {
      if (data) {
        this.utilProvider.swal("修改成功");
        this.popPage();
      }
    });
  }
}
