<template>
  <div class="container app-container">
    <el-form
      :model="queryParams"
      :inline="true"
      label-width="5.625rem"
      class="query-container relative card-container"
    >
      <el-form-item label="路由名称：" prop="cnName">
        <el-input v-model="cnName" placeholder="请输入路由名称" clearable />
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
        <template #action="{ rowData: { row } }">
          <el-button
            icon="el-icon-edit"
            type="primary"
            size="mini"
            @click="handleUpdate(row)"
            >修改</el-button
          >
          <DelButton @handleDel="() => handleDelete(row)"></DelButton>
        </template>
        <template #paramValue="{ rowData: { row } }">
          <div>
            {{ row.param?.Path?.paramValue || row.param.Rewrite.paramValue }}
          </div>
        </template>
        <template #RewriteValue="{ rowData: { row } }">
          <div>{{ row.param.Rewrite.RewriteValue }}</div>
        </template>
      </element-table>
    </div>
    <FormDialog
      :title="dialogTitle"
      ref="formDialog"
      @submit="initTableData"
    ></FormDialog>
  </div>
</template>

<script>
import ElementTable from '@/components/ElementTable/index_d';
import { tableColumnList, tableDataList } from './server';
import tableMixins from '@/mixins/table';
import API from '@/api/permission';
import FormDialog from './comp/FormDialog';
import DelButton from '@/components/DelButton.vue';

const defaultParam = {
  Path: { paramValue: '' },
  Rewrite: { paramValue: '', RewriteValue: '' },
};
export default {
  mixins: [tableMixins],
  components: { ElementTable, FormDialog, DelButton },
  data() {
    return {
      cnName: '',
      dialogTitle: '编辑路由',
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
      const res = await API.GetRouteList({
        cnName: this.cnName,
        pageNo: this.paginationConfig['pageNum'],
        pageSize: this.paginationConfig['pageSize'],
        // type: 10220001
      });
      if (res.code !== 200) {
        this.isLoading = false;
        return;
      }
      this.tableDataList = res.data.data.map(item => {
        item.param = Object.assign(
          JSON.parse(JSON.stringify(defaultParam)),
          JSON.parse(item.param)
        );
        return item;
      });
      this.paginationConfig.total = res.data.total;
      this.isLoading = false;
    },
    handleUpdate(row) {
      this.dialogTitle = '编辑路由';
      this.$refs.formDialog.open(row);
    },
    handleAddData() {
      this.dialogTitle = '新增路由';
      this.$refs.formDialog.open({
        param: JSON.parse(JSON.stringify(defaultParam)),
      });
    },
    async handleDelete(row) {
      await API.DelRoute({ id: row.id });
      await this.initTableData();
      if (this.tableDataList == 0 && this.paginationConfig['pageNum'] > 1) {
        this.paginationConfig['pageNum'] = this.paginationConfig['pageNum'] - 1;
        this.initTableData();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/css-theme/handle.scss';

.container {
  .top-content {
    padding: 10px 5px;
    @include background_color('layout_menu_submenu_item_bg');
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
