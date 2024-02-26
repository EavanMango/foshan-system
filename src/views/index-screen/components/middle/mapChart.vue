<template>
  <div id="mapChart" ref="mapChart"></div>
</template>

<script>
import * as echarts from 'echarts';
import foshan from './佛山市.json';
export default {
  data() {
    return {
      charts: null,
      citys: '',
      cityName: foshan,
    };
  },
  props: {
    getCityCode: {
      type: [String, Number],
      default: '',
    },
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      this.charts = echarts.init(this.$refs.mapChart);
      this.charts.clear();
      this.$nextTick(() => {
        this.charts.setOption(this.getOption());
        window.addEventListener('resize', () => {
          this.charts.resize();
        });
      });
    },
    getOption() {
      echarts.registerMap('江苏', this.cityName);
      this._echartIns = echarts.init(this.$el);
      this._echartIns.on('click', params => {
        this.$emit('onClick', params);
        console.log(params);
      });
      var d = []; //地图数据
      for (var i = 0; i < this.cityName.features.length; i++) {
        d.push({
          name: this.cityName.features[i].properties.name,
        });
      }
      return {
        title: {
          left: 'center',
          textStyle: {
            color: '#fff',
            fontSize: this.echartFontSize(18),
            fontWeight: 'normal',
            fontFamily: 'Microsoft YaHei',
          },
          subtextStyle: {
            color: '#ccc',
            fontSize: this.echartFontSize(18),
            fontWeight: 'normal',
            fontFamily: 'Microsoft YaHei',
          },
        },
        // tooltip: {
        //   trigger: 'item',
        //   formatter: '{b}'
        // },
        animationDuration: 1000,
        animationEasing: 'cubicOut',
        animationDurationUpdate: 1000,

        geo: [
          {
            map: '江苏',
            aspectScale: 1,
            zoom: 0.7,
            layoutCenter: ['50%', '50%'],
            layoutSize: '100%',
            show: true,
            roam: false,
            label: {
              emphasis: {
                show: false,
              },
            },
            itemStyle: {
              borderColor: '#c0f3fb',
              borderWidth: 1,
              shadowColor: '#8cd3ef',
              shadowOffsetY: 10,
              shadowBlur: 20,
              areaColor: '#013c62',
            },
          },
          // 重影
          {
            type: 'map',
            map: '江苏',
            zlevel: -1,
            aspectScale: 1,
            zoom: 0.7,
            layoutCenter: ['50%', '51%'],
            layoutSize: '100%',
            roam: false,
            silent: true,
            itemStyle: {
              borderWidth: 1,
              // borderColor:"rgba(17, 149, 216,0.6)",
              borderColor: 'rgba(58,149,253,0.8)',
              shadowColor: 'rgba(172, 122, 255,0.5)',
              shadowOffsetY: 5,
              shadowBlur: 15,
              areaColor: 'rgba(5,21,35,0.1)',
            },
          },
          {
            type: 'map',
            map: '江苏',
            zlevel: -2,
            aspectScale: 1,
            zoom: 0.7,
            layoutCenter: ['50%', '52%'],
            layoutSize: '100%',
            roam: false,
            silent: true,
            itemStyle: {
              borderWidth: 1,
              borderColor: 'rgba(57, 132, 188,0.4)',
              borderColor: 'rgba(58,149,253,0.6)',
              shadowColor: 'rgba(65, 214, 255,1)',
              shadowOffsetY: 5,
              shadowBlur: 15,
              areaColor: 'transpercent',
            },
          },
          {
            type: 'map',
            map: '江苏',
            zlevel: -3,
            aspectScale: 1,
            zoom: 0.7,
            layoutCenter: ['50%', '53%'],
            layoutSize: '100%',
            roam: false,
            silent: true,
            itemStyle: {
              borderWidth: 1,
              // borderColor: "rgba(11, 43, 97,0.8)",
              borderColor: 'rgba(58,149,253,0.4)',
              shadowColor: 'rgba(58,149,253,1)',
              shadowOffsetY: 15,
              shadowBlur: 10,
              areaColor: 'transpercent',
            },
          },
        ],
        series: [
          {
            name: '江苏',
            type: 'map',
            map: '江苏',
            nameMap: {
              china: '中国',
            },
            label: {
              show: true,
              textStyle: {
                color: '#fff',
                fontSize: this.echartFontSize(18),
              },
            },
            // roam: true,
            zoom: 0.7,
            aspectScale: 1,
            scaleLimit: {
              min: 0.5,
            },
            // itemStyle: {
            //   areaColor: 'rgba(0,0,0,0.2)',
            //   borderColor: 'dodgerblue',
            //   borderWidth: 2,
            //   shadowBlur: 100,
            //   shadowColor: '#297CDE'
            // },
            itemStyle: {
              borderColor: 'rgba(111, 253, 255, 1)',
              borderWidth: 1,
              shadowBlur: 50,
              shadowColor: '#297CDE',
              // areaColor: 'rgba(29,85,139,.6)'
              areaColor: {
                type: 'linear-gradient',
                x: 0,
                y: 600,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: 'RGBA(37,108,190,0.1)', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'RGBA(15,169,195,0.2)', // 50% 处的颜色
                  },
                ],
                global: true, // 缺省为 false
              },

              emphasis: {
                areaColor: {
                  type: 'linear-gradient',
                  x: 0,
                  y: 600,
                  x2: 0,
                  y2: 0,
                  colorStops: [
                    {
                      offset: 0,
                      color: 'RGBA(37,108,190,1)', // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: 'RGBA(15,169,195,1)', // 50% 处的颜色
                    },
                  ],
                  global: true, // 缺省为 false
                },
              },
            },
            emphasis: {
              show: true,
              textStyle: {
                color: '#fff',
                fontSize: this.echartFontSize(18),
              },
              label: {
                color: '#fff',
              },
              areaColor: '#297CDE',
              itemStyle: {
                areaColor: '#297CDE',
              },
            },
            select: {
              label: {
                show: true,
                color: '#fff',
              },
              itemStyle: {
                areaColor: '#297fDE',
              },
            },
            layoutCenter: ['50%', '50%'],
            layoutSize: '100%',
            data: d,
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
#mapChart {
  width: 100%;
  height: 100%;
}
</style>
