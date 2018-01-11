import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../../app/app.config';
import { AdmUserProvider } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  options = {};

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public admUserProvider: AdmUserProvider,
    private storage: Storage) {
  }

  ionViewDidLoad() {
    
  }
  onChartClick(e) {
    console.log(e.dataIndex);
  }
}
