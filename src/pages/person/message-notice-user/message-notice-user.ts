import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ActionSheetController } from 'ionic-angular';
import { BasePage } from "../../pages";
import { UtilProvider, ValidateProvider } from '../../../providers/common/commonProviders';
import { AdmNoticeProvider } from '../../../providers/providers';

/**
 * Generated class for the MessageNoticeUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message-notice-user',
  templateUrl: 'message-notice-user.html',
})
export class MessageNoticeUserPage extends BasePage{

  noticeList: any;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public navParams: NavParams,
              public utilProvider: UtilProvider,
              public actionSheetCtrl: ActionSheetController,
              public admNoticeProvider: AdmNoticeProvider,
              public validateProvider: ValidateProvider) {

    super(navCtrl, viewCtrl, navParams, utilProvider);
  }

  ionViewDidEnter() {
    this.noticeList = this.admNoticeProvider.userNoticeList;
  }
}
