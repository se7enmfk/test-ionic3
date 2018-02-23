import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessageNoticePublicDetailPage } from './message-notice-public-detail';

@NgModule({
  declarations: [
    MessageNoticePublicDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MessageNoticePublicDetailPage),
  ],
})
export class MessageNoticePublicDetailPageModule {}
