<template>
  <div class="w-h-100" style="padding: 0.3rem">
    <left-right-layout isLeftBorder>
      <template #left-layout>
        <div class="flex_row_c margin-bottom-10">
          <!-- 标题搜索标签 -->
          <div
            class="text-color flex-1"
            style="font-szie: 15px; font-weight: 600; line-height: 100%"
          >
            {{ treeTitle }}
          </div>
          <div>
            <el-button
              icon="el-icon-plus"
              type="primary"
              size="mini"
              @click="handleAddTemp"
              >新增</el-button
            >
            <el-button
              icon="el-icon-delete"
              type="danger"
              size="mini"
              @click="handleDelTemp"
              >删除</el-button
            >
          </div>
        </div>
        <el-input
          v-model="searchInfo"
          placeholder="请输入关键词"
          :clearable="true"
          suffix-icon="el-icon-search"
          class="search-input"
          @change="getTreeData"
        >
        </el-input>
        <!-- <div class="tree-box"> -->
        <element-tree
          ref="treeRef"
          node-key="groupId"
          class="custom-tree-wrapper"
          className="custom-tree"
          :renderContent="renderContent"
          :tree-data="treeData"
          :highlight-current="true"
          :default-expand-all="true"
          :currentNodeKey="queryParams.id"
          :filter-node-method="filterNode"
          :default-props="{
            children: 'children',
            label: 'groupName',
            id: 'groupId',
          }"
          @nodeClick="handleNodeClick"
        >
        </element-tree>
        <!-- </div> -->
      </template>
      <template #right-layout>
        <div class="flex margin-top-10 margin-left-10">
          <div class="text-color flex-1 total-text">
            用户数量:<span>{{ queryParams.total }}</span>
          </div>
          <div class="margin-right-10">
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
              @click="getTableData"
              >刷新</el-button
            >
          </div>
        </div>
        <!-- 表格 -->
        <div class="card-container table-box">
          <element-table
            rowKey="consId"
            :showSelect="true"
            :loading="loading"
            :tableData="tableData"
            :tableColumns="tableColumns"
            :paginationConfig="queryParams"
            @selectionChange="selectionChange"
            @page-current-change="handlePageCurrentChange"
            @pageNum-current-change="handleNumChange"
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
                    >解绑用户</el-button
                  >
                </template>
              </el-table-column>
            </template>
          </element-table>
        </div>
      </template>
    </left-right-layout>
    <!-- 新增编辑弹窗 -->
    <BindUserDialog @submit="getTableData" ref="bindUserDialog" />
    <AddTempDialog @submit="getTreeData" ref="addTempDialog" />
  </div>
</template>

<script>
import LeftRightLayout from '@/components/LeftRightLayout';
import TreeTopLabel from '@/components/TreeTopLabel';
import ElementTree from '@/components/ElementTree/index';
import elementTable from '@/components/ElementTable/index_d.vue';
import BindUserDialog from './comp/BindUserDialog.vue';
import AddTempDialog from './comp/AddTempDialog.vue';
import * as Servce from './service';
import API from '@/api/remote-control/group-control.js';

export default {
  components: {
    LeftRightLayout,
    TreeTopLabel,
    ElementTree,
    elementTable,
    BindUserDialog,
    AddTempDialog,
  },
  data() {
    return {
      treeTitle: '',
      searchInfo: '',
      treeData: Servce.treeData,
      loading: true,
      tableDataSelectOptions: [],
      tableData: Servce.tableData,
      tableColumns: Servce.tableColumns,
      queryParams: {
        id: 1,
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      await this.getTreeData();
      if (!this.treeData.length) return;
      this.treeTitle = this.treeData[0].groupName;
      this.$nextTick(async () => {
        this.queryParams.id = this.treeData[0].groupId;
        await this.getTableData();
      });
    },
    async getTreeData() {
      this.loading = true;
      const res = await API.getGroupList({ param: this.searchInfo });
      if (res.code != 200) {
        this.loading = false;
        return;
      }
      this.treeData = res.data.map((d, i) => {
        d.index = i + 1;
        d.groupId = '' + d.groupId;
        return d;
      });
      this.loading = false;
    },
    async getTableData() {
      this.loading = false;
      const res = await API.getConsByGroupId(this.queryParams);
      if (res.code != 200) {
        this.loading = false;
        return;
      }
      this.tableData = res.data.data;
      this.queryParams.total = res.data.total;
      this.loading = false;
    },
    handleNodeClick(option) {
      const { data, node } = option;
      this.queryParams.id = data.groupId;
      this.treeTitle = data.groupName;
      this.getTableData();
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handlePageCurrentChange(num) {
      this.queryParams.pageNum = num;
      this.getTableData();
    },
    handleNumChange() {
      this.queryParams.pageNum = 1;
      this.queryParams.pageSize = num;
      this.getTableData();
    },
    // 表格排序
    // sortChange(sortArr) {
    //   this.queryParams.sortList = sortArr
    //   this.getTableData()
    // },
    // 表格多选
    selectionChange(e) {
      this.tableDataSelectOptions = e ? e.map(val => val.consId) : [];
    },
    handleBindMeas() {
      this.$refs.bindUserDialog.open(this.queryParams.id);
    },
    handleAddTemp() {
      this.$refs.addTempDialog.open();
      // this.$prompt('请输入模板名称', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消'
      // }).then(async ({ value }) => {
      //   await API.addOrUpdateEquipMeasTmpl({ name: value })
      //   this.getTreeData()
      // })
    },
    handleDelTemp() {
      this.$confirm('是否确认删除?').then(async () => {
        const res = await API.deleteGroup({ param: this.queryParams.id });
        if (res.code !== 200) {
          this.$message.error(res.message);
        }
        this.initData();
      });
    },
    unLink(row) {
      this.unLinkByIds([row.consId]);
    },
    batchUnLink() {
      this.unLinkByIds(this.tableDataSelectOptions);
    },
    async unLinkByIds(ids = []) {
      if (!ids || !ids.length) return;
      const params = {
        consIds: ids,
        groupId: this.queryParams.id,
      };
      this.$confirm('是否确认解绑').then(async () => {
        const res = await API.groupUnLinkCons(params);
        if (res.code == 200) {
          this.$message.success('解绑成功');
          this.getTableData();
        }
      });
    },
    renderContent(h, { node, data, store }) {
      return (
        <div class="flex custom-tree-node">
          <span>{data.index}：</span>
          <div class="text-overflow flex-1" title={node.label}>
            {node.label}
          </div>
        </div>
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/css-theme/handle.scss';
.table-box {
  height: calc(100% - 3rem);
}
.total-text {
  line-height: 30px;
  span {
    padding-left: 10px;
    color: #3a70f1;
  }
}
</style>
