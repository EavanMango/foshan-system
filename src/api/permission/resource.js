import { getHttpService } from '@/api/request';

/** 系统资源 */
const baseUrl = process.env.VUE_APP_SERVER_PERMISSION + '/auth/resource'

class APIConfig {
  constructor(url, method, notNeedToken = false) {
    this.url = baseUrl + url;
    this.method = method || 'post';
    this.notNeedToken = notNeedToken;
  }
}

export const resourceApiObj = {
  /** 新增修改资源 */
  UpdateRes: new APIConfig('/modify', 'post'),
  /** 查询资源 */
  GetResList: new APIConfig('/query', 'get'),
  /** 根据角色id查询资源树 */
  QueryResTreeById: new APIConfig('/queryResources', 'get'),
  /** 查询资源树 */
  QueryResTree: new APIConfig('/queryTree', 'get'),
  /** 删除资源 */
  DelRes: new APIConfig('/remove', 'get'),
}

export default getHttpService(resourceApiObj);