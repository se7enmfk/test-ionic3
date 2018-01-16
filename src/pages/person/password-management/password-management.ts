import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { BasePage } from '../../pages';
import { UtilProvider } from '../../../providers/common/commonProviders';
import { AppConfig } from '../../../app/app.config';

@IonicPage()
@Component({
  selector: 'page-password-management',
  templateUrl: 'password-management.html',
})
export class PasswordManagementPage extends BasePage {

  gesture_ind: boolean;

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
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
  doGesture() {

    let prompt = this.utilProvider.prompt("fsafasd");
    prompt.onDidDismiss((data) => {
       console.log(data);
       
    });
    /* if (this.gesture_ind)
      this.doModify(!this.gesture_ind);

    if (!this.gesture_ind) {
      this.utilProvider.removeItem(AppConfig.GESTURE_PASSWORD);
    } */

  }

  /**
   * 修改手势密码
   * @param gesture_ind 当前手势密码状态
   */
  doModify(gesture_ind) {
    let dataSelectPageModal = this.showModal('GesturePasswordPage', { type: 'modify', gesture_ind: gesture_ind });

    dataSelectPageModal.onDidDismiss(data => {
      this.gesture_ind = data;
    })
  }
}
