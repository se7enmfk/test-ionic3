import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, ActionSheetController} from 'ionic-angular';
import {BasePage} from "../../pages";
import {UtilProvider, ValidateProvider} from '../../../providers/common/commonProviders';
import { AdmNoticeProvider } from '../../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-message-notice-public',
  templateUrl: 'message-notice-public.html',
})
export class MessageNoticePublicPage extends BasePage {

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
  //进入页面必加载方法
  ionViewDidEnter() {
      this.noticeList = this.admNoticeProvider.publicNoticeList;
  }
}
