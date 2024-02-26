import { getHttpService } from '@/api/request';
const baseUrl = process.env.VUE_APP_SERVER_PERFORM_API + '/RS';
class ApiConfig {
  constructor(url, method = 'post', notNeedToken = false) {
    this.url = baseUrl + url;
    this.method = method;
    this.notNeedToken = notNeedToken;
  }
}

export const HttpUrl = {
  // 设备档案管理
  // 新增-修改设备档案
  addOrUpdateEquip: new ApiConfig('/rsEquipment/addOrUpdateEquip', 'post'),
  // 用户档案导出
  exportEquip: new ApiConfig('/rsEquipment/exportEquip', 'post'),
  // 批量删除用户档案
  deleteEquip: new ApiConfig('/rsEquipment/deleteEquip', 'post'),
  // 导入设备档案
  importExcel: new ApiConfig('/rsEquipment/importEquipmentExcel', 'post'),
  //分页查询用户档案
  equipList: new ApiConfig('/rsEquipment/equipList', 'post'),
  // 通过id查询用户档案详情
  equipDetail: new ApiConfig('/rsEquipment/equipDetail', 'post'),
  // 根据名称查询用户
  getConsByName: new ApiConfig('/rsConsumer/getConsByName', 'post'),
  // 上级设备下拉
  queryEquipsByConsId: new ApiConfig('/rsEquipment/queryEquipsByConsId', 'post'),
  // 模板导出
  downloadFileRsEquip: new ApiConfig('/rsEquipment/downloadFileRsEquip', 'post'),


};
export default getHttpService(HttpUrl);
