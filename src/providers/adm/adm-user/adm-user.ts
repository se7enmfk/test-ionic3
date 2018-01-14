import { Injectable } from '@angular/core';
import { AppConfig } from '../../../app/app.config';
import { HttpProvider, UtilProvider } from '../../common/commonProviders';
import { BaseObject } from '../../common/base-object';

@Injectable()
export class AdmUserProvider {
  _admUser: AdmUser;

  constructor(public http: HttpProvider, public utilProvider: UtilProvider) {
  }

  /**
   * 保存用户信息
   * @param admUser 实体
   */
  save(admUser) {
    return this.http.post('adm/user', admUser).map(data => {
      if (data) {
        this._admUser = data.entity;
        this.utilProvider.setItem(AppConfig.SYS_USER, data.entity);
        return true;
      }
      return false;
    });
  }

  /**
   * 登录
   * @param admUser 实体
   */
  login(admUser: any) {

    return this.http.post('login/login', admUser).map((data) => {

      if (data) {
        if (data.code == '201') {
          this.utilProvider.toast(data.msg);
          return false;
        } else if (data.code == '202') {
          this.utilProvider.toast(data.msg);
          return false;
        } else if (data.code == '203') {
          this.utilProvider.toast(data.msg);
          return false;
        } else {
          this._admUser = data.entity;
          this.utilProvider.setItem(AppConfig.SYS_USER, data.entity);
          this.utilProvider.setItem(AppConfig.TOKEN, data.entity.token);
          this.http._token = data.entity.token;
          return true;
        }
      }
      return false;
    });

  }

  /**
   * 注册
   * @param admUser 实体
   */
  signUp(admUser: any) {
    admUser.user_name = "aaa";
    admUser.active_ind = "Y";
    let seq = this.http.post('login/signUp', admUser);
    return seq;
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
  gesture_ind:boolean;
}