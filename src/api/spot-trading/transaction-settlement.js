import { getHttpService } from '@/api/request';
const baseUrl = process.env.VUE_APP_SERVER_PERFORM_API + '/RS/curveData/';
class ApiConfig {
    constructor(url, method, notNeedToken = false) {
        this.url = baseUrl + url;
        this.method = method || 'post';
        this.notNeedToken = notNeedToken;
    }
}

export const HttpUrl = {
    // 交易结算

    // 处理用户的5个Excel文件并上传Minio存入数据库
    importCurveDataAndExportCurveData: new ApiConfig('importCurveDataAndExportCurveData'),
    // 从minio下载统计的Excel文件
    downloadCurveDataFromMinio: new ApiConfig('downloadCurveDataFromMinio'),

    // 展示结算信息
    showSettlementInformation: new ApiConfig('showSettlementInformation'),
    // 交易表格的展示
    showCurveTableData: new ApiConfig('showCurveTableData'),
    // 交易曲线的展示
    showCurveData: new ApiConfig('showCurveData'),
    // 查询有数据天数
    showCurveDataDays: new ApiConfig('showCurveDataDays'),





};
export default getHttpService(HttpUrl);
