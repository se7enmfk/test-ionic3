import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessageNoticeUserDetailPage } from './message-notice-user-detail';

@NgModule({
  declarations: [
    MessageNoticeUserDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MessageNoticeUserDetailPage),
  ],
})
export class MessageNoticeUserDetailPageModule {}
