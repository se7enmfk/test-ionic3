import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Api } from '../../providers';
import { AppConfig } from '../../../app/app.config';

@Injectable()
export class AdmUserProvider {
  _user: any;

  constructor(public api: Api,
    private storage: Storage) { }


  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(admUser: any) {
    
    let seq = this.api.post('login/login', admUser);
    seq.then((data) => {
      this._loggedIn(data);
      this.storage.set(AppConfig.SYS_USER, data);
    });
    return seq;
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    let seq = this.api.post('signup', accountInfo);

    // seq.subscribe((res: any) => {
    //   // If the API returned a successful response, mark the user as logged in
    //   if (res.status == 'success') {
    //     this._loggedIn(res);
    //   }
    // }, err => {
    //   console.error('ERROR', err);
    // });

    return seq;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp.entity;
  }

}