<template>
  <!-- 新增编辑弹窗 -->
  <element-dialog
    width="60%"
    custom-class="dialog-body-no-padding"
    :showCloseButton="true"
    :title="deviceName"
    v-model="showDialog"
    dialog-class="measBox"
  >
    <div class="flex_dir_col" style="height: 70vh; position: relative">
      <div class="width100 h-50" v-show="isShowTable">
        <element-table
          ref="tableRef"
          :loading="loading"
          :tableData="tableData"
          :tableColumns="tableColumns"
          :showSelect="true"
          :pagination="false"
          :showClickChecked="false"
          :selectable="selectableFn"
          @selectionChange="selectionChange"
        >
        </element-table>
      </div>
      <el-button
        class="middleBtn"
        size="mini"
        :icon="isShowTable ? 'el-icon-d-arrow-left' : 'el-icon-d-arrow-right'"
        @click="toggle"
      >
      </el-button>
      <div class="width100 flex-1 padding-10 chartWrapper">
        <LineChart
          :muilYAxis="true"
          :xData="chartOption.xData"
          :data="chartOption.data"
          ref="chart"
        />
      </div>
    </div>
  </element-dialog>
</template>

<script>
import elementDialog from '@/components/ElementDialog/index.vue';
import elementTable from '@/components/ElementTable/index_d.vue';
import LineChart from '../../comp/LineChart.vue';
import * as service from './service';
import API from '@/api/load-monitor';

export default {
  components: { elementDialog, elementTable, LineChart },
  data() {
    return {
      currentId: '',
      date: '',
      deviceName: '',
      isShowTable: true,
      loading: false,
      showDialog: false,
      tableData: service.tableData,
      tableColumns: service.tableColumns,
      chartOption: {
        xData: [],
        data: [],
      },
    };
  },
  methods: {
    open({ currentId, date, deviceName }) {
      this.showDialog = true;
      this.currentId = currentId;
      this.date = date;
      this.deviceName = deviceName;
      this.initData();
    },
    async initData() {
      const res = await API.queryEquipMeasInfo({
        equipId: this.currentId || '10000002',
      });
      this.tableData = res.data;

      if (this.tableData.length) {
        // this.getCurveData([this.tableData[0].id]);
        this.$nextTick(() => {
          this.$refs.tableRef.$refs.baseTableRef.toggleRowSelection(
            this.tableData.find(
              d => d.ycyxType !== '遥调' && d.ycyxType !== '遥控'
            )
          );
        });
      }
    },
    toggle() {
      this.isShowTable = !this.isShowTable;
      this.$nextTick(() => {
        this.reszie();
      });
    },
    async getCurveData(measNoArr) {
      const res = await API.queryEquipMeasCurve({
        date: this.date,
        equipId: this.currentId,
        measNo: measNoArr || [],
      });
      if (res.code !== 200) return;
      const data = res.data;
      this.chartOption.xData = data.timeTag;
      this.chartOption.data = data.data.map(d => {
        return {
          name: d.measName,
          data: d.vals,
          unit: d.unit,
        };
      });
    },
    selectionChange(val) {
      const ids = val
        .filter(d => d.ycyxType != '遥调' && d.ycyxType !== '遥控')
        .map(d => d.id);
      this.getCurveData(ids);
    },
    reszie() {
      const ci = this.$refs.chart.getChartInstance();
      ci.resize();
    },
    selectableFn(row) {
      return row.ycyxType !== '遥调' && row.ycyxType !== '遥控';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/css-theme/handle.scss';

.middleBtn {
  @include background_color('layout_menu_bg');
  border: none;
  width: 100%;
  margin: auto;
}
::v-deep el-dialog__body {
  padding: 0 !important;
}
</style>
<style>
.measBox .el-dialog__body {
  padding: 0px !important;
}
</style>
