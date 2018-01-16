import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseObject } from '../../../providers/common/base-object';

@Injectable()
export class CusBindingBankcardProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CusBindingBankcardProvider Provider');
  }

}
export class CusBindingBankcard extends BaseObject {
  bankcard_code: string;//'卡号';
  account_name: string;//'户名';
  cus_no: string;//'客户编号';
  bank_code: string;//'银行代码';
  reserved_mobile: string;//'银行预留手机号';
  id_type: string;//'证件类型';
  id_no: string;//'证件号码';
  opening_bank_code: string;//'开户行';
  opening_bank_name: string;//'开户行名称';
  valid_start_date: string;//'有效期起';
  valid_end_date: string;//'有效期至';
  valid_yn: string;//'是否有效';
}