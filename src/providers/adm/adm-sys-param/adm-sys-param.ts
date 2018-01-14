import { Injectable } from '@angular/core';
import { HttpProvider } from '../../common/commonProviders';
import { BaseObject } from '../../common/base-object';
import { UtilProvider } from '../../common/util/util';
import { AppConfig } from '../../../app/app.config';

@Injectable()
export class AdmSysParamProvider {

  list: AdmSysParam[];
  constructor(public http: HttpProvider, private utilProvider: UtilProvider) { }

  retrieveSysParamList() {
    this.http.post('adm/sysParamList').subscribe((data) => {
      this.list = data;
      this.utilProvider.setItem(AppConfig.SYS_PARAM, data);
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