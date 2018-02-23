import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingAdvisePage } from './setting-advise';

@NgModule({
  declarations: [
    SettingAdvisePage,
  ],
  imports: [
    IonicPageModule.forChild(SettingAdvisePage),
  ],
})
export class SettingAdvisePageModule {}
