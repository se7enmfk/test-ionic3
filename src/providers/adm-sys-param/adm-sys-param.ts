import { Injectable } from '@angular/core';
import { Api } from '../api/api';
import { Storage } from '@ionic/storage';
import { Constant } from '../../app/app.config';
import { HttpProvider } from '../http/http';

@Injectable()
export class AdmSysParamProvider {

  constructor(public api: Api,
    public http: HttpProvider,
    private storage: Storage) { }

  retrieveSysParamList() {
    this.api.post('adm/sysParamList', {}).then((data) => {
      this.storage.set(Constant.SYS_PARAM, data);
    });
    // this.http.post("adm/sysParamList",{}).then((result) => {
    //    console.log(result);
       
    // })
  }
}
