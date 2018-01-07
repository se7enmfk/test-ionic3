import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform, ModalController } from 'ionic-angular';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { Subscription } from 'rxjs/Subscription';
import { SplashScreen } from '@ionic-native/splash-screen';

@Injectable()
export class LockProvider {

  private onPause: Subscription;
  private onResume: Subscription;
  private initialized: boolean = false;
  private isLocked: boolean = false;
  private lockScreen: any;

  constructor(public http: HttpClient,
    private platform: Platform,
    private modalCtrl: ModalController,
    private splashScreen: SplashScreen,
    private fingerprintAIO: FingerprintAIO) {
  }

  init() {
    if (this.initialized) {
      return;
    }
    this.lockScreen = this.modalCtrl.create('LockScreenPage');
    this.platform.ready().then((result) => {
      this.onPause = this.platform.pause.subscribe((result) => {
        this.splashScreen.show();
      });

      this.onResume = this.platform.resume.subscribe((result) => {
         if(!this.isLocked){
           this.isLocked = true;
           this.lockScreen.present();
           this.showFingerprint();
         }
      })
    })
  }

  showFingerprint(){
      this.fingerprintAIO.show({
        clientId: 'Fingerprint-Demo',
        clientSecret: 'password', //Only necessary for Android
        disableBackup:true,  //Only for Android(optional)
        localizedFallbackTitle: 'Use Pin', //Only for iOS
        localizedReason: 'Please authenticate' //Only for iOS
      }
      ).then((result) => {
         this.lockScreen.dismiss();
         this.isLocked=false;
      });
  }
}
