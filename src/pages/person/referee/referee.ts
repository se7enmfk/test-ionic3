import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {BasePage} from "../../pages";
import { UtilProvider } from '../../../providers/common/commonProviders';

/**
 * Generated class for the RefereePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-referee',
  templateUrl: 'referee.html',
})
export class RefereePage extends BasePage {

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public navParams: NavParams,
              public utilProvider: UtilProvider) {
    super(navCtrl, viewCtrl, navParams, utilProvider);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RefereePage');
  }

}
