
import {AesUtil} from "./aes-util";

export class StorageUtil {
  constructor(_storage) {
    this._storage = _storage
  }

  /** 获取 */
  get(key) {
    const data = window[this._storage].getItem(key);
    const result = JSON.parse(data)?.value;
    return AesUtil.decrypt(result);
  }

  /** 存储 */
  set(key, value) {
    const target = {
      timestamp: new Date().getTime(),
      value: AesUtil.encrypt(value)
    }
    window[this._storage].setItem(key, JSON.stringify(target));
  }

  /** 批量存储 */
  setBatch(obj) {
    if (!obj || typeof obj !== 'object') {
      return new Error('传入格式不正确！')
    }
    let objKeys = Reflect.ownKeys(obj)
    objKeys.forEach(k => {
      this.set(k, obj[k])
    })
  }

  remove(key) {
    window[this._storage].removeItem(key)
  }

  /** 判断是否含有某个属性 */
  has(key) {
    return window[this._storage].hasOwnProperty(key)
  }
}


class localStorage extends StorageUtil {
  constructor() {
    super("localStorage");
  }
}

class sessionStorage extends StorageUtil {
  constructor() {
    super("sessionStorage");
  }
}

export const localStorageUtil = new localStorage()
export const sessionStorageUtil = new sessionStorage()

