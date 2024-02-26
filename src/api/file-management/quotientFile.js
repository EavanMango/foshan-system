import { getHttpService } from '@/api/request';
const baseUrl = process.env.VUE_APP_SERVER_PERFORM_API + '/RS';
class ApiConfig {
  constructor(url, method, notNeedToken = false) {
    this.url = baseUrl + url;
    this.method = method;
    this.notNeedToken = notNeedToken;
  }
}

export const HttpUrl = {
  // 集成商档案管理
  // 新增-修改用户档案
  saveOrUpdateAggregator: new ApiConfig(
    '/rsAggregator/saveOrUpdateAggregator',
    'post'
  ),
  // 用户档案导出
  exportAggregatorExcel: new ApiConfig(
    '/rsAggregator/exportAggregatorExcel',
    'post'
  ),
  // 批量删除用户档案
  deleteAggregatorBatch: new ApiConfig(
    '/rsAggregator/deleteRsAggregatorsBatch',
    'post'
  ),
  // 导入用户档案
  importAggregatorExcel: new ApiConfig(
    '/rsAggregator/importAggregatorExcel',
    'post'
  ),
  //分页查询用户档案
  paginatedAggregator: new ApiConfig(
    '/rsAggregator/paginatedAggregator',
    'post'
  ),
  // 通过id查询聚合商档案详情
  getAggregator: new ApiConfig('/rsAggregator/getRsAggregatorById', 'post'),
};
export default getHttpService(HttpUrl);
