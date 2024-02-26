import { getHttpService } from '@/api/request';
const baseUrl = process.env.VUE_APP_SERVER_PERFORM_API + '/RS';
class ApiConfig {
  constructor(url, method, notNeedToken = false) {
    this.url = baseUrl + url;
    this.method = method || 'post';
    this.notNeedToken = notNeedToken;
  }
}

export const HttpUrl = {
  // 查询资源值
  queryRsInfo: new ApiConfig('/screen/queryRsInfo', 'get'),
  // 用户上送监测
  getUpConsInfos: new ApiConfig('/bulletinBoard/getUpConsInfos'),
  // 调节能力
  queryResourceAdjustAbility: new ApiConfig('/bulletinBoard/queryResourceAdjustAbility'),
  // 资源总览-行业分类
  queryBoardIndustryClassificationInfo: new ApiConfig('/bulletinBoard/queryBoardIndustryClassificationInfo'),
  // 资源总览-可调设备
  queryBoardAdjustableDeviceInfo: new ApiConfig('/bulletinBoard/queryBoardAdjustableDeviceInfo'),


};
export default getHttpService(HttpUrl);
