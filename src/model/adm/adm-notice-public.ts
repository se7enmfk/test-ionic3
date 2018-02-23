import { BaseObject } from "../base-object";

/**
 * 系统公告表
 */
export class AdmNoticePublic extends BaseObject {
  notice_no: string;//'公告ID';
  visible_level: string;//'有效范围';
  notice_type: string;//'公告类型';
  notice_title: string;//'公告标题';
  start_ts: string;//'生效时间';
  end_ts: string;//'过期时间';
  from_code: string;//'来源代码';
  from_name: string;//'来源名称';
  skip_ind: string;//'是否可跳过/忽略';
  remove_ind: string;//'是否删除';
  notice_content: string;//'公告内容';
  notice_link: string;//'相关链接';

  isread_ind: string;//'是否已阅';
}
