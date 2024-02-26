<!--
 * @Description  : 聚合商档案
 * @Author       : 陈凯
 * @Date         : 2023-08-11 09:42:41
 * @LastEditors  : 陈凯
 * @LastEditTime : 2023-12-04 11:25:43
 * @FilePath     : \init-project\src\views\file-management\quotient-file\index.vue
-->

<template>
  <div class="app-container">
    <!-- 头部搜索 -->
    <div ref="form">
      <el-form
        :model="queryParams"
        :inline="true"
        label-width="6.25rem"
        class="query-container relative card-container"
      >
        <el-form-item label="名称/编号" prop="roleName">
          <el-input
            v-model="queryParams.code"
            placeholder="请输入名称/编号"
            clearable
          />
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

        <el-form-item label="上调容量(kW)" prop="status" v-if="!isFold">
          <el-input
            v-model="queryParams.upCapacity"
            placeholder="请输入上调容量(kW)"
            clearable
          />
        </el-form-item>

        <el-form-item label="下调容量(kW)" prop="archiveStatus" v-if="!isFold">
          <el-input
            v-model="queryParams.downCapacity"
            placeholder="请输入下调容量(kW)"
            clearable
          />
        </el-form-item>
        <br />
        <el-form-item label="档案状态" prop="createDate" v-if="!isFold">
          <el-select
            v-model="queryParams.status"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="dict in aggregator_status_options"
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
          <el-button
            icon="el-icon-plus"
            type="primary"
            size="mini"
            @click="handleAdd"
            >新增</el-button
          >
          <el-button
            icon="el-icon-delete"
            type="danger"
            size="mini"
            @click="handleMoreDelete"
            >删除</el-button
          >
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            class="inline-block margin-row-10"
            :http-request="handleImport"
            :before-upload="handleBeforeUpload"
          >
            <el-button icon="el-icon-download" size="mini" class="commonBtn"
              >导入</el-button
            >
          </el-upload>

          <el-button
            icon="el-icon-upload2"
            size="mini"
            class="commonBtn"
            @click="handleExport"
            >导出</el-button
          >
          <!-- <el-button icon="el-icon-document" size="mini" class="commonBtn"
            >模板下载</el-button
          > -->
        </div>
        <!--  -->
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
        :showSelect="true"
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
                style="margin-right: 10px"
                icon="el-icon-edit"
                class="tableBtn"
                @click="handleEdit(scope.row)"
                >修改</el-button
              >
              <!-- <el-button
                size="mini"
                icon="el-icon-delete"
                class="tableDeleteBtn"
                @click="handleDelete(scope.row)"
                >删除</el-button
              > -->
            </template>
          </el-table-column>
        </template>
      </element-table>
    </div>
    <!-- 新增编辑弹窗 -->
    <element-dialog
      :title="title"
      v-model="showDialog"
      ref="elementDialog"
      @submit="handleSubmit"
    >
      <el-form
        :model="form"
        :rules="rules"
        label-width="8.75rem"
        class="flex_row_a flex_wrap dialogForm"
      >
        <el-form-item label="聚合商名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入聚合商名称" />
        </el-form-item>
        <el-form-item label="聚合商编号" prop="code">
          <el-input type="number" v-model="form.code" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="上调容量(kW)" prop="upCapacity">
          <el-input
            oninput="value=value.replace(/[^0-9.]/g,'')"
            v-model="form.upCapacity"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="下调容量(kW)" prop="downCapacity">
          <el-input
            oninput="value=value.replace(/[^0-9.]/g,'')"
            v-model="form.downCapacity"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="联系人" prop="contacts">
          <el-input v-model="form.contacts" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="联系人电话" prop="phone">
          <el-input type="number" v-model="form.phone" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态" clearable>
            <el-option
              v-for="dict in aggregator_status_options"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            :picker-options="pickerOptions"
            placeholder="请选择日期"
            v-model="form.createTime"
            value-format="yyyy-MM-dd"
            type="date"
          />
        </el-form-item>
        <el-form-item style="width: 350px"> </el-form-item>
        <el-form-item label="备注" style="width: 95%">
          <el-input
            type="textarea"
            autosize
            placeholder="无"
            v-model="form.isAsPart"
          >
          </el-input>
        </el-form-item>
      </el-form>
    </element-dialog>
  </div>
</template>

<script>
import elementTable from '@/components/ElementTable/index_d.vue';
import elementDialog from '@/components/ElementDialog/index.vue';
import HttpUrl from '@/api/file-management/quotientFile';

