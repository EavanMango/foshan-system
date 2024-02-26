import { getHttpService } from '@/api/request';
const baseUrl = process.env.VUE_APP_SERVER_PERFORM_API + '/RS/projectConsumer/';
class ApiConfig {
    constructor(url, method, notNeedToken = false) {
        this.url = baseUrl + url;
        this.method = method || 'post';
        this.notNeedToken = notNeedToken;
    }
}

export const HttpUrl = {
    //用户管理

    // 项目用户新增或者更新
    addOrUpdateProjectConsumer: new ApiConfig('addOrUpdateProjectConsumer'),

    // 项目用户的删除
    deleteProjectConsumer: new ApiConfig('deleteProjectConsumer'),

    // 建筑材料下载
    downloadContractFile: new ApiConfig('downloadContractFile'),
    // 调试记录下载
    downloadDebugFile: new ApiConfig('downloadDebugFile'),

    // 用户Id和名称的键值对
    getConsumerIdNameMap: new ApiConfig('getConsumerIdNameMap', 'get'),
    // 项目Id和名称的键值对
    getProjectIdNameMap: new ApiConfig('getProjectIdNameMap', 'get'),



    // 项目用户查询
    queryConsumer: new ApiConfig('queryConsumer'),
    // 单个用户详情查询
    queryConsumerDetail: new ApiConfig('queryConsumerDetail'),
    // 建筑材料上传
    uploadContractFile: new ApiConfig('uploadContractFile'),
    // 调试记录上传
    uploadDebugFile: new ApiConfig('uploadDebugFile'),

};
export default getHttpService(HttpUrl);
