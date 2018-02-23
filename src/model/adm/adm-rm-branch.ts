import { BaseObject } from "../base-object";

/**
 * 推荐人机构表
 */
export class AdmRmBranch extends BaseObject {
  rm_bran_code: string;//'推荐人机构代码';
  rm_bran_ename: string;//'推荐机构英文名称';
  parent_bran_code: string;//'上级机构代码';
  strset: string;//'按层级编码';
}