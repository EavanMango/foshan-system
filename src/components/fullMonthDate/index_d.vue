<!--
 * @Description  : 横向排序时间组件(两排)
 * @Author       : 陈凯
 * @Date         : 2023-03-15 17:42:38
 * @LastEditors  : chenkai
 * @LastEditTime : 2024-01-23 14:25:21
 * @FilePath     : \init-project\src\components\fullMonthDate\index_d.vue
-->
<template>
  <div class="calendarBox width100 overflow-hidden border-radius-10">
    <div
      class="date-list width100 padding-0 relative text-align-left overflow-hidden"
    >
      <div
        class="w-h-100 relative flex_wrap flex_row_l"
        :style="{
          transform: 'translateX(' + translateX + 'px)',
        }"
      >
        <div
          class="date-item relative text-align-center"
          v-for="(day, index) in dateList"
          :key="index"
          @click="day.forbid && changeChoosedDay(day)"
          :class="{
            'choosed-day': day.dateFormat == choosedDay.dateFormat,
            today: day.dateFormat == today.dateFormat && lang == 'zh',
            'date-item-weekend': day.isWeekend,
            'date-highlighted': highlightedDates.includes(day.dateFormat),
            forbid: !day.forbid,
            choosedItemColor: day.dateFormat == choosedDay.dateFormat,
          }"
          :style="{
            'background-color':
              day.dateFormat == choosedDay.dateFormat
                ? choosedItemColor
                : day.dateFormat == today.dateFormat
                ? todayItemColor
                : '',
            'border-radius': '10px',
          }"
          :data-date="day.month + '-' + day.date + '-' + day.year"
        >
          <slot :day="day" :today="today" :choosedDay="choosedDay">
            <template>
              <div class="mainDayFlex width100 flex_wrap">
                <p class="date-item-day width100 font-weight-bold">
                  {{ day.day }}
                </p>
                <p
                  class="date-item-date font-weight-bold width100"
                  v-if="day.dateFormat == today.dateFormat && lang == 'zh'"
                  v-bind:style="{
                    color:
                      day.dateFormat == choosedDay.dateFormat
                        ? '#fff'
                        : day.dateFormat == today.dateFormat
                        ? '#fff'
                        : '',
                  }"
                >
                  今
                </p>
                <p class="date-item-date font-weight-bold width100" v-else>
                  {{ day.date }}
                </p>

                <img
                  v-if="day.forbid == 1"
                  style="width: 25%; margin: auto"
                  src="@/assets/ancillary-services/greenban.png"
                />
                <img
                  v-else-if="day.forbid == 2"
                  style="width: 25%; margin: auto"
                  src="@/assets/ancillary-services/yellowban.png"
                />
                <img
                  v-else
                  style="width: 25%; margin: auto"
                  src="@/assets/ancillary-services/blueban.png"
                />
              </div>
            </template>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'fullMonthDate',
  props: {
    // 默认选中的日期, 今天； 可接收格式如 ‘2019/12/01’ 或 ‘2019-12-01’
    choosedDate: {
      type: [String, Date],
      required: false,
      default: () => {
        return new Date();
      },
    },
    // 当前选中日期 月份
    currentMonth: {
      type: [String, Date],
      required: false,
      default: () => {
        // return '2023/02/01'
        return new Date();
      },
    },
    // custom highlight days, format ['2021/07/01','2021/12/01']
    highlightedDates: {
      type: Array,
      required: false,
      default: () => {
        return [];
      },
    },

    // 当前默认选中的日期所处的位置，'left，center'，'right'，默认左
    choosedDatePos: {
      type: String,
      required: false,
      default: 'left',
    },
    // 最小日期，可接收格式如 ‘2019/12/01’ 或 ‘2019-12-01’
    minDate: {
      type: [String, Date],
      required: false,
      default: '',
    },
    // 最大日期，可接收格式如 ‘2019/12/01’ 或 ‘2019-12-01’
    maxDate: {
      type: [String, Date],
      required: false,
      default: '',
    },
    // 选中的日期背景色
    choosedItemColor: {
      type: String,
      required: false,
      default: 'rgb(13, 214, 224)',
    },
    // ‘今天’未选中时的背景色
    todayItemColor: {
      type: String,
      required: false,
      default: 'rgba(0,0,0,0.3)',
    },

    // 屏幕尺寸改变时，是否重绘日历组件
    resizeable: {
      type: Boolean,
      required: false,
      default: true,
    },
    // 语言；可选值：zh(中文)，en(英文)
    lang: {
      type: String,
      required: false,
      default: 'zh',
    },
    // 填谷
    fillTheValley: {
      type: Array,
      required: false,
      default: () => {},
    },
    // 削峰
    peakClipping: {
      type: Array,
      required: false,
      default: () => {},
    },
  },
  data() {
    return {
      firstDay: {}, //当前显示的第一个日期
      visibleDay: '', // 计算屏幕可放置的日期方块的数量
      changeCount: 7, //点击左右箭头，增量的日期数量，默认为7天
      choosedDay: {}, // 当前选中的日期
      dateList: [], // 当前的日期列表
      today: {}, // 今天
      // 动画数据
      rectWidth: 50,
      translateX: -this.changeCount * this.rectWidth,
      domWidth: 0, // 日历组件宽度
      swipeLeftMore: true, // 是否还能左滑
      swipeRightMore: true, // 是否还能右滑
    };
  },
  mounted() {
    this.init();
    // 触发change事件
    // this.$emit("change", this.choosedDay);
  },
  methods: {
    init() {
      // 根据屏幕宽度，判断可显示的日期方块的数量
      this.domWidth = this.$el.scrollWidth;
      let n = (this.domWidth - 60) / this.rectWidth;
      // 可显示日期数量 = 可完全显示的数量+1 （除非div的宽度刚刚好被rectWidth整除）
      if (n % 1 != 0) {
        n = parseInt(n) + 1;
      }
      this.visibleDay = new Date(
        new Date(this.currentMonth).getFullYear(),
        new Date(this.currentMonth).getMonth() + 1,
        0
      ).getDate();
      // "今天"
      this.today = this.formatOneDay(new Date());
      // "当前选中的日期"
      this.choosedDay = this.formatOneDay(this.choosedDate);
      // 第一天
      this.firstDay = this.formatOneDay(this.getFirst());
      this.creatList();
      // 事件回调: 当前显示的第一天的数据
      this.$emit('firstDayChange', this.firstDay);
    },
    // 初始化，生成一列日期
    creatList() {
      const list = [];
      const firstDayTime = this.firstDay.timestamp;
      for (let i = 0; i < this.visibleDay; i++) {
        const timestamp = firstDayTime + 1000 * 60 * 60 * 24 * i; //用第一天的时间戳+24小时*i天
        const info = this.formatOneDay(new Date(timestamp));
        list.push(info);
      }
      this.dateList = list;
      this.dateList.forEach(val => {
        if (this.fillTheValley.includes(val.dateFormat)) {
          val.forbid = 1;
        }
        if (this.peakClipping.includes(val.dateFormat)) {
          val.forbid = 2;
        }
      });
      // console.log(this.dateList);
      this.translateX = 0;

      // 重置左右滑动限制
      this.swipeLeftMore = true;
      this.swipeRightMore = true;
    },
    // 日期点击事件
    changeChoosedDay(day) {
      this.choosedDay = day;
      if (day.forbid) {
        this.$emit('change', day);
      }
    },

    // 格式化单个日期的数据
    formatOneDay(day) {
      const timestamp = new Date(day).getTime();
      const date = this.formatDateTime(timestamp); // 2019/06/01
      const dateArray = date.split('-'); // [2019,06,01]
      // 去掉补位的0
      for (const key in dateArray) {
        if (dateArray[key].indexOf('0') == 0) {
          dateArray[key] = dateArray[key].substr(1, 1);
        }
      }
      const week = new Date(timestamp).getDay();
      return {
        dateFormat: date,
        year: dateArray[0],
        month: dateArray[1],
        date: dateArray[2],
        timestamp: new Date(date).getTime(),
        day: this.getWeekName(week),
        isWeekend: week == 0 || week == 6,
      };
    },
    //获取本月第一天，格式为年月日
    getFirst() {
      let date = new Date(this.currentMonth);
      date.setDate(1);
      let cTime = new Date(new Date(date).toLocaleDateString()).getTime();
      //将时间戳转换成时间格式
      let date1 = new Date(cTime);
      let year = date1.getFullYear();
      let month = date1.getMonth() + 1;
      let day = date1.getDate();
      month = month < 10 ? '0' + month : month;
      day = day < 10 ? '0' + day : day;
      let ddate = year + '-' + month + '-' + day;
      return ddate;
    },
    // 返回“星期”的文字
    getWeekName(day) {
      const dict = {
        0: '日',
        1: '一',
        2: '二',
        3: '三',
        4: '四',
        5: '五',
        6: '六',
      };
      const dict_en = {
        0: 'Su',
        1: 'Mo',
        2: 'Tu',
        3: 'We',
        4: 'Th',
        5: 'Fr',
        6: 'Sa',
      };
      // 如果是英文显示
      switch (this.lang) {
        case 'en':
          return dict_en[day];
        default:
          return dict[day];
      }
    },
    // 输入时间戳，返回 YYYY-MM-DD 日期格式
    formatDateTime(timestamp) {
      if (!timestamp) return '';
      timestamp = parseInt(timestamp); // 防止传入字符串类型
      const fdt = new Date(timestamp);
      const arr = [fdt.getMonth() + 1, fdt.getDate()];
      for (let key in arr) {
        if (arr[key] < 10) {
          arr[key] = '0' + arr[key];
        }
      }
      arr.unshift(fdt.getFullYear());
      return arr[0] + '-' + arr[1] + '-' + arr[2];
    },
  },
  computed: {
    // 最小日期的0点时间戳
    minDateTimestamp() {
      if (this.minDate) {
        const day = this.formatOneDay(this.minDate);
        return day.timestamp;
      }
      return null;
    },
    // 最大日期的0点时间戳
    maxDateTimestamp() {
      if (this.maxDate) {
        const day = this.formatOneDay(this.maxDate);
        return day.timestamp;
      }
      return null;
    },
  },
  watch: {
    lang(n) {
      this.lang = n;
      this.creatList();
    },
    choosedDate(newChoosedDate) {
      this.choosedDay = this.formatOneDay(newChoosedDate);
    },
    currentMonth(newVal) {
      this.init();
    },
    fillTheValley(newV) {
      this.init();
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/css-theme/handle.scss';

.calendarBox {
  user-select: none;
  margin: 10px 0;

  @include background_color('layout_menu_bg');
}

.calendarBox * {
  margin: 0;
  padding: 0;
}

.calendarBox .date-list {
  display: inline-block;
  vertical-align: top;
  height: 10rem;
}

.calendarBox .date-item {
  width: 6.25%;
  height: 4.7rem;
  line-height: 1.25rem;
  cursor: pointer;
}
.calendarBox .date-item-date {
  font-size: 1rem;
  @include font_color('fontColor');
}
.calendarBox .date-item:hover,
.calendarBox .choosedItemColor {
  @include background_color('primaryColor');
}
.calendarBox .today,
.calendarBox .today:hover {
  border-radius: 0.6rem;
}

.calendarBox .date-item-day {
  color: #999;
  font-size: 0.7rem;
  transform: scale(0.8);
}
.mainDayFlex {
  padding: 5px 0;
}
.calendarBox .date-list .forbid:hover,
.calendarBox .date-list .forbid {
  background-color: transparent !important;
  cursor: not-allowed;
  .date-item-date {
    @include font_color_im('fontColor');
  }
}
</style>
