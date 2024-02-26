/** 测点管理 */
import { getHttpService } from '@/api/request'
const baseUrl = process.env.VUE_APP_SERVER_PERFORM_API + '/RS/rsMeasType'
class APIConfig {
  constructor(url, method, notNeedToken = false) {
    this.url = baseUrl + url
    this.method = method || 'post'
    this.notNeedToken = notNeedToken
  }
}

export const HttpUrl = {
  /** 新增-修改测点管理 */
  addAndUpdateMeasType: new APIConfig('/addAndUpdateMeasType'),
  /** 批量删除测点管理 */
  deleteBatchMeasType: new APIConfig('/deleteBatchMeasType'),
  /** 测点导出 */
  exportMeasType: new APIConfig('/exportMeasType'),
  /** 测点导入 */
  importMeasType: new APIConfig('/importMeasType'),
  /** 分页查询测点管理 */
  listMeasType: new APIConfig('/listMeasType'),
  /** 测点关联排序 */
  sortBatchMeasType: new APIConfig('/sortBatchMeasType'),
  /** 测点绑定查询 */
  listMeasTypeBind: new APIConfig('/listMeasTypeBind'),
  // 模板下载
  downloadFileMeasType: new APIConfig('/downloadFileMeasType'),

}

export default getHttpService(HttpUrl)