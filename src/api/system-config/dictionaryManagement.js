import { getHttpService } from '@/api/request';
const baseUrl = process.env.VUE_APP_SERVER_PERFORM_API + '/SYS';
class ApiConfig {
  constructor(url, method, notNeedToken = false) {
    this.url = baseUrl + url;
    this.method = method;
    this.notNeedToken = notNeedToken;
  }
}

export const HttpUrl = {
  // 字典管理
  // 分页查询字典类型
  showSysDictTypeByPage: new ApiConfig(
    '/sysTypeDict/showSysDictTypeByPage',
    'post'
  ),
  // 删除字典类型
  deleteSysDictType: new ApiConfig('/sysTypeDict/deleteSysDictType', 'post'),
  // 新增字典类型
  addSysDictType: new ApiConfig('/sysTypeDict/saveOrUpdateSysDictType', 'post'),
  // 分页查询子项字典数据
  getSysDictDataByPage: new ApiConfig(
    '/sysDataDict/getSysDictDataByPage',
    'post'
  ),
  // 删除子项数据
  deleteSysDictData: new ApiConfig('/sysDataDict/deleteSysDictData', 'post'),

  //子项新增修改
  addSysDictData: new ApiConfig('/sysDataDict/saveOrUpdateSysDictData', 'post'),
};
export default getHttpService(HttpUrl);
