import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { AppConfig } from '../../../app/app.config';
import { LoadingController, AlertController, ToastController, ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import swal from 'sweetalert2';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
// import 'rxjs/add/observable/interval';
// import 'rxjs/add/operator/scan';
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
   * http://ionicframework.com/docs/api/components/modal/ModalController/
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

  /**
   * 翻译
   * @param content 内容
   * @param content_body 内容中可换属性 
   */
  translate(content: string, content_body?: Object) {
    let msg: string;
    this.translateService.get(content, content_body).subscribe((data) => {
      msg = data || content;
    });
    return msg;
  }

  /**
   * get storage by key
   * @param key storage key
   */
  getItem(key: string) {
    return Observable.fromPromise(this.storage.get(key)).map((data) => {
      return data;
    })
  }
  /**
   * set storage
   * @param key storage key
   * @param value storage value
   */
  setItem(key: string, value: any) {
    this.storage.set(key, value);
  }
  /**
   * remove storage by key
   * @param key storage key 
   */
  removeItem(key: string) {
    this.storage.remove(key);
  }

  /**
   * 返回筛选后的list
   * @param list 待filter的list
   * @param filter filter对象
   */
  getFilterList(list: any, filter: object) {

    if (filter && Array.isArray(list)) {
      let filterKeys = Object.keys(filter);

      return list.filter(item =>
        filterKeys.reduce((memo, keyName) =>
          memo && item[keyName].toLowerCase() === filter[keyName].toLowerCase(), true));
    } else {
      return list;
    }
  }

  createObservable(data){
    return Observable.create(observer => {
      observer.next(data);
      observer.complete();
  });
  }
}
