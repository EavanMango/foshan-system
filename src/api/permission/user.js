import { getHttpService } from '@/api/request';

/** 用户管理 */
const baseUrl = process.env.VUE_APP_SERVER_PERMISSION + '/auth/user'
class APIConfig {
  constructor(url, method, notNeedToken = false) {
    this.url = baseUrl + url;
    this.method = method || 'post';
    this.notNeedToken = notNeedToken;
  }
}

export const userApiObj = {
  /** 修改密码 */
  ChangePassword: new APIConfig('/changePassword', 'post'),
  /** 查询用户列表 */
  GetList: new APIConfig('/list', 'get'),
  /** 新增修改用户 */
  UpdateUser: new APIConfig('/modify', 'post'),
  /** 删除用户 */
  DelUser: new APIConfig('/remove', 'get')
}

export default getHttpService(userApiObj);