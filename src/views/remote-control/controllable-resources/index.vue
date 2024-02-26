<!--
 * @Description  : 资源管理
 * @Author       : 陈凯
 * @Date         : 2023-11-27 10:02:19
 * @LastEditors  : 陈凯
 * @LastEditTime : 2023-11-28 10:06:27
 * @FilePath     : \init-project\src\views\remote-control\controllable-resources\index.vue
-->

<template>
  <div class="app-container">
    <!-- 头部搜索 -->
    <div ref="form">
      <el-form
        :model="queryParams"
        :inline="true"
        label-width="5.625rem"
        class="query-container relative card-container"
      >
        <el-form-item label="户号/户名" prop="consNo">
          <el-input
            v-model="queryParams.consNo"
            placeholder="请输入户号或户名"
            clearable
            @keyup.enter.native="handleSearch"
          />
        </el-form-item>
        <el-form-item label="地市" prop="city">
          <el-select v-model="queryParams.city" placeholder="请选择" clearable>
            <el-option
              v-for="dict in cityList"
              :key="dict.id"
              :label="dict.name"
              :value="dict.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="行业类型" prop="tradeCate">
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

        <div class="absolute-top-right-10">
          <el-button
            icon="el-icon-search"
            type="primary"
            size="mini"
            @click="handleBindMeas"
            >绑定用户</el-button
          >
          <el-button
            icon="el-icon-delete"
            type="danger"
            size="mini"
            @click="batchUnLink"
            >批量解绑</el-button
          >
          <el-button
            icon="el-icon-refresh"
            size="mini"
            class="commonBtn"
            @click="refreshData"
            >刷新</el-button
          >
          <el-button
            icon="el-icon-search"
            type="primary"
            size="mini"
            @click="handleSearch"
            >查询</el-button
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
        :showSelect="true"
        :loading="loading"
        :tableData="tableData"
        :tableColumns="tableColumns"
        :paginationConfig="queryParams"
        @page-current-change="handlePageCurrentChange"
        @pageNum-current-change="handleNumChange"
        @selectionChange="selectionChange"
        @sortChange="sortChange"
      >
        <template #end>
          <el-table-column
            label="操作"
            align="center"
            class-name="small-padding"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                icon="el-icon-delete"
                class="tableDeleteBtn"
                @click="unLink(scope.row)"
                >解绑</el-button
              >
            </template>
          </el-table-column>
        </template>
      </element-table>
    </div>
    <!-- 新增弹窗 -->
    <element-dialog
      width="60%"
      :title="title"
      v-model="showDialog"
      ref="elementDialog"
      @submit="handleSubmit"
    >
      <el-form
        :model="queryParamsDialog"
        :inline="true"
        label-width="5.625rem"
        class="query-container relative card-container"
      >
        <el-form-item label="户号/户名" prop="consNo">
          <el-input
            v-model="queryParamsDialog.consNo"
            placeholder="请输入户号或户名"
            clearable
            @keyup.enter.native="handleSearch"
          />
        </el-form-item>
        <el-form-item label="地市" prop="city">
          <el-select
            v-model="queryParamsDialog.city"
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
        <el-form-item label="行业类型" prop="tradeCate">
          <el-select
            v-model="queryParamsDialog.tradeCate"
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

        <div class="absolute-top-right-10">
          <el-button
            icon="el-icon-search"
            type="primary"
            size="mini"
            @click="handleSearchDialog"
            >查询</el-button
          >
        </div>
      </el-form>
      <element-table
        style="height: 34rem"
        :showSelect="true"
        :loading="loadingDialog"
        :tableData="tableDataDialog"
        :tableColumns="tableColumns"
        :paginationConfig="queryParamsDialog"
        @page-current-change="handlePageCurrentChangeDialog"
        @pageNum-current-change="handleNumChangeDialog"
        @selectionChange="selectionChangeDialog"
        @sortChange="sortChangeDialog"
      >
      </element-table>
    </element-dialog>
  </div>
