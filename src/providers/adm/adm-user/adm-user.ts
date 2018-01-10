import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../../../app/app.config';
import { HttpProvider, PopupProvider } from '../../common/commonProviders';

@Injectable()
export class AdmUserProvider {
  _admUser: { passwd: any, mode_: any };

  constructor(public http: HttpProvider,
    public popup: PopupProvider,
    private storage: Storage) { }

  save(admUser) {
    let seq = this.http.post('adm/user', admUser);
    seq.then((data: any) => {
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

    return new Promise((resolve) => {
      this.http.post('login/login', admUser).then((data: any) => {
 
        if (data) {
          if (data.code == '203') {
            resolve(false);
            this.popup.toast(data.msg)
          } else if (data.code == '204') {
            resolve(false);
            this.popup.toast(data.msg)
          } else {
            this._admUser = data.entity;
            this.storage.set(AppConfig.SYS_USER, data.entity);
            this.storage.set(AppConfig.TOKEN, data.entity.token);
            resolve(true);
          }
        }

      });
    })
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signUp(admUser: any) {
    admUser.user_name = "aaa";
    let seq = this.http.post('login/signUp', admUser);
    return seq;
  }
  getCode(admUser) {
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
