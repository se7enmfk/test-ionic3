import { BaseObject } from "../base-object";

/**
 * 用户通知细项设置表
 */
export class AdmNoticeUsersetItem extends BaseObject {
  user_code: string;//'用户账号';
  notice_type: string;//'通知类型';
  item_type: string;//'设置细项类型';
  item_value?: string;//'设置细项值';
}
