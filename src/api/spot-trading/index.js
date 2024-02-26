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
    // 系统监测

    // 导出曲线数据
    exportCurveData: new ApiConfig('exportCurveData'),
    // 导入曲线A的数据
    importCurveDataA: new ApiConfig('importCurveDataA'),
    // 导入曲线B的数据
    importCurveDataB: new ApiConfig('importCurveDataB'),
    // 导入曲线C的数据
    importCurveDataC: new ApiConfig('importCurveDataC'),
    // 展示三种曲线的数据
    showCurveDataSimple: new ApiConfig('showCurveDataSimple'),


};
export default getHttpService(HttpUrl);
