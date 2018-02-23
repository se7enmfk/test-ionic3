import { BaseObject } from "../base-object";

/**
 * 用户意见反馈
 */
export class AdmUserAdvice extends BaseObject {
  advice_no: string;//'意见ID';
  user_code: string;//'用户账号';
  score: string;//'评分';
  advice_content: string;//'反馈内容';
  reply: string;//'答复';
}
