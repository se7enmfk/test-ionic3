import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Tabs, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../../../app/app.config';
import { GesturePasswordPage } from '../../pages';
import { PlatformProvider } from '../../../providers/common/commonProviders';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  homeRoot = 'HomePage'
  aboutRoot = 'AboutPage'
  marketRoot = 'MarketPage'
  personRoot = 'PersonPage'

  tab_ind = true;
  @ViewChild('menuTabs') tabRef: Tabs;

  constructor(public navCtrl: NavController,
    public storage: Storage,
    private platform: PlatformProvider,
    public modalCtrl: ModalController) {
    let p1 = this.storage.get(AppConfig.SYS_NAME);
    let p2 = this.storage.get(AppConfig.TOKEN);
    Promise.all([p1, p2]).then((result) => {
      // console.log(result);
    });

    platform.registerBackButtonAction(this.tabRef);

    storage.get(AppConfig.SYS_USER).then((data) => {
      if (data) {
        this.modalCtrl.create(GesturePasswordPage).present();
      }
    })

  }

}
