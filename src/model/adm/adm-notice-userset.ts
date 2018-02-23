import { BaseObject } from "../base-object";

/**
 * 用户通知设置表
 */
export class AdmNoticeUserset extends BaseObject {
  user_code: string;//'用户账号';
  notice_type: string;//'通知类型';
  notice_yn?: string;//'通知开关';
  notice_yn_bl?: boolean;//'通知开关';
}
