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

    // 获取群组列表
    getGroupList: new APIConfig('/group/getGroupList'),
    // 群控事件生成
    insCtrlEvent: new APIConfig('/mulCtrl/insCtrlEvent'),
    // 群控事件下发
    sendCtrlEvent: new APIConfig('/mulCtrl/sendCtrlEvent'),

    // 用户分解功率生成
    breakConsLoads: new APIConfig('/mulCtrl/breakConsLoads'),
    // 分解功率生成用户群组
    brakeToGenGroup: new APIConfig('/group/brakeToGenGroup'),

    // 待下发群控事件查询
    getToActionCtrlEvents: new APIConfig('/mulCtrl/getToActionCtrlEvents'),
    // 待下发群控事件详情查询
    getToActionCtrlEventInfo: new APIConfig('/mulCtrl/getToActionCtrlEventInfo'),
    // 群控事件保存
    saveCtrlEvent: new APIConfig('/mulCtrl/saveCtrlEvent'),
    // 待下发群控事件删除
    deleteToActionCtrlEventInfo: new APIConfig('/mulCtrl/deleteToActionCtrlEventInfo'),

};

export default getHttpService(HttpUrl);
