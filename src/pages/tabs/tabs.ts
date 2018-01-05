import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Constant } from '../../app/app.config';
import { Observable } from 'rxjs/Observable';

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


  constructor(public navCtrl: NavController, public storage: Storage) {
    let p1 = this.storage.get(Constant.SYS_PARAM);
    let p2 = this.storage.get(Constant.TOKEN);
    Promise.all([p1, p2]).then((result) => {
      console.log(result);
    });
    
  }

}
