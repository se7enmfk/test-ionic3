import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Md5Provider, PopupProvider } from '../../../providers/common/commonProviders';
import { AdmUserProvider } from '../../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  private ftxForm: FormGroup;
  showPass = false;
  _showPass = false;

  constructor(public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private md5Provider: Md5Provider,
    private admUserProvider: AdmUserProvider,
    private popup: PopupProvider,
    public navParams: NavParams) {

    this.ftxForm = this.formBuilder.group({
      'old_password': ['', [Validators.required]],
      'new_password': ['', [Validators.required]],
    });
  }

  save() {
    if (!this.ftxForm.valid) {
      if (!this.ftxForm.controls.old_password.valid) {
        this.popup.toast("请输入原密码");
        return;
      }

      if (!this.ftxForm.controls.new_password.valid) {
        this.popup.toast("请输入新密码");
        return;
      }
    }
    let old_passwd = this.md5Provider.make(this.ftxForm.controls.old_password.value);
    let new_passwd = this.md5Provider.make(this.ftxForm.controls.new_password.value);
    if (this.admUserProvider._admUser.passwd != old_passwd) {
      this.popup.toast("原密码输入不正确");
      return;
    }
    this.admUserProvider._admUser.passwd = new_passwd;
    this.admUserProvider._admUser.mode_ = 'E';
    this.admUserProvider.save(this.admUserProvider._admUser).subscribe((data) => {
      if (data) {
        this.popup.toast("密码修改成功");
        this.navCtrl.pop();
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
