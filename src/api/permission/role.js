import { getHttpService } from '@/api/request';

/** 用户角色 */
const baseUrl = process.env.VUE_APP_SERVER_PERMISSION + '/auth/role'
class APIConfig {
  constructor(url, method, notNeedToken = false) {
    this.url = baseUrl + url;
    this.method = method || 'post';
    this.notNeedToken = notNeedToken;
  }
}

export const roleApiObj = {
  /** 查询角色列表 */
  GetRoleList: new APIConfig('/list', 'get'),
  /** 新增修改角色 */
  UpdateRole: new APIConfig('/modify', 'post'),
  /** 角色绑定区域信息 */
  RebindRegions: new APIConfig('/rebindRegions', 'post'),
  /** 角色绑定资源信息 */
  RebindResources: new APIConfig('/rebindResources', 'post'),
  /** 角色绑定路由信息 */
  RebindRoutes: new APIConfig('/rebindRoutes', 'post'),
  /** 角色绑定厂站信息 */
  RebindSubstations: new APIConfig('/rebindSubstations', 'post'),
  /** 角色绑定用户信息 */
  RebindUsers: new APIConfig('/rebindUsers', 'post'),
  /** 查询角色详细信息 */
  QueryBindingInfo: new APIConfig('/query', 'get'),
  /** 删除角色 */
  DelRole: new APIConfig('/remove', 'get')
}

export default getHttpService(roleApiObj);