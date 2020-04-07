/**
 * 用户信息
 * @export
 * @interface UserInfo
 */
export interface UserInfo {
  id: string;
  name: string;
  permissions: number[];
  token: string;
  avatar?: string;
}
