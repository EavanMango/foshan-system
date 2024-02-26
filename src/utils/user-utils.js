// import store from '@/store/index';
import { localStorageUtil } from '@/utils/storage-util';

export class UserUtil {
  /** 获取场站id */
  static getStationId() {
    // return store.getters.stationData.id;
  }

  /** 获取场站名称 */
  static getStationName() {
    // return store.getters.stationData.cnName;
  }

  /** 获取token */
  static getToken() {
    return localStorageUtil.get('TokenKey');
  }

  /** 存储token */
  static setToken(token) {
    return localStorageUtil.set('TokenKey', token);
  }

  /** 清空token */
  static removeToken() {
    localStorageUtil.remove('TokenKey');
  }

  /** 退出登录 */
  static logout() {
    UserUtil.removeToken();
    localStorage.removeItem('stationData');
    localStorage.removeItem('deviceList');
  }
}
