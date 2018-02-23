import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ActionSheetController } from 'ionic-angular';
import { BasePage } from "../../pages";
import { UtilProvider, ValidateProvider } from '../../../providers/common/commonProviders';
import { AdmNoticeProvider } from '../../../providers/providers';
import { AdmNoticePublic } from '../../../model/adm/adm-notice-public';


/**
 * Generated class for the MessageNoticePublicDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message-notice-public-detail',
  templateUrl: 'message-notice-public-detail.html',
})
export class MessageNoticePublicDetailPage extends BasePage {

  notice: AdmNoticePublic;

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public utilProvider: UtilProvider,
    public actionSheetCtrl: ActionSheetController,
    public admNoticeProvider: AdmNoticeProvider,
    public validateProvider: ValidateProvider) {

    super(navCtrl, viewCtrl, navParams, utilProvider);

  }

  ionViewDidLoad() {
    this.notice = this.navParams.data;

    //存储已读状态
    if ('N' == this.notice.isread_ind || null == this.notice.isread_ind) {
      //未读，存储为已读状态
      let admNoticeRead = {
        notice_no: this.navParams.get('notice_no'),
        isread_ind: 'Y'
      }
      this.admNoticeProvider.savePublicNotice(admNoticeRead).subscribe((data) => {
      });
    }

  }
}
