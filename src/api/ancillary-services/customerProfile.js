import { getHttpService } from '@/api/request';
const baseUrl = process.env.VUE_APP_SERVER_PERFORM_API + '/AS/consumer/';
class ApiConfig {
    constructor(url, method, notNeedToken = false) {
        this.url = baseUrl + url;
        this.method = method || 'post';
        this.notNeedToken = notNeedToken;
    }
}

export const HttpUrl = {
    //客户档案

    // 用户删除
    deleteAsCons: new ApiConfig('deleteAsCons'),
    // 用户档案详情查询
    queryAsConsDetail: new ApiConfig('queryAsConsDetail'),

    // 档案查询
    queryAsConsList: new ApiConfig('queryAsConsList'),
    // 用户预测曲线查询
    queryFcstCurve: new ApiConfig('queryFcstCurve'),
    // 用户历史曲线查询
    queryHisCurve: new ApiConfig('queryHisCurve'),

    // 辅助服务用户档案-新增-用户下拉框
    querylNoAsAlRsConsumers: new ApiConfig('querylNoAsAlRsConsumers'),

    // 用户新增-修改
    saveOrUpdateAsCons: new ApiConfig('saveOrUpdateAsCons'),


};
export default getHttpService(HttpUrl);
