import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpProvider } from '../../common/commonProviders';

@Injectable()
export class AdmSysParamProvider {

  _sys_param: any;

  constructor(public http: HttpProvider,
    private storage: Storage) { }

  retrieveSysParamList() {
    this.http.post('adm/sysParamList', {}).then((data) => {
      this._sys_param = data;
    });
  }
}
