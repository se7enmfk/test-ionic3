import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessageNoticePublicPage } from './message-notice-public';

@NgModule({
  declarations: [
    MessageNoticePublicPage,
  ],
  imports: [
    IonicPageModule.forChild(MessageNoticePublicPage),
  ],
})
export class MessageNoticePublicPageModule {}
