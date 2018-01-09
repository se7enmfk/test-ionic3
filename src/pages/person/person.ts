import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdmUserProvider } from '../../providers/providers';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../../app/app.config';

@IonicPage()
@Component({
  selector: 'page-person',
  templateUrl: 'person.html',
})
export class PersonPage {
  messageCount = 10;
  user = {};

  event = { timeStarts: null, timeStarts1: null };
  list = [
    {
      name: "个人资料"
    }, {
      name: "个人资料"
    }, {
      name: "个人资料"
    }, {
      name: "个人资料"
    }
  ]

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

  personDetail() {
    this.navCtrl.push('HomePage');
  }
}
