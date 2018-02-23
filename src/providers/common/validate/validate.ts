import { Injectable } from '@angular/core';
import { UtilProvider } from '../util/util';

@Injectable()
export class ValidateProvider {

  errors = {
    "required": "err.required",
    "minlength": "err.minLength",
    "maxlength": "err.maxLength",
    "email": "err.email",
    "pattern": "err.pattern"
  }

  constructor(public utilProvider: UtilProvider) { }

  validate(ftxForm, formLabel) {
    let err_ind: boolean = true;
    let filterKeys = Object.keys(ftxForm.controls);

    filterKeys.forEach((data, index) => {
      if (err_ind && ftxForm.controls[data].errors) {
        let errorKeys = Object.keys(ftxForm.controls[data].errors);
        let content = this.errors[errorKeys[0]];
        let content_body: any = { label: this.utilProvider.translate(formLabel[data]) };
        if (errorKeys[0] == 'minlength') {
          content_body.num = ftxForm.controls[data].errors[errorKeys[0]].requiredLength
        }

        this.utilProvider.toast(content, content_body);
        err_ind = false;
      }
    });
    return err_ind;
  }
}

export const RegularExpression = {
  mobile:'^1(3|4|5|7|8)\\d{9}$',
  idCard:'(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x)$)',
  bankCard:'^([1-9]{1})(\\d{15}|\\d{18})$',
  email:'^[A-Za-z0-9\\u4e00-\\u9fa5]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$',
  profitOrLoss:'^[1-9]|[1-9]\\d|100$'
};
