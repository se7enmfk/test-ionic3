import {Injectable} from '@angular/core';
import {AppConfig} from '../../../app/app.config';
import {HttpProvider, UtilProvider} from '../../common/commonProviders';

@Injectable()
export class AdmUserProvider {
  _admUser: any;

  constructor(public http: HttpProvider,
              public utilProvider: UtilProvider) {
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

  getCode(admUser) {
    // let seq = this.http.post('login/signUp', admUser);
    return Promise.resolve(true);
  }

  logout() {
    this._admUser = null;
    this.utilProvider.removeItem(AppConfig.SYS_USER);
    this.utilProvider.removeItem(AppConfig.TOKEN);
    this.utilProvider.removeItem(AppConfig.GESTURE_PASSWORD);
    this.utilProvider.showModal('LoginPage');
  }
}
