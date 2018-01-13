import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Tabs, ViewController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../../../app/app.config';
import { PlatformProvider, PopupProvider } from '../../../providers/common/commonProviders';
import { BasePage } from '../../pages';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage extends BasePage {

  homeRoot = 'HomePage'
  aboutRoot = 'AboutPage'
  marketRoot = 'MarketPage'
  personRoot = 'PersonPage'

  tab_ind = true;
  @ViewChild('menuTabs') tabRef: Tabs;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public popup: PopupProvider,
    public viewCtrl: ViewController,
    public storage: Storage,
    private platform: PlatformProvider) {
    super(navCtrl, viewCtrl, navParams, popup);
    
    let p1 = this.storage.get(AppConfig.SYS_NAME);
    let p2 = this.storage.get(AppConfig.TOKEN);
    Promise.all([p1, p2]).then((result) => {
      // console.log(result);
    });

    platform.registerBackButtonAction(this.tabRef);

    storage.get(AppConfig.GESTURE_PASSWORD).then((data) => {
      if (data) {
        this.showModal('GesturePasswordPage');
      }
    })

  }

}
