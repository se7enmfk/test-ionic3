import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdmUserProvider } from '../../../providers/providers';
import { BasePage } from "../../pages";
import { UtilProvider, ValidateProvider } from '../../../providers/common/commonProviders';

@IonicPage()
@Component({
  selector: 'page-password-login',
  templateUrl: 'password-login.html',
})
export class PasswordLoginPage extends BasePage {

  private ftxForm: FormGroup;
  showPass = true;
  _showPass = true;

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public utilProvider: UtilProvider,
    private formBuilder: FormBuilder,
    private validateProvider: ValidateProvider,
    private admUserProvider: AdmUserProvider) {

    super(navCtrl, viewCtrl, navParams, utilProvider);

    this.ftxForm = this.formBuilder.group({
      old_password: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(16)]],
      new_password: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(16)]],
    });
  }
  formLabel = {
    old_password: "原密码",
    new_password: "新密码",
  }

  doSave() {

    if (!this.validateProvider.validate(this.ftxForm, this.formLabel))
      return;

    let old_passwd = this.utilProvider.make(this.ftxForm.value.old_password);
    let new_passwd = this.utilProvider.make(this.ftxForm.value.new_password);
    if (this.admUserProvider._admUser.passwd != old_passwd) {
      this.utilProvider.toast("原密码输入不正确");
      return;
    }

    this.admUserProvider._admUser.passwd = new_passwd;

    this.admUserProvider.save(this.admUserProvider._admUser).subscribe((data) => {
      if (data) {
        this.utilProvider.swal("修改成功");
        this.popPage();
      }
    });

  }

  showPassword(flag) {
    if (flag) {
      this.showPass = !this.showPass;
    } else {
      this._showPass = !this._showPass;
    }
  }
}
