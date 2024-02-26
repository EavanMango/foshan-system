<template>
  <div id="lineChart" ref="echartContainer"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  data() {
    return {
      charts: null,
      today: true,
      angle: 0,
      tempColor: 'rgba(1, 248, 68, .6)',
    };
  },
  props: {
    pieData: {
      type: [String, Number],
      default: 0,
    },
    pieTitle: {
      type: [String, Number],
      default: '',
    },
    state: {
      type: [String, Number],
      default: '运行',
    },
  },
  watch: {
    pieData: {
      handler() {
        this.initChart();
      },
      deep: true,
    },
    fontColor: {
      handler() {
        this.initChart();
      },
      deep: true,
    },
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      let myChart = echarts.getInstanceByDom(this.$refs.echartContainer);
      if (myChart == null) {
        myChart = echarts.init(this.$refs.echartContainer);
      }
      this.charts = myChart;
      this.charts.clear();
      this.$nextTick(() => {
        this.charts.setOption(this.getOption());
        window.addEventListener('resize', () => {
          this.charts.resize();
        });
        // 动画
        setInterval(() => {
          this.angle = this.angle + 2;
          this.charts.setOption(this.getOption());
        }, 100);
      });
    },

    getOption() {
      let tempNum = 0;
      let fuhao = this.pieTitle == '设定温度' ? '℃' : 'kW';
      if (!this.pieData) {
        tempNum = '-';
      } else {
        tempNum = this.pieData;
      }
      if (this.state == '运行') {
        this.tempColor = 'rgba(1, 248, 68, .6)';
      } else {
        this.tempColor = 'rgba(231, 53, 53, .6)';
      }

      return {
        title: {
          text: `{v|${tempNum}}\t{unit|${fuhao}}\n{t|${this.pieTitle}}`,
          x: 'center',
          y: 'center',
          textStyle: {
            rich: {
              v: { fontSize: this.echartFontSize(22), color: this.fontColor },
              unit: {
                fontSize: this.echartFontSize(12),
                color: this.fontColor,
                padding: [5, 0, 0, 0],
              },
              t: {
                fontSize: this.echartFontSize(12),
                color: this.fontColor,
                padding: [10, 0, 0, 0],
              },
            },
          },
        },
        series: [
          /** 绘制内部圆弧-1 <right-top> */
          {
            type: 'custom',
            coordinateSystem: 'none',
            renderItem: (params, api) => {
              return {
                type: 'arc',
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.99,
                  startAngle: ((270 + this.angle) * Math.PI) / 180,
                  endAngle: ((360 + this.angle) * Math.PI) / 180,
                },
                style: {
                  fill: 'transparent',
                  stroke: this.tempColor,
                  lineWidth: 2,
                },
                silent: true,
              };
            },
            data: [0],
          },
          /** 绘制内部圆弧-2 <left-bottom> */
          {
            type: 'custom',
            coordinateSystem: 'none',
            renderItem: (params, api) => {
              return {
                type: 'arc',
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.99,
                  startAngle: ((90 + this.angle) * Math.PI) / 180,
                  endAngle: ((180 + this.angle) * Math.PI) / 180,
                },
                style: {
                  fill: 'transparent',
                  stroke: this.tempColor,
                  lineWidth: 2,
                },
                silent: true,
              };
            },
            data: [0],
          },
          /** 绘制外部圆弧-1 <right-bottom> */
          {
            type: 'custom',
            coordinateSystem: 'none',
            renderItem: (params, api) => {
              return {
                type: 'arc',
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.9,
                  startAngle: ((355 + -this.angle) * Math.PI) / 180,
                  endAngle: ((120 + -this.angle) * Math.PI) / 180,
                },
                style: {
                  fill: 'transparent',
                  stroke: this.tempColor,
                  lineWidth: 2,
                },
                silent: true,
              };
            },
            data: [0],
          },
          /** 绘制外部圆弧-2 <left-top> */
          {
            type: 'custom',
            coordinateSystem: 'none',
            renderItem: (params, api) => {
              return {
                type: 'arc',
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.9,
                  startAngle: ((175 + -this.angle) * Math.PI) / 180,
                  endAngle: ((300 + -this.angle) * Math.PI) / 180,
                },
                style: {
                  fill: 'transparent',
                  stroke: this.tempColor,
                  lineWidth: 2,
                },
                silent: true,
              };
            },
            data: [0],
          },
          /** 绘制外部圆弧-1-开始圆点 <right-bottom> */
          {
            type: 'custom',
            coordinateSystem: 'none',
            renderItem: (params, api) => {
              let x0 = api.getWidth() / 2;
              let y0 = api.getHeight() / 2;
              let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.9;
              return {
                type: 'circle',
                shape: {
                  /** 角度355° 外弧1开始角度 */
                  cx: x0 + r * Math.cos(((355 + -this.angle) * Math.PI) / 180),
                  cy: y0 + r * Math.sin(((355 + -this.angle) * Math.PI) / 180),
                  r: 3,
                },
                style: {
                  fill: this.tempColor,
                  stroke: this.tempColor,
                },
                silent: true,
              };
            },
            data: [0],
          },
          /** 绘制外部圆弧-2-开始圆点 <left-top> */
          {
            type: 'custom',
            coordinateSystem: 'none',
            renderItem: (params, api) => {
              let x0 = api.getWidth() / 2;
              let y0 = api.getHeight() / 2;
              let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.9;
              return {
                type: 'circle',
                shape: {
                  /** 角度175° 外弧2开始角度 */
                  cx: x0 + r * Math.cos(((175 + -this.angle) * Math.PI) / 180),
                  cy: y0 + r * Math.sin(((175 + -this.angle) * Math.PI) / 180),
                  r: 3,
                },
                style: {
                  fill: this.tempColor,
                  stroke: this.tempColor,
                },
                silent: true,
              };
            },
            data: [0],
          },
          /** 刻度仪表盘 */
          {
            type: 'gauge',
            center: ['50%', '50%'],
            radius: '110%', // 错位调整此处
            startAngle: 0,
            endAngle: 360,
            axisLine: { show: false },
            splitLine: { show: false },
            axisTick: {
              splitNumber: 8,
              // length: 8,  // 刻度长度
              length: '8%',
              lineStyle: {
                color: this.tempColor,
                width: 2.5,
              },
            },
            axisLabel: { show: false },
          },
          /** 内心圆 */

          /** 饼图 */
          {
            name: '已完成',
            type: 'pie',
            startAngle: 90,
            z: 0,
            label: {
              position: 'center',
            },
            radius: ['60%', '74%'],
            silent: true,
            animation: false, // 关闭饼图动画
            data: [
              {
                value: tempNum,
                itemStyle: {
                  color: this.tempColor,
                },
              },
              {
                name: '未完成',
                value: 32 - tempNum,
                label: { show: false },
                itemStyle: { color: '#342F52' },
              },
            ],
          },
          /** 饼图上刻度 */
          {
            type: 'gauge',
            center: ['50%', '50%'],
            radius: '102%', // 错位调整此处
            startAngle: 0,
            endAngle: 360,
            splitNumber: 12,
            axisLine: { show: false },
            splitLine: {
              length: 10,
              length: '14%',
              lineStyle: {
                width: 3,
                color: this.tempColor,
              },
            },
            axisTick: { show: false },
            axisLabel: { show: false },
          },
        ],
      };
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', () => {
      this.charts.resize();
    });
  },
};
</script>

<style lang="scss" scoped>
#lineChart {
  width: 100%;
  height: 100%;
}
</style>
