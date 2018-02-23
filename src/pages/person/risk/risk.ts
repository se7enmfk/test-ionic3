import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {BasePage} from "../../pages";
import {UtilProvider} from '../../../providers/common/commonProviders';

/**
 * Generated class for the RiskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-risk',
  templateUrl: 'risk.html',
})
export class RiskPage extends BasePage {

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public navParams: NavParams,
              public utilProvider: UtilProvider) {
    super(navCtrl, viewCtrl, navParams, utilProvider);
  }

  save = function () {
    this.utilProvider.swal("测试完成");
    this.navCtrl.pop();
  }


/*ionViewDidLoad(){
 console.log('ionViewDidLoad RiskPage');
 }*/

}
