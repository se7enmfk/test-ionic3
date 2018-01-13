import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {BasePage} from "../../pages";
import {PopupProvider} from "../../../providers/common/popup/popup";

@IonicPage()
@Component({
  selector: 'page-person-detail',
  templateUrl: 'person-detail.html',
})
export class PersonDetailPage  extends BasePage {

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public navParams: NavParams,
              public popup: PopupProvider) {
    super(navCtrl, viewCtrl, navParams, popup);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonDetailPage');
  }

}
