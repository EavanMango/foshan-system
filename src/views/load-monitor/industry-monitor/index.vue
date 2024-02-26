<!--
 * @Description  : 地市监测
 * @Author       : 陈凯
 * @Date         : 2023-08-17 14:59:53
 * @LastEditors  : 陈凯
 * @LastEditTime : 2024-02-02 14:11:03
 * @FilePath     : \init-project\src\views\load-monitor\industry-monitor\index.vue
-->

<template>
  <div class="app-container">
    <div
      class="topSelect flex_align_center border-radius-10 margin-bottom-15 padding-left-right-20 text-color swiper swiper-container"
    >
      <div class="flex_row_a swiper-wrapper">
        <el-radio
          class="swiper-slide"
          v-for="area in areaList"
          :key="area.id"
          v-model="currentAreaId"
          :label="area.dictValue"
          @input="handleRadioChange"
          >{{ area.dictLabel }}</el-radio
        >
      </div>
      <div class="swiper-button-prev" @click="handleSlidePrev"></div>
      <div class="swiper-button-next" @click="handleSlideNext"></div>
    </div>
    <div class="cardBox flex_row_s margin-bottom-15 text-color">
      <div class="eachCard flex_row_a border-radius-10">
        <div style="height: 100%" class="flex_row_c">
          <img height="50%" src="../../../assets/load-monitor/组 25602@2.png" />
          <span class="font-size-18 margin-left-20">名称</span>
        </div>
        <span class="font-size-18 font-weight-bold">{{ currentAreaName }}</span>
      </div>
      <div
        class="eachCard flex_row_a border-radius-10 pointer"
        @click="jumpHistory"
      >
        <div style="height: 100%" class="flex_row_c">
          <img height="50%" src="../../../assets/load-monitor/组 25603@2.png" />
          <span class="font-size-18 margin-left-20">用户数</span>
        </div>
        <span class="font-size-18 font-weight-bold jumpColor bigHover"
          >{{ KeepDecimal(areaData.userNum) }}
          <span class="font-size-18 font-weight-lighter">户</span>
        </span>
      </div>
      <div class="eachCard flex_row_a border-radius-10">
        <div style="height: 100%" class="flex_row_c">
          <img height="50%" src="../../../assets/load-monitor/组 25605@2.png" />
          <span class="font-size-18 margin-left-20">设备数</span>
        </div>
        <span class="font-size-18 font-weight-bold"
          >{{ KeepDecimal(areaData.equipNum) }}
          <span class="font-size-18 font-weight-lighter">台</span>
        </span>
      </div>
      <div class="eachCard flex_row_a border-radius-10">
        <div style="height: 100%" class="flex_row_c">
          <img height="50%" src="../../../assets/load-monitor/组 25607@2.png" />
          <span class="font-size-18 margin-left-20">设备在线率</span>
        </div>
        <span class="font-size-18 font-weight-bold"
          >{{ KeepDecimal(areaData.onlineRate) }} %</span
        >
      </div>
      <div class="eachCard flex_row_a border-radius-10">
        <div style="height: 100%" class="flex_row_c">
          <img height="50%" src="../../../assets/load-monitor/组 25608@2.png" />
          <span class="font-size-18 margin-left-20">设备运行率</span>
        </div>
        <span class="font-size-18 font-weight-bold"
          >{{ KeepDecimal(areaData.runRate) }} %</span
        >
      </div>
    </div>
    <div class="content-box flex_row_s">
      <div class="leftBox border-radius-10 padding-15">
        <div class="headerTitle">基本信息</div>
        <div
          class="eachInfor border-radius-10 flex_row_l"
          v-for="(item, index) in leftBottomData"
          :key="index"
        >
          <div class="flex_row_l width60">
            <img style="width: 1rem" :src="commonImg[item.key]" />
            <div class="text-align-right margin-left-10">{{ item.label }}</div>
          </div>
          <div class="text-center flex-1">{{ KeepDecimal(item.value) }}</div>
        </div>
      </div>
      <div
        class="echartBox border-radius-10 padding-15 flex_dir_col width100"
        v-loading="loading"
      >
        <div class="headerTitle">
          用电负荷信息
          <div class="float-right flex_row_s">
            <ControlCharts
              :chartInstance="chartInstance"
              class="margin-right-10"
            ></ControlCharts>
            <el-date-picker
              :clearable="false"
              style="width: 9.375rem"
              :picker-options="pickerOptions"
              v-model="date"
              value-format="yyyy-MM-dd"
              size="mini"
              type="date"
              @change="getCurveData"
            />
          </div>
        </div>
        <div class="flex-1 width100">
          <LineChart
            ref="historyChart"
            :xData="chartOption.xData"
            :data="chartOption.data"
            :muilYAxis="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import lm_api from '@/api/load-monitor';
