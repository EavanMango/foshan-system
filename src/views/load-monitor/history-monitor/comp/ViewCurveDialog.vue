<template>
  <element-dialog
    :title="`${currentData.name}(${currentData.consNo})`"
    width="60%"
    v-model="showDialog"
    :showCloseButton="true"
  >
    <div class="flex_dir_col" style="height: 60vh">
      <div class="width100">
        <el-date-picker
          class="float-right"
          :picker-options="pickerOptions"
          v-model="date"
          size="mini"
          value-format="yyyy-MM-dd"
          type="date"
          @change="getCurveData"
        />
      </div>
      <section class="padding-10 flex-1">
        <LineChart
          :colorFlag="true"
          :xData="chartOption.xData"
          :data="chartOption.data"
        />
      </section>
    </div>
  </element-dialog>
</template>

<script>
import elementDialog from '@/components/ElementDialog/index.vue';
import API from '@/api/load-monitor';
import LineChart from '../../comp/LineChart.vue';
import { DateUtil } from '@/utils/date-util';

export default {
  components: { elementDialog, LineChart },
  data() {
    return {
      showDialog: false,
      date: new Date(),
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
    };
  },
  methods: {
    open(data) {
      this.currentData = JSON.parse(JSON.stringify(data));
      this.showDialog = true;
      this.getCurveData();
    },
    async getCurveData() {
      const res = await API.queryCurveP({
        date: DateUtil.transformData(this.date, 'YYYY-MM-DD'),
        sid: this.currentData.id || 10000000004,
      });
      if (res.code !== 200) return;
      this.chartOption.xData = res.data.times;
      this.chartOption.data = [
        { name: '昨日负荷', data: res.data.yesterdayValP },
        { name: '今日负荷', data: res.data.todayValP },

        // { name: '负荷基线', data: res.data.baselineValP },
      ];
      this.chartOption.color = [
        '#425AED',
        '#53C429',

        '#429EED',

        '#A349A4',
        '#15796A',
        '#583c87',
      ];
    },
  },
};
</script>

<style></style>
