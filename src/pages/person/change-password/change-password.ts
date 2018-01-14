import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdmUserProvider} from '../../../providers/providers';
import {BasePage} from "../../pages";
import { UtilProvider } from '../../../providers/common/commonProviders';

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})

export class ChangePasswordPage extends BasePage {

  private ftxForm: FormGroup;
  showPass = false;
  _showPass = false;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public navParams: NavParams,
              public utilProvider: UtilProvider,
              private formBuilder: FormBuilder,
              private admUserProvider: AdmUserProvider) {

    super(navCtrl, viewCtrl, navParams, utilProvider);

    this.ftxForm = this.formBuilder.group({
      'old_password': ['', [Validators.required,Validators.maxLength(5)]],
      'new_password': ['', [Validators.required]],
    });
  }

  save() {
    
    if (!this.ftxForm.valid) {
        
      if (!this.ftxForm.controls.old_password.valid) {
        console.log(this.ftxForm.get('old_password').errors);
        
        this.utilProvider.toast("请输入原密码");
        return;
      }

      if (!this.ftxForm.controls.new_password.valid) {
        this.utilProvider.toast("请输入新密码");
        return;
      }
    }
    let old_passwd = this.utilProvider.make(this.ftxForm.value.old_password);
    let new_passwd = this.utilProvider.make(this.ftxForm.value.new_password);
    if (this.admUserProvider._admUser.passwd != old_passwd) {
      this.utilProvider.toast("原密码输入不正确");
      return;
    }

    this.admUserProvider._admUser.passwd = new_passwd;
    this.admUserProvider._admUser.mode_ = 'E';
    this.admUserProvider.save(this.admUserProvider._admUser).subscribe((data) => {
      if (data) {
        this.utilProvider.swal("密码修改成功");
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
