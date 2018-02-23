import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { BasePage } from '../../pages';
import { UtilProvider } from '../../../providers/common/commonProviders';
import { AppConfig } from '../../../app/app.config';
import { AdmUserProvider } from '../../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-password-management',
  templateUrl: 'password-management.html',
})
export class PasswordManagementPage extends BasePage {

  gesture_ind: boolean;

  gesture_toggle: boolean = false;
  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public admUserProvider: AdmUserProvider,
    public utilProvider: UtilProvider) {
    super(navCtrl, viewCtrl, navParams, utilProvider);


  }
  ionViewDidLoad() {
    this.utilProvider.getItem(AppConfig.GESTURE_PASSWORD).subscribe((data) => {
      this.gesture_ind = data ? true : false;
    })
  }

  /**
   * 开启手势密码
   */
  doGesture(e) {
    this.gesture_toggle = !this.gesture_toggle;
    if (this.gesture_toggle) {

      this.admUserProvider.checkPassword((data) => {

        let passwd = this.utilProvider.make(data.password);

        if (passwd == this.admUserProvider._admUser.passwd) {
          if (this.gesture_ind)
            this.doModify(!this.gesture_ind);

          if (!this.gesture_ind) {
            this.utilProvider.removeItem(AppConfig.GESTURE_PASSWORD);
            this.gesture_toggle = false;
          }
        } else {
          this.utilProvider.toast('密码不正确');
          this.gesture_ind = !this.gesture_ind;
        }
      }, (data) => {
        this.gesture_ind = !this.gesture_ind;
      })
    } else {
      this.gesture_toggle = false;
    }


  }

  /**
   * 修改手势密码
   * @param gesture_ind 当前手势密码状态
   */
  doModify(gesture_ind) {
    let dataSelectPageModal = this.showModal('GesturePasswordPage', { type: 'modify', gesture_ind: gesture_ind });

    dataSelectPageModal.onDidDismiss(data => {
      this.gesture_ind = data;
      this.gesture_toggle = false;
    })
  }
}
