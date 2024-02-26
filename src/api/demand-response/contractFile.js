import { getHttpService } from '@/api/request';
const baseUrl = process.env.VUE_APP_SERVER_PERFORM_API + '/DR';
class ApiConfig {
  constructor(url, method, notNeedToken = false) {
    this.url = baseUrl + url;
    this.method = method;
    this.notNeedToken = notNeedToken;
  }
}

export const HttpUrl = {
  // 新增修改合同档案
  addAndUpdateDrContract: new ApiConfig(
    '/drContract/addAndUpdateDrContract',
    'post'
  ),
  // 批量删除合同档案
  deleteBatchDrContract: new ApiConfig(
    '/drContract/deleteBatchDrContract',
    'post'
  ),
  // 合同档案详情
  queryContractDetail: new ApiConfig('/drContract/queryContractDetail', 'post'),
  //   分页查询合同档案
  queryContractPage: new ApiConfig('/drContract/queryContractPage', 'post'),
  // 合同档案-新增-数据填充
  queryDrConsumerDetail: new ApiConfig(
    '/drContract/queryDrConsumerDetail',
    'post'
  ),
  // 合同档案-新增-用户下拉框
  queryDrConsumers: new ApiConfig('/drContract/queryDrConsumers', 'post'),
  // 文件上传
  uploadDrContractFile: new ApiConfig('/drContract/uploadDrContractFile', 'post'),
  // 合同下载
  downloadFileDrContract: new ApiConfig('/drContract/downloadFileDrContract', 'post'),
  // 预览
  drContractPreview: new ApiConfig('/drContract/drContractPreview', 'post'),

};
export default getHttpService(HttpUrl);
