<template>
  <div class="calendar-container">
    <el-calendar ref="refCalendar" v-model="nowdate">
      <template slot="dateCell" slot-scope="{ data }">
        <div style="position: relative; text-align: center">
          <div
            :class="getColor(data)"
            style="z-index: 1"
            :id="data.day"
            @click="chooseDay2(data.day)"
          >
            {{ data.day.split('-').slice(2)[0] }}
          </div>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      value: new Date(),
      // nowdate: '2023-03',
      nowdate: this.getNowFormatDate(new Date(), 'month'),
      dayList: [],
      isSelect: '',
    };
  },
  props: {
    // 当前选中日期 月份
    currentMonth: {
      type: [String, Date],
      required: false,
      default: () => {
        // return '2023/02/01'
        return new Date();
      },
    },
    // 默认选中的日期, 今天； 可接收格式如 ‘2019/12/01’ 或 ‘2019-12-01’ 标准UTC格式时间
    choosedDate: {
      type: [String, Date],
      required: false,
      default: () => {
        return new Date();
      },
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
  computed: {
    monthValue: {
      get: function () {
        return this.nowdate;
      },
      set: function (newValue) {
        this.nowdate = newValue;
      },
    },
  },
  watch: {
    choosedDate(newChoosedDate) {
      this.dayList = [];
      this.getData();
    },
  },

  methods: {
    getData() {
      this.nowdate = this.getNowFormatDate(this.currentMonth, 'month');

      if (this.fillTheValley) {
        this.fillTheValley.forEach(e => {
          this.dayList.push({ dayTime: e, style: 'green' });
        });
      }
      if (this.peakClipping) {
        this.peakClipping.forEach(e => {
          this.dayList.push({ dayTime: e, style: 'yellow' });
        });
      }
      //   API_COMMON.datetime({
      //     monthTime: this.nowdate,
      //   }).then(res => {
      //     res.data.asType.forEach(e => {
      //       this.dayList.push(e);
      //     });
      //     res.data.drType.forEach(v => {
      //       this.dayList.push(v);
      //     });
      this.isSelect = this.choosedDate;
      //     this.chooseDay(res.data.infoDTO.dayTime, res.data.infoDTO);
      //   });
    },
    getColor(data) {
      let val = data.day;
      let result = '';
      this.dayList.forEach(e => {
        if (e.dayTime === val) {
          result = e.style;
        }
      });
      // if (data.isSelected && result) {
      //   if (result === 'green') {
      //     result = 'selectedgreen'
      //   } else if (result === 'yellow') {
      //     result = 'selectedyellow'
      //   }
      // }
      if (this.isSelect == val) {
        if (result === 'green') {
          result = 'selectedgreen';
        } else if (result === 'yellow') {
          result = 'selectedyellow';
        }
      }
      if (result === '') {
        result = 'disableDate';
      }
      return result;
    },

    chooseDay(val, info) {
      const days = val.split('-');
      this.$emit(
        'handleDay',
        { year: days[0], month: days[1], item: days[2] },
        info
      );
    },
    chooseDay2(val) {
      for (let i = 0; i < this.dayList.length; i++) {
        if (val == this.dayList[i].dayTime) {
          this.isSelect = val;
          this.$emit('handleDay', val);
        }
      }
    },
    //月下拉选框
    changeMonth() {
      this.nowdate = new Date(this.nowdate);
      let yyyymm = this.formatDate(this.nowdate);
      let yyyymmdd = yyyymm + '-01';
      for (let i = 1; i < 31; i++) {
        let day = yyyymm + '-' + (i < 10 ? '0' + i : i);
        if (this.hasDate(day)) {
          yyyymmdd = day;
          break;
        }
      }
      this.nowdate = this.formatDate(this.nowdate);
      this.getData();
    },

    hasDate(val) {
      let result = false;
      if (!val) {
        return result;
      }
      this.dayList.forEach(e => {
        if (e.dayTime === val) {
          result = true;
        }
      });
      return result;
    },

    formatDate(val) {
      var date = new Date(Number(val)); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      var M =
        date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1;
      return Y + M;
    },
    getNowFormatDate(time, type, partition) {
      let date = new Date(time);
      let seperator1 = partition ? partition : '-';
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = '0' + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate;
      }
      let currentdate = year + seperator1 + month + seperator1 + strDate;
      let currentMonth = year + seperator1 + month;
      if (type == 'month') {
        return currentMonth;
      } else {
        return currentdate;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/css-theme/handle.scss';

.calendar-container {
  width: 100%;
  height: 100%;

  .header {
    padding: 0 10px;
  }

  .content {
    .spandate {
      height: 100%;
      text-align: center;
      align-items: center;
      display: flex;
      justify-content: center;
    }
  }

  .el-calendar {
    height: 100%;
    background-color: transparent;
    // background-image: url('../../assets/images/calendar-bg.png');
    background-size: 100% 100%;
  }

  ::v-deep .el-input__inner {
    color: #ffffff;
    border-color: #3184d5;
    background-color: rgba(2, 250, 245, 0);
    font-size: 1.4rem;
  }
  ::v-deep .el-input__icon {
    font-size: 1.4rem;
  }
  ::v-deep .el-icon-date {
    display: none;
  }
  //去掉日历中自带的年月按钮
  ::v-deep .el-button-group {
    display: none !important;
  }

  ::v-deep .el-calendar__title {
    display: none !important;
  }

  ::v-deep .el-calendar__header {
    display: none !important;
  }

  ::v-deep .el-calendar-table td {
    border: none !important;
  }

  ::v-deep .el-calendar-table thead {
    // background-image: url('../../assets/images/week-bg.png');
    background-size: 100% 100%;
    th {
      @include font_color('fontColor');
      text-align: center;
    }
  }

  ::v-deep .el-calendar-table:not(.is-range) td.next,
  .el-calendar-table:not(.is-range) td.prev {
    display: none !important;
  }

  ::v-deep .el-calendar-table:not(.is-range) td.next,
  .el-calendar-table:not(.is-range) td.prev {
    display: none !important;
  }
  ::v-deep .el-calendar {
    .el-calendar-table:not(.is-range) td.next {
      display: none;
    }

    .el-calendar-table:not(.is-range) td.prev {
      /*隐藏上个月的日期*/
      visibility: hidden;
    }
  }

  ::v-deep .el-calendar-table .el-calendar-day:hover {
    background-color: transparent;
  }
  ::v-deep .el-calendar-table td.is-selected {
    background-color: transparent;
  }
}
/*::v-deep  .el-calendar-table .el-calendar-day {*/
/*  height: 120px;*/
/*}*/
::v-deep .el-calendar-table__row {
  width: 100%;
  :first-child {
    margin-top: 10px;
  }
}

// ::v-deep .el-calendar-table thead tr {
//   border-bottom: 100px solid white;
// }
.yellow,
.green,
.selectedgreen,
.selectedyellow {
  position: relative;
}
.green::after,
.selectedgreen::after {
  background-color: #52c41a80;
  content: '';
  display: inline-block;
  width: 0.375rem;
  height: 0.375rem;
  position: absolute;
  border-radius: 50%;
  bottom: -0.375rem;
  left: calc(50% - 3px);
}

.yellow::after,
.selectedyellow::after {
  // width: 200%;
  // height: 0;
  // padding-bottom: 200%;
  // border-radius: 50%;
  // margin-left: -50%;
  background-color: #d09724;
  content: '';
  display: inline-block;
  width: 0.375rem;
  height: 0.375rem;
  position: absolute;
  border-radius: 50%;
  bottom: -0.375rem;
  left: calc(50% - 3px);
}

.selectedgreen::after {
  background-color: #425aed;
  content: '';
  display: inline-block;
  width: 0.375rem;
  height: 0.375rem;
  position: absolute;
  border-radius: 50%;
  bottom: -0.375rem;
  left: calc(50% - 3px);
}
.selectedyellow::after {
  background-color: #425aed;
  content: '';
  display: inline-block;
  width: 0.375rem;
  height: 0.375rem;
  position: absolute;
  border-radius: 50%;
  bottom: -0.375rem;
  left: calc(50% - 3px);
}

.disableDate {
  cursor: not-allowed; //禁用鼠标样式
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: #999999;
}
// ::v-deep .el-date-editor.el-input {
//   width: 15rem;
//   height: 2.5rem;
// }
::v-deep .el-calendar__body {
  padding: 0px;
  height: 100%;
  width: 100%;
  table {
    height: 100% !important;
    width: 100%;
  }
}

// ::v-deep .el-calendar-table tbody {
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   height: calc(100% - 45px);
// }
// ::v-deep .el-calendar-table__row {
//   height: 50px !important;
// }
::v-deep .el-calendar-table .el-calendar-day {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 0;
}
::v-deep .el-calendar-table__row :first-child {
  margin-top: 5px;
}
</style>
