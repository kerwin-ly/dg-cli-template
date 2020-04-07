import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { FormGroup } from '@angular/forms';
/**
 * 表单验证工具类
 * @export
 * @class ValidateService
 */
@Injectable({
  providedIn: 'root'
})
export class ValidateService {
  constructor() {}

  isInteger(value: string): boolean {
    const reg = /^([1-9]\d*)$/;

    return reg.test(value);
  }

  /**
   * 验证form表单
   * @param {FormGroup} form
   * @returns {boolean}
   * @memberof ValidateService
   */
  isValid(form: FormGroup): boolean {
    _.forEach(form.controls, item => {
      item.markAsDirty();
      item.updateValueAndValidity();
    });
    return form.valid;
  }
}
