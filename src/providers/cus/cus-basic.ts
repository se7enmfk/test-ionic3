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

  }

  /**
   * 储存推荐人or更改交易密码等
   * @param cusBasic 实体
   */
  save(cusBasic: CusBasic) {
    cusBasic.mode_ = 'E';
    return this.http.post('cus/basic', cusBasic).map((data: any) => {
      if ('200' == data.code) {
        this._cus = Object.assign({}, this._cus, cusBasic);    //重新赋值已更改的对象属性
        return true;
      }
      return false;
    });
  }

  /**
   * 获取客户信息
   * @param cusBasic 实体
   */
  getCustomer(cusBasic) {
    return this.http.post('cus/basicOne', cusBasic).map((data: any) => {
      if ('200' == data.code) {
        this._cus = data.entity;
        return true;
      }
      return false;
    });
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
    return this.http.post('cus/bindingBankcard', this._cusBindingBankcard).map(data => {
      if (data) {
        return true;
      }
      return false;
    });
  };

  /**
   * 计算绑定银行卡的数量
   * @param cusBindingBankcard 实体
   */
  countBlindCardNumber() {
    let cusBindingBankcard = {
      bankcard_code: null,
      account_name: null,
      cus_no: this._cus.cus_no
    };
    return this.http.post('cus/countBindingBankcard', cusBindingBankcard).map(data => {
      console.log('guanjianshike');
      if (data > 0) {
        this._conuntBlingCard = data;
        return true;
      }
      this._conuntBlingCard = 0;
      return true;
    });
  };
}
