/** 地区管理 */
import { getHttpService } from '@/api/request';
const baseUrl = process.env.VUE_APP_SERVER_PERFORM_API + '/DR/drEvent';
class APIConfig {
    constructor(url, method, notNeedToken = false) {
        this.url = baseUrl + url;
        this.method = method || 'post';
        this.notNeedToken = notNeedToken;
    }
}

export const HttpUrl = {
    /** 结算管理--事件 */
    queryEventSettlement: new APIConfig('/queryEventSettlement'),
    /** 结算管理--事件日 */
    queryEventDaySettlement: new APIConfig('/queryEventDaySettlement'),

};

export default getHttpService(HttpUrl);
