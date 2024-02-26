<!--
 * 
 * 　　┏┓　　　┏┓+ +
 * 　┏┛┻━━━┛┻┓ + +
 * 　┃　　　　　　　┃ 　
 * 　┃　　　━　　　┃ ++ + + +
 *  ████━████ ┃+
 * 　┃　　　　　　　┃ +
 * 　┃　　　┻　　　┃
 * 　┃　　　　　　　┃ + +
 * 　┗━┓　　　┏━┛
 * 　　　┃　　　┃　　　　　　　　　　　
 * 　　　┃　　　┃ + + + +
 * 　　　┃　　　┃
 * 　　　┃　　　┃ +  
 * 　　　┃　　　┃    
 * 　　　┃　　　┃　　+　　　　　　　　　
 * 　　　┃　 　　┗━━━┓ + +
 * 　　　┃ 　　　　　　　┣┓
 * 　　　┃ 　　　　　　　┏┛
 * 　　　┗┓┓┏━┳┓┏┛ + + + +
 * 　　　　┃┫┫　┃┫┫
 * 　　　　┗┻┛　┗┻┛+ + + +
 * 
 -->

<!--
 * @Description  : 白名单管理
 * @Author       : 陈凯
 * @Date         : 2024-01-26 09:42:05
 * @LastEditors  : 陈凯
 * @LastEditTime : 2024-01-26 09:56:35
 * @FilePath     : \init-project\src\views\permission-config\whitelist-management\index.vue
-->

<template>
  <div class="app-container">
    <!-- 头部搜索 -->
    <div ref="form">
      <el-form
        :model="queryParams"
        :inline="true"
        label-width="5.6rem"
        class="query-container relative card-container"
      >
        <el-form-item label="户号/户名" prop="consNo">
          <el-input
            v-model="queryParams.consNo"
            placeholder="请输入户号或用户名"
            clearable
            @keyup.enter.native="getList"
          />
        </el-form-item>
        <el-form-item class="smallcontainer" label-width="3.6rem" label="地市">
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
            icon="el-icon-delete"
            type="danger"
            size="mini"
            @click="batchUnLink"
            >批量解绑</el-button
          >
          <el-button
            icon="el-icon-plus"
            type="primary"
            size="mini"
            @click="handleAdd"
            >新增</el-button
          >
          <el-button
            icon="el-icon-search"
            type="primary"
            size="mini"
            @click="handleSearch"
            @keyup.enter="handleSearch"
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
            width="auto"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                icon="el-icon-delete"
                class="tableDeleteBtn"
                @click="handleDelete(scope.row)"
                >解绑</el-button
              >
            </template>
          </el-table-column>
        </template>
      </element-table>
    </div>
    <!-- 新增弹窗 -->
    <element-dialog
      :title="title"
      width="70%"
      v-model="showDialog"
      ref="elementDialog"
      @submit="handleSubmit"
    >
      <el-form
        :model="queryParamsDialog"
        :inline="true"
        label-width="5.6rem"
        class="query-container relative card-container"
      >
        <el-form-item label="户号/户名" prop="consNo">
          <el-input
            v-model="queryParamsDialog.consNo"
            placeholder="请输入户号或用户名"
            clearable
            @keyup.enter.native="getList"
          />
        </el-form-item>
        <el-form-item class="smallcontainer" label-width="3.6rem" label="地市">
          <el-select
            style="width: 100%"
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
            @keyup.enter="handleSearchDialog"
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
import HttpUrl from '@/api/permission/whitelist-management';

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
      tradeCateOptions: [],
      // 表格
      loading: true,
      tableDataSelectOptions: [],
      tableDataSelectOptionsDialog: [],
      tableData: [],
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
      ],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      // 子项表格
      loadingDialog: true,
      tableDataDialog: [],

      queryParamsDialog: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      // 弹窗
      title: '',
      titleDialog: '',
      showDialog: false,
      form: {},
      // 表单校验
      rules: {
        dictName: [{ required: true, message: '请输入', trigger: 'blur' }],
        dictType: [{ required: true, message: '请输入', trigger: 'blur' }],
        ownerKey: [{ required: true, message: '请输入', trigger: 'blur' }],
        consNo: [{ required: true, message: '请输入', trigger: 'blur' }],
        powerTypeKey: [{ required: true, message: '请输入', trigger: 'blur' }],
        volLevelKey: [{ required: true, message: '请输入', trigger: 'blur' }],
      },
      consumerTradeCateOptions: [],
    };
  },

  mounted() {
    // 行业类型
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
      HttpUrl.getWhiteList(
        Object.assign(this.queryParams, { flag: true })
      ).then(res => {
        this.tableData = res.data.data;
        this.$nextTick(() => {
          this.queryParams.total = res.data.total;
        });
        this.loading = false;
      });
    },
    // 请求弹窗表格数据
    getListDialog() {
      this.loadingDialog = true;
      HttpUrl.getWhiteList(
        Object.assign(this.queryParamsDialog, { flag: false })
      ).then(res => {
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
    // 表格新增
    handleAdd() {
      this.title = '新增';
      this.form = {};
      this.showDialog = true;
      this.getListDialog();
    },

    // 表格确认
    handleSubmit() {
      HttpUrl.insertWhiteList({
        params: this.tableDataSelectOptionsDialog,
      }).then(res => {
        if (res.code == 200) {
          let submitText = '绑定成功';
          this.$message.success(submitText);
          this.getList();
          this.$refs.elementDialog.handleCancel();
        }
      });
    },

    // 表格解绑
    handleDelete(row) {
      this.$confirm('是否确认解绑该信息?').then(() => {
        HttpUrl.deleteWhiteList({ params: [row.consId] })
          .then(res => {
            if (res.code == 200) {
              this.$message.success('解绑成功');
              this.getList();
            } else {
              this.$message.error(res.message);
            }
          })
          .catch(() => {
            this.$message.error('解绑失败');
          });
      });
    },
    // 表格批量解绑
    batchUnLink() {
      if (this.tableDataSelectOptions.length == 0) {
        this.$message.error('请选择需要解绑的用户');
        return;
      }
      this.$confirm('是否确认解绑已选中用户信息?').then(() => {
        HttpUrl.deleteWhiteList({
          params: this.tableDataSelectOptions,
        }).then(res => {
          if (res.code == 200) {
            this.getList();
            this.$message.success('解绑成功');
          }
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .query-container .el-form-item {
  width: 20%;
}
::v-deep .query-container .el-form-item__content {
  width: calc(100% - 5.6rem);
}
::v-deep .query-container .smallcontainer {
  width: calc(20% - 2rem);
}
::v-deep .query-container .smallcontainer .el-form-item__content {
  width: calc(100% - 3.6rem);
}
</style>
