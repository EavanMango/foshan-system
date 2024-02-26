<!--
 * @Description  : 左侧板块
 * @Author       : 陈凯
 * @Date         : 2024-02-21 16:38:48
 * @LastEditors  : 陈凯
 * @LastEditTime : 2024-02-23 11:04:59
 * @FilePath     : \foushan-system\src\views\index-screen\components\left\index.vue
-->
<template>
  <div class="w-h-100 flex_col_s padding-10">
    <!-- 资源概览 -->
    <div class="leftTopBox indexCardBox width100 h-30 margin-bottom-20">
      <div class="indexTitle">资源概览</div>
      <div class="indexContent flex_row_s flex_wrap">
        <div
          class="fourEach flex_row_a"
          v-for="(item, index) in leftTopData"
          :key="index"
        >
          <div class="leftImg flex_col_a width40 h-100">
            <img
              style="width: 50%"
              :src="
                require('../../../../assets/index-screen/' + item.img + '.png')
              "
            />
            <div>{{ item.name }}</div>
          </div>
          <div class="width40">
            <span style="font-size: 2rem; font-weight: bolder">{{
              item.value
            }}</span>
            <span>&nbsp;&nbsp;&nbsp;{{ item.unit }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 资源分类 -->
    <div class="leftMiddleBox indexCardBox width100 h-30 margin-bottom-20">
      <div class="indexTitle">资源分类</div>
      <div class="indexContent flex_row_s">
        <div class="eachThree">
          <div class="threeTitle">用户类型</div>
          <pieChart type="1"></pieChart>
        </div>
        <div class="eachThree">
          <div class="threeTitle">设备类型</div>
          <pieChart type="2"></pieChart>
        </div>
        <div class="eachThree" style="margin-left: -1rem">
          <div class="threeTitle">品牌类型</div>
          <pieChart type="3"></pieChart>
        </div>
      </div>
    </div>
    <!-- 资源监测 -->
    <div class="leftBottomBox indexCardBox width100 h-40">
      <div class="indexTitle">资源监测</div>
      <div class="indexContent flex_row_s">
        <div class="leftThree width30 h-100 margin-right-10 flex_col_s">
          <div
            class="threeEach flex_col_c"
            v-for="item in leftBottomData"
            :key="item.key"
          >
            <div class="margin-bottom-5">{{ item.key }}</div>
            <div>{{ item.value }} {{ item.unit }}</div>
          </div>
        </div>
        <div class="leftThree width70 h-100">
          <echarts-chart id="echart" :option="lineOption" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import pieChart from './leftCom/pieChart.vue';
import echartsChart from '@/components/EchartsChart/index.vue';

export default {
  components: {
    pieChart,
    echartsChart,
  },
  data() {
    return {
      leftTopData: [
        {
          name: '资源站点',
          value: 1,
          unit: '个',
          img: 'source-1',
        },
        {
          name: '接入设备数',
          value: 10,
          unit: '个',
          img: 'source-2',
        },
        {
          name: '装机容量',
          value: 1,
          unit: '万kW',
          img: 'source-3',
        },
        {
          name: '可调节功率',
          value: 10,
          unit: '万kW',
          img: 'source-4',
        },
      ],
      leftBottomData: [
        {
          key: '总负荷',
          value: '12981',
          unit: 'kW',
        },
        {
          key: '削峰能力',
          value: '129',
          unit: 'kW',
        },
        {
          key: '填谷能力',
          value: '--',
          unit: 'kW',
        },
      ],
      lineOption: {},
    };
  },
  mounted() {
    this.getLines();
  },
  methods: {
    getLines() {
      let xData = this.generateTimeArray();
      let series = [
        {
          name: '今日',
          type: 'line',

          symbol: null,
          symbolSize: this.echartFontSize(10),
          lineStyle: {
            type: 'dashed', // 设置虚线
          },
          data: [
            2.94, 3.76, 2.63, 2.94, 2.94, 4.1, 3.55, 3.75, 4.81, 4.1, 3.55,
            3.75, 4.81, 2.94, 3.55, 3.75, 4.81, 2.63, 2.94, 3.76, 2.63, 2.94,
            3.76, 2.63, 2.8, 2.65, 2.5, 2.35, 2.19, 2.04, 1.89, 2.94, 3.76,
            2.63, 2.94, 3.76, 2.63, 2.94, 3.76, 2.63, 2.94, 3.76, 2.63, 6.5,
            5.95, 6.11, 4.81, 4.81, 5.34, 6.16, 5.03, 5.7, 4.71, 4.41, 4.33,
            5.33, 6.07, 6.17, 5.92, 6.4, 2.94, 3.76, 2.63, 2.94, 3.76, 2.63,
            2.94, 3.76, 2.63, 2.94, 3.76, 2.63, 2.94, 3.76, 2.63, 2.94, 3.76,
            2.63, 2.94, 3.76, 2.63, 2.94, 3.76, 2.63, 3.76, 3.76, 2.63, 2.94,
            3.76, 2.94, 2.94, 3.76, 1.13, 2.13, 3.13, 2.25,
          ],
          connectNulls: true,
        },
        {
          name: '昨日',
          type: 'line',

          symbol: null,
          symbolSize: this.echartFontSize(10),
          lineStyle: {
            type: 'dashed', // 设置虚线
          },
          data: [
            2.94, 3.76, 2.63, 2.94, 3.76, 4.1, 3.55, 3.75, 2.94, 4.1, 3.55,
            3.75, 4.81, 4.1, 3.55, 3.75, 4.81, 2.63, 2.94, 3.76, 2.63, 2.94,
            3.76, 2.63, 2.8, 2.65, 2.5, 2.35, 2.19, 2.04, 1.89, 2.94, 3.76,
            2.63, 2.94, 3.76, 2.63, 2.94, 3.76, 2.63, 2.94, 3.76, 2.63, 3.63,
            3.55, 3.75, 2.63, 2.94, 2.63, 2.63, 2.94, 2.63, 2.63, 2.63, 2.94,
            2.63, 2.63, 2.94, 2.63, 2.63, 2.94, 3.76, 2.63, 2.94, 3.76, 2.63,
            2.94, 3.76, 2.63, 2.94, 3.76, 2.63, 2.94, 3.76, 2.63, 2.94, 3.76,
            2.63, 2.94, 3.76, 2.63, 2.94, 3.76, 2.63, 2.94, 3.76, 3.76, 1.03,
            1.25, 2.63, 2.94, 3.76, 2.63, 1.25, 2.25, 3.25, 2.94, 2.05, 2.94,
            2.94, 3.76, 1.25,
          ],
          connectNulls: true,
        },
      ];
      this.lineOption = {
        color: [
          '#01D7EF',
          '#70B603',
          '#425AED',
          '#429EED',
          '#A349A4',
          '#15796A',
          '#583c87',
        ],
        tooltip: {
          trigger: 'axis',
          color: this.fontColor,
          backgroundColor: 'rgba(0,0,0,0.4)',
          borderColor: 'gray',
          textStyle: {
            color: '#fff',
            fontSize: this.echartFontSize(12),
          },
          formatter: function (params) {
            var relVal = params[0].axisValueLabel;
            for (var i = 0, l = params.length; i < l; i++) {
              if (typeof params[i].value === 'undefined') {
                params[i].value = ' ';
              }
              relVal +=
                '<br/>' +
                params[i].marker +
                params[i].seriesName +
                ' : ' +
                params[i].value +
                '(MWh)';
            }
            return relVal;
          },
        },
        grid: {
          left: '5%',
          right: '5%',
          bottom: '5px',
          top: '15%',
          containLabel: true,
        },
        legend: {
          top: -10,
          right: 'center',
          padding: [20, 0, 0, 0],
          icon: 'rect',
          itemHeight: this.echartFontSize(5), //修改icon图形大小
          itemWidth: this.echartFontSize(16), //修改icon图形大小
          itemGap: this.echartFontSize(10),
          textStyle: {
            color: this.fontColor,
            fontSize: this.echartFontSize(12),
          },

          // data: ['实际负荷', '基线负荷', '调节计划', '响应负荷'],
        },
        xAxis: {
          type: 'category',
          data: xData,
          splitLine: {
            show: true,
            lineStyle: {
              opacity: 0.2,
              color: this.fontColor,
            },
          },
          axisLabel: {
            interval: 15,
            color: this.fontColor,
            fontSize: this.echartFontSize(12),
            margin: this.echartFontSize(15),
          },
          nameTextStyle: {
            color: this.fontColor,
            fontSize: this.echartFontSize(12),
          },
        },
        yAxis: {
          type: 'value',
          name: '(kW)',
          splitLine: {
            show: true,
            lineStyle: {
              opacity: 0.2,
              color: this.fontColor,
            },
          },
          axisLabel: {
            formatter: '{value}',
            color: this.fontColor,
            fontSize: this.echartFontSize(12),
          },
          nameTextStyle: {
            color: this.fontColor,
            fontSize: this.echartFontSize(12),
          },
        },
        dataZoom: {
          type: 'inside',
        },
        series: series,
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.leftTopBox {
  .fourEach {
    width: 50%;
    height: 50%;
  }
}
.leftMiddleBox {
  .eachThree {
    width: 33.33%;
    height: 100%;
    position: relative;
    .threeTitle {
      position: absolute;
      font-size: 0.75rem;
      left: 13%;
      top: 2%;
      font-weight: bold;
    }
  }
}
.leftBottomBox {
  .threeEach {
    background-color: #295691;
    box-shadow: 2px 2px 5px #2861ac;
    border-radius: 10px;
    width: 100%;
    height: 33%;
    text-align: center;
    margin-bottom: 1rem;
    font-size: 0.6rem;
  }
}
</style>
