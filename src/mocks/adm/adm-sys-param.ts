import {Injectable} from '@angular/core';
import {HttpProvider, UtilProvider} from '../../providers/common/commonProviders';
import {AppConfig} from '../../app/app.config';

@Injectable()
export class AdmSysParamProvider {

  _list: any;

  constructor(public http: HttpProvider, public utilProvider: UtilProvider) {

    this._list = [
      {param_type: 'GENDER', param_code: 'M', param_name: '男', param_ename: 'Male', parent_param_type: null, parent_param_code: null, show_order: '1', param_description: null},
      {param_type: 'GENDER', param_code: 'F', param_name: '女', param_ename: 'Female', parent_param_type: null, parent_param_code: null, show_order: '2', param_description: null},

      {param_type: 'BANK_CODE', param_code: 'PBC', param_name: '中国人民银行', param_ename: "The People's Bank of China", parent_param_type: null, parent_param_code: null, show_order: null, param_description: null},
      {param_type: 'BANK_CODE', param_code: 'CCB', param_name: '中国建设银行', param_ename: "China Constuction Bank", parent_param_type: null, parent_param_code: null, show_order: null, param_description: null},
      {param_type: 'BANK_CODE', param_code: 'ABC', param_name: '中国农业银行', param_ename: "Agricultural Bank of China", parent_param_type: null, parent_param_code: null, show_order: null, param_description: null},
      {param_type: 'BANK_CODE', param_code: 'ICBC', param_name: '中国工商银行', param_ename: "Industrial and Commercial Bank of China", parent_param_type: null, parent_param_code: null, show_order: null, param_description: null},
      {param_type: 'BANK_CODE', param_code: 'BOC', param_name: '中国银行', param_ename: "Bank of China", parent_param_type: null, parent_param_code: null, show_order: null, param_description: null},
      {param_type: 'BANK_CODE', param_code: 'CMBC', param_name: '中国民生银行', param_ename: "China Minsheng Banking", parent_param_type: null, parent_param_code: null, show_order: null, param_description: null},
      {param_type: 'BANK_CODE', param_code: 'CMB', param_name: '招商银行', param_ename: "China Merchants Bank", parent_param_type: null, parent_param_code: null, show_order: null, param_description: null},

      {param_type: 'NOTICE_TYPE', param_code: 'GROUP_PROFIT_LOSS', param_name: '组合盈亏通知', param_ename: "Notice For Group Profit Or Loss", parent_param_type: null, parent_param_code: null, show_order: null, param_description: null},
      {
        param_type: 'NOTICE_TYPE',
        param_code: 'GROUP_PROFIT_LOSS_TEST',
        param_name: '测试用组合盈亏通知',
        param_ename: "Test Using Notice For Group Profit Or Loss",
        parent_param_type: null,
        parent_param_code: null,
        show_order: null,
        param_description: null
      },
      {param_type: 'ITEM_TYPE', param_code: 'PROFIT_EXCEED', param_name: '盈利超过', param_ename: "Profit Exceed", parent_param_type: null, parent_param_code: null, show_order: null, param_description: null},
      {param_type: 'ITEM_TYPE', param_code: 'LOSS_EXCEED', param_name: '亏损超过', param_ename: "Loss Exceed", parent_param_type: null, parent_param_code: null, show_order: null, param_description: null},
    ]

  }



  /**
   * get All sys param
   */
  getSysParamList() {
    this._list = this._list;
    this.utilProvider.setItem(AppConfig.SYS_PARAM, this._list);
    /*this.http.post('adm/sysParamList').subscribe((data) => {
     this._list = data;
     this.utilProvider.setItem(AppConfig.SYS_PARAM, data);
     });*/
  }

  /**
   * get one sys param
   * @param param_type 类型
   * @param param_code 代码
   */
  getSysParam(param_type, param_code) {
    /*let list: any = this._list;
    list = (list || []).filter((data) => (data.param_type == param_type && data.param_code == param_code));
    return list[0] ? list[0].param_name : null;*/

    return this.utilProvider.getItem(AppConfig.SYS_PARAM).map((data) => {
      let list: any = this._list || data;
      list = (list || []).filter((data) => (data.param_type == param_type && data.param_code == param_code));
      return list[0] ? list[0].param_name : null;
    });
  }

  /**
   * 根据属性过滤，返回list
   * @param data 数据
   */
  getFilterList(data) {
    return this.utilProvider.getFilterList(this._list, data);
  };

}
