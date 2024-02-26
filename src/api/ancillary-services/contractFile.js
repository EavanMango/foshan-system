import { getHttpService } from '@/api/request';
const baseUrl = process.env.VUE_APP_SERVER_PERFORM_API + '/AS/contract/';
class ApiConfig {
    constructor(url, method, notNeedToken = false) {
        this.url = baseUrl + url;
        this.method = method || 'post';
        this.notNeedToken = notNeedToken;
    }
}

export const HttpUrl = {
    //合同档案

    // 合同档案删除
    deleteAsContract: new ApiConfig('deleteAsContract'),
    // 辅助服务合同档案-新增-修改-用户
    queryAsConsList: new ApiConfig('queryAsConsList'),

    // 合同档案详情查询
    queryAsContractDetail: new ApiConfig('queryAsContractDetail'),

    // 合同档案查询
    queryAsContractList: new ApiConfig('queryAsContractList'),
    // 合同档案新增-修改
    saveOrUpdateAsContract: new ApiConfig('saveOrUpdateAsContract'),

    // 合同上传
    uploadAsContractFile: new ApiConfig('uploadAsContractFile'),
    // 合同下载
    downloadFileAsContract: new ApiConfig('downloadFileAsContract'),
    // 合同预览
    asContractPreview: new ApiConfig('asContractPreview'),
};
export default getHttpService(HttpUrl);
