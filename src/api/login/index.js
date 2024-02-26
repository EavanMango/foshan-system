/** 地区管理 */
import { getHttpService } from '@/api/request';
const baseUrl = process.env.VUE_APP_SERVER_PERMISSION;
class APIConfig {
  constructor(url, method, notNeedToken = false) {
    this.url = baseUrl + url;
    this.method = method || 'post';
    this.notNeedToken = notNeedToken;
  }
}

export const loginApiObj = {
  /** 获取token过期时间 */
  getTokenExpired: new APIConfig('/getTokenExpired'),
  /** login */
  AppLogin: new APIConfig('/login'),
  /** 登出 */
  AppDeleteToken: new APIConfig('/logout', 'delete'),
  /** 重新获取token */
  AppRefreshToken: new APIConfig('/refreshToken', 'get'),
};

export default getHttpService(loginApiObj);
