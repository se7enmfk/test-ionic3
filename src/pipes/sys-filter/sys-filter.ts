import { Pipe, PipeTransform } from '@angular/core';
import { AdmSysParamProvider } from '../../providers/providers';
import { UtilProvider } from '../../providers/common/commonProviders';
import { AppConfig } from '../../app/app.config';

/**
 * 根据param_type和param_code返回param_name filter
 */
@Pipe({
  name: 'sysFilter',
})
export class SysFilterPipe implements PipeTransform {

  constructor(private admSysParamProvider: AdmSysParamProvider, private utilProvider: UtilProvider) { }

  transform(value: string, ...args) {

    return this.utilProvider.getItem(AppConfig.SYS_PARAM).map((data) => {

      let list: any;

      list = this.admSysParamProvider.list || data;

      list = list.filter((data) => (data.param_type == args[0] && data.param_code == value));

      return list[0].param_name;
    });
  }
}
