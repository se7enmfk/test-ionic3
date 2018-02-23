import { NavController, NavParams, ViewController } from "ionic-angular";
import { UtilProvider } from "../providers/common/commonProviders";

export const FirstPage = 'LoginPage';
// export const FirstPage = 'TabsPage';
// export const FirstPage = 'AboutPage';
// export const FirstPage = 'SignUpPage';
//export const FirstPage = 'BankCardPage';

export class BasePage {

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public utilProvider: UtilProvider) {
  }
  /* 
   *  | `ionViewDidLoad`    | void                        | Runs when the page has loaded. This event only happens once per page being created. If a page leaves but is cached, then this event will not fire again on a subsequent viewing. The `ionViewDidLoad` event is good place to put your setup code for the page. |
   *  | `ionViewWillEnter`  | void                        | Runs when the page is about to enter and become the active page.                                                                                                                                                                                               |
   *  | `ionViewDidEnter`   | void                        | Runs when the page has fully entered and is now the active page. This event will fire, whether it was the first load or a cached page.                                                                                                                         |
   *  | `ionViewWillLeave`  | void                        | Runs when the page is about to leave and no longer be the active page.                                                                                                                                                                                         |
   *  | `ionViewDidLeave`   | void                        | Runs when the page has finished leaving and is no longer the active page.                                                                                                                                                                                      |
   *  | `ionViewWillUnload` | void                        | Runs when the page is about to be destroyed and have its elements removed.                                                                                                                                                                                     |
   *  | `ionViewCanEnter`   | boolean/Promise&lt;void&gt; | Runs before the view can enter. This can be used as a sort of "guard" in authenticated views where you need to check permissions before the view can enter                                                                                                     |
   *  | `ionViewCanLeave`   | boolean/Promise&lt;void&gt; | Runs before the view can leave. This can be used as a sort of "guard" in authenticated views where you need to check permissions before the view can leave                                                                                                     |
   */

  /**
   * 打开页面
   * @param page 跳转页面
   * @param params 页面参数
   */
  pushPage(page, params?: any) {
    // console.log(this);
    this.navCtrl.push(page, params);
  }

  /**
   * 关闭页面
   */
  popPage() {
    this.navCtrl.pop();
  }

  /**
   * 弹出modal页面
   * @param page 弹出页面
   * @param params 页面参数
   */
  showModal(page, params?: any) {
    return this.utilProvider.showModal(page, params);
  }

  /**
   * 关闭modal页面
   */
  dismiss(data?: any) {
    this.viewCtrl.dismiss(data);
  }
}
