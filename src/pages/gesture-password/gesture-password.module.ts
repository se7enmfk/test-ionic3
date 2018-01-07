import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GesturePasswordPage } from './gesture-password';
import { GesturePasswordModule } from 'ngx-gesture-password';

@NgModule({
  declarations: [
    GesturePasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(GesturePasswordPage),
    GesturePasswordModule
  ],
})
export class GesturePasswordPageModule {}
