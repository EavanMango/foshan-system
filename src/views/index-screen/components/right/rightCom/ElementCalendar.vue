<template>
  <div class="calendar-container">
    <div style="padding-left: 0.6rem">
      <el-date-picker
        v-model="monthValue2"
        type="month"
        size="mini"
        @change="changeMonth"
        :clearable="false"
        :picker-options="pickerOptions"
        value-format="yyyy-MM"
        style="width: 8rem"
      ></el-date-picker>
    </div>
    <el-calendar ref="refCalendar" v-model="nowdate">
      <template slot="dateCell" slot-scope="{ data }">
        <div
          style="
            position: relative;
            text-align: center;
            height: 100%;
            align-items: center;
            display: flex;
            justify-content: center;
          "
        >
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
// import { API_COMMON } from '../../api/home/index';
export default {
  data() {
    return {
      monthValue2: new Date(),
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

  mounted() {
    // this.getData();
  },

  methods: {
    getData() {
      API_COMMON.datetime({
        monthTime: this.nowdate,
      }).then(res => {
        res.data.asType.forEach(e => {
          this.dayList.push(e);
        });
        res.data.drType.forEach(v => {
          this.dayList.push(v);
        });
        this.isSelect = res.data.infoDTO.dayTime;
        this.chooseDay(res.data.infoDTO.dayTime, res.data.infoDTO);
      });
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
      //   } else if (result === 'blue') {
      //     result = 'selectedblue'
      //   }
      // }
      if (this.isSelect == val) {
        if (result === 'green') {
          result = 'selectedgreen';
        } else if (result === 'blue') {
          result = 'selectedblue';
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
          const days = val.split('-');
          this.$emit(
            'handleDay',
            {
              year: days[0],
              month: days[1],
              item: days[2],
            },
            this.dayList[i]
          );
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
.calendar-container {
  width: 100%;
  height: 100%;

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
    height: calc(100% - 3rem);
    background-color: transparent;
  }

  ::v-deep .el-input__inner {
    color: #ffffff;
    border-color: #3184d5;
    background-color: rgba(2, 250, 245, 0);
  }
  ::v-deep .el-input__icon {
    margin-right: 1rem;
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
    background-image: url('../../../../../assets/index-screen/week-bg.png');
    background-size: 100% 100%;
    th {
      color: #ffffff;
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

.green {
  width: 5rem;
  height: 5rem;
  position: absolute;
  background-color: #52c41a80;

  /*opacity:0.9;*/
  padding: 0;
  border-radius: 50%;
  line-height: 4.6rem;
}
.blue {
  width: 5rem;
  height: 5rem;
  position: absolute;
  background-color: #00a7ff80;
  opacity: 0.6;
  padding: 0;
  border-radius: 50%;
  line-height: 4.6rem;
}

.selectedgreen {
  width: 5rem;
  height: 5rem;
  position: absolute;
  background-color: #52c41a;
  padding: 0;
  /*opacity:0.6;*/
  border-radius: 50%;
  color: #ffffff;
  line-height: 4.6rem;
}
.selectedblue {
  width: 5rem;
  height: 5rem;
  position: absolute;
  background-color: #00a7ff;
  /*opacity:0.6;*/
  padding: 0;
  border-radius: 50%;
  color: #ffffff;
  line-height: 4.6rem;
}

.disableDate {
  cursor: not-allowed; //禁用鼠标样式
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: #999999;
}

::v-deep .el-calendar-table {
  height: 100%;
  width: 100%;
  background-image: url('../../../../../assets/index-screen/calendar-bg.png');
  background-size: 100% 100%;
}
::v-deep .el-calendar__body {
  padding: 0.6rem;
  height: 100%;
}

::v-deep .el-calendar-table .el-calendar-day {
  height: 60%;
}
::v-deep .el-calendar-table thead tr {
  border-bottom: 100px solid white;
}
</style>
