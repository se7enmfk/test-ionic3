import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../../../app/app.config';
import { AdmUserProvider } from '../../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-person',
  templateUrl: 'person.html',
})
export class PersonPage {
  messageCount = 10;
  user = {};

  constructor(public navCtrl: NavController,
    public admUserProvider: AdmUserProvider,
    public storage: Storage,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.storage.get(AppConfig.SYS_USER).then((data) => {
      this.user = data;
    })

    console.log(this.user);

  }
  doRefresh(refresher) {

    this.ionViewDidLoad();

    setTimeout(() => {
        refresher.complete();
    }, 2000);
}
  personDetail(type) {
    this.navCtrl.push('PersonDetailPage', { type: type });
  }
}
