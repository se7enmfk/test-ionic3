import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonMobilePage } from './person-mobile';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    PersonMobilePage,
  ],
  imports: [
    IonicPageModule.forChild(PersonMobilePage),
    TranslateModule.forChild(),
    PipesModule
  ],
})
export class PersonMobilePageModule {}
