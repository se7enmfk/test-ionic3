import { BaseObject } from "../base-object";

/**
 * 系统发布版本历史
 */
export class SysReleaseVersion extends BaseObject {
  ver_no: string;//'版本号';
  release_desc: string;//'版本更新说明';
}