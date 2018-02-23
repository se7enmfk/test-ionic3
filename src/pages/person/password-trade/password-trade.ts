import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdmUserProvider } from '../../../providers/providers';
import { CusBasicProvider } from '../../../providers/providers';
import { BasePage } from "../../pages";
import { UtilProvider,ValidateProvider } from '../../../providers/common/commonProviders';

@IonicPage()
@Component({
  selector: 'page-password-trade',
  templateUrl: 'password-trade.html',
})
export class PasswordTradePage extends BasePage {

  private ftxForm: FormGroup;
  showPass = true;
  _showPass = true;

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public utilProvider: UtilProvider,
    private formBuilder: FormBuilder,
    private cusBasicProvider: CusBasicProvider,
    private validateProvider: ValidateProvider) {

    super(navCtrl, viewCtrl, navParams, utilProvider);

    this.ftxForm = this.formBuilder.group({
      old_password: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(16)]],
      new_password: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(16)]],
    });
  }

  formLabel = {
    old_password: "原密码",
    new_password: "新密码",
  }

  doSave() {

    if (!this.ftxForm.valid) {

      if (!this.validateProvider.validate(this.ftxForm, this.formLabel))
        return;

      /*if (!this.ftxForm.controls.old_password.valid) {
        /!*console.log(this.ftxForm.get('old_password').errors);*!/

        this.utilProvider.toast("请输入原密码");
        return;
      }

      if (!this.ftxForm.controls.new_password.valid) {
        this.utilProvider.toast("请输入新密码");
        return;
      }*/
    }
    let old_passwd = this.utilProvider.make(this.ftxForm.value.old_password);
    let new_passwd = this.utilProvider.make(this.ftxForm.value.new_password);
    if (this.cusBasicProvider._cus.payment_passwd != old_passwd) {
      this.utilProvider.toast("原密码输入不正确");
      return;
    }

    this.cusBasicProvider._cus.payment_passwd = new_passwd;

    /*console.log(this.admUserProvider.save(this.admUserProvider._admUser));*/

    this.cusBasicProvider.save(this.cusBasicProvider._cus)
      .subscribe((data) => {
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
