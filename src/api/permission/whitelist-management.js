import { getHttpService } from '@/api/request';

/** 白名单管理 */
const baseUrl = process.env.VUE_APP_SERVER_PERFORM_API + '/RS/whiteList/'
class APIConfig {
    constructor(url, method, notNeedToken = false) {
        this.url = baseUrl + url;
        this.method = method || 'post';
        this.notNeedToken = notNeedToken;
    }
}

export const userApiObj = {
    /** 用户白名单解绑 */
    deleteWhiteList: new APIConfig('deleteWhiteList'),
    // 用户白名单查询
    getWhiteList: new APIConfig('getWhiteList'),
    // 用户白名单绑定
    insertWhiteList: new APIConfig('insertWhiteList'),



}

export default getHttpService(userApiObj);