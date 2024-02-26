import { getHttpService } from '@/api/request';
const baseUrl = process.env.VUE_APP_SERVER_PERFORM_API + '/RS';
class ApiConfig {
    constructor(url, method, notNeedToken = false) {
        this.url = baseUrl + url;
        this.method = method || 'post';
        this.notNeedToken = notNeedToken;
    }
}

export const HttpUrl = {
    // 预测管理

    // 批量删除预测用户
    deleteRsAggregatorsBatch: new ApiConfig('/predict/deleteRsAggregatorsBatch'),
    // 查询指定用户的两种准确率曲线
    getPredictCustomerAccuracyShow: new ApiConfig('/predict/getPredictCustomerAccuracyShow'),
    // 查询指定用户的两种类型的曲线
    getPredictCustomerShow: new ApiConfig('/predict/getPredictCustomerShow'),
    // 预测用户展示
    predictCustomerPageList: new ApiConfig('/predict/predictCustomerPageList'),
    // 预测日志分页展示
    predictLogPageList: new ApiConfig('/predict/predictLogPageList'),
    // 补算用户分页查询
    predictReCalcCustPageList: new ApiConfig('/predict/predictReCalcCustPageList'),
    // 预测补算
    predictReCalculation: new ApiConfig('/predict/predictReCalculation'),
    // 批量解绑
    batchUnbind: new ApiConfig('/predict/batchUnbind'),

    // 查询未绑定用户
    predictCustomerPageListNotFcst: new ApiConfig('/predict/predictCustomerPageListNotFcst'),
    // 绑定
    batchBinding: new ApiConfig('/predict/batchBinding'),
    // 预测日志
    eventLogPageList: new ApiConfig('/predict/eventLogPageList'),
    // 通过事件id查询用户分页信息
    eventConsPageList: new ApiConfig('/predict/eventConsPageList'),
    // 预测用户准确率分页展示
    predictCustomerAccuracyPageList: new ApiConfig('/predict/predictCustomerAccuracyPageList'),
    // 预测数据导出
    exportPredictData: new ApiConfig('/predict/exportPredictData'),
    // 模型修改
    updateFcstModel: new ApiConfig('/predict/updateFcstModel'),

    // 预测天数修改
    updateFcstDateCount: new ApiConfig('/predict/updateFcstDateCount'),
    // 预测准确率公式展示
    getAccuracyFormula: new ApiConfig('/predict/getAccuracyFormula'),
    // 准确率表格
    getPredictCustomerAccuracyTable: new ApiConfig('/predict/getPredictCustomerAccuracyTable'),
    // 准确率导出

    exportAccuracyData: new ApiConfig('/predict/exportAccuracyData'),

};
export default getHttpService(HttpUrl);
