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
    //交易申报

    // 需求日历查看
    demandCalender: new ApiConfig('event/demandCalender'),
    // 出清曲线查询
    queryPublishCurveByCons: new ApiConfig('eventReport/queryPublishCurveByCons'),
    // 出清表格查询
    queryPublishDataByCons: new ApiConfig('eventReport/queryPublishDataByCons'),
    // 需求申报及出清查询
    queryReport: new ApiConfig('eventReport/queryReport'),
    // 需求申报详情查询
    queryReportByCons: new ApiConfig('eventReport/queryReportByCons'),
    // 需求申报新增-修改
    saveReportByCons: new ApiConfig('eventReport/saveReportByCons'),
    // 申报上送
    consReportExport: new ApiConfig('eventReport/consReportExport'),
    // 出清数据导入
    importPublishFile: new ApiConfig('eventReport/importPublishFile'),
    // 需求申报及出清导出
    reportAndPublishExport: new ApiConfig('eventReport/reportAndPublishExport'),



};
export default getHttpService(HttpUrl);
