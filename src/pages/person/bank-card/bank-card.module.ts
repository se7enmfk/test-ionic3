import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BankCardPage } from './bank-card';
import { PipesModule } from '../../../pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    BankCardPage,
  ],
  imports: [
    IonicPageModule.forChild(BankCardPage),
    TranslateModule.forChild(),
    PipesModule
  ],
})
export class BankCardPageModule {}
