<!--
 * @Description  : 年月日时分秒选择
 * @Author       : 陈凯
 * @Date         : 2023-07-31 17:14:53
 * @LastEditors  : 陈凯
 * @LastEditTime : 2024-01-19 14:18:41
 * @FilePath     : \init-project\src\components\HourMinuteSecond\index.vue
-->

<template>
  <div style="width: 100%">
    <!-- 年月日 -->
    <el-date-picker
      :disabled="disabled || dateDisabled"
      :clearable="false"
      v-model="time"
      placeholder="请选择年月日"
      value-format="yyyy-MM-dd"
      type="date"
      class="dateChoose"
      style="width: 50% !important"
      @change="setDate"
    />
    <!-- 小时 -->
    <el-select
      v-model="dayTime.hour"
      placeholder="小时"
      style="width: 25%"
      :disabled="disabled"
      @change="setDate"
    >
      <el-option
        v-for="dict in hourOptions"
        :key="dict"
        :label="dict"
        :value="dict"
      />
    </el-select>
    <!-- 分钟 -->
    <el-select
      v-model="dayTime.minute"
      placeholder="分钟"
      style="width: 25%"
      :disabled="disabled"
      @change="setDate"
    >
      <el-option
        v-for="dict in minuteOptions"
        :key="dict"
        :label="dict"
        :value="dict"
      />
    </el-select>
  </div>
</template>

<script>
const hours = [
  '00',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
];
export default {
  props: {
    atDate: {
      type: [String, Date],
      default: '',
    },
    disabled: {
      type: [Boolean, String],
      default: false,
    },
    dateDisabled: {
      type: [Boolean, String],
      default: false,
    },
    startHour: {
      type: [String, Number],
      default: '00',
    },
  },
  watch: {
    atDate: {
      handler(newV) {
        if (newV.length > 0) {
          this.time = newV.substring(0, 10);
          this.dayTime.hour = newV.substring(11, 13);
          this.dayTime.minute = newV.substring(14, 16);
        }
      },
      immediate: true,
      deep: true,
    },
    startHour: {
      handler(newV) {
        let idx = hours.indexOf(newV);
        let hourArr = hours.slice(idx);
        this.hourOptions = hourArr;
      },
    },
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      time: this.getYearMonthDay(new Date()),
      // 小时下拉选项
      hourOptions: hours,
      // 分钟下拉选项
      minuteOptions: ['00', '15', '30', '45'],
      dayTime: {
        hour: '00',
        minute: '00',
      },
    };
  },

  methods: {
    // 时间选择
    setDate() {
      this.$emit(
        'handleDate',
        this.time + ' ' + this.dayTime.hour + ':' + this.dayTime.minute + ':00'
      );
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-icon-date {
  display: none;
}
::v-deep .el-input--prefix .el-input__inner {
  padding-left: 1.1rem !important;
  user-select: none;
}
::v-deep .el-input--suffix .el-input__inner {
  padding: 0 0.625rem;
  user-select: none;
}
::v-deep .el-input__suffix-inner .el-input__icon {
  font-size: 0.75rem;
}
::v-deep .el-input {
  width: 100% !important;
}
</style>
