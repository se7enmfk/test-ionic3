import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Constant } from '../../app/app.config';

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
    
    this.storage.get(Constant.SYS_PARAM).then((sysParam)=>{
      console.log(sysParam);
    });
      
  }


}
