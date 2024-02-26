/** 资源管理 */
import { getHttpService } from '@/api/request';
const baseUrl = process.env.VUE_APP_SERVER_PERFORM_API + '/SCADA/resourcePool/';
class APIConfig {
    constructor(url, method, notNeedToken = false) {
        this.url = baseUrl + url;
        this.method = method || 'post';
        this.notNeedToken = notNeedToken;
    }
}

export const HttpUrl = {
    /** 添加资源池用户 */
    addResourcePoolUser: new APIConfig('addResourcePoolUser'),
    /** 删除资源池用户 */
    deleteResourcePoolUser: new APIConfig('deleteResourcePoolUser'),
    /** 获取可控用户信息 */
    getControllableUser: new APIConfig('getControllableUser'),
    /** 获取非资源池用户列表 */
    getResourcePoolUser: new APIConfig('getResourcePoolUser'),
};

export default getHttpService(HttpUrl);
