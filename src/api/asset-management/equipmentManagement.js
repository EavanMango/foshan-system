import { getHttpService } from '@/api/request';
const baseUrl = process.env.VUE_APP_SERVER_PERFORM_API + '/RS/projectEquip/';
class ApiConfig {
    constructor(url, method, notNeedToken = false) {
        this.url = baseUrl + url;
        this.method = method || 'post';
        this.notNeedToken = notNeedToken;
    }
}

export const HttpUrl = {
    //设备管理

    // 项目设备的新增或者更新
    addOrUpdateProjectEquip: new ApiConfig('addOrUpdateProjectEquip'),
    // 项目设备的删除
    deleteProjectEquip: new ApiConfig('deleteProjectEquip'),
    // 文件下载
    downloadFile: new ApiConfig('downloadFile'),
    // 照片下载
    downloadPhoto: new ApiConfig('downloadPhoto'),
    // 用户Id和名称的键值对
    getConsumerIdNameMap: new ApiConfig('getConsumerIdNameMap', 'get'),
    // 项目Id和名称键值对
    getProjectIdNameMap: new ApiConfig('getProjectIdNameMap', 'get'),
    // 照片预览
    previewPhoto: new ApiConfig('previewPhoto'),

    // 项目设备的查询
    queryProjectEquip: new ApiConfig('queryProjectEquip'),
    // 项目设备详情的查询
    queryProjectEquipDetail: new ApiConfig('queryProjectEquipDetail'),

    // 文件上传
    uploadFile: new ApiConfig('uploadFile'),
    // 照片上传
    uploadPhoto: new ApiConfig('uploadPhoto'),


};
export default getHttpService(HttpUrl);
