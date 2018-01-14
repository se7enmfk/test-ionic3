import {Injectable} from '@angular/core';
import {LoadingController, AlertController, ToastController, ModalController} from 'ionic-angular';
import swal from 'sweetalert2';
import {TranslateService} from '@ngx-translate/core';

/**
 *  遮罩层服务
 *
 */
@Injectable()
export class PopupProvider {

  private load: any;

  constructor(public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              public modalCtrl: ModalController,
              public translateService: TranslateService) {
  }

  /**
   * alert弹窗
   * http://ionicframework.com/docs/api/components/alert/AlertController/
   */
  alert(content, callback = () => {
  }) {

    let alert = this.alertCtrl.create({
      title: '<span>提示</span>',
      message: '<div>' + content + '</div>',
      enableBackdropDismiss: false,
      cssClass: '',
      buttons: [
        {
          text: "好的",
          cssClass: 'pop_btn',
          handler: () => {
            if (callback != undefined && callback != null && typeof callback == 'function') {
              callback();
            }
          }
        }]
    });
    alert.present();
  }

  /**
   * 自定义alert弹窗-
   */
  alertDIY(obj, ok_callback: any = () => {
  }) {
    let confirm_diy = this.alertCtrl.create({
      title: obj.title || '<div class="content_img">提示</div>',
      subTitle: obj.subTitle,
      message: obj.content,
      cssClass: obj.cssClass,
      enableBackdropDismiss: false,  //是否点击背景关闭弹窗
      buttons: [
        {
          text: obj.okText || '确定',
          cssClass: 'pop_btn',
          handler: () => {
            if (ok_callback != undefined && ok_callback != null && typeof ok_callback == 'function') {
              ok_callback();
            }
          }
        }
      ]
    });
    confirm_diy.present();
  }

  /**
   * confirm确认框
   */
  confirm(content, ok_callback = () => {
  }) {
    let alert = this.alertCtrl.create({
      title: '<div class="content_img">提示</div>',
      subTitle: '',
      message: content,
      cssClass: '',
      enableBackdropDismiss: false,  //是否点击背景关闭弹窗
      buttons: [
        {
          text: '取消',
          role: 'cancel',
        },
        {
          text: '确定',
          cssClass: 'pop_btn',
          handler: () => {
            if (ok_callback != undefined && ok_callback != null && typeof ok_callback == 'function') {
              ok_callback();
            }
          }
        }
      ]
    });
    alert.present();
  }

  /**
   * 自定义confirm确认框
   */
  confirmDIY(obj, esc_callback: any = () => {
  }, ok_callback: any = () => {
  }) {
    let confirm_diy = this.alertCtrl.create({
      title: obj.title || '<div class="content_img"><img  src="assets/img/use_over.png" class="img"/></div>',
      subTitle: obj.subTitle || '',
      cssClass: obj.cssClass || '',
      message: '<div>' + obj.content + '</div>',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: obj.escText || '取消',
          handler: () => {
            if (esc_callback != undefined && esc_callback != null && typeof esc_callback == 'function') {
              esc_callback();
            }
          }
        },
        {
          text: obj.okText || '确定',
          cssClass: 'pop_btn',
          handler: () => {
            if (ok_callback != undefined && ok_callback != null && typeof ok_callback == 'function') {
              ok_callback();
            }
          }
        }
      ]
    });
    confirm_diy.present();
  }


  

  /**
   * 拨打号码弹窗
   */
  callPop(obj, esc_callback: any = () => {
  }, ok_callback: any = () => {
  }) {
    setTimeout(() => {//延迟几秒可以等html反应，这样获取的高度才准确
      let test = document.getElementsByClassName("pop_btn")[0];
      test.innerHTML = "<a href='tel:" + obj.tel + "'> 继续呼叫 </a>";
    }, 3);
    let confirm_diy = this.alertCtrl.create({
      title: obj.title || '<div class="content_img"><img  src="assets/img/use_over.png" class="img"/></div>',
      subTitle: obj.subTitle,
      cssClass: "call",
      message: '<div>' + obj.content + '</div>',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: obj.escText || '取消',
          handler: () => {
            if (esc_callback != undefined && esc_callback != null && typeof esc_callback == 'function') {
              esc_callback();
            }
          }
        },
        {
          text: obj.okText || '确定',
          cssClass: 'pop_btn',
          handler: () => {
            if (ok_callback != undefined && ok_callback != null && typeof ok_callback == 'function') {
              ok_callback();
            }
          }
        }
      ]
    });
    confirm_diy.present();
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

  showModal(page: String, params?: any) {
    this.modalCtrl.create(page, params).present();
  }
}
