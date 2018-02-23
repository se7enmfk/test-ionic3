import { BaseObject } from "../base-object";

/**
 * 客户绑定银行卡
 */
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
  valid_start_dt: string;//'有效期起';
  valid_end_dt: string;//'有效期至';
  valid_yn: string;//'是否有效';
}
