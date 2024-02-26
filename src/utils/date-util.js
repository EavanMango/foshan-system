
import dayjs from "dayjs";

const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

export class DateUtil {
  /** 格式化
   * @params isValid 检验当前的Dayjs对象是否是一个有效的时间
   */
  static formatDate(date) {
    let tDate = dayjs(date)
    if (!tDate.isValid()) {
      return new Error('传入的日期格式不正确')
    }
    return new Date(date)
  }

  /** 转换成固定格式 */
  static transformData(date, format = 'YYYY-MM-DD HH:mm:ss') {
    if (!date) {
      return ''
    }
    date = DateUtil.formatDate(date)
    return dayjs(date).format(format)
  }

  /** 当前时间 10分钟后 */
  static getCurrentAfter(date) {
    let min = date.getMinutes();  //2. 获取当前分钟
    date.setMinutes(min + 10);  //3. 设置当前时间+12分钟：把当前分钟数+10后的值重新设置为date对象的分钟数
    let year = date.getFullYear();
    let month = (date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1);
    let day = date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate();
    let hours = date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours()
    let minutes = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()
    let seconds = date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds()
    let formatDate = year + '-' + month + '-' + day + " " + hours + ":" + minutes + ":" + seconds;
    return formatDate;
  }

  /** 获取年月日  YYYY-MM-DD*/
  static getYearMonthDay(date) {
    date = DateUtil.formatDate(date)
    let year = date.getFullYear()
    let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    return year + '-' + month + '-' + day
  }

  /** 获取当月的第一天 */
  static getStartTime(date) {
    date.setDate(1) // 将当前时间的日期设置成第一天
    let year = date.getFullYear()
    let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    let day = date.getDate() // 得到当前天数，实际是本月第一天，因为前面setDate(1) 设置过了
    return year + '-' + month + '-' + day
  };

  /** 获取年  YYYY*/
  static getYear(date) {
    date = DateUtil.formatDate(date)
    let year = date.getFullYear()
    return String(year)
  }

  /** 获取年月  YYYY-MM*/
  static getYearMonth(date) {
    date = DateUtil.formatDate(date)
    let year = date.getFullYear()
    let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    return year + '-' + month
  }

  /** 获取年月日时分秒  YYYY-MM-DD HH:mm:ss*/
  static getDateTimeSecond(date) {
    date = DateUtil.formatDate(date)
    let year = date.getFullYear() // 年
    let month = date.getMonth() + 1; // 月
    let day = date.getDate(); // 日
    let hour = date.getHours(); // 时
    let minutes = date.getMinutes(); // 分
    let seconds = date.getSeconds() //秒
    let weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
    let week = weekArr[date.getDay()];
    // 给一位数的数据前面加 “0”
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (day >= 0 && day <= 9) {
      day = "0" + day;
    }
    if (hour >= 0 && hour <= 9) {
      hour = "0" + hour;
    }
    if (minutes >= 0 && minutes <= 9) {
      minutes = "0" + minutes;
    }
    if (seconds >= 0 && seconds <= 9) {
      seconds = "0" + seconds;
    }
    return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
  }

  /** 获取时分  HH:mm*/
  static getHourMinute(date) {
    date = DateUtil.formatDate(date)
    let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    let minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    return hour + ":" + minute
  }
  /** 获取时分  HH:mm:dd*/
  static getHourMinuteSeconds(date) {
    date = DateUtil.formatDate(date)
    let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    let minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds() //秒
    return hour + ":" + minute + ":" + seconds
  }

  /** 获取指定时间的前一天 && 后一天
   * date 代表指定的日期，格式：2018-09-27
   * day 传-1：代表开始前一天，传1：代表开始后一天
   * */
  static getNextDate(date, day) {
    let dd = new Date(date);
    dd.setDate(dd.getDate() + day);
    let y = dd.getFullYear();
    let m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
    let d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
    return y + "-" + m + "-" + d;
  };

