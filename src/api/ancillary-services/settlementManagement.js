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
    //结算管理

    // 需求日历查看
    demandCalender: new ApiConfig('event/demandCalender'),
    // 日结算结果导出
    exportSettleDayList: new ApiConfig('settle/exportSettleDayList'),
    // 日结算信息查询
    querySettleDayList: new ApiConfig('settle/querySettleDayList'),
    // 导入
    importSettleDayList: new ApiConfig('settle/importSettleDayList'),



};
export default getHttpService(HttpUrl);
