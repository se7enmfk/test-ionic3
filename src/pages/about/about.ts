import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdmSysParamProvider } from '../../providers/providers';

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  constructor(public navCtrl: NavController, 
    private admSysParamProvider :AdmSysParamProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    
    console.log(this.admSysParamProvider._sys_param);
  }

}
