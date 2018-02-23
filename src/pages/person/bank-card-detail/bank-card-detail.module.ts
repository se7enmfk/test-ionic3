import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BankCardDetailPage } from './bank-card-detail';
import { PipesModule } from '../../../pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    BankCardDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(BankCardDetailPage),
    TranslateModule.forChild(),
    PipesModule

  ],
})
export class BankCardDetailPageModule {}
