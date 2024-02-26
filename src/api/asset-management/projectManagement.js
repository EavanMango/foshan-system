import { getHttpService } from '@/api/request';
const baseUrl = process.env.VUE_APP_SERVER_PERFORM_API + '/RS/project/';
class ApiConfig {
    constructor(url, method, notNeedToken = false) {
        this.url = baseUrl + url;
        this.method = method || 'post';
        this.notNeedToken = notNeedToken;
    }
}

export const HttpUrl = {
    //项目管理

    // 项目新增
    addOrUpdateProject: new ApiConfig('addOrUpdateProject'),
    // 项目删除
    deleteProject: new ApiConfig('deleteProject'),
    // 文件下载
    downloadFile: new ApiConfig('downloadFile'),
    // 查询项目
    getProject: new ApiConfig('getProject'),
    // 根据id查询项目
    getProjectById: new ApiConfig('getProjectById'),
    // 查询项目名称列表
    getProjectNameList: new ApiConfig('getProjectNameList', 'get'),

    // 文件上传
    uploadFile: new ApiConfig('uploadFile'),


};
export default getHttpService(HttpUrl);
