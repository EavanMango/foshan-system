/** 设备模板 */
import { getHttpService } from '@/api/request'
const baseUrl = process.env.VUE_APP_SERVER_PERFORM_API + '/RS'
class APIConfig {
  constructor(url, method, notNeedToken = false) {
    this.url = baseUrl + url
    this.method = method || 'post'
    this.notNeedToken = notNeedToken
  }
}

export const HttpUrl = {
  /** 测点绑定 */
  addEquipMeasLink: new APIConfig('/rsEquipMeasLink/addEquipMeasLink'),
  /** 新增-修改设备量测模板 */
  addOrUpdateEquipMeasTmpl: new APIConfig(
    '/rsEquipMeasTmpl/addOrUpdateEquipMeasTmpl'
  ),
  /** 批量删除设备量测模板 */
  deleteBatchEquipMeasTmpl: new APIConfig(
    '/rsEquipMeasTmpl/deleteBatchEquipMeasTmpl'
  ),
  /** 批量解绑 */
  deleteBatchMeasLink: new APIConfig('/rsEquipMeasLink/deleteBatchMeasLink'),
  /** 设备量测模板数据导出 */
  exportEquipMeasTmplDetail: new APIConfig(
    '/rsEquipMeasTmpl/exportEquipMeasTmplDetail'
  ),
  /** 测点关联 */
  linkMeas: new APIConfig('/rsEquipMeasLink/linkMeas'),
  /** 查询设备量测模板 */
  queryAllEquipMeasTmpl: new APIConfig(
    '/rsEquipMeasTmpl/queryAllEquipMeasTmpl'
  ),
  /** 分页查询设备量测模板数据 */
  queryEquipMeasTmplDetail: new APIConfig(
    '/rsEquipMeasTmpl/queryEquipMeasTmplDetail'
  ),
  /** 设备模板排序(equipMeasTmplId,measId,sort) */
  sortBatchMeasLink: new APIConfig(
    '/rsEquipMeasLink/sortBatchMeasLink'
  ),
  /** 解除关联 */
  unLinkMeas: new APIConfig(
    '/rsEquipMeasLink/unLinkMeas'
  ),
  // // 新增-修改设备量测模板
  // addOrUpdateEquipMeasTmpl: new APIConfig(
  //   '/rsEquipMeasTmpl/addOrUpdateEquipMeasTmpl'
  // )
}

export default getHttpService(HttpUrl)