  /** 获取指定月的前几月  后几月
   *  第一个的值 字符串类型 right 或 left
   *  left代表获取前面的时间 right代表获取后面的时间
   *  第二个参数为数字类型 代表你要向前或向后获取多少月
   * */
  static getMonthPreNext(date, type, index) {
    let arr = date.split('-');
    let year = arr[0]; //获取当前日期的年份
    let month = arr[1]; //获取当前日期的月份
    let year2 = year;
    let month2 = ''
    if (type === 'left') {
      month2 = parseInt(month) - index;
      if (month2 == 0) {
        year2 = parseInt(year2) - index;
        month2 = 12;
      }
    }
    if (type === 'right') {
      month2 = parseInt(month) + index;
      if (month2 == 0) {
        year2 = parseInt(year2) + index;
        month2 = 12;
      }
    }

    if (month2 < 10) {
      month2 = '0' + month2;
    }
    let t2 = year2 + '-' + month2
    return t2;
  }

  /** 获取指定年的前几年  后几年
   *  第一个的值 字符串类型 right 或 left
   *  left代表获取前面的时间 right代表获取后面的时间
   *  第二个参数为数字类型 代表你要向前或向后获取多少年
   * */
  static getYearPreNext(date, type, index) {
    if (type === 'left') {/* 前一年 */
      date = new Date(new Date().setFullYear(Number(date) - index)).getFullYear()
    }
    if (type === 'right') {/* 后一年 */
      date = new Date(new Date().setFullYear(Number(date) + index)).getFullYear()
    }
    return String(date)
  }

  /** 将时间戳转换为日期时分秒格式 */
  static getStampToDate(timestamp) {
    let time = new Date(timestamp)
    let year = time.getFullYear()
    let month = time.getMonth() + 1
    let date = time.getDate()
    let hours = time.getHours()
    let minute = time.getMinutes()
    let second = time.getSeconds()

    if (month < 10) { month = '0' + month }
    if (date < 10) { date = '0' + date }
    if (hours < 10) { hours = '0' + hours }
    if (minute < 10) { minute = '0' + minute }
    if (second < 10) { second = '0' + second }
    return year + '-' + month + '-' + date + ' ' + hours + ':' + minute + ':' + second
  }

  /** 获取当前时间时间戳（毫秒） */
  static getTimeStamp(date) {
    date = DateUtil.formatDate(date)
    return date.getTime()
  }

  /**
   * 获取特定时间的时间戳（秒）
   * @param date
   * @returns {number}
   */
  static getTargetTimeStamp(date = new Date()) {
    date = DateUtil.formatDate(date);
    return Math.round(date.getTime() / 1000);
  }

  /** 获取的开始时间第一天
   * @params date 日期
   * @params type 单位 day 当天 00:00
   * month 本月1日上午 00:00
   * year 今年一月1日上午 00:00
   * @params format 转化成的格式
   * */
  static getStartOf(date = new Date(), type, format = 'YYYY-MM-DD HH:mm:ss') {
    date = DateUtil.formatDate(date)
    return dayjs(date).startOf(type).format(format)
  }

  static getEndOf(date = new Date(), type, format = 'YYYY-MM-DD HH:mm:ss') {
    date = DateUtil.formatDate(date)
    return dayjs(date).endOf(type).format(format)
  }

  /** 获取的开始时间第一天
   * @params date 日期
   * @params type week  w  周
   *day  d  星期(星期日0，星期六6)
   *month  M  月份(0-11)
   *quarter  Q  依赖QuarterOfYear插件
   *year  y  年
   *hour  h  小时
   *minute  m  分钟
   * @params num 推迟几天
   * @params format 转化成的格式
   * */
  static getAddOf(date = new Date(), type, num, format = 'YYYY-MM-DD HH:mm:ss') {
    date = DateUtil.formatDate(date)
    return dayjs(date).add(num, type).format(format)
  }

  /** 计算当前月有多少天 */
  static getCalcDays(year, month) {
    if (month == '01' || month == '03' || month == '05' || month == '07' || month == '08' || month == '10' || month == '12') {
      return 31;
    }
    if (month == '02') {
      if (Number(year) % 4 == 0 && (Number(year) % 100 != 0 || Number(year) % 400 == 0)) {
        return 29;
      } else {
        return 28;
      }
    }
    return 30;
  }

}


