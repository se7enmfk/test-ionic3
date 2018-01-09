import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { ToastController, App } from 'ionic-angular'; 
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../../../app/app.config';

/*
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpProvider {

  constructor(public http: HttpClient,
    private storage: Storage,
    private toastCtrl: ToastController,
    protected injector: Injector,
    protected app: App) {
  }


  //region post请求
  post(endpoint: string, body: any, reqOpts?: any) {

    return this.storage.get(AppConfig.TOKEN).then(data => {

      let params = new URLSearchParams();
      for (let key in body)
        params.append(key, body[key]);

      let options = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Accept': 'application/x.drip.v2+json',
          'Authorization': 'Bearer ' + data
        }
      };

      let seq = this.http.post(AppConfig.URL + '/' + endpoint, params.toString(), options);

      // Observable.create((result) => {
      //    result.next();
      // });
      // seq.subscribe((res) => {

      // }, err => {
      //   console.error('ERROR', err);
      // });

      //return  this.http.post(AppConfig.URL + '/' + endpoint, params.toString(), options);

      return this.http.post(AppConfig.URL + '/' + endpoint, params.toString(), options)

        .subscribe((result) => {

        }, err => {
          console.error('ERROR', err);
        })
      // .toPromise()
      // .then(this.extractData);
      // .catch(err => this.handleError(err));
    });
    //  return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  }
  //endregion

  private extractData(res: Response) {
    return res ? res : {};
  }
}
