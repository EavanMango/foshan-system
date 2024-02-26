/** 运营商管理 */
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
    /** 新增-修改源网荷储运营商 */
    addAndUpdateOutAccessOperator: new APIConfig('rsOutAccessOperator/addAndUpdateOutAccessOperator'),
    // 批量删除源网荷储运营商
    deleteBatchOutAccessOperator: new APIConfig('rsOutAccessOperator/deleteBatchOutAccessOperator'),
    // 源网荷储运营商导出
    exportOutAccessOperator: new APIConfig('rsOutAccessOperator/exportOutAccessOperator'),
    // 源网荷储运营商导入
    importOutAccessOperator: new APIConfig('rsOutAccessOperator/importOutAccessOperator'),

    // 分页查询源网荷储运营商
    listOutAccessOperator: new APIConfig('rsOutAccessOperator/listOutAccessOperator'),
    // 查询所有源网荷储运营商
    queryAllOutAccessOperator: new APIConfig('rsOutAccessOperator/queryAllOutAccessOperator'),

    // 通过id查询源网荷储运营商
    queryOutAccessOperatorDetail: new APIConfig('rsOutAccessOperator/queryOutAccessOperatorDetail'),
};
// cps
const b = {
    /** 新增-修改cps运营商 */
    addAndUpdateOutAccessOperator: new APIConfig('rsWsCpsDru/addAndUpdateWsCpsDru'),
    // 批量删除cps运营商
    deleteBatchOutAccessOperator: new APIConfig('rsWsCpsDru/deleteBatchWsCpsDru'),
    // CPS上送运营商导出
    exportOutAccessOperator: new APIConfig('rsWsCpsDru/exportWsCpsDru'),
    // CPS上送运营商导入
    importOutAccessOperator: new APIConfig('rsWsCpsDru/importWsCpsDru'),

    // 分页查询cps运营商
    listOutAccessOperator: new APIConfig('rsWsCpsDru/listWsCpsDru'),
    // 通过id查询cps运营商
    queryOutAccessOperatorDetail: new APIConfig('rsWsCpsDru/queryWsCpsDruDetail'),
};
// 虚拟电厂
const c = {

    // 新增-修改用户档案
    addAndUpdateOutAccessOperator: new APIConfig(
        '/rsAggregator/saveOrUpdateAggregator',
        'post'
    ),
    // 批量删除用户档案
    deleteBatchOutAccessOperator: new APIConfig(
        '/rsAggregator/deleteRsAggregatorsBatch',
        'post'
    ),
    // 用户档案导出
    exportOutAccessOperator: new APIConfig(
        '/rsAggregator/exportAggregatorExcel',
        'post'
    ),

    // 导入用户档案
    importOutAccessOperator: new APIConfig(
        '/rsAggregator/importAggregatorExcel',
        'post'
    ),
    //分页查询用户档案
    listOutAccessOperator: new APIConfig(
        '/rsAggregator/paginatedAggregator',
        'post'
    ),
    // 通过id查询聚合商档案详情
    queryOutAccessOperatorDetail: new APIConfig('/rsAggregator/getRsAggregatorById', 'post'),

}
export const HttpUrl = getHttpService(a)
export const HttpUrlCps = getHttpService(b)
export const HttpUrlFh = getHttpService(c)

