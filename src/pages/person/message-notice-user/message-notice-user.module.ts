import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessageNoticeUserPage } from './message-notice-user';

@NgModule({
  declarations: [
    MessageNoticeUserPage,
  ],
  imports: [
    IonicPageModule.forChild(MessageNoticeUserPage),
  ],
})
export class MessageNoticeUserPageModule {}
