import { Injectable } from '@angular/core';
import { HttpProvider } from '../../common/commonProviders';
import { BaseObject } from '../../common/base-object';
import { UtilProvider } from '../../common/util/util';
import { AppConfig } from '../../../app/app.config';

@Injectable()
export class AdmSysParamProvider {

  list: AdmSysParam[];
  constructor(public http: HttpProvider, private utilProvider: UtilProvider) { }

  /**
   * get All sys param
   */
  getSysParamList() {
    this.http.post('adm/sysParamList').subscribe((data) => {
      this.list = data;
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
      let list: any = this.list || data;
      list = (list || []).filter((data) => (data.param_type == param_type && data.param_code == param_code));
      return list[0] ? list[0].param_name : null;
    });
  }

}

export class AdmSysParam extends BaseObject {
  param_type: string;
  param_code: string;
  param_name: string;
  param_ename: string;
  parent_param_type: string;
  parent_param_code: string;
  show_order: number;
  param_description: string;
}