import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, App} from 'ionic-angular';
import {AppConfig, ImageConfig} from '../../../app/app.config';
import {SysProvider} from '../../../providers/providers';
import {UtilProvider} from '../../../providers/common/commonProviders';
import {BasePage} from '../../pages';
import {Observable} from 'rxjs/Observable';

/**
 * Generated class for the SettingVersionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting-version',
  templateUrl: 'setting-version.html',
})
export class SettingVersionPage extends BasePage {

  latestVersion = {};            //最新版本信息
  logo = ImageConfig.logo;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public navParams: NavParams,
              public utilProvider: UtilProvider,
              private sysProvider: SysProvider,
              public app: App) {
    super(navCtrl, viewCtrl, navParams, utilProvider);

  }

  ionViewDidLoad() {
    //获得最新版本信息
    this.latestVersion = this.sysProvider._latestVersion;
  }


}
