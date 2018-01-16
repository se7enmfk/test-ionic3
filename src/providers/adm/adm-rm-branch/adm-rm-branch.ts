import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseObject } from '../../../providers/common/base-object';

@Injectable()
export class AdmRmBranchProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AdmRmBranchProvider Provider');
  }

}

export class AdmRmBranch extends BaseObject {
  rm_bran_code: string;//'推荐人机构代码';
  rm_bran_ename: string;//'推荐机构英文名称';
  parent_bran_code: string;//'上级机构代码';
  strset: string;//'按层级编码';
}