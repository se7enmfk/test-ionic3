import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ActionSheetController } from 'ionic-angular';
import { BasePage } from "../../pages";
import { UtilProvider, ValidateProvider } from '../../../providers/common/commonProviders';
import { AdmNoticeProvider } from '../../../providers/providers';
import { AdmNoticeUser } from '../../../model/adm/adm-notice-user';

@IonicPage()
@Component({
  selector: 'page-message-notice-user-detail',
  templateUrl: 'message-notice-user-detail.html',
})
export class MessageNoticeUserDetailPage extends BasePage {

  notice: AdmNoticeUser;

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public utilProvider: UtilProvider,
    public actionSheetCtrl: ActionSheetController,
    public admNoticeProvider: AdmNoticeProvider,
    public validateProvider: ValidateProvider) {

    super(navCtrl, viewCtrl, navParams, utilProvider);

  }

  //初始展示方法
  ionViewDidLoad() {
    //获取展示数据
    this.notice = this.navParams.data;

    //存储已读状态
    if ('N' == this.notice.isread_ind || null == this.notice.isread_ind) {
      //未读，存储为已读状态
      let admNoticeUser = {
        id: this.navParams.get('id'),
        isread_ind: 'Y'
      }
      this.admNoticeProvider.saveUserNotice(admNoticeUser).subscribe(data => {
      });
    }

  }

}
