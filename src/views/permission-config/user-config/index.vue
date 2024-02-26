<template>
  <div class="container app-container">
    <el-form
      :model="queryParams"
      :inline="true"
      label-width="5.625rem"
      class="query-container relative card-container"
    >
      <el-form-item label="用户名称：" prop="nickName">
        <el-input v-model="nickName" placeholder="请输入用户名称" clearable />
      </el-form-item>
      <el-form-item label="手机号码：" prop="phone">
        <el-input v-model="phone" placeholder="请输入手机号码" clearable />
      </el-form-item>
      <div class="absolute-top-right-10" style="top: 15px">
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-search"
          @click="searchData"
          >查询
        </el-button>
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-plus"
          @click="handleAddData"
          >新增</el-button
        >
        <el-button
          class="commonBtn"
          icon="el-icon-refresh-right"
          size="mini"
          @click="handleReset"
          >重置</el-button
        >
      </div>
    </el-form>

    <div class="card-container bottom-content layout-border">
      <element-table
        :table-columns="tableColumnList"
        :table-data="tableDataList"
        :show-pagination="true"
        :paginationConfig="paginationConfig"
        :loading="isLoading"
        :showIndex="true"
        @page-current-change="handleCurrentChange"
        @pageNum-current-change="handleSizeChange"
      >
        <template #end>
          <el-table-column
            label="操作"
            align="center"
            class-name="small-padding"
            :width="echartFontSize(310)"
          >
            <template slot-scope="scope">
              <el-button
                icon="el-icon-edit"
                type="primary"
                size="mini"
                @click="handleUpdate(scope.row)"
                >修改</el-button
              >
              <el-button
                icon="el-icon-refresh-right"
                type="primary"
                size="mini"
                @click="handleModifyPassword(scope.row)"
                >密码重置</el-button
              >
              <DelButton @handleDel="() => handleDelete(scope.row)"></DelButton>
            </template>
          </el-table-column>
        </template>
      </element-table>
    </div>
    <FormDialog
      :title="dialogTitle"
      ref="formDialog"
      @submit="initTableData"
    ></FormDialog>
    <EditorFormDialog
      :title="dialogTitle"
      @submit="initTableData"
      ref="editorFormDialog"
    ></EditorFormDialog>
    <ResetPassword title="密码重置" ref="resetPassword"></ResetPassword>
  </div>
</template>

<script>
import FormDialog from './comp/FormDialog';
import EditorFormDialog from './comp/EditorFormDialog';
import ResetPassword from './comp/ResetPassword';
import ElementTable from '@/components/ElementTable/index_d';
import { tableColumnList, tableDataList } from './server';
import API from '@/api/permission';
import tableMixins from '@/mixins/table';
import DelButton from '@/components/DelButton.vue';

export default {
  mixins: [tableMixins],
  components: {
    FormDialog,
    ElementTable,
    ResetPassword,
    EditorFormDialog,
    DelButton,
  },
  data() {
    return {
      nickName: '',
      phone: '',
      dialogTitle: '编辑',
      tableColumnList: tableColumnList,
      tableDataList: tableDataList,
    };
  },
  mounted() {
    this.initTableData();
  },
  methods: {
    async initTableData() {
      this.isLoading = true;
      const res = await API.GetList({
        nickName: this.nickName,
        phone: this.phone,
        pageNo: this.paginationConfig['pageNum'],
        pageSize: this.paginationConfig['pageSize'],
      });
      if (res.code !== 200) {
        this.isLoading = false;
        return;
      }
      this.tableDataList = res.data.data;
      this.paginationConfig.total = res.data.total;
      this.isLoading = false;
    },
    handleAddData() {
      this.dialogTitle = '添加用户';
      this.$refs.formDialog.open({ roleIds: [] });
    },
    handleUpdate(row) {
      this.dialogTitle = '编辑';
      this.$refs.editorFormDialog.open(row);
    },
    handleModifyPassword(row) {
      this.$refs.resetPassword.open(row);
    },
    async handleDelete(row) {
      const res = await API.DelUser({ id: row.id });
      if (res.code == 200) {
        this.$message.success('删除成功');
      } else {
        this.$message.error(res.message);
        return;
      }
      await this.initTableData();
      if (this.tableDataList == 0 && this.paginationConfig['pageNum'] > 1) {
        this.paginationConfig['pageNum'] = this.paginationConfig['pageNum'] - 1;
        this.initTableData();
      }
    },
    handleReset() {
      this.nickName = '';
      this.phone = '';
      this.paginationConfig['pageNum'] = 1;
      this.initTableData();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/css-theme/handle.scss';
.container {
  .top-content {
    position: relative;
    @include background_color('layout_menu_submenu_item_bg');
    padding: 10px 5px;
    // height: 36px;
  }

  .bottom-content {
    width: 100%;
    height: calc(100% - 4.6rem);
    margin-top: 0.625rem;
  }
}
.input-title {
  width: 100px;
  line-height: 28px;
}
</style>
