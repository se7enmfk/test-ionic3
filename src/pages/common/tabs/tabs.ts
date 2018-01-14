import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Tabs, ViewController, NavParams } from 'ionic-angular';
import { AppConfig } from '../../../app/app.config';
import { PlatformProvider, UtilProvider } from '../../../providers/common/commonProviders';
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
    public utilProvider: UtilProvider,
    public viewCtrl: ViewController,
    private platform: PlatformProvider) {
    super(navCtrl, viewCtrl, navParams, utilProvider);

    let p1 = this.utilProvider.getItem(AppConfig.SYS_NAME);
    let p2 = this.utilProvider.getItem(AppConfig.TOKEN);
    Promise.all([p1, p2]).then((result) => {
      // console.log(result);
    });

    platform.registerBackButtonAction(this.tabRef);

    utilProvider.getItem(AppConfig.GESTURE_PASSWORD).then((data) => {
      if (data) {
        this.showModal('GesturePasswordPage');
      }
    })


  }

}
