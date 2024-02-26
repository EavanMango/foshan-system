<template>
  <!-- 新增编辑弹窗 -->
  <element-dialog
    title="绑定用户"
    width="60%"
    v-model="showDialog"
    @submit="handleSubmit"
  >
    <div class="flex_dir_col" style="height: 31.25rem">
      <el-form
        :model="queryParams"
        :inline="true"
        class="query-container relative card-container"
      >
        <el-form-item label="户名/户号" prop="consNo">
          <el-input
            v-model="queryParams.consNo"
            placeholder="请输入户号或用户号"
            clearable
            size="small"
            style="width: 12.5rem"
            @keyup.enter.native="handleSearch"
          />
        </el-form-item>
        <el-form-item label="地市" prop="city">
          <el-select
            v-model="queryParams.city"
            placeholder="请选择"
            clearable
            size="small"
            style="width: 12.5rem"
            @change="handleSearch"
          >
            <el-option
              v-for="dict in cityList"
              :key="dict.id"
              :label="dict.name"
              :value="dict.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="行业" prop="tradeCate">
          <el-select
            v-model="queryParams.tradeCate"
            placeholder="请选择"
            clearable
            size="small"
            style="width: 12.5rem"
            @change="handleSearch"
          >
            <el-option
              v-for="dict in consumerTradeCateOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <div class="float-right">
          <el-button
            icon="el-icon-search"
            type="primary"
            size="mini"
            @click="handleSearch"
            >查询</el-button
          >
        </div>
      </el-form>
      <div style="height: calc(100% - 4rem)">
        <element-table
          :loading="loading"
          :tableData="tableData"
          :tableColumns="tableColumns"
          :showSelect="true"
          :paginationConfig="queryParams"
          @sortChange="sortChange"
          @selectionChange="selectionChange"
          @page-current-change="handlePageCurrentChange"
          @pageNum-current-change="handleNumChange"
        >
        </element-table>
      </div>
    </div>
  </element-dialog>
</template>

<script>
import elementDialog from '@/components/ElementDialog/index.vue';
import elementTable from '@/components/ElementTable/index_d.vue';
import userAPI from '@/api/file-management/enterpriseFile';
import API from '@/api/remote-control/group-control.js';
import * as service from './service';

export default {
  components: { elementDialog, elementTable },
  data() {
    return {
      groupId: '',
      loading: false,
      showDialog: false,
      tableData: service.tableData,
      tableColumns: service.tableColumns,
      tableDataSelectOptions: [],
      consumerTradeCateOptions: [],
      queryParams: {
        pageNum: 1,
        pageSize: 5,
        total: 20,
        consNo: '',
        city: '',
        tradeCate: '',
        dataType: 0,
        'pager-count': 5,
      },
    };
  },
  created() {
    this.getCityList();
    // 用户类型
    this.getSelectOptons('consumer_trade_cate').then(res => {
      this.consumerTradeCateOptions = res.data;
    });
  },
  methods: {
    resetParams() {
      this.queryParams = {
        pageNum: 1,
        pageSize: 5,
        total: 0,
        consNo: '',
        city: '',
        tradeCate: '',
        dataType: 0,
        'pager-count': 5,
      };
      this.tableDataSelectOptions = [];
    },
    open(id) {
      this.resetParams();
      this.groupId = id;
      this.showDialog = true;
      this.getList();
    },
    async getList() {
      this.loading = true;
      const res = await userAPI.listConsumerUser({
        ...this.queryParams,
        groupId: this.groupId,
      });
      if (res.code !== 200) return;
      this.tableData = res.data.data;
      this.$nextTick(() => {
        this.queryParams.total = res.data.total;
      });
      this.loading = false;
    },
    handleSearch() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    // 表格多选
    selectionChange(e) {
      this.tableDataSelectOptions = e ? e.map(val => val.consId) : [];
    },
    async handleSubmit() {
      if (!this.tableDataSelectOptions.length) {
        this.$message.info('请至少勾选中一项');
        return;
      }
      await API.groupLinkCons({
        groupId: this.groupId,
        consIds: this.tableDataSelectOptions,
      })
        .then(res => {
          this.$message.success('绑定成功');
        })
        .catch(err => {
          this.$message.error('绑定失败');
        });
      this.$emit('submit');
      this.showDialog = false;
    },
  },
};
</script>

<style></style>
