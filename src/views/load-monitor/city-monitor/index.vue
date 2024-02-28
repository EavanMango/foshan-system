<!--
 * @Description  : 地区监测
 * @Author       : 陈凯
 * @Date         : 2023-08-17 14:59:53
 * @LastEditors  : 陈凯
 * @LastEditTime : 2024-02-27 16:27:57
 * @FilePath     : \foushan-system\src\views\load-monitor\city-monitor\index.vue
-->

<template>
  <div class="app-container">
    <div
      class="topSelect flex_row_s border-radius-10 margin-bottom-15 padding-left-right-20"
    >
      <el-radio
        v-for="area in areaList"
        :key="area.id"
        v-model="currentAreaId"
        :label="area.id"
        @input="handleRadioChange"
        >{{ area.name }}</el-radio
      >
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
          >{{ areaData.onlineRate ?? '-' }} %</span
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
            <!-- <i class="iconfont font" style="width: 20px; color: #000"></i> -->
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
import area_api from '@/api/areaManage';
import LineChart from '../comp/LineChart.vue';
import ControlCharts from '../comp/ControlCharts.vue';
import { DateUtil } from '@/utils/date-util';

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
  components: {
    LineChart,
    ControlCharts,
  },
  data() {
    return {
      loading: false,
      chartInstance: null,
      currentAreaId: 440600,
      currentAreaName: '佛山',
      areaList: [
        { name: '佛山市', id: 440600 },
        { name: '顺德区', id: 440606 },
        { name: '禅城区', id: 440604 },
        { name: '南海区', id: 440605 },
        { name: '高明区', id: 440608 },
        { name: '三水区', id: 440607 },
      ],
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
    // this.getArea();
    this.getAreaDataInfo();
    this.getCurveData();
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
  methods: {
    async getArea() {
      const res = await area_api.getAreaListByParentId({
        param: '320000',
      });
      if (res.code !== 200) return;
      this.areaList = [{ name: '全省', id: 320000 }, ...res.data];
      this.currentAreaId = this.areaList[0].id;
      this.currentAreaName = this.areaList[0].name;
    },
    async getAreaDataInfo() {
      // const res = await lm_api.queryAreaOrTradeInfo({
      //   flag: '2',
      //   typeCode: this.currentAreaId,
      // });
      // if (res.code !== 200) return;
      // this.areaData = res.data;
      // this.leftBottomData = AreaDataMap.map(d => {
      //   d.value = this.areaData[d.key] ?? '-';
      //   return d;
      // });
      let res = {
        message: '成功',
        code: 200,
        data: {
          typeCode: '320000',
          typeName: '',
          userNum: 878,
          equipNum: 5253,
          onlineRate: 73.06,
          runRate: 68.86,
          nowLoadVal: 1718793.3060000003,
          capacity: 8460656.18,
          downPower: 1306282.9125600003,
          upPower: 1048463.9166600002,
          drUserNum: 76,
          asUserNum: 15,
        },
      };
      this.areaData = res.data;
      this.leftBottomData = AreaDataMap.map(d => {
        d.value = this.areaData[d.key] ?? '-';
        return d;
      });
    },
    async getCurveData() {
      // this.loading = true;
      // const res = await lm_api.queryCurveP({
      //   dataType: 1,
      //   date: DateUtil.transformData(this.date, 'YYYY-MM-DD'),
      //   sid: this.currentAreaId,
      // });
      // if (res.code !== 200) return;
      // this.chartOption.xData = res.data.times;
      // this.chartOption.xData.push('24:00');
      // this.chartOption.data = [
      //   { name: '基线负荷', data: res.data.baselineValP, unit: 'kw' },
      //   { name: '昨日负荷', data: res.data.yesterdayValP, unit: 'kw' },
      //   { name: '今日负荷', data: res.data.todayValP, unit: 'kw' },
      // ];
      // this.chartInstance = this.$refs.historyChart.getChartInstance();
      // this.loading = false;
      let res = {
        message: '成功',
        code: 200,
        data: {
          times: [
            '00:00',
            '00:05',
            '00:10',
            '00:15',
            '00:20',
            '00:25',
            '00:30',
            '00:35',
            '00:40',
            '00:45',
            '00:50',
            '00:55',
            '01:00',
            '01:05',
            '01:10',
            '01:15',
            '01:20',
            '01:25',
            '01:30',
            '01:35',
            '01:40',
            '01:45',
            '01:50',
            '01:55',
            '02:00',
            '02:05',
            '02:10',
            '02:15',
            '02:20',
            '02:25',
            '02:30',
            '02:35',
            '02:40',
            '02:45',
            '02:50',
            '02:55',
            '03:00',
            '03:05',
            '03:10',
            '03:15',
            '03:20',
            '03:25',
            '03:30',
            '03:35',
            '03:40',
            '03:45',
            '03:50',
            '03:55',
            '04:00',
            '04:05',
            '04:10',
            '04:15',
            '04:20',
            '04:25',
            '04:30',
            '04:35',
            '04:40',
            '04:45',
            '04:50',
            '04:55',
            '05:00',
            '05:05',
            '05:10',
            '05:15',
            '05:20',
            '05:25',
            '05:30',
            '05:35',
            '05:40',
            '05:45',
            '05:50',
            '05:55',
            '06:00',
            '06:05',
            '06:10',
            '06:15',
            '06:20',
            '06:25',
            '06:30',
            '06:35',
            '06:40',
            '06:45',
            '06:50',
            '06:55',
            '07:00',
            '07:05',
            '07:10',
            '07:15',
            '07:20',
            '07:25',
            '07:30',
            '07:35',
            '07:40',
            '07:45',
            '07:50',
            '07:55',
            '08:00',
            '08:05',
            '08:10',
            '08:15',
            '08:20',
            '08:25',
            '08:30',
            '08:35',
            '08:40',
            '08:45',
            '08:50',
            '08:55',
            '09:00',
            '09:05',
            '09:10',
            '09:15',
            '09:20',
            '09:25',
            '09:30',
            '09:35',
            '09:40',
            '09:45',
            '09:50',
            '09:55',
            '10:00',
            '10:05',
            '10:10',
            '10:15',
            '10:20',
            '10:25',
            '10:30',
            '10:35',
            '10:40',
            '10:45',
            '10:50',
            '10:55',
            '11:00',
            '11:05',
            '11:10',
            '11:15',
            '11:20',
            '11:25',
            '11:30',
            '11:35',
            '11:40',
            '11:45',
            '11:50',
            '11:55',
            '12:00',
            '12:05',
            '12:10',
            '12:15',
            '12:20',
            '12:25',
            '12:30',
            '12:35',
            '12:40',
            '12:45',
            '12:50',
            '12:55',
            '13:00',
            '13:05',
            '13:10',
            '13:15',
            '13:20',
            '13:25',
            '13:30',
            '13:35',
            '13:40',
            '13:45',
            '13:50',
            '13:55',
            '14:00',
            '14:05',
            '14:10',
            '14:15',
            '14:20',
            '14:25',
            '14:30',
            '14:35',
            '14:40',
            '14:45',
            '14:50',
            '14:55',
            '15:00',
            '15:05',
            '15:10',
            '15:15',
            '15:20',
            '15:25',
            '15:30',
            '15:35',
            '15:40',
            '15:45',
            '15:50',
            '15:55',
            '16:00',
            '16:05',
            '16:10',
            '16:15',
            '16:20',
            '16:25',
            '16:30',
            '16:35',
            '16:40',
            '16:45',
            '16:50',
            '16:55',
            '17:00',
            '17:05',
            '17:10',
            '17:15',
            '17:20',
            '17:25',
            '17:30',
            '17:35',
            '17:40',
            '17:45',
            '17:50',
            '17:55',
            '18:00',
            '18:05',
            '18:10',
            '18:15',
            '18:20',
            '18:25',
            '18:30',
            '18:35',
            '18:40',
            '18:45',
            '18:50',
            '18:55',
            '19:00',
            '19:05',
            '19:10',
            '19:15',
            '19:20',
            '19:25',
            '19:30',
            '19:35',
            '19:40',
            '19:45',
            '19:50',
            '19:55',
            '20:00',
            '20:05',
            '20:10',
            '20:15',
            '20:20',
            '20:25',
            '20:30',
            '20:35',
            '20:40',
            '20:45',
            '20:50',
            '20:55',
            '21:00',
            '21:05',
            '21:10',
            '21:15',
            '21:20',
            '21:25',
            '21:30',
            '21:35',
            '21:40',
            '21:45',
            '21:50',
            '21:55',
            '22:00',
            '22:05',
            '22:10',
            '22:15',
            '22:20',
            '22:25',
            '22:30',
            '22:35',
            '22:40',
            '22:45',
            '22:50',
            '22:55',
            '23:00',
            '23:05',
            '23:10',
            '23:15',
            '23:20',
            '23:25',
            '23:30',
            '23:35',
            '23:40',
            '23:45',
            '23:50',
            '23:55',
          ],
          todayValP: [
            2062892.28,
            1998453.74,
            1938526.58,
            2033033.3,
            2232061.59,
            2158127.98,
            2318749.45,
            1984617.21,
            2191215.98,
            2207651.88,
            2063581.9,
            2051254.35,
            2112370.91,
            2285471.36,
            2137030.09,
            2282775.36,
            2239052.24,
            2272435.4,
            2179710.73,
            2272655.93,
            2084877.18,
            2135918.29,
            2203677.69,
            2266142.16,
            2177609.32,
            2266066.66,
            2148398.39,
            2250496.62,
            2304476.75,
            2187150.35,
            2242968.16,
            2272049.88,
            2128035.88,
            2210807.78,
            2083317.47,
            2158730.9,
            2242682.83,
            2195716.0,
            2093280.26,
            2273689.23,
            2085336.1,
            1965678.96,
            1933853.84,
            2031723.83,
            2194836.08,
            2096511.48,
            2141000.48,
            1992974.19,
            2244913.84,
            2138253.16,
            2154900.97,
            2018433.01,
            2083808.25,
            2194282.81,
            2000769.16,
            2099284.33,
            2295250.02,
            2136354.17,
            2251000.63,
            2111106.66,
            2158729.63,
            2139331.77,
            2108796.59,
            2048149.93,
            2097921.28,
            2186460.89,
            2053589.57,
            2279397.57,
            2102973.56,
            2214493.05,
            2138019.19,
            2054726.65,
            1916506.55,
            1990894.81,
            2064844.1,
            2168268.44,
            2147301.13,
            2166021.01,
            2030617.65,
            2103674.1,
            1986401.26,
            2023870.17,
            2051670.19,
            2099427.7,
            2023562.25,
            2091478.59,
            2218716.52,
            1999584.89,
            2056961.49,
            1879570.12,
            1951080.77,
            2067128.49,
            1959356.44,
            2049215.33,
            1977950.41,
            1960254.31,
            1993592.51,
            1720054.04,
            1489194.77,
            1618173.94,
            1583834.64,
            1532763.13,
            1700775.23,
            1510371.8,
            1580164.96,
            1541328.2,
            1727154.06,
            1610304.76,
            1398181.75,
            1557913.54,
            1548384.48,
            1612477.14,
            1708042.74,
            1643447.72,
            1627333.12,
            1635728.5,
            1524439.82,
            1534761.28,
            1420126.08,
            1524987.08,
            1590683.48,
            1601725.55,
            1466402.75,
            1553282.21,
            1608391.5,
            1740138.42,
            1555328.07,
            1678951.81,
            1556888.92,
            1543756.28,
            1641515.61,
            1488639.72,
            1529388.62,
            1703708.53,
            1728905.75,
            1698128.28,
            1744587.44,
            1769940.96,
            1849675.74,
            1829819.25,
            1699902.64,
            1716856.67,
            1779264.85,
            1879742.49,
            1783889.7,
            1804956.25,
            1790021.31,
            1882124.59,
            1904185.92,
            1834946.68,
            1802518.91,
            1918414.09,
            1907542.88,
            1739892.82,
            1805559.74,
            1851195.1,
            1912396.84,
            1840653.74,
            1970780.29,
            1872127.27,
            1986968.53,
            1700484.56,
            1649817.62,
            1890450.61,
            1836603.71,
            1794024.84,
            1876662.47,
            1850077.13,
            1890604.33,
            1733620.94,
            1709043.19,
            1683175.44,
            1747184.31,
            1854701.33,
            1742856.2,
            1738410.52,
            1732463.78,
            1636537.29,
            1854624.91,
            1830916.72,
            1922102.36,
            1825168.23,
            1742680.74,
            1855677.7,
            1977929.34,
            1862982.24,
            1872160.57,
            1780991.91,
            1850962.83,
            1860974.28,
            1865907.54,
            1718793.31,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
          ],
          yesterdayValP: [
            1893362.82, 2040901.73, 1888467.17, 2000977.43, 2034814.19,
            2131066.07, 2101121.42, 2071310.07, 2127321.45, 2109298.29,
            2071823.67, 2093967.46, 2075275.37, 2203874.2, 2078934.89,
            2215015.07, 2239458.55, 2256119.56, 2062949.83, 2149281.54,
            2198859.22, 2098247.14, 2058221.47, 2091480.81, 2048091.18,
            2159529.2, 2121622.09, 2171978.56, 2167822.11, 2159684.21,
            2316159.38, 2232578.42, 2054762.28, 2294753.64, 2083645.08,
            2143296.51, 2232025.49, 2046504.09, 2103166.53, 2224848.41,
            2189895.03, 2000845.22, 2131481.01, 2160977.43, 2175033.15,
            2203397.18, 2193824.26, 2098946.3, 2076283.52, 2172980.39,
            2035160.48, 1963096.03, 2006630.15, 2124095.08, 2221251.48,
            2184067.86, 2031767.35, 2018970.29, 2292431.5, 2227516.69,
            2023086.0, 2020828.49, 2192339.17, 2244302.32, 2225478.92,
            2075787.53, 2077656.12, 2188337.42, 2138107.71, 2041385.12,
            2005642.86, 2052887.4, 2075607.7, 2151353.8, 1921279.02, 2070753.62,
            2168588.68, 2193976.14, 2201598.96, 2141763.29, 2105385.99,
            2166170.73, 2059313.42, 1872409.44, 1939039.49, 2061649.65,
            2142524.89, 2055066.32, 2195340.29, 1994601.9, 1990226.97,
            2184539.29, 2059283.42, 2052035.0, 2133126.14, 1979832.1, 1790109.0,
            1761089.38, 1531204.82, 1674848.97, 1532892.77, 1696773.52,
            1558325.04, 1603943.27, 1593850.58, 1602321.41, 1647976.01,
            1655751.22, 1418756.46, 1528440.85, 1558203.63, 1611065.42,
            1526356.43, 1392268.85, 1541752.91, 1644648.29, 1502672.51,
            1379678.11, 1509112.86, 1635681.87, 1555414.61, 1556953.59,
            1566870.96, 1439593.06, 1568464.08, 1696720.95, 1627022.24,
            1569136.02, 1547057.25, 1558759.9, 1633295.04, 1690745.52,
            1471421.06, 1672844.74, 1784114.18, 1732970.72, 1650603.97,
            1698434.77, 1653618.41, 1617531.59, 1702604.62, 1593137.4,
            1826772.66, 1734034.83, 1712296.93, 1800373.2, 1863139.78,
            1774870.68, 1701797.95, 1688483.62, 1755704.36, 1901489.78,
            1933072.85, 1856309.36, 1987408.31, 1855235.47, 1869951.21,
            1901026.4, 1767616.24, 1849795.81, 1874971.17, 1779391.53,
            1845524.84, 1882060.46, 1820004.09, 1780272.96, 1771515.04,
            1780679.51, 1897725.72, 1838940.03, 1902863.38, 1893866.24,
            1638745.35, 1705995.18, 1772508.8, 1787652.85, 1757386.95,
            1724747.44, 1976980.54, 1799020.03, 1856757.01, 1888806.27,
            1879231.74, 1731665.89, 1736953.19, 1848318.4, 1928952.49,
            1967244.14, 1892876.69, 1813048.5, 1978478.41, 1806679.21,
            1988885.54, 1876466.94, 1833622.38, 1943133.73, 1870908.62,
            1992469.72, 1980274.53, 1925337.16, 1879540.87, 1972558.72,
            1841851.63, 1857806.35, 1912614.55, 1819998.74, 1813941.57,
            1700121.1, 1660687.35, 1791767.95, 1643770.31, 1719536.28,
            1857521.73, 1833636.5, 1801332.42, 1862698.65, 1767395.23,
            1610133.51, 1701123.03, 1721255.62, 1621240.51, 1720370.76,
            1704321.67, 1759234.73, 1714121.66, 1801291.47, 1757421.57,
            1600715.59, 1721511.82, 1817168.34, 1736367.62, 1798228.73,
            1795897.28, 1653474.92, 1665292.89, 1711271.64, 1640666.59,
            1738120.5, 1930509.45, 1809216.46, 1917588.8, 1835095.12,
            1772933.77, 1898269.94, 1757027.58, 1729330.1, 1814338.04,
            1787485.96, 2002620.54, 1667888.36, 1837219.93, 1805009.81,
            1880183.05, 1825530.44, 1872552.05, 1854444.13, 1902003.52,
            1957551.01, 1880645.81, 1987280.47, 1961170.11, 1974403.85,
            1719858.41, 1765855.26, 1946028.06, 1919522.43, 1783301.88,
            1785924.32, 1881066.72, 1947277.86, 1864259.6, 1891625.18,
            1913213.03, 1966140.74, 1968563.49, 1909399.09, 1959420.34,
            1936414.37, 1974592.91, 2045153.09, 1919734.93, 1795869.66,
            1923328.57, 2013940.9, 1931839.12, 1795773.83, 1917681.58,
            2053334.75,
          ],
          baselineValP: [
            1824799.13, 1930676.24, 1869994.99, 1964221.47, 1955827.75,
            2052262.86, 2056301.62, 2080325.98, 2008666.97, 2026794.89,
            2072072.0, 2075880.21, 2049796.74, 2104627.39, 2010585.63,
            2074299.53, 2115871.18, 2159155.65, 2026134.01, 1999514.73,
            2035463.71, 2066208.12, 2041372.19, 2095981.19, 2031331.42,
            2162867.67, 2084212.2, 2118092.54, 2069776.09, 2072584.36,
            2055687.9, 2036922.77, 2051974.89, 2131820.45, 2095872.31,
            2036927.65, 2090800.55, 2040549.73, 2090648.01, 2106685.06,
            2044773.4, 1998278.4, 2006726.82, 2080776.91, 2017286.3, 2035966.95,
            2068434.99, 2013870.15, 1998905.0, 1987101.08, 2022025.44,
            1965505.76, 1983270.93, 1943012.06, 1957159.5, 1987424.43,
            1953075.72, 1937802.86, 1964193.01, 1973195.01, 2028149.32,
            1988371.3, 1970206.94, 2023447.34, 1979896.77, 1964087.74,
            1946371.29, 1928403.07, 2016820.17, 2036838.04, 2015906.06,
            2021282.47, 1995048.13, 2034305.45, 1929520.76, 1962769.88,
            2017756.62, 2096200.14, 2039392.73, 2010401.44, 1962832.86,
            1989580.57, 1973895.83, 1933004.92, 1960404.58, 1987359.4,
            2014701.66, 1972967.3, 2022187.61, 1989817.02, 1991717.12,
            2027991.44, 1991645.05, 1923862.84, 1977015.2, 1942862.6,
            1873502.69, 1650245.73, 1554751.6, 1498194.59, 1512612.75,
            1592951.12, 1521265.13, 1530698.88, 1528040.76, 1521404.91,
            1527924.87, 1543068.93, 1454515.81, 1476971.81, 1482413.0,
            1525870.8, 1501883.55, 1494554.29, 1500233.82, 1522641.58,
            1474865.89, 1506661.05, 1524186.09, 1563733.23, 1520703.1,
            1533212.8, 1471780.15, 1457948.08, 1524931.27, 1582456.36,
            1558758.12, 1601305.77, 1578779.91, 1544901.77, 1600315.44,
            1536305.02, 1505858.63, 1602568.1, 1658416.53, 1661645.5,
            1688478.98, 1737938.55, 1748416.92, 1730901.39, 1707515.21,
            1665543.81, 1731014.69, 1750851.95, 1788951.37, 1784883.92,
            1792203.5, 1747778.2, 1729443.09, 1700386.2, 1687661.72, 1775319.26,
            1805246.05, 1886121.3, 1804216.33, 1788273.4, 1690558.47,
            1752664.39, 1782235.41, 1761508.03, 1783191.41, 1790177.95,
            1819448.4, 1831759.48, 1786778.47, 1781605.67, 1740077.19,
            1736355.0, 1812997.01, 1817976.31, 1794752.44, 1790737.26,
            1738648.19, 1795884.52, 1741491.75, 1753219.05, 1772634.73,
            1727237.59, 1776845.06, 1763495.94, 1727637.21, 1805128.73,
            1813745.66, 1714243.77, 1678072.17, 1753674.56, 1802600.38,
            1765448.18, 1840467.39, 1746332.67, 1793596.2, 1766139.98,
            1744448.14, 1738053.44, 1743732.57, 1840548.63, 1848882.83,
            1869038.15, 1864828.61, 1826558.63, 1835346.91, 1817848.55,
            1762626.11, 1700099.45, 1700008.99, 1700234.91, 1695082.41,
            1675101.32, 1670697.84, 1733320.02, 1650848.86, 1657892.36,
            1698748.08, 1704303.39, 1683170.77, 1711042.41, 1715298.49,
            1682412.95, 1666422.96, 1657175.04, 1598157.78, 1663226.3,
            1662051.5, 1649797.8, 1654359.71, 1708936.21, 1658629.7, 1679939.15,
            1677086.21, 1666761.35, 1650074.92, 1640267.5, 1674950.79,
            1621274.48, 1633256.51, 1665971.11, 1578423.87, 1639061.39,
            1661273.38, 1688417.37, 1741573.78, 1658069.55, 1690320.37,
            1803207.9, 1685261.18, 1666368.11, 1695843.46, 1748518.62,
            1771491.4, 1671127.04, 1710346.14, 1688478.29, 1720495.65,
            1750472.9, 1731384.17, 1691215.64, 1672497.52, 1751605.12,
            1771158.94, 1782900.72, 1700570.71, 1747223.75, 1702841.35,
            1729774.73, 1752799.02, 1704765.86, 1740540.42, 1766772.11,
            1818398.76, 1841582.98, 1866746.78, 1864822.99, 1876671.79,
            1834237.59, 1827564.46, 1838143.2, 1877398.23, 1891325.61,
            1840942.59, 1860139.18, 1847098.65, 1846565.42, 1816909.51,
            1915780.1, 1834381.64, 1822592.54, 1883916.82, 1883515.26,
          ],
        },
      };
      this.chartOption.xData = res.data.times;
      this.chartOption.xData.push('24:00');
      this.chartOption.data = [
        { name: '昨日负荷', data: res.data.yesterdayValP, unit: 'kw' },
        { name: '今日负荷', data: res.data.todayValP, unit: 'kw' },
      ];
      this.chartInstance = this.$refs.historyChart.getChartInstance();
    },
    handleRadioChange(val) {
      this.currentAreaId = val;
      this.currentAreaName = this.areaList.find(d => d.id == val).name;
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
          city: this.currentAreaId == 320000 ? '' : this.currentAreaId,
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
  overflow-x: hidden;
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
      font-size: 1rem;
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
.bigHover {
  transition: 0.3s;
  &:hover {
    transform: scale(1.2);
  }
}
</style>
