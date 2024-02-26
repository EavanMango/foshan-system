<template>
  <div :id="id" :style="style"></div>
</template>

<script>
  import * as echarts from 'echarts';
  // import china from '@/assets/map-resource/china.json'
  import jiangsu from '@/assets/map-resource/jiangsu.json'


  export default {
    data() {
      return {
        chart: ''
      }
    },
    props: {
      id: {
        type: String
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '100%'
      },
      option: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      style() {
        return {
          width: this.width,
          height: this.height
        }
      }
    },
    watch: {
      'option.id':{
        handler(newVal, oldVal) {
          this.init();
        },
        deep: true
      },

      option: {
        handler(newVal, oldVal) {
          if (this.chart) {
            this.chart.setOption(newVal)
          } else {
            this.init();
          }
        },
        deep: true
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        // 初始化中国地图
        this.chart = echarts.registerMap("jiangsu", jiangsu);
        this.chart = echarts.init(document.getElementById(this.id))
        this.chart.setOption(this.option, true);
        window.addEventListener("resize", () => {
          this.chart.resize();
        });
      }
    },
  }
</script>
