<template>
  <div v-if="showEchart" :id="id" :style="style" ref="chart"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'charts',
  data() {
    return {
      showEchart: true,
      chart: '',
    };
  },
  props: {
    id: {
      type: String,
      default: 'echart',
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '100%',
    },
    option: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    style() {
      return {
        width: this.width,
        height: this.height,
      };
    },
  },
  watch: {
    option: {
      handler(newVal, oldVal) {
        this.init();
      },
      deep: true,
    },
    // option: {
    //   handler(newVal, oldVal) {
    //     if (this.chart) {
    //       console.log(111);
    //       this.chart.setOption(newVal);
    //     } else {
    //       this.init();
    //     }
    //   },
    //   deep: true,
    // },
  },
  mounted() {
    this.init();
    // window.addEventListener('resize', () => {
    //   this.init();
    // });
  },
  methods: {
    init() {
      // this.chart = echarts.init(this.$refs.chart);
      let myChart = echarts.getInstanceByDom(this.$refs.chart);
      if (myChart == null) {
        myChart = echarts.init(this.$refs.chart);
      }
      this.chart = myChart;

      this.chart.showLoading({
        text: '加载中',
        color: '#c23531',
        textColor: '#000',
        maskColor: 'rgba(255, 255, 255, 0.2)',
        zlevel: 0,
      });
      try {
        this.chart.setOption(this.option, true);
      } catch (error) {
        console.warn(error);
      } finally {
        this.chart.hideLoading();
      }
      if (this.chart._chartsViews[0] !== undefined) {
        let nodes = this.chart._chartsViews[0]._data._graphicEls.length;
        this.$emit('getChartHeight', nodes);
      }
      // this.chart.showLoading({
      //   text: '加载中',
      //   color: '#c23531',
      //   textColor: '#000',
      //   maskColor: 'rgba(255, 255, 255, 0.2)',
      //   zlevel: 0,
      // });
      // if (this.option.series && this.option.series.length === 0) {
      //   this.chart.setOption(this.option, true);
      //   this.chart.hideLoading();
      // }
      // if (this.option.series && this.option.series.length) {
      //   let series = this.option.series;
      //   for (let i = 0; i < series.length; i++) {
      //     if (
      //       this.option?.series[i]?.data &&
      //       this.option?.series[i]?.data.length
      //     ) {
      //       this.chart.setOption(this.option, true);
      //       this.chart.hideLoading();
      //     } else {
      //       this.chart.hideLoading();
      //     }
      //   }
      //   for (let i = 0; i < series.length; i++) {
      //     if (
      //       this.option?.series[i]?.data &&
      //       this.option?.series[i]?.data.length
      //     ) {
      //       this.chart.setOption(this.option, true);
      //       this.chart.hideLoading();
      //     } else {
      //       this.chart.hideLoading();
      //     }
      //   }
      // }
      let that = this;
      this.chart.off('click');
      this.chart.on('click', function (param) {
        that.$emit('echartClick', param);
      });

      // if (this.option?.series[0]?.data && this.option?.series[0]?.data.length) {
      //   this.chart.setOption(this.option, true)
      //   this.chart.hideLoading()
      // } else {
      //   this.chart.hideLoading()
      // }
      window.addEventListener('resize', () => {
        that.chart.resize();
      });
    },
    getChartInstance() {
      return this.chart;
    },
  },
};
</script>
