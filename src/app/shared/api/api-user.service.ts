import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommonResponse, UserInfo } from '@shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {
  constructor(private http: HttpClient) {}

  /**
   * 登录
   * @param {*} params
   * @returns {Observable<any>}
   * @memberof ApiUserService
   */
  login(params): Observable<CommonResponse<UserInfo>> {
    return this.http.post<CommonResponse<UserInfo>>('user/login', params);
  }
}
