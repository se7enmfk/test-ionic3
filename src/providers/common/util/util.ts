import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { AppConfig } from '../../../app/app.config';
import { LoadingController, AlertController, ToastController, ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import swal from 'sweetalert2';
import { Storage } from '@ionic/storage';
/*
 通用方法
*/
@Injectable()
export class UtilProvider {

  private load: any;

  constructor(public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public storage: Storage,
    public translateService: TranslateService) {
  }

  /**
   * md5加密
   * @param remark 备注
   */
  make(remark) {
    return Md5.hashStr(Md5.hashStr(remark + AppConfig.SYS_NAME + remark.substring(-3)) + AppConfig.SYS_NAME + remark.substring(-3));
  }


  /**
   * swalalert2弹出信息
   * @param {string} title  //
   * @param {string} type   //'success' | 'error' | 'warning' | 'info' | 'question'
   * @param {string} timer
   */
  swal(title: string, type: any = 'success', timer: number = 2000) {
    return swal({
      title: title,
      type: type,
      timer: timer,
      showConfirmButton: false,
      width: '80%'
    });
  }

  /**
   * 弹出框
   * @param page 页面
   * @param params 页面参数
   */
  showModal(page: String, params?: any) {
    this.modalCtrl.create(page, params).present();
  }
  /**
   * toast短暂提示   (支持自定义)
   * http://ionicframework.com/docs/api/components/toast/ToastController/
   * @param {string} content
   * @param {string} cssClass
   * @param {string} position    //"top", "middle", "bottom".
   * @param {number} duration
   */
  toast(content: string, content_body?: Object, cssClass: string = 'toast-content', position: string = 'middle', duration: number = 2000) {

    let toast = this.toastCtrl.create({
      message: this.translate(content, content_body),
      duration: duration,
      position: position,
      cssClass: cssClass,
      showCloseButton: false,
      closeButtonText: "关闭",
      dismissOnPageChange: true,     //当页面变化时是否dismiss
    });
    toast.onDidDismiss(() => {
    });
    toast.present();
  }

  /**
  * loading加载动画
  * http://ionicframework.com/docs/api/components/loading/LoadingController/
  * @param {string} op       // 取值：open hide
  * @param {string} content
  * @param {string} spinner    动画SVG  // 取值：ios ios-small bubbles circles crescent dots
  * @param {string} css
  * @param {boolean} showBackdrop    是否有黑色遮罩
  */
  loading(op: string, content: string = '', spinner: string = 'ios-small', css: string = '', showBackdrop: boolean = true) {
    if (op == 'hide') {
      if (this.load) {
        this.load.dismiss();
      }
    } else {
      this.load = this.loadingCtrl.create({
        spinner: spinner,
        content: this.translate(content),
        cssClass: css,
        showBackdrop: showBackdrop,      //是否有黑色遮罩
        enableBackdropDismiss: false,
        dismissOnPageChange: false,
        // duration:3000
      });
      this.load.present();
      setTimeout(() => {
        this.load.dismiss();
      }, 10000);
    }
    this.load.onDidDismiss(() => {
      console.log('Dismissed loading');
    });
  }

  translate(content: string, content_body?: Object) {
    let msg: string;
    this.translateService.get(content, content_body).subscribe((data) => {
      msg = data || content;
    });
    return msg;
  }

  getItem(key: string) {
    return new Promise((resolve, reject) => {
      this.storage.get(key).then((data) => {
        return resolve(data);
      })
    });
  }
  setItem(key: string, value: any) {
    this.storage.set(key, value);
  }
  removeItem(key: string) {
    this.storage.remove(key);
  }
}