export default {
  name: 'quotientFile',
  components: { elementTable, elementDialog },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      isFold: true,
      loading: true,
      tradeCateOptions: [],
      // 表格
      tableDataSelectOptions: [],
      tableData: [],
      tableColumns: [
        {
          label: '聚合商名称',
          prop: 'name',
        },
        {
          label: '聚合商编号',
          prop: 'code',
        },
        {
          label: '上调容量(kW)',
          prop: 'upCapacity',
        },
        {
          label: '下调容量(kW)',
          prop: 'downCapacity',
        },
        {
          label: '档案状态',
          prop: 'status',
        },

        // {
        //   label: '创建日期',
        //   prop: 'createTime',
        // },
      ],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        createDate: '',
      },
      // 弹窗
      title: '',
      showDialog: false,
      form: {},
      // 表单校验
      rules: {
        consName: [{ required: true, message: '请输入', trigger: 'blur' }],
        eleSales: [{ required: true, message: '请输入', trigger: 'blur' }],
        ownerKey: [{ required: true, message: '请输入', trigger: 'blur' }],
        consNo: [{ required: true, message: '请输入', trigger: 'blur' }],
        powerTypeKey: [{ required: true, message: '请输入', trigger: 'blur' }],
        volLevelKey: [{ required: true, message: '请输入', trigger: 'blur' }],
      },
      aggregator_status_options: [],
    };
  },

  mounted() {
    // 聚合商状态
    this.getSelectOptons('archives_status').then(res => {
      this.aggregator_status_options = res.data;
    });
    this.getList();
  },
  methods: {
    // 请求表格数据
    getList() {
      this.loading = true;
      HttpUrl.paginatedAggregator(this.queryParams).then(res => {
        this.tableData = res.data.data;
        this.$nextTick(() => {
          this.queryParams.total = res.data.total;
        });
        this.loading = false;
      });
    },
    // 表格查询
    handleSearch() {
      this.queryParams.pageNum = 1;
      this.getList();
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
      this.tableDataSelectOptions = e ? e.map(val => val.id) : [];
    },

    // 通过id查询表格详情
    handleTableData(param) {
      HttpUrl.getAggregator({ param }).then(res => {
        if (res.code == 200) {
          this.form = res.data;
        }
      });
    },
    // 表格新增
    handleAdd() {
      this.title = '新增';
      this.form = {};
      this.showDialog = true;
    },
    // 表格修改
    handleEdit(row) {
      this.handleTableData(row.id);
      this.title = row.name;
      this.showDialog = true;
    },
    // 表格确认
    handleSubmit() {
      HttpUrl.saveOrUpdateAggregator(this.form).then(res => {
        if (res.code == 200) {
          let submitText = this.title == '新增' ? '新增成功' : '修改成功';
          this.$message.success(submitText);
          this.getList();
          this.$refs.elementDialog.handleCancel();
        }
      });
    },
    // 表格删除
    handleDelete(row) {
      this.$confirm('是否确认删除该用户信息?').then(() => {
        HttpUrl.deleteAggregatorBatch({ params: [row.id] }).then(res => {
          if (res.code == 200) {
            this.$message.success('删除成功');
            this.getList();
          }
        });
      });
    },
    // 表格批量删除
    handleMoreDelete() {
      if (this.tableDataSelectOptions.length == 0) {
        this.$message.error('请选择需要删除的用户');
        return;
      }
      this.$confirm('是否确认删除已选中用户信息?').then(() => {
        HttpUrl.deleteAggregatorBatch({
          params: this.tableDataSelectOptions,
        }).then(res => {
          if (res.code == 200) {
            this.$message.success('删除成功');
            this.getList();
          }
        });
      });
    },
    // 表格导入
    handleImport(option) {
      const fileForm = new FormData();
      fileForm.append('file', option.file);
      document.querySelector('.el-upload-list').style.display = 'none';
      HttpUrl.importAggregatorExcel(fileForm, url => url, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(res => {
        if (res.code == 200) {
          this.$message.success('聚合商信息导入成功');

          this.getList();
        }
      });
    },
    // 表格导出
    handleExport() {
      HttpUrl.exportAggregatorExcel(this.queryParams, '', {
        responseType: 'blob',
      }).then(res => {
        this.exportExcel(res, '聚合商档案');
        this.$message.success('导出成功');
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
