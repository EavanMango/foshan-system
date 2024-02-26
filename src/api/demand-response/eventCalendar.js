import { getHttpService } from '@/api/request';
const baseUrl = process.env.VUE_APP_SERVER_PERFORM_API + '/DR';
class ApiConfig {
  constructor(url, method = 'post', notNeedToken = false) {
    this.url = baseUrl + url;
    this.method = method;
    this.notNeedToken = notNeedToken;
  }
}

export const HttpUrl = {
  // 事件日历
  // 参与用户
  queryDrConsumerListInEvent: new ApiConfig(
    '/drConsumer/queryDrConsumerListInEvent'
  ),
  // 未参与用户
  queryDrConsumerListNotInEvent: new ApiConfig(
    '/drConsumer/queryAllDrConsumerList'
  ),
  // 修改数据查询
  queryUpData: new ApiConfig('/drConsumer/queryUpData'),
  // 添加事件修改
  addEvent: new ApiConfig('/drEvent/addEvent'),
  // 添加事件导出
  addEventExport: new ApiConfig('/drEvent/addEventExport'),
  // 分解响应
  decompositionResponse: new ApiConfig('/drEvent/decompositionResponse'),
  // 导入事件日历
  importEventConsExcel: new ApiConfig('/drEvent/importEventConsExcel'),
  // 邀约结束确认
  invitationEndConfirmation: new ApiConfig(
    '/drEvent/invitationEndConfirmation'
  ),
  // 事件日历查询
  listEvent: new ApiConfig('/drEvent/listEvent'),
  // 分页查询用户列表
  listEventPeriodCons: new ApiConfig('/drEvent/listEventPeriodCons'),
  // 详情曲线--用户列表
  queryConsCurveDetail: new ApiConfig('/drEvent/queryConsCurveDetail'),
  // 详情曲线
  queryEventCurveDetail: new ApiConfig('/drEvent/queryEventCurveDetail'),
  // 事件执行查询
  queryEventDetail: new ApiConfig('/drEvent/queryEventDetail'),
  // 刷新结算
  refreshSettlement: new ApiConfig('/drEvent/refreshSettlement'),
  // 撤销
  revoke: new ApiConfig('/drEvent/revoke'),
  // 事件日
  queryHaveEventDay: new ApiConfig('/drEvent/queryHaveEventDay'),
  // 查询用户时间线
  queryEventTimeline: new ApiConfig('/drEvent/queryEventTimeline'),


  // 保存到草稿箱
  addOrUpdateEventDraftBox: new ApiConfig('/drEvent/addOrUpdateEventDraftBox'),
  // 草稿箱查询
  queryDraftBoxData: new ApiConfig('/drEvent/queryDraftBoxData'),
  // 删除草稿箱
  deleteBatchDraftBox: new ApiConfig('/drEvent/deleteBatchDraftBox'),
  // 时间轴用户确认
  timeConsConfirm: new ApiConfig('/drEvent/timeConsConfirm'),


};
export default getHttpService(HttpUrl);
