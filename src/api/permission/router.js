import { getHttpService } from '@/api/request';

/** 路由管理 */
const baseUrl = process.env.VUE_APP_SERVER_PERMISSION + '/auth/route'
class APIConfig {
  constructor(url, method, notNeedToken = false) {
    this.url = baseUrl + url;
    this.method = method || 'post';
    this.notNeedToken = notNeedToken;
  }
}

export const routerApiObj = {
  /** 查询路由列表 */
  GetRouteList: new APIConfig('/list', 'get'),
  /** 新增修改路由 */
  UpdateRoute: new APIConfig('/modify', 'post'),
  /** 删除路由 */
  DelRoute: new APIConfig('/remove', 'get')
}

export default getHttpService(routerApiObj);