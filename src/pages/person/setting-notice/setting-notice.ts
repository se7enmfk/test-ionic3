import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {BasePage} from '../../pages';
import {UtilProvider} from '../../../providers/common/commonProviders';
import {AppConfig} from '../../../app/app.config';
import {AdmNoticeProvider} from '../../../providers/providers';
import {AdmUserProvider} from '../../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-setting-notice',
  templateUrl: 'setting-notice.html',
})
export class SettingNoticePage extends BasePage {

  settingNoticeList: any;     //通知开关状态列表

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public navParams: NavParams,
              public admNoticeProvider: AdmNoticeProvider,
              public admUserProvider: AdmUserProvider,
              public utilProvider: UtilProvider) {
    super(navCtrl, viewCtrl, navParams, utilProvider);
  }


  ionViewDidEnter() {
    //获取通知设定状态列表
    let admNoticeUserset = {
      user_code: this.admUserProvider._admUser.user_code,
    };
    this.admNoticeProvider.getSettingNoticeList(admNoticeUserset).subscribe((data) => {
      if (data) {
        this.settingNoticeList = this.admNoticeProvider.settingNoticeList;
      }
    });
  }

//根据当前开关状态选择具体操作
  selecltOperation(r) {
    //当前通知开关为开启状态，闭合操作，直接存储开关状态
    if ('Y' == r.notice_yn) {
      this.freshNoticeStatus(r);
    } else {
      //当前开关为闭合状态，开启操作，跳转到设置界面
      this.goToDetailPage(r);
    }
  }


  /**
   * 跳转到相关页面
   */
  goToDetailPage(r) {
    //跳转到相关页面
    if ('group_profit_loss' == r.notice_type&&r.notice_yn_bl) {
      /*let dataSelectPageModal = this.showModal('SettingNoticeGroupPofitLossPage');*/
      this.pushPage('SettingNoticeGroupPofitLossPage');
    }
    if ('group_profit_loss_test' == r.notice_type) {
      this.utilProvider.swal("功能测试");
      //测试用通知开关，操作开关状态后进行的修改，保存开关状态
      if ('N' == r.notice_yn) {
        this.freshNoticeStatus(r);
      }
    }
  }


  /**
   * 更新当前页面开关状态
   */
  freshNoticeStatus(r) {
    this.settingNoticeList.forEach(data => {
      if (r.notice_type == data.notice_type) {
        data.notice_yn = r.notice_yn == 'Y' ? 'N' : 'Y';
        data.notice_yn_bl = r.notice_yn == 'Y' ? true : false;
      }
    });
    //存储并更新全局通知开关状态
    this.saveNoticeStatus(r);
  }

  /**
   * 存储通知开关状态
   */
  saveNoticeStatus(r) {
    this.admNoticeProvider.saveNoticeStatus(r).subscribe((data) => {
      if (data) {
        //开启通知结果
        this.utilProvider.toast('通知设定成功');
        //更新全局通知开关状态
        this.admNoticeProvider.settingNoticeList = this.settingNoticeList;
      }
    });
  }


}
