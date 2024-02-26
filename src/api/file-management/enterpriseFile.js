import { getHttpService } from '@/api/request';
const baseUrl = process.env.VUE_APP_SERVER_PERFORM_API;
class ApiConfig {
  constructor(url, method = 'post', notNeedToken = false) {
    this.url = baseUrl + url;
    this.method = method;
    this.notNeedToken = notNeedToken;
  }
}

export const HttpUrl = {
  // 用户档案管理
  // 新增-修改用户档案
  addAndUpdateConsumer: new ApiConfig(
    '/RS/rsConsumer/addAndUpdateConsumer',
    'post'
  ),
  // 用户档案导出
  consumerExport: new ApiConfig('/RS/rsConsumer/consumerExport', 'post'),
  // 批量删除用户档案
  deleteBatchConsumer: new ApiConfig('/RS/rsConsumer/deleteBatchConsumer', 'post'),
  // 导入用户档案
  importConsumerExcel: new ApiConfig('/RS/rsConsumer/importConsumerExcel', 'post'),
  //分页查询用户档案
  listConsumer: new ApiConfig('/RS/rsConsumer/listConsumer', 'post'),
  listConsumerUser: new ApiConfig('/SCADA/resourcePool/getControllableUser', 'post'),
  // 通过id查询用户档案详情
  queryConsumer: new ApiConfig('/RS/rsConsumer/queryConsumer', 'post'),
  // 通过id查询用户档案详情
  queryEquipTree: new ApiConfig('/RS/monitor/queryEquipTree', 'post'),
  // 模板下载
  downloadFileRsConsumer: new ApiConfig('/RS/rsConsumer/downloadFileRsConsumer', 'post'),

};
export default getHttpService(HttpUrl);
