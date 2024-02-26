/** 用户管理 */
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
    /** 新增-修改源网荷储用户 */
    addAndUpdateOutAccessConsumer: new APIConfig('rsOutAccessConsumer/addAndUpdateOutAccessConsumer'),
    // 批量删除源网荷储用户
    deleteBatchOutAccessConsumer: new APIConfig('rsOutAccessConsumer/deleteBatchOutAccessConsumer'),
    // 源网荷储上送用户导出
    exportOutAccessConsumer: new APIConfig('rsOutAccessConsumer/exportOutAccessConsumer'),
    // 源网荷储上送用户导入
    importOutAccessConsumer: new APIConfig('rsOutAccessConsumer/importOutAccessConsumer'),

    // 分页查询源网荷储用户
    listOutAccessConsumer: new APIConfig('rsOutAccessConsumer/listOutAccessConsumer'),
    // 源网荷储上送用户-新增-用户下拉框
    queryAllRsConsumers: new APIConfig('rsOutAccessConsumer/queryAllRsConsumers'),
    // 通过id查询源网荷储用户
    queryOutAccessConsumerDetail: new APIConfig('rsOutAccessConsumer/queryOutAccessConsumerDetail'),
    // 查询所有源网荷储运营商
    queryAllOutAccessOperator: new APIConfig('rsOutAccessOperator/queryAllOutAccessOperator'),
    // 模板下载
    downloadFileOutAccessConsumer: new APIConfig('rsOutAccessConsumer/downloadFileOutAccessConsumer'),

};
// cps
const b = {
    /** 新增-修改CPS用户 */
    addAndUpdateOutAccessConsumer: new APIConfig('rsWsCpsConsumerUp/addAndUpdateWsCpsConsumerUp'),
    // 批量删除CPS用户
    deleteBatchOutAccessConsumer: new APIConfig('rsWsCpsConsumerUp/deleteBatchWsCpsConsumerUp'),
    // CPS上送用户导出
    exportOutAccessConsumer: new APIConfig('rsWsCpsConsumerUp/exportWsCpsConsumerUp'),
    // CPS上送用户导入
    importOutAccessConsumer: new APIConfig('rsWsCpsConsumerUp/importWsCpsConsumerUp'),
    // 分页查询CPS用户
    listOutAccessConsumer: new APIConfig('rsWsCpsConsumerUp/listWsCpsConsumerUp'),
    // 查询所有CPS上送集成商
    queryAllWsCpsDru: new APIConfig('rsWsCpsDru/queryAllWsCpsDru'),

    // 通过id查询CPS用户
    queryOutAccessConsumerDetail: new APIConfig('rsWsCpsConsumerUp/queryWsCpsConsumerUpDetail'),
    // 模板下载
    downloadFileOutAccessConsumer: new APIConfig('rsWsCpsConsumerUp/downloadFileWsCpsConsumer'),
};
export const HttpUrl = getHttpService(a)
export const HttpUrlCps = getHttpService(b)

