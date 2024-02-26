/** 群组管理 */
import { getHttpService } from '@/api/request';
const baseUrl = process.env.VUE_APP_SERVER_PERFORM_API + '/SCADA';
class APIConfig {
    constructor(url, method, notNeedToken = false) {
        this.url = baseUrl + url;
        this.method = method || 'post';
        this.notNeedToken = notNeedToken;
    }
}

export const HttpUrl = {
    /** 群控事件用户列表 */
    getCtrlEventCons: new APIConfig('/mulCtrl/getCtrlEventCons'),
    /** 群控事件查询 */
    getCtrlEvents: new APIConfig('/mulCtrl/getCtrlEvents'),
    // 执行曲线
    getCtrlEventCurve: new APIConfig('/mulCtrl/getCtrlEventCurve'),
    // 计划曲线
    getCtrlEventPlanCurve: new APIConfig('/mulCtrl/getCtrlEventPlanCurve'),
    // 执行用户曲线
    getCtrlEventConsCurve: new APIConfig('/mulCtrl/getCtrlEventConsCurve'),
    // 计划用户曲线
    getCtrlEventConsPlanCurve: new APIConfig('/mulCtrl/getCtrlEventConsPlanCurve'),

    // 事件信息
    getSingleCtrlEvents: new APIConfig('/mulCtrl/getSingleCtrlEvents'),
    // 群控事件用户时间线
    queryMulCtrlEventTimeline: new APIConfig('/mulCtrl/queryMulCtrlEventTimeline'),




};

export default getHttpService(HttpUrl);
