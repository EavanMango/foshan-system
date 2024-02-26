import {MessageBox} from "element-ui";

/** 深拷贝 */
export const DeepClone = function (data) {
  return JSON.parse(JSON.stringify(data))
}

/** 删除弹窗 */
export function confirmDecorator(message, type = 'warning') {
  return function (target, name, descriptor) {
    let oldFn = descriptor.value
    descriptor.value = function (...args) {
      MessageBox.confirm(message, "确认删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type,
      }).then(oldFn.bind(this, ...args)).catch(() => {
      })
    }
    return descriptor
  }
}

/** 修改弹窗 */
export function confirmEditDecorator(message, type = 'warning') {
  return function (target, name, descriptor) {
    let oldFn = descriptor.value
    descriptor.value = function (...args) {
      MessageBox.confirm(message, "确认修改", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type,
      }).then(oldFn.bind(this, ...args)).catch(() => {
      })
    }
    return descriptor
  }
}

/** 数据类型 */
export function isTypeData(data) {
  let toStrings = Object.prototype.toString
  let dataType =
      data instanceof Element
          ? 'element'
          : toStrings
              .call(data)
              .replace(/\[object\s(.+)\]/, '$1')
              .toLowerCase()
  return dataType
}

/** 处理数据几位数
 * @params num 保留几位小数
 * @params data 数据
 * */
export function handlerDataNum(data, num = 2) {
  if (typeof data === 'number') {
    data = Number(data)
  }
  if (isNaN(data)) {
    return data
  }
  if (data === 0) {
    return 0
  }

  if (data == null) {
    return '-'
  }
  return data.toFixed(num)
}
