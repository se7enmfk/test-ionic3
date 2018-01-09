import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Platform, Tabs, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../../../app/app.config';  
import { GesturePasswordPage } from '../../pages';
import { BackButtonProvider } from '../../../providers/common/commonProviders';

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

  @ViewChild('menuTabs') tabRef: Tabs;
  
  constructor(public navCtrl: NavController, 
    public storage: Storage,
    private platform: Platform,
    public modalCtrl: ModalController,
    public backButtonProvider :BackButtonProvider) {
    let p1 = this.storage.get(AppConfig.SYS_PARAM);
    let p2 = this.storage.get(AppConfig.TOKEN);
    Promise.all([p1, p2]).then((result) => {
      console.log(result);
    });
    platform.ready().then((result) => {
       this.backButtonProvider.registerBackButtonAction(this.tabRef);
    })

    let profileModal = this.modalCtrl.create(GesturePasswordPage);
    profileModal.present();
  }

}
