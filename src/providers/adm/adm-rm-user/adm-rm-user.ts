import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseObject } from '../../../providers/common/base-object';

@Injectable()
export class AdmRmUserProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AdmRmUserProvider Provider');
  }

}

export class AdmRmUser extends BaseObject {
  rm_code: string;//'推荐人代码';
  rm_bran_code: string;//'推荐人机构代码';
  rm_mobile: string;//'手机';
  valid_yn: string;//'是否有效';
}