<template>
  <div id="pieChart" ref="echartContainer"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  data() {
    return {
      charts: null,
    };
  },
  props: {
    chartData: {
      type: [Array, Object],
      default: () => {},
    },

    type: {
      type: [String, Number],
      default: '',
    },
    // 数量容量
    circleValue: {
      type: [String, Number],
      default: '',
    },
    title: {
      type: [String, Number],
      default: '',
    },
  },
  watch: {
    chartData: {
      handler() {
        this.initChart();
      },
    },
    circleValue: {
      handler() {
        this.initChart();
      },
    },
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      this.charts = echarts.init(this.$refs.echartContainer);
      this.charts.clear();
      this.$nextTick(() => {
        this.charts.setOption(this.getOption());
        window.addEventListener('resize', () => {
          this.charts.resize();
        });
      });
    },

    getOption() {
      let result = {
        total: 100,
        value: Number(this.circleValue),
        color: '#01EAFF',
      };

      result.rate = result.value / result.total.toFixed(4);
      let echartData = [
        {
          name: '数量',
          value: result.value,
          itemStyle: {
            color: result.color,
          },
        },
        {
          name: '剩下',
          value: result.total - result.value,
          itemStyle: {
            color: 'rgba(31, 110, 255, 0)',
          },
        },
      ];
      let echartData2 = [
        {
          name: '数量',
          value: result.total - result.value,
          itemStyle: {
            color: 'rgba(31, 110, 255, .4)',
          },
        },
        {
          name: '剩下',
          value: result.value,
          itemStyle: {
            color: 'rgba(31, 110, 255, 0)',
          },
        },
      ];
      return {
        title: [
          {
            text: this.title,
            x: 'center',
            top: '42%',
            textStyle: {
              color: '#fff',
              fontSize: this.echartFontSize(12),
              fontWeight: '100',
            },
          },
          {
            text: result.value + '%',
            x: 'center',
            top: '52%',
            textStyle: {
              fontSize: this.echartFontSize(12),
              color: '#00f0ff',
              foontWeight: '500',
            },
          },
        ],
        polar: {
          radius: ['44%', '50%'],
          center: ['50%', '50%'],
        },
        angleAxis: {
          max: 100,
          show: false,
        },
        radiusAxis: {
          type: 'category',
          show: true,
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        series: [
          {
            type: 'pie',
            startAngle: 90,
            radius: ['55%', '70%'],
            center: ['50%', '50%'],
            data: echartData,
            emphasis: {
              scale: false,
            },
            label: {
              show: false,
            },
          },
          {
            type: 'pie',
            startAngle: 90 + (1 - result.rate) * 360,
            radius: ['55%', '70%'],
            center: ['50%', '50%'],
            data: echartData2,
            emphasis: {
              scale: false,
            },
            label: {
              show: false,
            },
          },
          {
            name: '',
            type: 'pie',
            startAngle: 90,
            radius: '45%',
            animation: false,
            emphasis: {
              scale: false,
            },
            center: ['50%', '50%'],
            itemStyle: {
              labelLine: {
                show: false,
              },
              color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                {
                  offset: 1,
                  color: 'rgba(50,171,241, 1)',
                },
                {
                  offset: 0,
                  color: 'rgba(55,70,130, 0)',
                },
              ]),
              shadowBlur: 10,
            },
            data: [
              {
                value: 100,
              },
            ],
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
#pieChart {
  width: 100%;
  height: 100%;
}
</style>
