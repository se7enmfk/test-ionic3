import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../../../app/app.config';
import { AdmUserProvider } from '../../../providers/providers';
import { UtilProvider } from '../../../providers/common/commonProviders';
import { BasePage } from '../../pages';

@IonicPage()
@Component({
  selector: 'page-person',
  templateUrl: 'person.html',
})
export class PersonPage extends BasePage {
  messageCount = 10;
  user = {};

  web_url = AppConfig.WEB_URL;

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public utilProvider: UtilProvider,
    private admUserProvider: AdmUserProvider,
    private storage: Storage) {
    super(navCtrl, viewCtrl, navParams, utilProvider);
  }

  ionViewDidLoad() {

    this.storage.get(AppConfig.SYS_USER).then((data) => {
      if (!data) {
        this.showModal('LoginPage');
      }
    })
  }

  doRefresh(refresher) {
    setTimeout(() => {
      refresher.complete();
      this.ionViewDidLoad();
    }, 2000);
  }
  

  doLogout() {
    this.admUserProvider.logout();
  }
}
