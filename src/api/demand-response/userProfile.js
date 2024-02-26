/** 用户档案 */
import { getHttpService } from '@/api/request';
const baseUrl = process.env.VUE_APP_SERVER_PERFORM_API + '/DR/drConsumer/';
class APIConfig {
    constructor(url, method, notNeedToken = false) {
        this.url = baseUrl + url;
        this.method = method || 'post';
        this.notNeedToken = notNeedToken;
    }
}

export const HttpUrl = {
    /** （需求响应用户档案）新增-修改用户档案 */
    addAndUpdateDrConsumer: new APIConfig('addAndUpdateDrConsumer'),
    /** （需求响应用户档案）批量删除用户档案 */
    deleteBatchDrConsumers: new APIConfig('deleteBatchDrConsumers'),
    // （需求响应用户档案）分页查询用户档案
    listDrConsumers: new APIConfig('listDrConsumers'),
    // （需求响应用户档案）用户档案详情查询
    queryDrConsumer: new APIConfig('queryDrConsumer'),
    // （需求响应用户档案）需求响应用户档案-新增-用户下拉框
    queryNoDrAlRsConsumers: new APIConfig('queryNoDrAlRsConsumers'),


};

export default getHttpService(HttpUrl);
