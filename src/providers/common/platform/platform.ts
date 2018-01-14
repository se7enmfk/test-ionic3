import { Injectable } from '@angular/core';
import { Platform, Tabs, App, NavController, Keyboard } from 'ionic-angular';
import { UtilProvider } from "../util/util";
@Injectable()
export class PlatformProvider {

  //控制硬件返回按钮是否触发，默认false
  backButtonPressed: boolean = false;

  constructor(private platform: Platform,
    public appCtrl: App,
    public keyboard: Keyboard,
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
  registerBackButtonAction(tabRef?: Tabs) {
    this.platform.ready().then((result) => {
      this.registerBackButton(tabRef);
    })
  }

  registerBackButton(tabRef: Tabs): void {

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
