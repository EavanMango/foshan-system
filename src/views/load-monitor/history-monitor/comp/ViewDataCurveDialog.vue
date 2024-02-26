<template>
  <element-dialog
    :title="`${currentData.name}(${currentData.equipNo})`"
    width="60%"
    v-model="showDialog"
    :showCloseButton="true"
  >
    <div class="flex_dir_col" style="height: 60vh">
      <div class="width100">
        <el-date-picker
          v-if="curveType == 1"
          class="float-right"
          :picker-options="pickerOptions"
          v-model="date"
          size="mini"
          value-format="yyyy-MM-dd"
          type="date"
          @change="getCurveData"
        />
        <el-date-picker
          v-if="curveType == 2"
          class="float-right"
          v-model="dateRange"
          type="datetimerange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="getCurveData"
        />
      </div>
      <section class="padding-10 flex-1">
        <LineChart
          v-if="curveType == 1"
          :xData="chartOption.xData"
          :data="chartOption.data"
        />
        <echarts-chart
          ref="realTimeChart"
          v-else
          id="echart"
          :option="lineOption"
        />
      </section>
    </div>
  </element-dialog>
</template>

<script>
import elementDialog from '@/components/ElementDialog/index.vue';
import echartsChart from '@/components/EchartsChart/index.vue';

import API from '@/api/load-monitor';
import LineChart from '../../comp/LineChart.vue';
import { DateUtil } from '@/utils/date-util';
// 获取当前日期
let currentDate = new Date();
let year = currentDate.getFullYear();
let month = currentDate.getMonth(); // 月份从0开始，所以需要加1
let day = currentDate.getDate();
let tomorrowMidnight = new Date(year, month, day + 1, 0, 0, 0, 0);
let beforeTwoHourTime = currentDate.setHours(currentDate.getHours() - 2);

export default {
  components: { elementDialog, LineChart, echartsChart },
  data() {
    return {
      showDialog: false,
      date: new Date(),
      dateRange: [new Date(beforeTwoHourTime), new Date()],

      currentData: {},
      chartOption: {
        xData: [],
        data: [],
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      curveType: '',
      lineOption: {},
    };
  },
  methods: {
    open(data, type) {
      this.curveType = type;
      this.currentData = JSON.parse(JSON.stringify(data));
      this.showDialog = true;
      this.getCurveData();
    },
    async getCurveData() {
      if (this.curveType == 1) {
        const res = await API.queryCurveP({
          date: DateUtil.transformData(this.date, 'YYYY-MM-DD'),
          sid: this.currentData.id || 10000000004,
        });
        if (res.code !== 200) return;
        this.chartOption.xData = res.data.times;
        this.chartOption.xData.push('24:00');

        this.chartOption.data = [
          { name: '负荷基线', data: res.data.baselineValP },
          { name: '昨日负荷', data: res.data.yesterdayValP },
          { name: '今日负荷', data: res.data.todayValP },
        ];
      } else {
        let start;
        let end;
        if (this.dateRange) {
          start = DateUtil.transformData(this.dateRange[0]);
          end = DateUtil.transformData(this.dateRange[1]);
        }
        const res = await API.getMeasRtCurveValues({
          measId: this.currentData.id || 160000000019,
          start,
          end,
        });
        if (res.code !== 200) return;
        this.lineOption = this.generateLineOptions(this, res.data, start, end);
      }
    },
    generateLineOptions(_that, { values, timeTag }, start, end) {
      let arrayData = [];
      for (let i = 0; i < values.length; i++) {
        arrayData.push([timeTag[i], values[i].toFixed(2)]);
      }
      const series = [
        {
          name: '实时负荷',
          data: arrayData,
          type: 'line',
          symbol: 'circle',
          symbolSize: 0,
          itemStyle: {
            color: '#026BDD',
            shadowBlur: 10,
            borderWidth: this.echartFontSize(2),
          },
          connectNulls: true,
          // 标注最大值最小值
          // markPoint: {
          //   symbol: 'circle',
          //   symbolSize: 10,
          //   label: {
          //     fontSize: 16,
          //     color: _that.fontColor,
          //     offset: [0, -15],
          //   },
          //   data: [
          //     {
          //       type: 'max',
          //       name: '最大值',
          //     },
          //     {
          //       type: 'min',
          //       name: '最小值',
          //     },
          //   ],
          // },
        },
      ];

      const option = {
        grid: {
          top: '7%',
          left: '3%',
          right: '3%',
          bottom: '1%',
          containLabel: true,
        },
        tooltip: {
          trigger: 'axis',
          confine: true,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          borderColor: '#026BDD',
          textStyle: {
            fontSize: this.echartFontSize(16),
            color: _that.fontColor,
            fontFamily: 'PangMenZhengDao',
          },
          formatter: function (params) {
            var relVal = params[0].name;
            for (var i = 0; i < params.length; i++) {
              params[i].value = params[i].value ?? '-';
              relVal +=
                params[i].axisValueLabel +
                '<br/>' +
                params[i].marker +
                params[i].seriesName +
                ': ' +
                params[i].value[1] +
                ' KW';
            }
            return relVal;
          },
          axisPointer: {
            type: 'line',
          },
        },
        legend: {
          // orient: "center",
          top: 10,
          itemWidth: 10,
          itemHeight: 10,
          icon: 'react',
          itemGap: 17,
          // align: "right",
          textStyle: {
            color: this.fontColor,
            fontSize: this.echartFontSize(12),
            fontFamily: 'AlibabaPuHuiTi-Medium',
          },
        },
        // xAxis: {
        //   data: timeTag.map(t => {
        //     return DateUtil.transformData(new Date(t), 'HH:mm:ss');
        //   }),
        //   boundaryGap: true,
        //   axisLine: {
        //     show: true,
        //   },
        //   axisTick: {
        //     show: false,
        //   },
        //   nameTextStyle: {
        //     color: _that.fontColor,
        //   },
        //   axisLabel: {
        //     color: _that.fontColor,
        //     interval: index => {
        //       const gap = Math.round(values.length / 10);
        //       return index % gap == 0;
        //     },
        //   },
        //   splitLine: { show: false },
        // },
        xAxis: {
          type: 'time',
          min: new Date(start),
          max: new Date(end),
          minInterval: 60 * 1000,
          axisLabel: {
            formatter: {
              year: '{yyyy}',
              month: '{MMM}',
              day: '{dd}日',
              hour: '{HH}:{mm}',
              minute: '{HH}:{mm}',
              none: '{yyyy}-{MM}-{dd} {hh}:{mm}',
            },
            color: this.fontColor,
            fontSize: this.echartFontSize(12),
          },
        },
        yAxis: {
          name: 'KW',
          nameTextStyle: {
            color: this.fontColor,
            fontSize: this.echartFontSize(12),
          },
          axisLabel: {
            color: this.fontColor,
            fontSize: this.echartFontSize(12),
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: this.fontColor,
              width: this.echartFontSize(1),
            },
          },
        },
        dataZoom: {
          type: 'inside',
        },
        series: series,
      };
      return option;
    },
  },
};
</script>

<style></style>
