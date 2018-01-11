import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
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

  web_url = AppConfig.WEB_URL;
  constructor(public navCtrl: NavController,
    public admUserProvider: AdmUserProvider,
    public storage: Storage,
    public modalCtrl: ModalController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    
    this.storage.get(AppConfig.SYS_USER).then((data) => {
      if(!data){
        this.modalCtrl.create('LoginPage').present();
      }
    })
  }
  doRefresh(refresher) {

    this.ionViewDidLoad();

    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
  changePassword(type) {
    this.navCtrl.push('ChangePasswordPage', { type: type });
  }
  personDetail(type) {
    this.navCtrl.push('ChangePasswordPage', { type: type });
  }
}
