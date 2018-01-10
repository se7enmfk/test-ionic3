import { HttpClient, HttpParams } from '@angular/common/http';
import { URLSearchParams } from '@angular/http';

import { Injectable, Injector } from '@angular/core';
import { Storage } from '@ionic/storage';
import { App } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { AppConfig } from '../../../app/app.config';
import { PopupProvider } from "../popup/popup";
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class HttpProvider {

  constructor(public http: HttpClient,
    private storage: Storage,
    private popup: PopupProvider,
    private translateService: TranslateService,
    protected injector: Injector,
    protected app: App) {
  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params.set(k, params[k]);
      }
    }

    return this.http.get(AppConfig.BASE_URL + endpoint, reqOpts)
      .toPromise()
      .catch(err => this.handleError(err));;
  }


  /**
   * post请求 默认application/json
   * @param url url地址
   * @param body 请求参数
   * @param reqOpts 请求配置
   */
  post(url: string, body: any, reqOpts?: any) {

    return this.storage.get(AppConfig.TOKEN).then(data => {

      let params = new URLSearchParams();
      for (let key in body)
        params.append(key, body[key]);

      let options = {
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Authorization': 'Bearer ' + data
        }
      };
      options = reqOpts ? reqOpts : options;

      return this.http.post(AppConfig.BASE_URL + url, body, options)
        .toPromise()
        .then(res => this.handleSuccess(res))
        .catch(err => this.handleError(err));
    });
  }

  /**
   * 请求成功调用
   * @param result 请求结果
   */
  private handleSuccess(result: Response | any) {
    if (result && result.success == 'false') {
      this.popup.toast('无权限访问');
      return;
    }
    return result;
  }

  /**
   * 请求失败调用
   * @param error 请求失败
   */
  private handleError(error: Response | any) {
    let msg: any;

    this.translateService.get('err.badNet').subscribe((value) => {
      msg = value;
    })
    if (msg)
      this.popup.toast(msg);
  }

}
