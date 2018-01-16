import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AppConfig } from '../../../app/app.config';
import { UtilProvider } from '../../../providers/common/commonProviders';
import { ERR } from 'ngx-gesture-password';
import { BasePage } from '../../pages';
import { AdmUserProvider } from '../../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-gesture-password',
  templateUrl: 'gesture-password.html',
})

export class GesturePasswordPage extends BasePage {

  pwd: any;
  type = this.navParams.get('type') ? 'recorder' : 'check';
  back_ind = this.navParams.get('type');
  chance = AppConfig.gesture_num;
  // type = 'recorder';
  chance_ind = false;
  gesture_ind = this.navParams.get('gesture_ind');
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public utilProvider: UtilProvider,
    public viewCtrl: ViewController,
    private admUserProvider: AdmUserProvider) {

    super(navCtrl, viewCtrl, navParams, utilProvider);

    this.utilProvider.getItem(AppConfig.GESTURE_PASSWORD).subscribe((result) => {
      this.pwd = result;
    });
  }
  /**
   * 验证密码
   * @param e 数据
   */
  onChecked(e) {
    switch (e.err) {
      case ERR.NOT_ENOUGH_POINTS:
        this.utilProvider.toast('至少4个节点以上');
        break;
      case ERR.PASSWORD_MISMATCH:
        this.utilProvider.toast('密码不匹配');
        this.chance_ind = true;
        this.chance--;
        if (this.chance == 0) {
          this.dismiss();
          this.admUserProvider.logout();
        }
        break;
      default:
        this.utilProvider.toast('密码匹配');
        this.dismiss();
        break;
    }
  }
  /**
   * 第一次设置密码
   * @param e 数据
   */
  onBeforeRepeat(e) {
    switch (e.err) {
      case ERR.NOT_ENOUGH_POINTS:
        this.utilProvider.toast('至少4个节点以上');
        break;
      default:
        this.utilProvider.toast('请再次绘制相同图案');
        break;
    }
  }
  /**
   * 确认密码
   * @param e 数据
   */
  onAfterRepeat(e) {
    switch (e.err) {
      case ERR.NOT_ENOUGH_POINTS:
        this.utilProvider.toast('至少4个节点以上');
        break;
      case ERR.PASSWORD_MISMATCH:
        this.utilProvider.toast('两次密码不匹配');
        this.chance_ind = true;
        this.chance--;
        if (this.chance == 0) {
          this.dismiss();
        }
        break;
      default:
        this.utilProvider.toast('新密码已经生效');
        this.utilProvider.setItem(AppConfig.GESTURE_PASSWORD, e.result);
        this.dismiss(true);
        break;
    }
  }

  onError(e) {
  }


}
