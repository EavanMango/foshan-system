import { getHttpService } from '@/api/request';
const baseUrl = process.env.VUE_APP_SERVER_PERFORM_API + '/RS/';
class ApiConfig {
    constructor(url, method, notNeedToken = false) {
        this.url = baseUrl + url;
        this.method = method || 'post';
        this.notNeedToken = notNeedToken;
    }
}

const a = {
    // 源网荷储

    // 查询设备详情曲线
    getCpsEquipCurve: new ApiConfig('outAccessMonitor/getOutAccessEquipCurve'),
    // 查询终端设备列表
    getCpsEquipList: new ApiConfig('outAccessMonitor/getOutAccessEquipList'),
    // 用户类型信息
    getTypeInfo: new ApiConfig('outAccessMonitor/getOutAccessTypeInfo', 'get'),
    // 查询用户详情曲线
    getCpsUserCurve: new ApiConfig('outAccessMonitor/getOutAccessUserCurve'),
    // 查询用户列表
    getCpsUserInfo: new ApiConfig('outAccessMonitor/getOutAccessUserInfo'),

};
const b = {
    // cps监测

    // 查询设备详情曲线
    getCpsEquipCurve: new ApiConfig('cpsMonitor/getCpsEquipCurve'),
    // 查询终端设备列表
    getCpsEquipList: new ApiConfig('cpsMonitor/getCpsEquipList'),
    // 用户类型信息
    getTypeInfo: new ApiConfig('cpsMonitor/getTypeInfo', 'get'),
    // 查询用户详情曲线
    getCpsUserCurve: new ApiConfig('cpsMonitor/getCpsUserCurve'),
    // 查询用户列表
    getCpsUserInfo: new ApiConfig('cpsMonitor/getCpsUserInfo'),
};
export const HttpUrl = getHttpService(a)
export const HttpUrlCps = getHttpService(b)
