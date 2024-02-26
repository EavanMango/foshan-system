/** 空调控制 */
import { getHttpService } from '@/api/request';
const baseUrl = process.env.VUE_APP_SERVER_PERFORM_API + '/RS/airCtrl';
class APIConfig {
    constructor(url, method, notNeedToken = false) {
        this.url = baseUrl + url;
        this.method = method || 'post';
        this.notNeedToken = notNeedToken;
    }
}

export const HttpUrl = {
    /** 空调设备控制日志查询 */
    queryAirCtrlLog: new APIConfig('/queryAirCtrlLog'),
    /** 用户下空调设备展示 */
    queryAirEquipByCons: new APIConfig('/queryAirEquipByCons'),
    /** 空调曲线查询 */
    queryAirEquipCurve: new APIConfig('/queryAirEquipCurve'),
    // 空调运行参数查询
    queryAirEquipRunParam: new APIConfig('/queryAirEquipRunParam'),

    /** 空调查询表格 */
    queryAirEquipTable: new APIConfig('/queryAirEquipTable'),
    /** 空调设备树查询 */
    queryAirEquipTree: new APIConfig('/queryAirEquipTree'),

    // 空调控制命令下发
    sendAirCtrl: new APIConfig('/sendAirCtrl'),


};

export default getHttpService(HttpUrl);