import dict_api from '@/api/dictManage';
import LineChart from '../comp/LineChart.vue';
import ControlCharts from '../comp/ControlCharts.vue';
import { DateUtil } from '@/utils/date-util';
import Swiper from 'swiper';
const AreaDataMap = [
  {
    key: 'nowLoadVal',
    label: '当前负荷(kW)',
    value: '-',
  },
  {
    key: 'capacity',
    label: '装机容量(kVA)',
    value: '-',
  },
  {
    key: 'downPower',
    label: '削峰能力(kW)',
    value: '-',
  },
  {
    key: 'upPower',
    label: '填谷能力(kW)',
    value: '-',
  },
  {
    key: 'drUserNum',
    label: '需求响应用户',
    value: '-',
  },
  {
    key: 'asUserNum',
    label: '辅助服务用户',
    value: '-',
  },
  // {
  //   label: '非工用户数',
  //   value: '-',
  // },
];
const darkImage = {
  nowLoadVal: require('../../../assets/load-monitor/dark/当前负荷t(kW).png'),
  capacity: require('../../../assets/load-monitor/dark/装机容量(kVA).png'),
  downPower: require('../../../assets/load-monitor/dark/削峰能力(kW).png'),
  upPower: require('../../../assets/load-monitor/dark/填谷能力(kW).png'),
  drUserNum: require('../../../assets/load-monitor/dark/需求响应用户.png'),
  asUserNum: require('../../../assets/load-monitor/dark/辅助服务用户.png'),
};
const lightImage = {
  nowLoadVal: require('../../../assets/load-monitor/light/当前负荷t(kW).png'),
  capacity: require('../../../assets/load-monitor/light/装机容量(kVA).png'),
  downPower: require('../../../assets/load-monitor/light/削峰能力(kW).png'),
  upPower: require('../../../assets/load-monitor/light/填谷能力(kW).png'),
  drUserNum: require('../../../assets/load-monitor/light/需求响应用户.png'),
  asUserNum: require('../../../assets/load-monitor/light/辅助服务用户.png'),
};
export default {
  name: 'cityMonitor',
  components: {
    LineChart,
    ControlCharts,
  },
  data() {
    return {
      loading: false,
      chartInstance: null,
      mySwiper: null,
      currentAreaId: '',
      currentAreaName: '',
      areaList: [],
      areaData: {},
      date: new Date(),
      chartOption: {
        xData: [],
        data: [],
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      leftBottomData: AreaDataMap,
      commonImg:
        sessionStorage.getItem('themeColor') == 'blue' ? lightImage : darkImage,
    };
  },
  created() {
    this.getArea();
  },
  mounted() {
    window.addEventListener('setItem', () => {
      this.commonImg =
        sessionStorage.getItem('themeColor') == 'blue' ? lightImage : darkImage;
    });
  },
  watch: {
    currentAreaId() {
      this.getAreaDataInfo();
      this.getCurveData();
    },
  },
  mounted() {
    this.mySwiper = new Swiper('.swiper-container', {
      loop: false, // 循环模式选项
      direction: 'horizontal',
      grabCursor: true,
      allowSlidePrev: true, // 启用向前切换
      allowSlideNext: true, // 启用向后切换
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  },
  methods: {
    async getArea() {
      const res = await dict_api.getSysDictDataByDictType({
        param: 'consumer_trade_cate',
      });
      if (res.code !== 200) return;
      this.areaList = res.data;
      this.currentAreaId = this.areaList[0].dictValue;
      this.currentAreaName = this.areaList[0].dictLabel;
    },
    async getAreaDataInfo() {
      const res = await lm_api.queryAreaOrTradeInfo({
        flag: '1',
        typeCode: this.currentAreaId,
      });
      if (res.code !== 200) return;
      this.areaData = res.data;
      this.leftBottomData = AreaDataMap.map(d => {
        d.value = this.areaData[d.key] ?? '-';
        return d;
      });
    },
    async getCurveData() {
      this.loading = true;
      const res = await lm_api.queryCurveP({
        dataType: 1,
        date: DateUtil.transformData(this.date, 'YYYY-MM-DD'),
        sid: this.currentAreaId,
      });
      if (res.code !== 200) return;
      this.chartOption.xData = res.data.times;
      this.chartOption.xData.push('24:00');
      this.chartOption.data = [
        { name: '基线负荷', data: res.data.baselineValP, unit: 'kw' },
        { name: '昨日负荷', data: res.data.yesterdayValP, unit: 'kw' },
        { name: '今日负荷', data: res.data.todayValP, unit: 'kw' },
      ];
      this.chartInstance = this.$refs.historyChart.getChartInstance();
      this.loading = false;
    },
    handleRadioChange(val) {
      this.currentAreaId = val;
      this.currentAreaName = this.areaList.find(
        d => d.dictValue == val
      ).dictLabel;
    },
    handleSlidePrev() {
      const swiperWrapper = document.querySelector('.swiper-wrapper');
      let scrollLeft = swiperWrapper.scrollLeft;
      if (scrollLeft <= 0) {
        swiperWrapper.scrollLeft = 0;
      } else {
        swiperWrapper.scrollLeft = scrollLeft - 50;
      }
      // console.log(this.mySwiper.slidePrev());
    },
    handleSlideNext() {
      const swiperWrapper = document.querySelector('.swiper-wrapper');
      let scrollLeft = swiperWrapper.scrollLeft;
      swiperWrapper.scrollLeft = scrollLeft + 50;
      // console.log(this.mySwiper.slideNext());
    },
    KeepDecimal(v) {
      if (v == null || v == '-') return '-';
      let d = v * 100;
      return Math.round(+d.toFixed(2)) / 100;
    },
    jumpHistory() {
      this.$router.push({
        path: '/load-monitor/history-monitor',
        query: {
          tradeCate: this.currentAreaId,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/css-theme/handle.scss';
.topSelect {
  height: 7%;
  min-height: 45px;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-content: center;
  justify-content: center;
  @include background_color('layout_menu_submenu_item_bg');
}
.cardBox {
  height: 10%;

  .eachCard {
    width: 19.7%;
    height: 100%;
    @include background_color('layout_menu_submenu_item_bg');
  }
}
.content-box {
  height: calc(83% - 30px);

  .leftBox {
    width: 19.7%;
    height: 100%;
    @include background_color('layout_menu_submenu_item_bg');
    .eachInfor {
      width: 100%;
      height: 3rem;
      line-height: 3rem;
      margin-bottom: 1rem;
      padding: 0 10px;
      @include background_color('inforColor');
      transition: 0.3s;
      // &:hover {
      //   transform: rotate(5deg);
      //   margin: 1.5rem 0;
      // }
    }
  }
  .echartBox {
    width: 79.9%;
    height: 100%;
    @include background_color('layout_menu_submenu_item_bg');
  }
}
.swiper {
  position: relative;
}
.swiper-wrapper {
  height: 100%;
  width: calc(100% - 80px);
  overflow: hidden;
}
.swiper-slide {
  height: auto;
  width: auto !important;
}
.swiper-button-prev:after,
.swiper-button-next:after {
  font-size: 15px;
}
.bigHover {
  transition: 0.3s;
  &:hover {
    transform: scale(1.2);
  }
}
::v-deep .el-radio {
  margin-right: 3rem !important;
}
</style>
