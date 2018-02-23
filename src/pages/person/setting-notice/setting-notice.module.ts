import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingNoticePage } from './setting-notice';
import { PipesModule } from '../../../pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    SettingNoticePage,
  ],
  imports: [
    IonicPageModule.forChild(SettingNoticePage),
    TranslateModule.forChild(),
    PipesModule
  ],
})
export class SettingNoticePageModule {}
