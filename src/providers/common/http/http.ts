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

    let options = { headers: { 'Authorization': 'Bearer ' + this._token } };

    url = url.indexOf('http') > 0 ? url : AppConfig.API_URL + url;

    return this.http.get(url, options)
      .map(res => this.extractData(res))
      .catch(err => this.catchError(err));
  }



  /**
  * post请求 默认application/json
  * @param url url地址
  * @param body 请求参数
  * @param reqOpts 请求配置
  */
  post(url: string, body?: any, reqOpts?: any) {

    let options = { headers: { 'Authorization': 'Bearer ' + this._token } };

    options = reqOpts ? reqOpts : options;

    url = url.indexOf('http') > 0 ? url : AppConfig.API_URL + url;

    return this.http.post(url, body, options)
      .map(res => this.extractData(res))
      .catch(err => this.catchError(err));
  }
  /**
    * 请求成功调用
    * @param result 请求结果
    */
  extractData(res: Response | any) {
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
  catchError(err: Response | any) {
    this.utilProvider.toast('err.badNet');
    return Observable.throw(err);
  }


  /**
  * post请求 默认application/json
  * @param url url地址
  * @param body 请求参数
  * @param reqOpts 请求配置
  */
  /*  post(url: string, body: any, reqOpts?: any) {

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

       return this.http.post(AppConfig.API_URL + url, body, options)
         .toPromise()
         .then(res => this.handleSuccess(res))
         .catch(err => this.handleError(err));
     });
   } */

  /**
   * 请求成功调用
   * @param result 请求结果
   */
  /*  private handleSuccess(result: Response | any) {
     if (result && result.success == 'false') {
       this.utilProvider.toast('无权限访问');
       return;
     }
     return result;
   } */

  /**
   * 请求失败调用
   * @param error 请求失败
   */
  /* private handleError(error: Response | any) {
    let msg: any;

    this.translateService.get('err.badNet').subscribe((value) => {
      msg = value;
    })
    if (msg)
      this.utilProvider.toast(msg);
  } */
}
