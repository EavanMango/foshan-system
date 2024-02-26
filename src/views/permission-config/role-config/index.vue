<template>
  <div class="container app-container">
    <el-form
      :model="queryParams"
      :inline="true"
      label-width="5.625rem"
      class="query-container relative card-container"
    >
      <el-form-item label="角色名称：" prop="cnName">
        <el-input v-model="cnName" placeholder="请输入角色名称" clearable />
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
          size="mini"
          icon="el-icon-refresh"
          @click="handleReset"
          >重置</el-button
        >
      </div>
    </el-form>

    <div class="bottom-content card-container">
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
            :width="echartFontSize(430)"
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
                icon="el-icon-user-solid"
                type="primary"
                size="mini"
                @click="handleRelevancy(scope.row)"
                >关联用户</el-button
              >
              <el-button
                icon="el-icon-s-help"
                type="primary"
                size="mini"
                @click="handleSetting(scope.row)"
                >设置权限</el-button
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
    <RelevancyDialog ref="relevancyDialog"></RelevancyDialog>
    <PermissionSettingDialog
      ref="permissionSettingDialog"
    ></PermissionSettingDialog>
  </div>
</template>

<script>
import ElementTable from '@/components/ElementTable/index_d';
import { tableColumnList, tableDataList } from './server';
import API from '@/api/permission';
import tableMixins from '@/mixins/table';
import FormDialog from './comp/FormDialog';
import RelevancyDialog from './comp/RelevancyDialog';
import PermissionSettingDialog from './comp/PermissionSettingDialog';
import DelButton from '@/components/DelButton.vue';

export default {
  mixins: [tableMixins],
  components: {
    ElementTable,
    FormDialog,
    RelevancyDialog,
    PermissionSettingDialog,
    DelButton,
  },
  data() {
    return {
      cnName: '',
      createTime: '',
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
      const res = await API.GetRoleList({
        cnName: this.cnName,
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
    async handleDelete(row) {
      const res = await API.DelRole({ id: row.id });
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
    handleAddData() {
      this.dialogTitle = '添加';
      this.$refs.formDialog.open({});
    },
    handleUpdate(row) {
      this.dialogTitle = '编辑';
      this.$refs.formDialog.open(row);
    },
    handleRelevancy(row) {
      this.$refs.relevancyDialog.open(row);
    },
    handleSetting(row) {
      this.$refs.permissionSettingDialog.open(row);
    },
    handleReset() {
      this.cnName = '';
      this.createTime = '';
      this.searchData();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/css-theme/handle.scss';

.container {
  width: 100%;

  .top-content {
    @include background_color('layout_menu_submenu_item_bg');
    padding: 10px 5px;
    position: relative;
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
