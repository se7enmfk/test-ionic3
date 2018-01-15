import { Injectable } from '@angular/core';
import { AppConfig } from '../../../app/app.config';
import { UtilProvider, HttpProvider } from '../../../providers/common/commonProviders';
import { BaseObject } from '../../../providers/common/base-object';

@Injectable()
export class AdmUserProvider {
  _admUser: AdmUser;

  constructor(public http: HttpProvider, public utilProvider: UtilProvider) {
    this._admUser = {
      "token": "eyJjdHkiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyXyI6IkFETUlOIiwiZXhwIjoxNTE2MDE3OTY4LCJpYXQiOjE1MTU5ODE5NjgsImp0aSI6ImQzMzQwMTA0LTExYTctNGZlYi04Mjc5LTVlZTlhOWU4MDEwNyJ9.3DVMHArvuz4MRYskIpi_mGWQpieiSKN9BckuVANsjeg",
      "order_cause_": null, "orderBy_": null, "mode_": "E",
      "all_ind_": null, "user_code": "ADMIN", "user_name":
        "ADMIN", "passwd": "fe185c2abb880b7bbdb6060713b41d90",
      "pwd_exp_dt": null, "email": null, "mobile": "admin", "gender": null,
      "login_tried": null, "last_login_ts": "2018-01-12 09:31:40", "active_ind": "Y",
      "create_ts": "2018-01-20 07:14:37", "create_by": null, "modify_ts": "2018-01-15 15:44:44",
      "gesture_ind": null,
      "modify_by": "ADMIN"
    };
  }

  /**
   * 保存用户信息
   * @param admUser 实体
   */
  save(admUser) {
    this._admUser = Object.assign({}, admUser, this._admUser);
    this.utilProvider.setItem(AppConfig.SYS_USER, this._admUser);
    return this.utilProvider.createObservable(true);
  }

  /**
   * 登录
   * @param admUser 实体
   */
  login(admUser: any) {

    this.utilProvider.setItem(AppConfig.SYS_USER, this._admUser);
    this.utilProvider.setItem(AppConfig.TOKEN, this._admUser.token);
    this.http._token = this._admUser.token;
    return this.utilProvider.createObservable(true);
  }

  /**
   * 注册
   * @param admUser 实体
   */
  signUp(admUser: any) {
    admUser.user_name = "aaa";
    admUser.active_ind = "Y";
    return this.utilProvider.createObservable(true);
  }

  /**
   * 发送验证码
   * @param admUser 实体
   */
  getCode(admUser) {
    // let seq = this.http.post('login/signUp', admUser);
    return Promise.resolve(true);
  }

  /**
   * 登出
   */
  logout() {
    this._admUser = null;
    this.utilProvider.removeItem(AppConfig.SYS_USER);
    this.utilProvider.removeItem(AppConfig.TOKEN);
    this.utilProvider.removeItem(AppConfig.GESTURE_PASSWORD);
    this.utilProvider.showModal('LoginPage');
  }
}

export class AdmUser extends BaseObject {
  user_code: string;
  user_name: string;
  passwd: any;
  pwd_exp_dt: string;
  email: string;
  mobile: string;
  gender: string;
  login_tried: number;
  last_login_ts: string;
  active_ind: string;
  create_ts: string;
  create_by: string;
  modify_ts: string;
  modify_by: string;
  gesture_ind: boolean;
}