import { HttpClient, HttpParams } from '@angular/common/http';
import { URLSearchParams } from '@angular/http';

import { Injectable, Injector } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController, App } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { AppConfig } from '../../../app/app.config';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = AppConfig.URL;

  constructor(public http: HttpClient,
    private storage: Storage,
    private toastCtrl: ToastController,
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

    return this.http.get(this.url + '/' + endpoint, reqOpts);
  }


  post(endpoint: string, body: any, reqOpts?: any) {

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
      return this.http.post(this.url + '/' + endpoint, body, options)
      // .map(this.extractData)
      .toPromise()
        .then(this.extractData)
        .catch(err => this.handleError(err));
    });
  }

  // private handleError(error: Response | any): Promise<any> {
  //   console.log(error);

  //   if (error.status == 200) {
  //     return Promise.resolve("success");
  //   }

  //   let msg = error.text ? error.json().message : '请求地址错误';

  //   if (error.status == 400) {
  //     // this.app.getActiveNav().push('login-default');
  //     this.app.getRootNav().push('login-default');
  //   }

  //   let toast = this.toastCtrl.create({
  //     message: msg,
  //     duration: 3000,
  //     position: 'top',
  //     cssClass: 'my-toast my-toast-error'
  //   });

  //   toast.present();

  //   return Promise.reject(msg);
  //   // return Observable.throw(msg);
  // } 
  
  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
  private extractData(res: Response) {
    return res ? res : {};
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }
}