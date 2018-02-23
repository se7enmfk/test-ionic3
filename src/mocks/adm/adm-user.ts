import {Injectable} from '@angular/core';
import {HttpProvider, UtilProvider} from '../../providers/common/commonProviders';
import {AdmUser} from '../../model/adm/adm-user';
import {AppConfig} from '../../app/app.config';

@Injectable()
export class AdmUserProvider {
  _admUser: AdmUser;


  constructor(public http: HttpProvider, public utilProvider: UtilProvider) {

    this._admUser = {
      user_code: 'ADMIN',
      user_name: '郑宏智',
      passwd: 'fe185c2abb880b7bbdb6060713b41d90',
      pwd_exp_dt: null,
      email: '123456a21@qq.com',
      mobile: '13566666666',
      gender: 'M',
      login_tried: null,
      last_login_ts: '2018-01-31 09:44:53',
      active_ind: 'Y',
      create_ts: '2018-01-22 09:52:23',
      create_by: 'ADMIN',
      modify_ts: '2018-01-25 15:54:26',
      modify_by: 'ADMIN',
      gesture_ind: null,
      mode_: 'E',
      token: null,
      order_cause_: null,
      orderBy_: null,
      all_ind_: null
    }
  }

  /**
   * 保存用户信息
   * @param admUser 实体
   */
  save(admUser: AdmUser) {
    admUser.mode_ = 'E';     //mode_为"E"，后台base方法会自动写入modify_by和modify_time
    this._admUser = Object.assign({}, this._admUser, admUser);    //重新赋值已更改的对象属性
    this.utilProvider.setItem(AppConfig.SYS_USER, this._admUser);
    return this.utilProvider.createObservable(true);
    /*return true;*/
    /*return this.utilProvider.createObservable(true);*/

    /*return this.http.post('adm/user', admUser).map(data => {
     if (data) {
     this._admUser = Object.assign({}, this._admUser, admUser);    //重新赋值已更改的对象属性
     this.utilProvider.setItem(AppConfig.SYS_USER, this._admUser);
     return true;
     }
     return false;
     });*/
  }

  /**
   * 登录
   * @param admUser 实体
   */
  login(admUser: AdmUser) {
    admUser.user_code = admUser.user_code.toUpperCase();
    if (admUser.user_code == this._admUser.user_code||admUser.user_code==this._admUser.mobile) {
      if (admUser.passwd == this._admUser.passwd) {
        return this.utilProvider.createObservable(true);
        /*return true;*/
      } else {
        this.utilProvider.toast('密码错误，登录失败');
        return this.utilProvider.createObservable(false);
        /*return false;*/
      }
    } else {
      this.utilProvider.toast('账号输入错误，登录失败');
      return this.utilProvider.createObservable(false);
      /*return false;*/
    }
    /*return this.utilProvider.createObservable(true);*/
    /* return this.http.post('login/login', admUser).map((data) => {

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
     });*/
  }

  /**
   * 注册
   * @param admUser 实体
   */
  signUp(admUser: AdmUser) {
    admUser.user_code = admUser.user_code.toUpperCase();
    admUser.user_name = "aaa";
    admUser.active_ind = "Y";
    this._admUser = Object.assign({}, this._admUser, admUser);
    return this.utilProvider.createObservable(true);
    /*return true;*/

    /*let seq = this.http.post('login/signUp', admUser);
     return seq;*/
  }

  /**
   * 账号重复校验
   * @param admUser 实体
   */
  repeatCheck(admUser: AdmUser) {
    admUser.user_code = admUser.user_code.toUpperCase();
    if (admUser.user_code == this._admUser.user_code) {
      return this.utilProvider.createObservable(false);     //账号重复，不可以使用
    }
    return this.utilProvider.createObservable(true);      //账号唯一，可以使用
  }

  /**
   * 手机号重复校验
   * @param admUser 实体
   */
  mobileRepeatCheck(admUser: AdmUser) {
    if (admUser.mobile == this._admUser.mobile) {
      return this.utilProvider.createObservable(false);     //手机号已被注册，不可以使用
    }
    return this.utilProvider.createObservable(true);      //手机号未被注册，可以使用
  }

  /**
   * 重置密码
   * @param admUser 实体
   */
  resetPassword(admUser: AdmUser) {
    if (admUser.mobile == this._admUser.mobile) {
      this._admUser.passwd = admUser.passwd;
      return this.utilProvider.createObservable(true);
    } else {
    }
    return this.utilProvider.createObservable(false);
  }


  /**
   * 发送验证码
   * @param admUser 实体
   */
  getCode(admUser: AdmUser) {
    // let seq = this.http.post('login/signUp', admUser);
    return Promise.resolve(true);
  }

  /**
   * 登出
   */
  logout() {
    this.utilProvider.removeItem(AppConfig.SYS_USER);
    this.utilProvider.removeItem(AppConfig.TOKEN);
    this.utilProvider.removeItem(AppConfig.GESTURE_PASSWORD);
    this.utilProvider.showModal('LoginPage');
  }

  /**
   *
   * @param successCallBack
   * @param cancelCallBack
   */
  checkPassword(successCallBack?, cancelCallBack?) {

    let prompt = this.utilProvider.prompt("请输入密码", [
      {
        type: 'password',
        name: 'password',
        placeholder: '请输入密码',
        checked: false
      }], successCallBack, cancelCallBack);

  }


  /**
   * 保存用户反馈意见
   * @param admUserAdvice 实体
   */
  saveUserAdvice(admUserAdvice) {
    return this.utilProvider.createObservable(true);
    /*return true;*/

    /*return this.http.post('adm/userAdvice', admUserAdvice).map(data => {
     if (data) {
     /!*this._admUser = Object.assign({}, this._admUser, admUser);    //重新赋值已更改的对象属性
     this.utilProvider.setItem(AppConfig.SYS_USER, data.entity);*!/
     return true;
     }
     return false;
     });*/
  }

}
