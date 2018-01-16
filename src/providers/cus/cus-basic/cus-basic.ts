import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseObject } from '../../../providers/common/base-object';

@Injectable()
export class CusBasicProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CusBasicProvider Provider');
  }

}
export class CusBasic extends BaseObject {
  cus_no: string;//'客户编号';
  cus_code: string;//'客户编号';
  cus_name: string;//'客户名称';
  user_code: string;//'用户账号';
  birthday: string;//'生日';
  gender: string;//'性别';
  id_type: string;//'证件类型';
  id_no: string;//'证件号码';
  cus_grade: string;//'客户等级';
  risk_rank: string;//'风险等级';
  risk_ts: string;//'风险测评时间';
  referee_no: string;//'推荐人编号';
  referee_desc: string;//'推荐人';
  referee_orgn: string;//'推荐机构';
  payment_passwd: string;//'支付密码';
}