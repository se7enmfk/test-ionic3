import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { App } from 'ionic-angular';
import { AppConfig } from '../../../app/app.config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { UtilProvider } from "../util/util";

// import { URLSearchParams } from '@angular/http';

@Injectable()
export class HttpProvider {
  _token: any;
  constructor(public http: HttpClient,
    private utilProvider: UtilProvider,
    protected injector: Injector,
    protected app: App) {
    this.utilProvider.getItem(AppConfig.TOKEN).subscribe((data) => {
      this._token = data;
    });
  }

  /**
   * get请求
   * @param url  // like /a/b?c=1
   * @param reqOpts //请求配置
   */
  get(url: string, reqOpts?: any) {
    let options = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + this._token
      }
    };

    url = url.indexOf('http') > 0 ? url : AppConfig.API_URL + url;

    return this.http.get(url, options)
      .map(res => this.extractData(res))
      .catch(err => this.catchError(err));
  }



  /**
  * post请求 默认application/x-www-form-urlencoded
  * @param url url地址
  * @param body 请求参数
  * @param reqOpts 请求配置
  */
  post(url: string, body?: any, reqOpts?: any) {

    let options = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + this._token
      }
    };

    options = reqOpts ? reqOpts : options;

    url = url.indexOf('http') > 0 ? url : AppConfig.API_URL + url;

    return this.http.post(url, this.toQueryString(body), options)
      .map(res => this.extractData(res))
      .catch(err => this.catchError(err));
  }
  /**
    * 请求成功调用
    * @param result 请求结果
    */
  private extractData(res: Response | any) {
    if (res && res.success == 'false') {
      this.utilProvider.toast('无权限访问');
      return false;
    }
    return res;
  }
  /**
  * 请求失败调用
  * @param error 请求失败
  */
  private catchError(err: Response | any) {
    this.utilProvider.toast('err.badNet');
    return Observable.throw(err);
  }

  /**
   * json转换为&name=***
   * @param obj 数据
   */
  private toQueryString(obj) {
    let ret = [];
    for (let key in obj) {
      key = encodeURIComponent(key);
      let values = obj[key];
      if (values && values.constructor == Array) {//数组
        let queryValues = [];
        for (let i = 0, len = values.length, value; i < len; i++) {
          value = values[i];
          queryValues.push(this.toQueryPair(key, value));
        }
        ret = ret.concat(queryValues);
      } else { //字符串
        ret.push(this.toQueryPair(key, values));
      }
    }
    return ret.join('&');
  }

  /**
   * 
   * json转换为&name=***
   * @param key key
   * @param value value
   */
  private toQueryPair(key, value) {
    if (typeof value == 'undefined' || value == null) {
      return null;
    }
    return key + '=' + encodeURIComponent(value === null ? '' : String(value));
  }
}
