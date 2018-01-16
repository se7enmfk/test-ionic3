import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PasswordManagementPage } from './password-management';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    PasswordManagementPage,
  ],
  imports: [
    IonicPageModule.forChild(PasswordManagementPage),
    TranslateModule.forChild()
  ],
})
export class PasswordManagementPageModule {}
