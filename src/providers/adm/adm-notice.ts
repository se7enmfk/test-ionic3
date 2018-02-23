import {Injectable} from '@angular/core';
import {HttpProvider, UtilProvider} from '../../providers/common/commonProviders';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AdmNoticeProvider {

  constructor(public http: HttpProvider, public utilProvider: UtilProvider) {
  }

  publicNoticeList: any;    //公告列表
  userNoticeList: any;       //通知列表
  messageCount: number;      //未读公告和通知总数
  settingNoticeList: any;        //通知开关状态列表
  noticeUsersetItemList: any;        //組合盈亏状态通知设定值列表


  /**
   * 获取組合盈亏状态通知设定值列表     //当前不考虑展示过去所设定的值
   * @param admNoticeUsersetItem 实体
   */
  getNoticeUsersetItemList(admNoticeUsersetItem) {
    return this.http.post('adm/noticeUsersetItemList', admNoticeUsersetItem).map(data => {
      console.log("什么值？");
      console.log(data);
      if (data.length > 0) {
        this.noticeUsersetItemList = data;
        return true;
      }
      return false;
    });
  }

  /**
   * 储存组合盈亏通知设定值
   * @param admNoticeUsersetItem 实体
   */
  saveNoticeUsersetItem(admNoticeUsersetItem,value1?,value2?) {
    admNoticeUsersetItem.item_type=value1;
    admNoticeUsersetItem.item_value=value2;
    return this.http.post('adm/saveNoticeUsersetItem', admNoticeUsersetItem).map(data => {
      if (1 == data.entity) {
        return true;
      }
      return false;
    });
  }


  /**
   * 获取设置通知开启与否状态列表
   * @param admNoticeUserset 实体
   */
  getSettingNoticeList(admNoticeUserset) {
    return this.http.post('adm/noticeUsersetList', admNoticeUserset).map(data => {
      if (data.length > 0) {
        this.settingNoticeList = data;
        this.settingNoticeList.forEach(data => {
          data.notice_yn_bl = 'Y' == data.notice_yn ? true : false;
        });
        return true;
      }
      return false;
    });
  }

  /**
   * 储存通知开关状态
   * @param admNoticeUserset 实体
   */
  saveNoticeStatus(admNoticeUserset,value1?) {
    if (null != value1) {
      admNoticeUserset.notice_yn = value1;
    }
    return this.http.post('adm/saveNoticeStatus', admNoticeUserset).map(data => {
      if (1 == data.entity) {
        return true;
      }
      return false;
    });
  }


  /**
   * 获取公告列表
   * @param admNoticePublic 实体
   */
  getPublicNoticeList(admNoticePublic) {
    return this.http.post('adm/noticePublicListIsRead', admNoticePublic).map(data => {
      if (data.length > 0) {
        this.publicNoticeList = data;

        return true;
      }
      return false;
    });
  }

  /**
   * 获取通知列表
   * @param admNoticeUser 实体
   */
  getUserNoticeList(admNoticeUser) {
    return this.http.post('adm/noticeUserList', admNoticeUser).map(data => {
      if (data.length > 0) {
        this.userNoticeList = data;
        return true;
      }
      return false;
    });
  }

  /**
   * 公告已读，进行记录
   * @param admNoticeRead 实体
   */
  savePublicNotice(admNoticeRead) {
    return this.http.post('adm/noticeRead', admNoticeRead).map(data => {
      if ('200' == data.code) {
        //修改前一页面为已读状态
        this.publicNoticeList.forEach(data => {
          if (admNoticeRead.notice_no == data.notice_no)
            data.isread_ind = 'Y';
        });
        this.setMsgCount();
        return true;
      }
      return false;
    });
  };

  /**
   * 通知已读，进行记录
   * @param admNoticeUser 实体
   */
  saveUserNotice(admNoticeUser) {
    return this.http.post('adm/noticeUser', admNoticeUser).map(data => {
      if ('200' == data.code) {
        //修改前一页面为已读状态
        this.userNoticeList.forEach(data => {
          if (admNoticeUser.id == data.id)
            data.isread_ind = 'Y';
        });
        this.setMsgCount();
        return true;
      }
      return false;
    });
  };

  /**
   * 初始化列表
   */
  initNoticeList() {
    let sub1 = this.getPublicNoticeList({});
    let sub2 = this.getUserNoticeList({});

    return Observable.forkJoin([sub1, sub2]).map((data: any) => {
      if (data[0] && data[1]) {
        this.setMsgCount();
        return true;
      }
    });
  }

  private setMsgCount() {
    this.messageCount = 0;

    //统计未读公告数量
    this.publicNoticeList.forEach(data => {
      if ('N' == data.isread_ind)
        this.messageCount += 1;
    });

    //统计未读公告数量
    this.userNoticeList.forEach(data => {
      if ('N' == data.isread_ind) {
        this.messageCount += 1;
      }
    });
  }
}
