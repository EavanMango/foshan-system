import { getHttpService } from '@/api/request';

/** 用户管理 */
const baseUrl = process.env.VUE_APP_SERVER_PERFORM_API + '/RS/rsPower/'
class APIConfig {
    constructor(url, method, notNeedToken = false) {
        this.url = baseUrl + url;
        this.method = method || 'post';
        this.notNeedToken = notNeedToken;
    }
}

export const userApiObj = {

    // 导出曲线数据
    exportToExcel: new APIConfig('exportToExcel'),

    /** 电力用户下拉框 */
    queryPowerConsList: new APIConfig('queryPowerConsList'),
    // 电力值曲线图
    queryConsPowerCurveDetail: new APIConfig('queryConsPowerCurveDetail'),
    // 电力用户导入
    importPowerCons: new APIConfig('importPowerCons'),

}

export default getHttpService(userApiObj);