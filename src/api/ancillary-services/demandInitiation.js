import { getHttpService } from '@/api/request';
const baseUrl = process.env.VUE_APP_SERVER_PERFORM_API + '/AS/';
class ApiConfig {
    constructor(url, method, notNeedToken = false) {
        this.url = baseUrl + url;
        this.method = method || 'post';
        this.notNeedToken = notNeedToken;
    }
}

export const HttpUrl = {
    //用户邀约

    // 用户邀约新增
    insInvertCons: new ApiConfig('eventInvert/insInvertCons'),
    // 用户邀约信息详情
    queryConInvertsInfo: new ApiConfig('eventInvert/queryConInvertsInfo'),
    // 邀约用户信息查询
    queryInvertCons: new ApiConfig('eventInvert/queryInvertCons'),
    // 用户预测曲线查询
    queryFcstCurve: new ApiConfig('consumer/queryFcstCurve'),


};
export default getHttpService(HttpUrl);
