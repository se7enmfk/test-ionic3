import { Injectable } from '@angular/core'; 
import { Storage } from '@ionic/storage'; 
import { Api, HttpProvider } from '../../providers';
import { AppConfig } from '../../../app/app.config';

@Injectable()
export class AdmSysParamProvider 
{

  constructor(public api: Api,
    public http: HttpProvider,
    private storage: Storage) { }

  retrieveSysParamList() {
    this.api.post('adm/sysParamList', {}).then((data) => {
      this.storage.set(AppConfig.SYS_PARAM, data);
    });
    // this.http.post("adm/sysParamList",{}).then((result) => {
    //    console.log(result);
       
    // })
  }
}
