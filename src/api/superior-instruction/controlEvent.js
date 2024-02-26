import { getHttpService } from '@/api/request';
const baseUrl = process.env.VUE_APP_SERVER_PERFORM_API + '/RS/calendar/';
class ApiConfig {
    constructor(url, method, notNeedToken = false) {
        this.url = baseUrl + url;
        this.method = method || 'post';
        this.notNeedToken = notNeedToken;
    }
}

export const HttpUrl = {
    //上级指令-控制事件

    // 日历查询
    query: new ApiConfig('query'),
    // 查询事件详情
    queryDetails: new ApiConfig('queryDetails'),

    // 查询执行详情
    queryExecuteDetails: new ApiConfig('queryExecuteDetails'),
    // 表格查询
    queryTable: new ApiConfig('queryTable'),
    // 查询当天的事件详情
    queryTodayList: new ApiConfig('queryTodayList'),

};
export default getHttpService(HttpUrl);
