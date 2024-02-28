<template>
  <div class="app-container">
    <!-- 头部搜索 -->
    <div ref="form">
      <el-form
        :model="queryParams"
        :inline="true"
        class="query-container relative card-container"
        label-width="5rem"
      >
        <el-form-item label="在线状态" prop="isOnline">
          <el-select
            v-model="queryParams.isOnline"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="dict in online_state_options"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>

        <el-form-item v-if="isFold">
          <el-button
            icon="el-icon-search"
            type="primary"
            size="mini"
            @click="handleSearch"
            >查询</el-button
          >
        </el-form-item>
        <el-form-item label="户号/户名" prop="consNo" v-if="!isFold">
          <el-input
            v-model="queryParams.consNo"
            placeholder="请输入户号或用户名"
            clearable
            @keyup.enter.native="getList"
          />
        </el-form-item>
        <el-form-item
          label="地区"
          prop="city"
          label-width="3.75rem"
          v-if="!isFold"
        >
          <el-select
            style="width: 100%"
            v-model="queryParams.city"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="dict in cityList"
              :key="dict.id"
              :label="dict.name"
              :value="dict.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="行业类型" prop="tradeCate" v-if="!isFold">
          <el-select
            v-model="queryParams.tradeCate"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="dict in consumerTradeCateOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="数据来源" prop="dataChannalType" v-if="!isFold">
          <el-select
            v-model="queryParams.dataChannalType"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="dict in data_channal_type_options"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>

        <div class="float-right" v-if="!isFold">
          <el-button
            icon="el-icon-search"
            type="primary"
            size="mini"
            @click="handleSearch"
            >查询</el-button
          >
        </div>
        <div class="absolute-top-right-10">
          <el-button
            icon="el-icon-refresh"
            size="mini"
            class="commonBtn"
            @click="refreshData"
            >刷新</el-button
          >
          <el-button
            v-if="isFold"
            icon="el-icon-d-arrow-right"
            size="mini"
            class="commonBtn"
            @click="isFold = false"
            >展开</el-button
          >
          <el-button
            v-if="!isFold"
            icon="el-icon-d-arrow-left"
            size="mini"
            class="commonBtn"
            @click="isFold = true"
            >收起</el-button
          >
        </div>
      </el-form>
    </div>
    <!-- 表格 -->
    <div
      class="card-container margin-top-10"
      :style="{
        height: this.isFold ? 'calc(100% - 4.5rem )' : 'calc(100% - 7.125rem)',
      }"
    >
      <element-table
        :loading="loading"
        :tableData="tableData"
        :tableColumns="tableColumns"
        :paginationConfig="queryParams"
        @page-current-change="handlePageCurrentChange"
        @pageNum-current-change="handleNumChange"
        @sortChange="sortChange"
      >
        <template #consNowStatus="{ rowData: { row } }">
          <div
            :class="{ stateColor: row.consNowStatus == '在线' }"
            style="color: #f00"
          >
            {{ row.consNowStatus }}
          </div>
        </template>
        <template #nowVal="{ rowData: { row } }">
          <div class="tableBtn underline pointer" @click="handleViewCurve(row)">
            {{ KeepDecimal(row.nowVal ?? '-') }}
          </div>
        </template>
        <template #num="{ rowData: { row } }">
          <div
            class="tableBtn underline pointer"
            @click="handleViewDevice(row)"
          >
            {{ row.num ?? '-' }}
          </div>
        </template>
      </element-table>
    </div>
    <ViewCurveDialog ref="viewCurve"></ViewCurveDialog>
    <ViewDataDialog ref="viewData"></ViewDataDialog>
  </div>
</template>

<script>
import elementTable from '@/components/ElementTable/index_d.vue';
import HttpUrl from '@/api/load-monitor';
import * as Server from './server';
import ViewCurveDialog from './comp/ViewCurveDialog.vue';
import ViewDataDialog from './comp/ViewDataDialog.vue';
import router from '@/router';

export default {
  components: { elementTable, ViewCurveDialog, ViewDataDialog },
  data() {
    return {
      loading: true,
      isFold: true,
      tableData: [],
      tableColumns: Server.tableColumns,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        city: '',
        tradeCate: '',
        isOnline: '1',
      },
      consumerTradeCateOptions: [],
      data_channal_type_options: [],
      online_state_options: [],
    };
  },

  created() {
    // 用户类型
    this.getSelectOptons('consumer_trade_cate').then(res => {
      this.consumerTradeCateOptions = res.data;
    });
    // 数据来源
    this.getSelectOptons('data_channal_type').then(res => {
      this.data_channal_type_options = res.data;
    });
    // 在线状态
    this.getSelectOptons('online_state').then(res => {
      this.online_state_options = res.data;
    });
    this.getCityList();
    // this.getList();
  },
  mounted() {
    if (this.$route.query.city) {
      this.queryParams.city = this.$route.query.city;
    } else if (this.$route.query.tradeCate) {
      this.queryParams.tradeCate = this.$route.query.tradeCate;
    }
    this.getList();
  },
  methods: {
    // 表格查询
    handleSearch() {
      this.queryParams.pageNum = 1;
      this.setSessionItem(
        'historyMonitorQuery',
        JSON.stringify(this.queryParams)
      );
      this.getList();
    },
    // 请求表格数据
    async getList() {
      this.loading = true;
      if (sessionStorage.getItem('historyMonitorQuery')) {
        this.queryParams = JSON.parse(
          sessionStorage.getItem('historyMonitorQuery')
        );
      }
      const res = await HttpUrl.monitorConsList(this.queryParams);
      this.tableData = res.data.data;
      this.$nextTick(() => {
        this.queryParams.total = res.data.total;
      });
      this.loading = false;
    },
    // 刷新
    refreshData() {
      sessionStorage.removeItem('historyMonitorQuery');
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      };
      this.getList();
    },
    handleViewCurve(row) {
      this.$refs.viewCurve.open(row);
    },
    handleViewDevice(row) {
      // this.$refs.viewData.open(row);
      this.$router.push({
        path: '/load-monitor/history-monitor-deviceNum',
        query: { id: row.id, name: row.name },
      });
    },
    KeepDecimal(v) {
      if (v == null || v == '-') return '-';
      let d = v * 100;
      return Math.round(+d.toFixed(2)) / 100;
    },
    // 表格页码切换
    handlePageCurrentChange(num) {
      this.queryParams.pageNum = num;
      this.setSessionItem(
        'historyMonitorQuery',
        JSON.stringify(this.queryParams)
      );
      this.getList();
    },
    // 表格列表展示数量
    handleNumChange(num) {
      this.queryParams.pageNum = 1;
      this.queryParams.pageSize = num;
      this.setSessionItem(
        'historyMonitorQuery',
        JSON.stringify(this.queryParams)
      );
      this.getList();
    },
    // 表格排序
    sortChange(sortArr) {
      this.queryParams.sortList = sortArr;
      this.setSessionItem(
        'historyMonitorQuery',
        JSON.stringify(this.queryParams)
      );
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .query-container .el-form-item {
  width: 20%;
}

::v-deep .query-container .el-form-item__content {
  width: calc(100% - 5.625rem);
}
.redColor {
  color: #f00;
}
.underline {
  text-decoration: underline;
}
</style>
