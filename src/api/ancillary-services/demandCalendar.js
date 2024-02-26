import { getHttpService } from '@/api/request';
const baseUrl = process.env.VUE_APP_SERVER_PERFORM_API + '/AS/event/';
class ApiConfig {
    constructor(url, method, notNeedToken = false) {
        this.url = baseUrl + url;
        this.method = method || 'post';
        this.notNeedToken = notNeedToken;
    }
}

export const HttpUrl = {
    //需求日历

    // 需求事件新增
    addAsEvent: new ApiConfig('addAsEvent'),
    // 需求日历查看
    demandCalender: new ApiConfig('demandCalender'),
    // 需求曲线查询
    queryDemandCurve: new ApiConfig('queryDemandCurve'),
    // 需求日历表格信息
    queryDemandCurveTable: new ApiConfig('queryDemandCurveTable'),
    // 需求事件参与详情查询
    queryDemandInfo: new ApiConfig('queryDemandInfo'),
    // 修改
    queryAsEventDetail: new ApiConfig('queryAsEventDetail'),

    // 导入
    importDemandFile: new ApiConfig('importDemandFile'),
    // 辅助服务需求日历模板下载
    downloadFileAsEvent: new ApiConfig('downloadFileAsEvent'),


};
export default getHttpService(HttpUrl);
