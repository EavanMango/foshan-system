/** 地区管理 */
import { getHttpService } from '@/api/request';
const baseUrl = process.env.VUE_APP_SERVER_PERFORM_API + '/SYS/sysArea';
class APIConfig {
  constructor(url, method, notNeedToken = false) {
    this.url = baseUrl + url;
    this.method = method || 'post';
    this.notNeedToken = notNeedToken;
  }
}

export const HttpUrl = {
  /** getAreaListByParentId */
  getAreaListByParentId: new APIConfig('/getAreaListByParentId'),
  /** getJSAreaList */
  getJSAreaList: new APIConfig('/getJSAreaList'),
  /** getJSAreas */
  getJSAreas: new APIConfig('/getJSAreas'),
  /** 通过parentId获取地区列表 */
  getAreaListByParentId: new APIConfig('/getAreaListByParentId'),
};

export default getHttpService(HttpUrl);
