import { Injectable } from '@angular/core';

@Injectable()
export class DateTimeService {
  constructor() {}

  /**
   * 依据日期偏移量，生成需要的日期
   * @param {number} dayOffset 日期偏移量，从今天起日子的天数
   * @memberof DateTimeService
   */
  getDay(dayOffset?: number): Date {
    dayOffset = !!dayOffset ? dayOffset : 0;

    const newDate = new Date();
    newDate.setDate(newDate.getDate() + dayOffset);
    return newDate;
  }

  /**
   * 日期转换成标准字符串
   * @param {Date} date
   * @returns {string}
   * @memberof DateTimeService
   */
  dateToStr(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const days = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return (
      year +
      '-' +
      this.formatDateNum(month) +
      '-' +
      this.formatDateNum(days) +
      ' ' +
      this.formatDateNum(hours) +
      ':' +
      this.formatDateNum(minutes) +
      ':' +
      this.formatDateNum(seconds)
    );
  }

  /**
   * 日期月日时分数值是个位数时，补齐为两位数
   * @param num 日期月日时分
   */
  formatDateNum(num: number): string {
    if (num / 10 < 1) {
      return '0' + num;
    } else {
      return num.toString();
    }
  }
}
