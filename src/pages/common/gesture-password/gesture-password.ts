import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
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
  type = this.navParams.get('type') || 'check';
  chance = AppConfig.gesture_num;
  // type = 'recorder';
  chance_ind = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public utilProvider: UtilProvider,
    public viewCtrl: ViewController,
    private admUserProvider:AdmUserProvider,
    public storage: Storage) {

    super(navCtrl, viewCtrl, navParams, utilProvider);
    this.storage.get(AppConfig.GESTURE_PASSWORD).then((result) => {
      this.pwd = result;
    });
  }

  ionViewDidLoad() {

  }

  onError(e) {
  }
  
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
        this.storage.set(AppConfig.GESTURE_PASSWORD, e.result);
        this.dismiss();
        break;
    }
  }

}
