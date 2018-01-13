import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {BasePage} from "../../pages";
import {PopupProvider} from "../../../providers/common/popup/popup";

/**
 * Generated class for the MessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage extends BasePage {

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public navParams: NavParams,
              public popup: PopupProvider) {
    super(navCtrl, viewCtrl, navParams, popup);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
  }

}
