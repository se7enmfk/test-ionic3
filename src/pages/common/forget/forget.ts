import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { BasePage } from '../../pages';
import { UtilProvider } from '../../../providers/common/commonProviders';

@IonicPage()
@Component({
  selector: 'page-forget',
  templateUrl: 'forget.html',
})
export class ForgetPage extends BasePage {

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public utilProvider: UtilProvider) {
    super(navCtrl, viewCtrl, navParams, utilProvider);

  }
}
