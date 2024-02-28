/** 负荷监测 */
import { getHttpService } from '@/api/request';
const baseUrl = process.env.VUE_APP_SERVER_PERFORM_API + '/RS/monitor';
class APIConfig {
  constructor(url, method, notNeedToken = false) {
    this.url = baseUrl + url;
    this.method = method || 'post';
    this.notNeedToken = notNeedToken;
  }
}

export const HttpUrl = {
  /** 设备树查询 */
  queryEquipTree: new APIConfig('/queryEquipTree'),
  // 设备监测列表查询
  monitorEquipList: new APIConfig('/monitorEquipList'),
  // 用户监测查询列表
  monitorConsList: new APIConfig('/monitorConsList'),
  /** 查询负荷曲线 */
  queryCurveP: new APIConfig('/queryCurveP'),
  /** 地区-行业下用户信息查询 */
  queryAreaOrTradeInfo: new APIConfig('/queryAreaOrTradeInfo'),
  /** 用户运行参数查询 */
  queryConsRunInfo: new APIConfig('/queryConsRunInfo'),
  /** 用户树查询 */
  queryConsTree: new APIConfig('/queryConsTree'),
  /** 设备运行参数查询 */
  queryEquipRunInfo: new APIConfig('/queryEquipRunInfo'),
  /** 地区-行业下用户信息查询 */
  queryAreaOrTradeInfo: new APIConfig('/queryAreaOrTradeInfo'),
  /** 设备量测曲线查询 */
  queryEquipMeasCurve: new APIConfig('/queryEquipMeasCurve'),
  /** 设备量测模型监测 */
  queryEquipMeasInfo: new APIConfig('/queryEquipMeasInfo'),
  /** 设备树查询 */
  queryEquipTree: new APIConfig('/queryEquipTree'),
  /** 查询测点实时曲线数据 */
  getMeasRtCurveValues: {
    url:
      process.env.VUE_APP_SERVER_PERFORM_API +
      '/SCADA/hisData/getMeasRtCurveValues',
    method: 'post',
    notNeedToken: false,
  },

  // 天气
  getWeather: new APIConfig('/getWeather'),
};

export default getHttpService(HttpUrl);
