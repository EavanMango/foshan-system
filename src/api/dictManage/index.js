/** 字典管理 */
import { getHttpService } from '@/api/request';
const baseUrl = process.env.VUE_APP_SERVER_PERFORM_API + '/SYS/sysDataDict';
class APIConfig {
  constructor(url, method, notNeedToken = false) {
    this.url = baseUrl + url;
    this.method = method || 'post';
    this.notNeedToken = notNeedToken;
  }
}

export const HttpUrl = {
  /** 新增字典数据 */
  saveOrUpdateSysDictData: new APIConfig('/saveOrUpdateSysDictData'),
  /** 删除字典数据 */
  deleteSysDictData: new APIConfig('/deleteSysDictData'),
  /** 通过dict_type查询字典数据 */
  getSysDictDataByDictType: new APIConfig('/getSysDictDataByDictType'),
  /** getJSAreas */
  getSysDictDataByPage: new APIConfig('/getSysDictDataByPage'),
};

export default getHttpService(HttpUrl);
