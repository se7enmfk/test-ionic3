import { BaseObject } from "../base-object";


export class AdmUser extends BaseObject {
  user_code?: string;
  user_name?: string;
  passwd: any;
  pwd_exp_dt?: string;
  email?: string;
  mobile?: string;
  gender?: string;
  login_tried: number;
  last_login_ts?: string;
  active_ind?: string;
  create_ts?: string;
  create_by?: string;
  modify_ts?: string;
  modify_by?: string;
  gesture_ind?: boolean;
}
