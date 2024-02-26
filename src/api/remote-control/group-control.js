/** 群组管理 */
import { getHttpService } from '@/api/request';
const baseUrl = process.env.VUE_APP_SERVER_PERFORM_API + '/SCADA/group';
class APIConfig {
  constructor(url, method, notNeedToken = false) {
    this.url = baseUrl + url;
    this.method = method || 'post';
    this.notNeedToken = notNeedToken;
  }
}

export const HttpUrl = {
  /** 根据群组id获取群组用户 */
  getConsByGroupId: new APIConfig('/getConsByGroupId'),
  /** 修改或保存群组 */
  saveOrUpdateGroup: new APIConfig('/saveOrUpdateGroup'),
  /** 解绑用户 */
  groupUnLinkCons: new APIConfig('/groupUnLinkCons'),
  /** 群组绑定用户 */
  groupLinkCons: new APIConfig('/groupLinkCons'),
  /** 获取群组列表 */
  getGroupList: new APIConfig('/getGroupList'),
  /** 删除群组 */
  deleteGroup: new APIConfig('/deleteGroup'),
};

export default getHttpService(HttpUrl);
