import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../../../app/app.config';
import { PopupProvider } from '../../../providers/common/commonProviders';
import { ERR } from '../../../../node_modules/_ngx-gesture-password@1.0.1@ngx-gesture-password/components/interfaces/err';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';

/**
 * Generated class for the GesturePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gesture-password',
  templateUrl: 'gesture-password.html',
})

export class GesturePasswordPage {
  pwd: any;
  type = this.navParams.get('type') || 'check';
  chance = AppConfig.gesture_num;
  // type = 'recorder';
  chance_ind = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public popup: PopupProvider,
    public viewCtrl: ViewController,
    public storage: Storage) {

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
        this.popup.toast('至少4个节点以上');
        break;
      case ERR.PASSWORD_MISMATCH:
        this.popup.toast('密码不匹配');
        break;
      default:
        this.popup.toast('密码匹配');
        this.navCtrl.pop();
        break;
    }
  }
  onBeforeRepeat(e) {
    switch (e.err) {
      case ERR.NOT_ENOUGH_POINTS:
        this.popup.toast('至少4个节点以上');
        break;
      default:
        this.popup.toast('请再次绘制相同图案');
        break;
    }
  }
  onAfterRepeat(e) {
    switch (e.err) {
      case ERR.NOT_ENOUGH_POINTS:
        this.popup.toast('至少4个节点以上');
        break;
      case ERR.PASSWORD_MISMATCH:
        this.popup.toast('两次密码不匹配');
        this.chance_ind = true;
        this.chance--;
        if (this.chance == 0) {
          this.viewCtrl.dismiss();
          this.popup.showPage('LoginPage');
        }
        break;
      default:
        this.popup.toast('新密码已经生效');
        this.storage.set(AppConfig.GESTURE_PASSWORD, e.result);
        this.viewCtrl.dismiss();
        break;
    }
  }

}