</template>

<script>
import elementTable from '@/components/ElementTable/index_d.vue';
import editTable from '@/components/EditTable/index.vue';
import elementDialog from '@/components/ElementDialog/index.vue';
import HttpUrl from '@/api/remote-control/controllable-resource';

export default {
  name: 'dictionaryManagement',
  components: { elementTable, elementDialog, editTable },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      isFold: true,
      // 表格
      loading: true,
      loadingDialog: true,
      tableDataSelectOptions: [],
      tableDataSelectOptionsDialog: [],
      tableData: [],
      tableDataDialog: [],
      tableColumns: [
        {
          label: '用户名称',
          prop: 'consName',
          sortable: 'custom',
        },
        {
          label: '户号',
          prop: 'consNo',
          sortable: 'custom',
        },

        {
          label: '地市',
          prop: 'city',
          sortable: 'custom',
        },
        {
          label: '行业',
          prop: 'trade',
          sortable: 'custom',
        },

        {
          label: '受电容量',
          prop: 'powerReceivingCapacity',
          sortable: 'custom',
        },
        {
          label: '总表设备名称',
          prop: 'equipName',
          sortable: 'custom',
        },
      ],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      queryParamsDialog: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      // 弹窗
      title: '',
      showDialog: false,
      consumerTradeCateOptions: [],
    };
  },

  mounted() {
    // 用户类型
    this.getSelectOptons('consumer_trade_cate').then(res => {
      this.consumerTradeCateOptions = res.data;
    });
    this.getCityList();
    this.getList();
  },
  methods: {
    handleSearch() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    handleSearchDialog() {
      this.queryParamsDialog.pageNum = 1;
      this.getListDialog();
    },
    // 请求表格数据
    getList() {
      this.loading = true;
      HttpUrl.getControllableUser(this.queryParams).then(res => {
        this.tableData = res.data.data ?? [];
        this.$nextTick(() => {
          this.queryParams.total = res.data.total;
        });
        this.loading = false;
      });
    },
    // 请求弹窗表格数据
    getListDialog() {
      this.loadingDialog = true;
      HttpUrl.getResourcePoolUser(this.queryParamsDialog).then(res => {
        this.tableDataDialog = res.data.data ?? [];
        this.$nextTick(() => {
          this.queryParamsDialog.total = res.data.total;
        });
        this.loadingDialog = false;
      });
    },
    // 刷新
    refreshData() {
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      };
      this.getList();
    },
    // 表格多选
    selectionChange(e) {
      this.tableDataSelectOptions = e ? e.map(val => val.consId) : [];
    },
    selectionChangeDialog(e) {
      this.tableDataSelectOptionsDialog = e ? e.map(val => val.consId) : [];
    },
    // 绑定用户
    handleBindMeas() {
      this.title = '绑定用户';
      this.getListDialog();
      this.showDialog = true;
    },
    // 解绑
    unLink(row) {
      this.unLinkByIds([row.consId]);
    },
    // 批量解绑
    batchUnLink() {
      this.unLinkByIds(this.tableDataSelectOptions);
    },
    async unLinkByIds(ids = []) {
      if (!ids || !ids.length) return;
      const params = {
        params: ids,
      };
      this.$confirm('是否确认解绑').then(async () => {
        const res = await HttpUrl.deleteResourcePoolUser(params);
        if (res.code == 200) {
          this.$message.success('解绑成功');
          this.getList();
        }
      });
    },
    // 表格确认
    handleSubmit() {
      HttpUrl.addResourcePoolUser({
        params: this.tableDataSelectOptionsDialog,
      }).then(res => {
        if (res.code == 200) {
          this.$message.success('绑定成功');
          this.getList();
          this.$refs.elementDialog.handleCancel();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-upload,
::v-deep .el-upload-dragger {
  width: 100% !important;
}

::v-deep .el-table__body-wrapper::-webkit-scrollbar {
  display: none;
}
</style>
