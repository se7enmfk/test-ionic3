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
        console.log(errorKeys);
        
        this.utilProvider.toast(content, content_body);
        err_ind = false;
      }
    })
    return err_ind;
  }
}

export const RegularExpression = {
  mobile:'^1(3|4|5|7|8)\\d{9}$'
}
