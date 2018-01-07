import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  pwd='1235';
  type='check';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GesturePasswordPage');
  }

  onError(e) {
    console.log('1');
    
console.log(e);

  }
  onChecked(e) {
    console.log('2');
    
console.log(e);

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
