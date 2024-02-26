
import dayjs from "dayjs";

export class DayjsUtil {
  /** 指示Day.js对象是否包含有效日期 */
  static isValid(date) {
    let dateValid = dayjs(date).isValid()
    if (!dateValid) {
      throw new Error('该日期不是有效的日期')
    }
    return new Date(date)
  }

  /** 将日期转换成需要的格式*/
  static transformDate(date = new Date(), format = "YYYY-MM-DD HH:mm:ss") {
    return dayjs(DayjsUtil.isValid(date)).format(format)
  }

  /** 开始时间
   * type
   * year今年一月1日上午 00:00
   * month 本月1日上午 00:00
   * day 当天 00:00
   * */
  static dayjsStartOf(date = new Date(), type = 'year') {
    let newDate = DayjsUtil.isValid(date)
    return DayjsUtil.transformDate(dayjs(newDate).startOf(type))
  }

  /** 结束时间
   * type
   * year今年一月1日上午 00:00
   * month 本月1日上午 00:00
   * day 当天 00:00
   * */
  static dayjsEndOf(date = new Date(), type = 'year') {
    let newDate = DayjsUtil.isValid(date)
    return DayjsUtil.transformDate(dayjs(newDate).endOf(type))
  }

  /** 减去 */
  static dayjsSubtract(date = new Date(), num = 1, type = 'year') {
    let newDate = DayjsUtil.isValid(date)
    return DayjsUtil.transformDate(dayjs(newDate).subtract(num, type))
  }

  /** 加上 */
  static dayjsAdd(date = new Date(), num = 1, type = 'year') {
    let newDate = DayjsUtil.isValid(date)
    return DayjsUtil.transformDate(dayjs(newDate).add(num, type))
  }
}


