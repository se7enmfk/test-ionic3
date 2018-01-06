import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PersonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-person',
  templateUrl: 'person.html',
})
export class PersonPage {
  event={timeStarts:null,timeStarts1:null};
  list = [
    {
      name:"个人资料"
    },{
      name:"个人资料"
    },{
      name:"个人资料"
    },{
      name:"个人资料"
    }
  ]
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonPage');
  }

  personDetail(){
    this.navCtrl.push('HomePage');
  }
}
