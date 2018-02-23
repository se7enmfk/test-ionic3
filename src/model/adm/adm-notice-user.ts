import { BaseObject } from "../base-object";

/**
 * 用户通知信息表
 */
export class AdmNoticeUser extends BaseObject {
  id: string;//'流水号';
  user_code: string;//'用户账号';
  cus_no: string;//'客户编号';
  pfl_no: string;//'组合编号';
  notice_type: string;//'通知类型';
  notice_title: string;//'通知标题';
  notice_dt: string;//'通知日期';
  skip_ind: string;//'是否可跳过/忽略';
  remove_ind: string;//'是否删除';
  notice_content: string;//'通知内容';
  notice_link: string;//'相关链接';
  isread_ind: string;//'是否已阅';
  read_ts: string;//'阅读时间';
}
