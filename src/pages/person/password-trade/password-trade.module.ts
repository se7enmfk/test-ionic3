import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PasswordTradePage } from './password-trade';

@NgModule({
  declarations: [
    PasswordTradePage,
  ],
  imports: [
    IonicPageModule.forChild(PasswordTradePage),
  ],
})
export class PasswordTradePageModule {}
