import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Constant } from '../../../app/app.config';

/**
 * Generated class for the GesturePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gesture-password',
  templateUrl: 'gesture-password.html',
})

export class GesturePasswordPage {
  pwd: any;
  type = 'check';
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public storage: Storage) {
    this.storage.set(Constant.PERSON_PASSWORD, '12369');
    this.storage.get(Constant.PERSON_PASSWORD).then((result) => {
      this.pwd = result;
    });
  }

  ionViewDidLoad() {
  }

  onError(e) {
    console.log('1');

    console.log(e);

  }
  onChecked(e) {
    console.log(e);
    if(e.result ==this.pwd){
      this.viewCtrl.dismiss();
    }
  }
  onBeforeRepeat(e) {
    console.log(e);
    console.log(e.result);

    console.log('3');

  }
  onAfterRepeat(e) {
    console.log(e.result);
    console.log('4');
  }
}
