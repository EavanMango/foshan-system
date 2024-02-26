/** 负荷预测-定时任务 */
import { getHttpService } from '@/api/request';
const baseUrl = process.env.VUE_APP_SERVER_PERFORM_API + '/SCADA/FestTask/';
class APIConfig {
    constructor(url, method, notNeedToken = false) {
        this.url = baseUrl + url;
        this.method = method || 'post';
        this.notNeedToken = notNeedToken;
    }
}

export const HttpUrl = {
    // 配置新增-修改
    addOrUpdateFestTask: new APIConfig('addOrUpdateFestTask'),
    // 删除配置
    deleteFestTask: new APIConfig('deleteFestTask'),
    // 获取配置ID和名称的映射关系
    getFestTaskMap: new APIConfig('getFestTaskMap'),
    // 分页查询配置列表
    queryFestTaskList: new APIConfig('queryFestTaskList'),



};

export default getHttpService(HttpUrl);
