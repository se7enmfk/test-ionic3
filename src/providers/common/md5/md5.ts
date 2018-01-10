import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { AppConfig } from '../../../app/app.config';
 
@Injectable()
export class Md5Provider {

  make(remark) {
    return Md5.hashStr(Md5.hashStr(remark + AppConfig.SYS_NAME + remark.substring(-3)) + AppConfig.SYS_NAME + remark.substring(-3));
  }
}
