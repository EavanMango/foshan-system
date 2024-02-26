<template>
  <element-dialog
    width="60%"
    custom-class="dialog-body-no-padding"
    :showCloseButton="true"
    :title="`${currentData.name}(${currentData.consNo})`"
    v-model="showDialog"
  >
    <div style="height: 70vh; position: relative">
      <element-table
        ref="tableRef"
        :loading="loading"
        :tableData="tableData"
        :tableColumns="tableColumns"
        :paginationConfig="queryParams"
      >
        <template #nowVal="{ rowData: { row } }">
          <div class="tableBtn" @click="handleViewCurve(row)">
            {{ KeepDecimal(row.nowVal) }}
          </div>
        </template>
        <template #end>
          <el-table-column
            label="操作"
            align="center"
            class-name="small-padding"
            width="180"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                icon="el-icon-view"
                class="tableBtn"
                @click="handleViewCurve(scope.row)"
                >查看曲线</el-button
              >
            </template>
          </el-table-column>
        </template>
      </element-table>
    </div>
    <ViewDataCurveDialog ref="viewDataCurve"></ViewDataCurveDialog>
  </element-dialog>
</template>

<script>
import elementDialog from '@/components/ElementDialog/index.vue';
import elementTable from '@/components/ElementTable/index_d.vue';
import * as service from './service';
import API from '@/api/load-monitor';
import ViewDataCurveDialog from './ViewDataCurveDialog.vue';

export default {
  components: { elementDialog, elementTable, ViewDataCurveDialog },
  data() {
    return {
      currentData: {},
      loading: false,
      showDialog: false,
      tableData: [],
      tableColumns: service.tableColumns,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
    };
  },
  methods: {
    open(data) {
      this.showDialog = true;
      this.queryParams.consId = data.id;
      this.currentData = JSON.parse(JSON.stringify(data));
      this.initData();
    },
    async initData() {
      this.loading = true;
      const res = await API.monitorEquipList(this.queryParams);
      this.tableData = res.data.data;
      this.$nextTick(() => {
        this.queryParams.total = res.data.total;
      });
      this.loading = false;
    },
    handleViewCurve(row) {
      this.$refs.viewDataCurve.open(row);
    },
    KeepDecimal(v) {
      if (v == null || v == '-') return '-';
      let d = v * 100;
      return Math.round(+d.toFixed(2)) / 100;
    },
  },
};
</script>

<style scoped>
::v-deep el-dialog__body {
  padding: 0 !important;
}
</style>
