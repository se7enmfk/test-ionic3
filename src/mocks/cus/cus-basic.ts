import {Injectable} from '@angular/core';
import {HttpProvider, UtilProvider} from '../../providers/common/commonProviders';
import {CusBasic} from '../../model/cus/cus-basic';
import {CusBindingBankcard} from '../../model/cus/cus-binding-bankcard';

@Injectable()
export class CusBasicProvider {

  _cus: CusBasic;
  _cusBindingBankcard: CusBindingBankcard;
  _cusBindingBankcardList: any;    //客户已绑定银行卡列表
  _conuntBlingCard: number;        //客户已绑定银行卡数量


  constructor(public http: HttpProvider, public utilProvider: UtilProvider) {
    this._cus = {
      cus_no: 'ADMIN',//'客户编号';
      cus_code: null,//'客户编号';
      cus_name: null,//'客户名称';
      user_code: 'ADMIN',//'用户账号';
      birthday: null,//'生日';
      gender: null,//'性别';
      id_type: null,//'证件类型';
      id_no: null,//'证件号码';
      cus_grade: null,//'客户等级';
      risk_rank: null,//'风险等级';
      risk_ts: null,//'风险测评时间';
      referee_no: null,//'推荐人编号';
      referee_desc: '123132',//'推荐人';
      referee_orgn: null,//'推荐机构';
      payment_passwd: 'fe185c2abb880b7bbdb6060713b41d90',//'交易密码';

      mode_: 'E',
      token: null,
      order_cause_: null,
      orderBy_: null,
      all_ind_: null,
      create_ts: '2018-01-22 09:52:23',
      create_by: 'ADMIN',
      modify_ts: '2018-01-25 15:54:26',
      modify_by: 'ADMIN',
    };

    this._cusBindingBankcard = {
      bankcard_code: '6222222222222222222',//'卡号';
      account_name: 'ADMIN12',//'户名';
      cus_no: 'ADMIN',//'客户编号';
      bank_code: 'PBC',//'银行代码';
      reserved_mobile: '13755555550',//'银行预留手机号';
      id_type: '身份证',//'证件类型';
      id_no: '442222222222222222',//'证件号码';
      opening_bank_code: null,//'开户行';
      opening_bank_name: null,//'开户行名称';
      valid_start_dt: null,//'有效期起';
      valid_end_dt: null,//'有效期至';
      valid_yn: null,//'是否有效';
      mode_: 'E',
      token: null,
      order_cause_: null,
      orderBy_: null,
      all_ind_: null,
      create_ts: '2018-01-22 09:52:23',
      create_by: 'ADMIN',
      modify_ts: '2018-01-25 15:54:26',
      modify_by: 'ADMIN',
    };

    this._cusBindingBankcardList = [
      {
        bankcard_code: "6222222222222222",
        account_name: "孔二文",
        cus_no: "ADMIN",
        bank_code: "PBC",
        reserved_mobile: "13522222221",
        id_type: "身份证",
        id_no: "414555555555555555",
        opening_bank_code: null,
        opening_bank_name: null,
        valid_start_dt: null,
        valid_end_dt: null,
        valid_yn: 'Y',
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
        bankcard_code: "6233333333333333",
        account_name: "孔二文",
        cus_no: "ADMIN",
        bank_code: "PBC",
        reserved_mobile: "13522222221",
        id_type: "身份证",
        id_no: "414555555555555555",
        opening_bank_code: null,
        opening_bank_name: null,
        valid_start_dt: null,
        valid_end_dt: null,
        valid_yn: 'Y',
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
        bankcard_code: "6244444444444444",
        account_name: "孔二文",
        cus_no: "ADMIN",
        bank_code: "PBC",
        reserved_mobile: "13522222221",
        id_type: "身份证",
        id_no: "414555555555555555",
        opening_bank_code: null,
        opening_bank_name: null,
        valid_start_dt: null,
        valid_end_dt: null,
        valid_yn: 'Y',
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
        bankcard_code: "6255555555555555",
        account_name: "孔二文",
        cus_no: "ADMIN",
        bank_code: "PBC",
        reserved_mobile: "13522222221",
        id_type: "身份证",
        id_no: "414555555555555555",
        opening_bank_code: null,
        opening_bank_name: null,
        valid_start_dt: null,
        valid_end_dt: null,
        valid_yn: 'Y',
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
        bankcard_code: "6888888888888888",
        account_name: "孔二文",
        cus_no: "ADMIN",
        bank_code: "PBC",
        reserved_mobile: "13522222221",
        id_type: "身份证",
        id_no: "414555555555555555",
        opening_bank_code: null,
        opening_bank_name: null,
        valid_start_dt: null,
        valid_end_dt: null,
        valid_yn: 'Y',
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

    this.countBlindCardNumber();
  }

  /**
   * 储存推荐人or更改交易密码等
   * @param cusBasic 实体
   */
  save(cusBasic: CusBasic) {
    cusBasic.mode_ = 'E';
    this._cus = Object.assign({}, this._cus, cusBasic);    //重新赋值已更改的对象属性
    return this.utilProvider.createObservable(true);
    /*return true;*/

    /*return this.http.post('cus/basic', cusBasic).map((data: any) => {
     if ('200' == data.code) {
     this._cus = Object.assign({}, this._cus, cusBasic);    //重新赋值已更改的对象属性
     return true;
     }
     return false;
     });*/
  }

  /**
   * 获取客户信息
   * @param cusBasic 实体
   */
  getCustomer(cusBasic?) {
    this._cus = this._cus;
    return this.utilProvider.createObservable(true);
    /*return true;*/
    /*return this.http.post('cus/basicOne', cusBasic).map((data: any) => {
     if ('200' == data.code) {
     this._cus = data.entity;
     return true;
     }
     return false;
     });*/
  }


  /**
   * 值写入provide实体
   * @param cusBindingBankcard 实体
   */
  saveBindingBankcard(cusBindingBankcard) {
    this._cusBindingBankcard = Object.assign({}, this._cusBindingBankcard, cusBindingBankcard);    //重新赋值已设置的对象属性
    return this.utilProvider.createObservable(true);
  };

  /**
   * 保存银行卡信息
   * @param cusBindingBankcard 实体
   */
  saveCardInfo(cusBindingBankcard) {
    this._cusBindingBankcard = Object.assign({}, this._cusBindingBankcard, cusBindingBankcard);    //重新赋值已设置的对象属性
    this._cusBindingBankcard.mode_ = 'E';     //mode_为"E"，后台base方法会自动写入modify_by和modify_time
    this._cusBindingBankcardList.push(this._cusBindingBankcard);
    this.countBlindCardNumber();
    return this.utilProvider.createObservable(true);
    /*return true;*/

    /*return this.http.post('cus/bindingBankcard', this._cusBindingBankcard).map(data => {
     if (data) {
     /!*this._admUser = Object.assign({}, this._admUser, admUser);    //重新赋值已更改的对象属性
     this.utilProvider.setItem(AppConfig.SYS_USER, data.entity);*!/
     return true;
     }
     return false;
     });*/
  };

  /**
   * 计算绑定银行卡的数量
   * @param cusBindingBankcard 实体
   */
  countBlindCardNumber() {
    this._conuntBlingCard=0;
    this._cusBindingBankcardList.forEach(data => {
          if(this._cus.cus_no==data.cus_no){
            this._conuntBlingCard+= 1;
          }
    });
    return this.utilProvider.createObservable(true);
    /*return true;*/
  };

}
