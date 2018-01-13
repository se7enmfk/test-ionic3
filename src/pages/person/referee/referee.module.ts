import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RefereePage } from './referee';

@NgModule({
  declarations: [
    RefereePage,
  ],
  imports: [
    IonicPageModule.forChild(RefereePage),
  ],
})
export class RefereePageModule {}
