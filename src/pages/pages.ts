import { NavController, NavParams, ViewController } from "ionic-angular";
import { UtilProvider } from "../providers/common/commonProviders";

export const FirstPage = 'TabsPage';
// export const FirstPage = 'TabsPage';
// export const FirstPage = 'SignUpPage';

export class BasePage {

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public utilProvider: UtilProvider) {
  }
  /**
   * 打开页面
   * @param page 跳转页面
   * @param params 页面参数
   */
  pushPage(page, params?: any) {
    console.log(this);
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
    this.utilProvider.showModal(page, params);
  }

  /**
   * 关闭modal页面
   */
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
