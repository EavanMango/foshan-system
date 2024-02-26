/** 设备管理 */
import { getHttpService } from '@/api/request';
const baseUrl = process.env.VUE_APP_SERVER_PERFORM_API + '/RS/';
class APIConfig {
    constructor(url, method, notNeedToken = false) {
        this.url = baseUrl + url;
        this.method = method || 'post';
        this.notNeedToken = notNeedToken;
    }
}
// 源网荷储
const a = {
    /** 新增-修改源网荷储设备 */
    addAndUpdateOutAccessConsumerEquip: new APIConfig('rsOutAccessConsumerEquip/addAndUpdateOutAccessConsumerEquip'),
    // 批量删除源网荷储设备
    deleteBatchOutAccessConsumerEquip: new APIConfig('rsOutAccessConsumerEquip/deleteBatchOutAccessConsumerEquip'),
    // 源网荷储上送设备导出
    exportOutAccessConsumerEquip: new APIConfig('rsOutAccessConsumerEquip/exportOutAccessConsumerEquip'),
    // 分页查询源网荷储设备
    listOutAccessConsumerEquip: new APIConfig('rsOutAccessConsumerEquip/listOutAccessConsumerEquip'),
    // 源网荷储-CPS上送用户-新增-用户下拉框(1;源网 ；2;cps)
    queryAllOutRsConsumers: new APIConfig('rsOutAccessConsumerEquip/queryAllOutRsConsumers'),
    // 源网荷储上送设备管理-新增-设备选择
    queryAllRsEquipments: new APIConfig('rsOutAccessConsumerEquip/queryAllRsEquipments'),
};
// cps
const b = {
    /** 新增-修改CPS设备 */
    addAndUpdateOutAccessConsumerEquip: new APIConfig('rsWsCpsUp/addAndUpdateWsCpsUp'),
    // 批量删除CPS设备
    deleteBatchOutAccessConsumerEquip: new APIConfig('rsWsCpsUp/deleteBatchWsCpsUp'),
    // CPS上送设备导出
    exportOutAccessConsumerEquip: new APIConfig('rsWsCpsUp/exportWsCpsUp'),
    // CPS上送设备导入
    importWsCpsUp: new APIConfig('rsWsCpsUp/importWsCpsUp'),

    // 分页查询CPS设备
    listOutAccessConsumerEquip: new APIConfig('rsWsCpsUp/listWsCpsUp'),
    // CPS上送设备-新增-设备下拉框
    queryAllRsEquipments: new APIConfig('rsOutAccessConsumerEquip/queryAllRsEquipments'),
    // 通过id查询CPS设备
    queryWsCpsUpDetail: new APIConfig('rsWsCpsUp/queryWsCpsUpDetail'),
    // 模板下载
    downloadFileWsCpsUp: new APIConfig('rsWsCpsUp/downloadFileWsCpsUp'),

    // 分页查询CPS上送设备测点
    listWsCpsMeasUp: new APIConfig('rsWsCpsMeasUp/listWsCpsMeasUp'),
    // 新增-修改CPS上送设备测点
    addAndUpdateWsCpsMeasUp: new APIConfig('rsWsCpsMeasUp/addAndUpdateWsCpsMeasUp'),
    // 删除CPS上送设备测点
    deleteWsCpsMeasUp: new APIConfig('rsWsCpsMeasUp/deleteWsCpsMeasUp'),
    // 测点绑定查询
    listMeasTypeBind: new APIConfig('rsMeasType/listMeasTypeBind'),
    // 通过id查询CPS上送设备测点详情
    queryWsCpsMeasUpDetail: new APIConfig('rsWsCpsMeasUp/queryWsCpsMeasUpDetail'),
    // CPS上送集成商导入
    importWsCpsMeasUp: new APIConfig('rsWsCpsMeasUp/importWsCpsMeasUp'),



};
export const HttpUrl = getHttpService(a)
export const HttpUrlCps = getHttpService(b)

