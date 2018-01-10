import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../../../app/app.config';
import { HttpProvider } from '../../common/commonProviders';

@Injectable()
export class AdmUserProvider {
  _admUser: { passwd: any, mode_: any };

  constructor(public http: HttpProvider,
    private storage: Storage) { }

  save(admUser) {
    let seq = this.http.post('adm/user', admUser);
    seq.then((data) => {
      this._admUser = data.entity;
      this.storage.set(AppConfig.SYS_USER, data.entity);
    });
    return seq;
  }
  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(admUser: any) {

    let seq = this.http.post('login/login', admUser);
    seq.then((data) => {
      this._admUser = data.entity;
      this.storage.set(AppConfig.SYS_USER, data.entity);
      this.storage.set(AppConfig.TOKEN, data.entity.token);
    });
    return seq;
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signUp(admUser: any) {
    admUser.user_name="aaa";
    let seq = this.http.post('login/signUp', admUser);
    return seq;
  }
  getCode(admUser){
    // let seq = this.http.post('login/signUp', admUser);
    return Promise.resolve(true);
  }
  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._admUser = null;
  }
}
