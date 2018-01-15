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

  constructor(private admSysParamProvider: AdmSysParamProvider) { }

  transform(value: string, ...args) {
    return this.admSysParamProvider.getSysParam(args[0], value);
  }
}
