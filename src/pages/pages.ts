
import { NavController, NavParams, ViewController } from "ionic-angular";
import { PopupProvider } from "../providers/common/popup/popup";

export const FirstPage = 'TabsPage';
// export const FirstPage = 'TabsPage';
// export const FirstPage = 'SignUpPage';

export class BasePage {

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public popup: PopupProvider) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  pushPage(page, params?: any) {
    this.navCtrl.push(page, params);
  }
  popPage() {
    this.navCtrl.pop();
  }
  showModal(page, params?: any) {
    this.popup.showModal(page, params);
  }
}
