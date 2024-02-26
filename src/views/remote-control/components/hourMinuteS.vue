<!--
 * @Description  : 年月日时分秒选择
 * @Author       : 陈凯
 * @Date         : 2023-07-31 17:14:53
 * @LastEditors  : 陈凯
 * @LastEditTime : 2023-11-20 09:36:23
 * @FilePath     : \init-project\src\views\remote-control\components\hourMinuteS.vue
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
const hours = [];
const minutes = [];
for (let i = 0; i < 24; i++) {
  hours.push(i < 10 ? '0' + i : i);
}
for (let i = 0; i < 60; i++) {
  minutes.push(i < 10 ? '0' + i : i);
}
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
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      time: this.getYearMonthDay(new Date()),
      hourOptions: hours,
      minuteOptions: minutes,
      dayTime: {
        hour: '00',
        minute: '00',
      },
    };
  },

  methods: {
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
  padding-left: 1rem !important;
  user-select: none;
}
::v-deep .el-input--suffix .el-input__inner {
  padding: 0 0.625rem;
  padding-left: 1rem;
  user-select: none;
}
::v-deep .el-input__suffix-inner .el-input__icon {
  font-size: 12px;
}
::v-deep .el-input {
  width: 100% !important;
}
</style>
