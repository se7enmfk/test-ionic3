import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonPage } from './person';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    PersonPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonPage),
    TranslateModule.forChild()
  ],
})
export class PersonPageModule {}
