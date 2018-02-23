import { Injectable } from '@angular/core';
import { HttpProvider, UtilProvider } from '../../providers/common/commonProviders';
import { AppConfig } from '../../app/app.config';

@Injectable()
export class AdmSysParamProvider {

  constructor(public http: HttpProvider, public utilProvider: UtilProvider) {
    console.log('Hello AdmUserAdviceProvider Provider');
  }
  _list:any;
  /**
   * get All sys param
   */
  getSysParamList() {
    this.http.post('adm/sysParamList').subscribe((data) => {
      this._list = data;
      this.utilProvider.setItem(AppConfig.SYS_PARAM, data);
    });
  }

  /**
   * get one sys param
   * @param param_type 类型
   * @param param_code 代码
   */
  getSysParam(param_type, param_code) {

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
  }

}