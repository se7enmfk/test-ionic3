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
  url: string = AppConfig.URL;

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

    return this.http.get(this.url + '/' + endpoint, reqOpts)
      .toPromise()
      .catch(err => this.handleError(err));;
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
      options = reqOpts ? reqOpts : options;

      return this.http.post(this.url + '/' + endpoint, body, options)
        .toPromise()
        .then(this.extractData)
        .catch(err => this.handleError(err));
    });
  }

  private handleError(error: Response | any): Promise<any> {
    let msg: any;

    this.translateService.get('err.badNet').subscribe((value) => {
      msg = value;
    })

    if (error.status == 400) {
      this.app.getRootNav().push('login-default');
    }
    this.popup.toast(msg);
    return Promise.resolve();
  }

  private extractData(res: Response) {
    return res ? res : {};
  }
}
