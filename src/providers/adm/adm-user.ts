import {Injectable} from '@angular/core';
import {HttpProvider, UtilProvider} from '../../providers/common/commonProviders';
import {AdmUser} from '../../model/adm/adm-user';
import {AppConfig} from '../../app/app.config';

@Injectable()
export class AdmUserProvider {
  _admUser: AdmUser;


  constructor(public http: HttpProvider, public utilProvider: UtilProvider) {
  }

  /**
   * 保存用户信息
   * @param admUser 实体
   */
  save(admUser: AdmUser) {
    admUser.mode_ = 'E';     //mode_为"E"，后台base方法会自动写入modify_by和modify_time
    return this.http.post('adm/user', admUser).map(data => {
      if (data) {
        this._admUser = Object.assign({}, this._admUser, admUser);    //重新赋值已更改的对象属性
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
  login(admUser: AdmUser) {
    admUser.user_code = admUser.user_code.toUpperCase();
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
  signUp(admUser: AdmUser) {
    if(null!=admUser.user_code){
    admUser.user_code = admUser.user_code.toUpperCase();
    }
    admUser.user_name = "aaa";
    admUser.active_ind = "Y";
    let seq = this.http.post('login/signUp', admUser);
    return seq;
  }

  /**
   * 账号重复校验
   * @param admUser 实体
   */
  repeatCheck(admUser:AdmUser) {
    admUser.user_code = admUser.user_code.toUpperCase();
    return this.http.post('login/repeatCheck', admUser).map(data => {
      if (data.entity==0) {
        return true;
      }
      return false;
    });
  }


  /**
   * 账号重复校验
   * @param admUser 实体
   */
  mobileRepeatCheck(admUser:AdmUser) {
    return this.http.post('login/mobileRepeatCheck', admUser).map(data => {
      if (data.entity==0) {
        return true;
      }
      return false;
    });
  }



  /**
   * 重置密码
   * @param admUser 实体
   */
  resetPassword(admUser:AdmUser) {
    return this.http.post('login/resetPassword', admUser).map(data => {
      console.log('fanhuisja');
      console.log(data);
      if (200==data.code) {
        return true;
      }
      return false;
    });
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
    this._admUser = null;
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
    // admUserAdvice.mode_ = 'E';     //mode_为"E"，后台base方法会自动写入modify_by和modify_time
    return this.http.post('adm/userAdvice', admUserAdvice).map(data => {
      if (data) {
        /*this._admUser = Object.assign({}, this._admUser, admUser);    //重新赋值已更改的对象属性
         this.utilProvider.setItem(AppConfig.SYS_USER, data.entity);*/
        return true;
      }
      return false;
    });
  }

}
