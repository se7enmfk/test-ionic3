import {Injectable} from '@angular/core';
import {HttpProvider, UtilProvider} from '../../providers/common/commonProviders';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AdmNoticeProvider {

  publicNoticeList: any;    //公告列表
  userNoticeList: any;       //通知列表
  messageCount: number;      //未读公告和通知总数
  settingNoticeList: any;        //通知开关状态列表
  noticeUsersetItemList: any;        //組合盈亏状态通知设定值列表

  constructor(public http: HttpProvider, public utilProvider: UtilProvider) {
    this.publicNoticeList = [
      {
        notice_no: "0001",
        visible_level: "1L",
        notice_type: "资讯",
        notice_title: "测试用公告",
        start_ts: "2018-01-23 14:09:35",
        end_ts: null,
        from_code: null,
        from_name: "上海财经",
        skip_ind: null,
        remove_ind: null,
        notice_content: "测试用的：这是一则公告！",
        notice_link: null,
        isread_ind: 'N',
        mode_: 'E',
        token: null,
        order_cause_: null,
        orderBy_: null,
        all_ind_: null,
        create_ts: '2018-01-22 09:52:23',
        create_by: 'ADMIN',
        modify_ts: '2018-01-25 15:54:26',
        modify_by: 'ADMIN',
      },
      {
        notice_no: "0002",
        visible_level: "1L",
        notice_type: "资讯",
        notice_title: "关于2018年元旦公司放假安排的公告",
        start_ts: "2018-01-23 14:09:47",
        end_ts: null,
        from_code: null,
        from_name: "上海财经",
        skip_ind: null,
        remove_ind: null,
        notice_content: "测试用的：这是一则公告！",
        notice_link: null,
        isread_ind: 'N',
        mode_: 'E',
        token: null,
        order_cause_: null,
        orderBy_: null,
        all_ind_: null,
        create_ts: '2018-01-22 09:52:23',
        create_by: 'ADMIN',
        modify_ts: '2018-01-25 15:54:26',
        modify_by: 'ADMIN',
      },
      {
        notice_no: "0003",
        visible_level: "1L",
        notice_type: "资讯",
        notice_title: "关于中国农业银行接口维护的公告",
        start_ts: "2018-01-23 14:09:50",
        end_ts: null,
        from_code: null,
        from_name: "上海财经",
        skip_ind: null,
        remove_ind: null,
        notice_content: "测试用的：这是一则公告！",
        notice_link: null,
        isread_ind: 'Y',
        mode_: 'E',
        token: null,
        order_cause_: null,
        orderBy_: null,
        all_ind_: null,
        create_ts: '2018-01-22 09:52:23',
        create_by: 'ADMIN',
        modify_ts: '2018-01-25 15:54:26',
        modify_by: 'ADMIN',
      },
      {
        notice_no: "0004",
        visible_level: "1L",
        notice_type: "资讯",
        notice_title: "迎新年，贺新春 活动获奖名单",
        start_ts: "2018-01-23 14:09:53",
        end_ts: null,
        from_code: null,
        from_name: "上海财经",
        skip_ind: null,
        remove_ind: null,
        notice_content: "测试用的：这是一则公告！",
        notice_link: null,
        isread_ind: 'N',
        mode_: 'E',
        token: null,
        order_cause_: null,
        orderBy_: null,
        all_ind_: null,
        create_ts: '2018-01-22 09:52:23',
        create_by: 'ADMIN',
        modify_ts: '2018-01-25 15:54:26',
        modify_by: 'ADMIN',
      },
      {
        notice_no: "0005",
        visible_level: "1L",
        notice_type: "资讯",
        notice_title: "APP新功能上线提醒",
        start_ts: "2018-01-23 14:09:55",
        end_ts: null,
        from_code: null,
        from_name: "上海财经",
        skip_ind: null,
        remove_ind: null,
        notice_content: "测试用的：这是一则公告！",
        notice_link: null,
        isread_ind: 'Y',
        mode_: 'E',
        token: null,
        order_cause_: null,
        orderBy_: null,
        all_ind_: null,
        create_ts: '2018-01-22 09:52:23',
        create_by: 'ADMIN',
        modify_ts: '2018-01-25 15:54:26',
        modify_by: 'ADMIN',
      },
    ];

    this.userNoticeList = [
      {
        id: "0",
        user_code: "0001",
        cus_no: "0001",
        pfl_no: null,
        notice_type: "交易",
        notice_title: "天弘基金申购份额确认提醒",
        notice_dt: "2018-01-23",
        skip_ind: null,
        remove_ind: null,
        notice_content: "001测试用的：这是一则通知！",
        notice_link: null,
        isread_ind: 'N',
        read_ts: null,
        mode_: 'E',
        token: null,
        order_cause_: null,
        orderBy_: null,
        all_ind_: null,
        create_ts: '2018-01-22 09:52:23',
        create_by: 'ADMIN',
        modify_ts: '2018-01-25 15:54:26',
        modify_by: 'ADMIN',
      },
      {
        id: "1",
        user_code: "0002",
        cus_no: "0002",
        pfl_no: null,
        notice_type: "财务",
        notice_title: "理财红包到期提醒",
        notice_dt: "2018-01-23",
        skip_ind: null,
        remove_ind: null,
        notice_content: "002测试用的：这是一则通知！",
        notice_link: null,
        isread_ind: 'N',
        read_ts: null,
        mode_: 'E',
        token: null,
        order_cause_: null,
        orderBy_: null,
        all_ind_: null,
        create_ts: '2018-01-22 09:52:23',
        create_by: 'ADMIN',
        modify_ts: '2018-01-25 15:54:26',
        modify_by: 'ADMIN',
      },
      {
        id: "2",
        user_code: "0003",
        cus_no: "0003",
        pfl_no: null,
        notice_type: "资金",
        notice_title: "生日礼包到账提醒",
        notice_dt: "2018-01-23",
        skip_ind: null,
        remove_ind: null,
        notice_content: "003测试用的：这是一则通知！",
        notice_link: null,
        isread_ind: 'N',
        read_ts: null,
        mode_: 'E',
        token: null,
        order_cause_: null,
        orderBy_: null,
        all_ind_: null,
        create_ts: '2018-01-22 09:52:23',
        create_by: 'ADMIN',
        modify_ts: '2018-01-25 15:54:26',
        modify_by: 'ADMIN',
      },
      {
        id: "3",
        user_code: "0004",
        cus_no: "0004",
        pfl_no: null,
        notice_type: "交易",
        notice_title: "华夏成长赎回到账提醒",
        notice_dt: "2018-01-23",
        skip_ind: null,
        remove_ind: null,
        notice_content: "004测试用的：这是一则通知！",
        notice_link: null,
        isread_ind: 'N',
        read_ts: null,
        mode_: 'E',
        token: null,
        order_cause_: null,
        orderBy_: null,
        all_ind_: null,
        create_ts: '2018-01-22 09:52:23',
        create_by: 'ADMIN',
        modify_ts: '2018-01-25 15:54:26',
        modify_by: 'ADMIN',
      },
      {
        id: "4",
        user_code: "0005",
        cus_no: "0005",
        pfl_no: null,
        notice_type: "交易",
        notice_title: " 测试用标题",
        notice_dt: "2018-01-23",
        skip_ind: null,
        remove_ind: null,
        notice_content: "005测试用的：这是一则通知！",
        notice_link: null,
        isread_ind: 'Y',
        read_ts: null,
        mode_: 'E',
        token: null,
        order_cause_: null,
        orderBy_: null,
        all_ind_: null,
        create_ts: '2018-01-22 09:52:23',
        create_by: 'ADMIN',
        modify_ts: '2018-01-25 15:54:26',
        modify_by: 'ADMIN',
      },
    ]

    this.settingNoticeList = [
      {
        user_code: "ADMIN",
        notice_type: "group_profit_loss",
        notice_yn: 'N',
        notice_yn_bl: false,

        mode_: 'E',
        token: null,
        order_cause_: null,
        orderBy_: null,
        all_ind_: null,
        create_ts: '2018-01-22 09:52:23',
        create_by: 'ADMIN',
        modify_ts: '2018-01-25 15:54:26',
        modify_by: 'ADMIN',
      },
      {
        user_code: "ADMIN",
        notice_type: "group_profit_loss_test",
        notice_yn: 'N',
        notice_yn_bl: false,

        mode_: 'E',
        token: null,
        order_cause_: null,
        orderBy_: null,
        all_ind_: null,
        create_ts: '2018-01-22 09:52:23',
        create_by: 'ADMIN',
        modify_ts: '2018-01-25 15:54:26',
        modify_by: 'ADMIN',
      },
    ]

    this.noticeUsersetItemList = [
      {
        user_code: "ADMIN",
        notice_type: "group_profit_loss",
        item_type: "profit_exceed",
        item_value: "10",

        mode_: 'E',
        token: null,
        order_cause_: null,
        orderBy_: null,
        all_ind_: null,
        create_ts: '2018-01-22 09:52:23',
        create_by: 'ADMIN',
        modify_ts: '2018-01-25 15:54:26',
        modify_by: 'ADMIN',
      },
      {
        user_code: "ADMIN",
        notice_type: "group_profit_loss",
        item_type: "loss_exceed",
        item_value: "10",

        mode_: 'E',
        token: null,
        order_cause_: null,
        orderBy_: null,
        all_ind_: null,
        create_ts: '2018-01-22 09:52:23',
        create_by: 'ADMIN',
        modify_ts: '2018-01-25 15:54:26',
        modify_by: 'ADMIN',
      },
    ]

    this.setMsgCount();
  }


  /**
   * 获取組合盈亏状态通知设定值列表
   * @param admNoticeUsersetItem 实体
   */
  getNoticeUsersetItemList(admNoticeUsersetItem?) {
    this.noticeUsersetItemList = this.noticeUsersetItemList;
    return this.utilProvider.createObservable(true);
    /*return true;*/
    /*
     return this.http.post('adm/noticeUsersetItemList', admNoticeUsersetItem).map(data => {
     if (data.length > 0) {
     this.noticeUsersetItemList = data;
     return true;
     }
     return false;
     });
     */
  }

  /**
   * 储存组合盈亏通知设定值
   * @param admNoticeUsersetItem 实体
   */
  saveNoticeUsersetItem(admNoticeUsersetItem, value1?, value2?) {
    admNoticeUsersetItem.item_type = value1;
    admNoticeUsersetItem.item_value = value2;
    this.noticeUsersetItemList.forEach(data => {
      if (admNoticeUsersetItem.item_type == data.item_type) {
        data.item_value = admNoticeUsersetItem.item_value;
        console.log('nandaomeidaoz?');
      }
    });
    return this.utilProvider.createObservable(true);
    /*return false;*/
    /*
     return this.http.post('adm/saveNoticeUsersetItem', admNoticeUsersetItem).map(data => {
     if (1 == data.entity) {
     return true;
     }
     return false;
     });
     */
  }


  /**
   * 获取设置通知开启与否状态列表
   * @param admNoticeUserset 实体
   */
  getSettingNoticeList(admNoticeUserset?) {
    this.settingNoticeList = this.settingNoticeList;
    this.settingNoticeList.forEach(data => {
      data.notice_yn_bl = 'Y' == data.notice_yn ? true : false;
    });
    return this.utilProvider.createObservable(true);
    /*return true;*/
    /*
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
     */
  }

  /**
   * 储存通知开关状态
   * @param admNoticeUserset 实体
   */
  saveNoticeStatus(admNoticeUserset?, value1?) {

    if (null != value1) {
      admNoticeUserset.notice_yn = value1;
    }
    this.settingNoticeList.forEach(data => {
      if (admNoticeUserset.notice_type == data.notice_type) {
        data.notice_yn = admNoticeUserset.notice_yn;
      }
    });
    return this.utilProvider.createObservable(true);
    /*return true;*/
    /*
     return this.http.post('adm/saveNoticeStatus', admNoticeUserset).map(data => {
     if (1 == data.entity) {
     return true;
     }
     return false;
     });
     */
  }


  /**
   * 获取公告列表
   * @param admNoticePublic 实体
   */
  getPublicNoticeList(admNoticePublic) {
    this.publicNoticeList = this.publicNoticeList;
    return this.utilProvider.createObservable(true);
    /*return true;*/

    /*
     return this.http.post('adm/noticePublicListIsRead', admNoticePublic).map(data => {
     if (data.length > 0) {
     this.publicNoticeList = data;

     return true;
     }
     return false;
     });
     */
  }

  /**
   * 获取通知列表
   * @param admNoticeUser 实体
   */
  getUserNoticeList(admNoticeUser) {
    this.userNoticeList = this.userNoticeList;
    return this.utilProvider.createObservable(true);
    /*return true;*/
    /*
     return this.http.post('adm/noticeUserList', admNoticeUser).map(data => {
     if (data.length > 0) {
     this.userNoticeList = data;
     return true;
     }
     return false;
     });
     */
  }

  /**
   * 公告已读，进行记录
   * @param admNoticeRead 实体
   */
  savePublicNotice(admNoticeRead) {
    //修改前一页面为已读状态
    this.publicNoticeList.forEach(data => {
      if (admNoticeRead.notice_no == data.notice_no)
        data.isread_ind = 'Y';
    });
    this.setMsgCount();
    return this.utilProvider.createObservable(true);
    /*return true;*/

    /*
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
     */
  };

  /**
   * 通知已读，进行记录
   * @param admNoticeUser 实体
   */
  saveUserNotice(admNoticeUser) {
    //修改前一页面为已读状态
    this.userNoticeList.forEach(data => {
      if (admNoticeUser.id == data.id)
        data.isread_ind = 'Y';
    });
    this.setMsgCount();
    return this.utilProvider.createObservable(true);
    /*return true;*/

    /*
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
     */
  };

  /**
   * 初始化列表
   */
  initNoticeList() {
    let sub1 = this.getPublicNoticeList({});
    let sub2 = this.getUserNoticeList({});

    return this.utilProvider.createObservable(Observable.forkJoin([sub1, sub2]).map((data: any) => {
      if (data[0] && data[1]) {
        this.setMsgCount();
        /*return this.utilProvider.createObservable(true);*/
        return true;
      }
    }));

    /*return Observable.forkJoin([sub1, sub2]).map((data: any) => {
     if (data[0] && data[1]) {
     this.setMsgCount();
     return this.utilProvider.createObservable(true);
     /!*return true;*!/
     }
     });*/
  }

  /**
   * 计算未读公告及通知总数量
   */
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
