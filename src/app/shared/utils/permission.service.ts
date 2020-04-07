import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  protected permissions: number[] = []; // 存储当前用户权限组

  constructor() {
    if (localStorage.getItem('_token')) {
      const permissions = JSON.parse(localStorage.getItem('_token')).permissions;
      this.set(permissions);
    }
  }

  /**
   * 设置权限组
   * @param {*} permissions
   * @memberof PermissionService
   */
  set(permissions: number[]): void {
    this.permissions = permissions;
  }

  /**
   * 根据颗粒权限进行匹配
   * @param {number} currentPermission
   * @returns {boolean}
   * @memberof StorageService
   */
  has(currentPermission: number): boolean {
    return _.some(this.permissions, item => item === currentPermission);
  }
}
