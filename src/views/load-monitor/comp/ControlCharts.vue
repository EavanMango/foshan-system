<template>
  <div>
    <el-button
      icon="el-icon-sort"
      size="mini"
      @click="showHideMax"
      class="commonBtn"
      title="峰值"
    ></el-button
    ><el-button
      title="网格"
      icon="el-icon-s-grid"
      size="mini"
      class="commonBtn"
      @click="showHideGrid"
    ></el-button>
  </div>
</template>
<script>
export default {
  props: ['chartInstance'],
  data() {
    return {
      showMax: false,
      showGrid: false,
    };
  },
  methods: {
    showHideMax() {
      this.showMax = !this.showMax;
      const option = this.chartInstance.getOption();
      console.log(option);
      const { series } = option;
      const newSeries = series.map(s => {
        s.markPoint.symbol = this.showMax ? 'circle' : 'none';
        return s;
      });
      this.chartInstance.setOption({ ...option, ...{ series: newSeries } });
    },
    showHideGrid() {
      this.showGrid = !this.showGrid;
      const option = this.chartInstance.getOption();
      const { xAxis, yAxis } = option;
      const newXAxis = xAxis.map(x => {
        x.splitLine.show = this.showGrid;
        return x;
      });
      const newYAxis = yAxis.map(x => {
        x.axisLine.show = this.showGrid;
        return x;
      });
      this.chartInstance.setOption({
        ...option,
        ...{ xAxis: newXAxis },
        ...{ yAxis: newYAxis },
      });
    },
  },
};
</script>
<style lang="scss" scoped></style>
