import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonDetailPage } from './person-detail';
import { PipesModule } from '../../../pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    PersonDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonDetailPage),
    TranslateModule.forChild(),
    PipesModule
  ],
})
export class PersonDetailPageModule {}
