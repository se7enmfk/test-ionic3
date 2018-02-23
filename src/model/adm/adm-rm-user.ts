import { BaseObject } from "../base-object";

/**
 * 推荐人表
 */
export class AdmRmUser extends BaseObject {
  rm_code: string;//'推荐人代码';
  rm_bran_code: string;//'推荐人机构代码';
  rm_mobile: string;//'手机';
  valid_yn: string;//'是否有效';
}