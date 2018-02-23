import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, App} from 'ionic-angular';
import {AppConfig, ImageConfig} from '../../../app/app.config';
import {AdmUserProvider, AdmNoticeProvider, CusBasicProvider} from '../../../providers/providers';
import {UtilProvider} from '../../../providers/common/commonProviders';
import {BasePage} from '../../pages';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import {CusBasic} from '../../../model/cus/cus-basic';
import {AdmUser} from '../../../model/adm/adm-user';

@IonicPage()
@Component({
  selector: 'page-person',
  templateUrl: 'person.html',
})
export class PersonPage extends BasePage {
  messageCount: number;
  cardBlindNumber: number;
  user = {};
  cus = {};
  personHead = ImageConfig.personHead;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public navParams: NavParams,
              public utilProvider: UtilProvider,
              public app: App,
              public admNoticeProvider: AdmNoticeProvider,
              public cusBasicProvider: CusBasicProvider,
              private admUserProvider: AdmUserProvider) {
    super(navCtrl, viewCtrl, navParams, utilProvider);

  }

  ionViewDidLoad() {

    let sub1 = this.admNoticeProvider.initNoticeList();
    let sub2 = this.cusBasicProvider.countBlindCardNumber();

    Observable.forkJoin([sub1, sub2]).subscribe((data: any) => {
      if (data[0]) {
        this.messageCount = this.admNoticeProvider.messageCount;
      }
      if (data[1]) {
        this.cardBlindNumber = this.cusBasicProvider._conuntBlingCard;
      }
    });
  }

  ionViewDidEnter() {
    this.user = this.admUserProvider._admUser;
    this.cus = this.cusBasicProvider._cus;
    this.messageCount = this.admNoticeProvider.messageCount;
    this.cardBlindNumber = this.cusBasicProvider._conuntBlingCard;



  }

  /**
   * 下拉刷新
   * @param refresher refresh
   */
  doRefresh(refresher) {
    setTimeout(() => {
      refresher.complete();
      this.ionViewDidEnter();
    }, 2000);
  }


  /**
   * 登出
   */
  doLogout() {
    this.admUserProvider.logout();
    this.navCtrl.push('LoginPage');
  }
}
