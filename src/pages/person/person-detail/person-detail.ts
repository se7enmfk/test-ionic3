import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ActionSheetController } from 'ionic-angular';
import { BasePage } from "../../pages";
import { UtilProvider, ValidateProvider } from '../../../providers/common/commonProviders';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdmUserProvider } from '../../../providers/providers';
import { concat } from '../../../../node_modules/rxjs/operator/concat';
import { RegularExpression } from '../../../providers/common/validate/validate';


@IonicPage()
@Component({
  selector: 'page-person-detail',
  templateUrl: 'person-detail.html',
})
export class PersonDetailPage extends BasePage {

  private ftxForm: FormGroup;

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public utilProvider: UtilProvider,
    public actionSheetCtrl: ActionSheetController,
    public admUserProvider: AdmUserProvider,
    public validateProvider: ValidateProvider,
    private formBuilder: FormBuilder) {
    super(navCtrl, viewCtrl, navParams, utilProvider);

    this.ftxForm = this.formBuilder.group({
      user_name: [this.admUserProvider._admUser.user_name, [Validators.required, Validators.minLength(7)]],
      gender: [this.admUserProvider._admUser.gender, [Validators.required]],
      mobile: [this.admUserProvider._admUser.mobile, [Validators.required]],
      email: [this.admUserProvider._admUser.email, [Validators.required, Validators.pattern(RegularExpression.mobile)]]
    });
  }

  formLabel = {
    user_name: "label.person-detail.user_name",
    gender: "label.person-detail.gender",
    mobile: "label.person-detail.mobile",
    email: "label.person-detail.email",
  }
  openActionSheet() {

    let actionSheet = this.actionSheetCtrl.create({
      title: '请选择',
      buttons: [
        {
          text: '男',
          handler: () => {
            this.ftxForm.value.gender = 'M';
          }
        },
        {
          text: '女',
          handler: () => {
            this.ftxForm.value.gender = 'F';
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => { }
        }
      ]
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