/**
 * 公共reponse返回
 * @interface CommonResponse
 * @template T
 */
export interface CommonResponse<T> {
  code: number;
  msg: string;
  data?: T;
}
