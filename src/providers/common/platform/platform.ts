import { Injectable } from '@angular/core';
import { Platform, Tabs, App, NavController, Keyboard, AlertController } from 'ionic-angular';
import { UtilProvider } from "../util/util";
import { TransferObject, Transfer } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppConfig } from '../../../app/app.config';
import { SysReleaseVersion } from '../../../model/sys/sys-release-version';
@Injectable()
export class PlatformProvider {

  //控制硬件返回按钮是否触发，默认false
  backButtonPressed: boolean = false;

  constructor(private platform: Platform,
    public appCtrl: App,
    public keyboard: Keyboard,
    public alertCtrl: AlertController,
    private transfer: Transfer,
    private file: File,
    private inAppBrowser: InAppBrowser,
    private utilProvider: UtilProvider) {
  }

  aaa() {

    this.platform.ready().then(() => {
      if (this.keyboard.isOpen()) {
        document.body.classList.add('keyboard-is-open');
      } else {
        document.body.classList.remove('keyboard-is-open');
      }

    });
  }
  /**
     * 检查app是否需要升级
     */
  detectionUpgrade(list: Array<SysReleaseVersion>) {
    if (list && list[list.length - 1].ver_no != AppConfig.APP_VERSION) {
      this.alertCtrl.create({
        title: '升级',
        subTitle: '发现新版本,是否立即升级？',
        buttons: [{ text: '取消' },
        {
          text: '确定',
          handler: () => {
            this.downloadApp();
          }
        }
        ]
      }).present();
    }
  }

  /**
   * 下载安装app
   */
  downloadApp() {
    if (this.isAndroid()) {
      let alert = this.alertCtrl.create({
        title: '下载进度：0%',
        enableBackdropDismiss: false,
        buttons: ['后台下载']
      });
      alert.present();

      const fileTransfer: TransferObject = this.transfer.create();
      const apk = this.file.externalRootDirectory + 'android.apk'; //apk保存的目录

      fileTransfer.download(AppConfig.APK_DOWNLOAD, apk).then(() => {
        window['install'].install(apk.replace('file://', ''));
      });

      fileTransfer.onProgress((event: ProgressEvent) => {
        let num = Math.floor(event.loaded / event.total * 100);
        if (num === 100) {
          alert.dismiss();
        } else {
          let title = document.getElementsByClassName('alert-title')[0];
          title && (title.innerHTML = '下载进度：' + num + '%');
        }
      });
    }
    if (this.isIos()) {
      this.openUrlByBrowser(AppConfig.APP_DOWNLOAD);
    }
  }

  /**
   * 通过浏览器打开url
   */
  openUrlByBrowser(url: string): void {
    this.inAppBrowser.create(url, '_system');
  }
  /**
     * 是否真机环境
     * @return {boolean}
     */
  isMobile(): boolean {
    return this.platform.is('mobile') && !this.platform.is('mobileweb');
  }

  /**
   * 是否android真机环境
   * @return {boolean}
   */
  isAndroid(): boolean {
    return this.isMobile() && this.platform.is('android');
  }

  /**
   * 是否ios真机环境
   * @return {boolean}
   */
  isIos(): boolean {
    return this.isMobile() && (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'));
  }

  registerBackButtonAction(tabRef?: Tabs) {
    this.platform.ready().then((result) => {
      this.registerBackButton(tabRef);
    })
  }

  private registerBackButton(tabRef: Tabs): void {

    //registerBackButtonAction是系统自带的方法
    this.platform.registerBackButtonAction(() => {
      //获取NavController
      let activeNav: NavController = this.appCtrl.getActiveNav();
      //如果可以返回上一页，则执行pop
      if (activeNav.canGoBack()) {
        activeNav.pop();
      } else {
        if (tabRef == null || tabRef._selectHistory[tabRef._selectHistory.length - 1] === tabRef.getByIndex(0).id) {
          //执行退出
          this.showExit();
        } else {
          //选择首页第一个的标签
          tabRef.select(0);
        }
      }
    });
  }

  //退出应用方法
  private showExit(): void {
    //如果为true，退出
    if (this.backButtonPressed) {
      this.platform.exitApp();
    } else {
      //第一次按，弹出Toast
      this.utilProvider.toast('再按一次退出应用');
      //标记为true
      this.backButtonPressed = true;
      //两秒后标记为false，如果退出的话，就不会执行了
      setTimeout(() => this.backButtonPressed = false, 2000);
    }
  }
}
