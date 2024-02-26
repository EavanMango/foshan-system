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
    curRadio2: {
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
    curRadio2: {
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
      let Data = [];
      let danwei = '';

      if (this.type == 1) {
        // Data = this.chartData
        Data = [
          {
            value: 264,
            name: '供电所',
          },
          {
            value: 376,
            name: '制造',
          },
          {
            value: 8,
            name: '物业',
          },
          {
            value: 7,
            name: '酒店',
          },
          {
            value: 140,
            name: '其他',
          },
        ];
      } else if (this.type == 2) {
        // Data = this.chartData
        Data = [
          {
            value: 42,
            name: 'VRV空调',
          },
          {
            value: 34,
            name: '分体式空调',
          },
          {
            value: 26,
            name: '水冷中央空调',
          },
        ];
      } else if (this.type == 3) {
        Data = [
          {
            value: 0,
            name: '美的',
          },
          {
            value: 155,
            name: '格力',
          },
          {
            value: 77,
            name: '海尔',
          },
          {
            value: 144,
            name: '大金',
          },
          {
            value: 0,
            name: '其他',
          },
        ];
        // img = require('../../../../../assets/imgs/工业负荷.png')
      }

      const colorList = [
        new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          {
            offset: 0,
            color: 'rgba(4, 252, 244, .5)',
          },
          {
            offset: 1,
            color: 'rgba(4, 252, 244, 1)',
          },
        ]),
        new echarts.graphic.LinearGradient(1, 0, 0, 0, [
          {
            offset: 0,
            color: 'rgba(239, 166, 19, .5)',
          },
          {
            offset: 1,
            color: 'rgba(239, 166, 19, 1)',
          },
        ]),
        new echarts.graphic.LinearGradient(0, 1, 0, 0, [
          {
            offset: 0,
            color: 'rgba(0, 188, 255,.5)',
          },
          {
            offset: 1,
            color: 'rgba(0, 188, 255,1)',
          },
        ]),
        new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          {
            offset: 0,
            color: 'rgba(156, 232, 120,.5)',
          },
          {
            offset: 1,
            color: 'rgba(156, 232, 120,1)',
          },
        ]),
        new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          {
            offset: 0,
            color: 'rgba(146, 84, 222,0.5)',
          },
          {
            offset: 1,
            color: 'rgba(146, 84, 222,1)',
          },
        ]),
      ];

      const color = ['#F59A23', '#C280FF', '#02A7F0', '#95F204', '#80FFFF'];
      return {
        color: color,
        legend: {
          orient: 'vertical',
          top: 'center',
          left: '56%',
          itemGap: 10,
          itemWidth: 16,
          itemHeight: 16,
          textStyle: {
            color: '#fff',
            fontSize: this.echartFontSize(12),
          },
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(0,0,0,.5)',
          formatter: function (params) {
            return (
              params.marker +
              '<span style="color:' +
              params.color +
              '">' +
              params.data['name'] +
              '\n' +
              params.data['value'] +
              '</span>' +
              danwei
            );
          },
          textStyle: {
            color: '#fff',
            fontSize: this.echartFontSize(12),
          },
        },
        graphic: {
          // 这个属性可以在饼图内部填充图片,文字等
          elements: [
            {
              type: 'image', //需要填充图片,配置image,如果不需要图片可以配置其他的, text, circle, sector, ring, polygon, polyline, rect, line, bezierCurve, arc, group,
              // style: {
              //   image: img, //这里添加图片地址
              //   width: 10 + 'rem'
              // },
              left: '1%', //
              top: '10', //配置图片居中
            },
          ],
        },
        series: [
          {
            type: 'pie',
            radius: ['25%', '45%'],
            center: ['29%', '50%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },

            labelLine: {
              show: false,
            },
            itemStyle: {
              color: params => {
                if (params.data.isActive) {
                  return color[params.dataIndex];
                } else {
                  return colorList[params.dataIndex];
                }
              },
              //饼状图阴影，值越大阴影亮度越高
              // shadowBlur: 20,
              shadowColor: 'rgb(0,255,255)',
              // borderRadius: 20
            },

            data: Data,
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
