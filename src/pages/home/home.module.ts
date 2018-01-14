import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { TranslateModule } from '@ngx-translate/core';
import { NgxEchartsModule } from "ngx-echarts";
import { PipesModule } from '../../pipes/pipes.module';
import { AsyncPipe } from '@angular/common';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    TranslateModule.forChild(),
    NgxEchartsModule,
    PipesModule
  ],
})
export class HomePageModule {}
