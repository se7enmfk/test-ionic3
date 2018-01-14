import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { AppConfig } from '../../../app/app.config';
import { LoadingController, AlertController, ToastController, ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import swal from 'sweetalert2';
/*
 通用方法
*/
@Injectable()
export class FtxUtilProvider {

  constructor(public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
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
}
