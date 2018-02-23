import { BaseObject } from "../base-object";

/**
 * 用户阅读公告记录
 */
export class AdmNoticeRead extends BaseObject {
  notice_no: string;//'公告ID';
  user_code: string;//'用户账号';
  isread_ind: string;//'是否已阅';
  read_ts: string;//'阅读时间';
}
