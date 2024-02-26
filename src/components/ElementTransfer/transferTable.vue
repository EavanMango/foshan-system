<template>
  <div class="transferTable flex_row_s">
    <div class="tableEdit">
      <div class="margin-bottom-10">
        <span
          >已参与用户数：<span class="markedNum">{{
            showLeftTableData.length
          }}</span></span
        >
        <el-input
          class="margin-left-10"
          style="width: 12.5rem"
          v-model="leftSearch"
          placeholder="请输入用户名搜索"
          clearable
          @clear="clearLeftSearch()"
        />
        <el-button
          class="float-right"
          icon="el-icon-search"
          type="primary"
          size="mini"
          @click="findLeftData"
          >查询</el-button
        >
      </div>
      <element-table
        style="height: calc(100% - 3rem)"
        ref="leftTable"
        :pagination="false"
        :showIndex="false"
        :showSelect="true"
        :tableData="showLeftTableData"
        :tableColumns="leftTableColumns"
        @selectionChange="leftSelectionChange"
      />
    </div>
    <div class="editBtn flex_row_a">
      <el-button
        :disabled="rightSelectData.length == 0"
        icon="el-icon-arrow-left"
        type="primary"
        size="mini"
        @click="handleLeftBtn"
      ></el-button>
      <el-button
        style="margin: 10px 0"
        :disabled="leftSelectData.length == 0"
        icon="el-icon-arrow-right"
        type="primary"
        size="mini"
        @click="handleRightBtn"
      ></el-button>
    </div>
    <div class="tableEdit">
      <div class="margin-bottom-10">
        <span
          >未参与用户数：<span class="markedNum">{{
            showRightTableData.length
          }}</span></span
        >
        <el-input
          class="margin-left-10"
          style="width: 12.5rem"
          v-model="rightSearch"
          placeholder="请输入用户名搜索"
          clearable
          @clear="clearRightSearch"
        />
        <el-button
          class="float-right"
          icon="el-icon-search"
          type="primary"
          size="mini"
          @click="findRightData"
          >查询</el-button
        >
      </div>
      <element-table
        style="height: calc(100% - 3rem)"
        ref="rightTable"
        :pagination="false"
        :showIndex="false"
        :showSelect="true"
        :tableData="showRightTableData"
        :tableColumns="rightTableColumns"
        @selectionChange="rightSelectionChange"
      />
    </div>
  </div>
</template>

<script>
import elementTable from '../ElementTable/index_d.vue';

export default {
  components: {
    elementTable,
  },
  props: {
    leftTableData: {
      type: Array,
      default: () => [],
    },
    rightTableData: {
      type: Array,
      default: () => [],
    },
    leftTableColumns: {
      type: Array,
      default: () => [],
    },
    rightTableColumns: {
      type: Array,
      default: () => [],
    },
    middleButton: {
      type: Array,
      default: () => ['到左边', '到右边'],
    },
  },
  data() {
    return {
      // 左侧表格选中数据
      leftSelectData: [],
      // 右侧表格选中数据
      rightSelectData: [],
      // 左侧表格查询数据
      leftSearchData: [],
      // 右侧表格查询数据
      rightSearchData: [],
      // 左侧表格展示数据
      showLeftTableData: [],
      // 右侧表格展示数据
      showRightTableData: [],
      // 所有表格数据
      allTableData: [],
      // 左侧表格查询条件
      leftSearch: '',
      // 右侧表格查询条件
      rightSearch: '',
    };
  },
  watch: {
    leftTableData: {
      handler(val) {
        this.showLeftTableData = val;
      },
      deep: true,
    },
    rightTableData: {
      handler(val) {
        this.showRightTableData = val;
        this.allTableData = JSON.parse(JSON.stringify(this.showRightTableData));
      },
      deep: true,
    },
  },
  methods: {
    // 左侧表格选中
    leftSelectionChange(val) {
      this.leftSelectData = val;
    },
    // 右侧表格选中
    rightSelectionChange(val) {
      this.rightSelectData = val;
    },
    // 点击左侧按钮
    handleLeftBtn() {
      for (const j in this.showRightTableData) {
        for (const k in this.rightSelectData) {
          if (
            this.rightSelectData[k].consId == this.showRightTableData[j].consId
          ) {
            this.showRightTableData.splice(j, 1);
          }
        }
      }
      for (const i in this.rightSelectData) {
        this.showLeftTableData.push(this.rightSelectData[i]);
      }
      this.$refs.rightTable.toggleSelection(this.rightSelectData);
      this.showLeftTableData.sort((a, b) => a.sort - b.sort);
    },
    // 点击右侧按钮
    handleRightBtn() {
      for (const j in this.showLeftTableData) {
        for (const k in this.leftSelectData) {
          if (
            this.leftSelectData[k].consId == this.showLeftTableData[j].consId
          ) {
            this.showLeftTableData.splice(j, 1);
          }
        }
      }
      for (const i in this.leftSelectData) {
        this.showRightTableData.push(this.leftSelectData[i]);
      }
      this.$refs.leftTable.toggleSelection(this.leftSelectData);
      this.showRightTableData.sort((a, b) => a.sort - b.sort);
      this.allTableData = JSON.parse(JSON.stringify(this.showRightTableData));
    },
    // 查询左侧列表
    findLeftData() {
      let arr = [];
      this.showLeftTableData.forEach(e => {
        if (String(e.consName).indexOf(String(this.leftSearch)) != -1) {
          arr.push(e);
        }
      });
      this.showLeftTableData = arr;
    },
    // 清除左侧查询
    clearLeftSearch() {
      if (this.showRightTableData.length != 0) {
        this.showLeftTableData = this.arrayDeduplicate(
          this.leftTableData,
          this.showRightTableData
        );
      } else {
        this.showLeftTableData = JSON.parse(JSON.stringify(this.leftTableData));
      }
    },
    // 查询右侧列表
    findRightData() {
      let arr = [];
      this.showRightTableData.forEach(e => {
        if (String(e.consName).indexOf(String(this.rightSearch)) != -1) {
          arr.push(e);
        }
      });
      this.showRightTableData = arr;
    },
    // 清除右侧查询
    clearRightSearch() {
      if (this.showLeftTableData.length != 0) {
        // let rightArr = [];
        // for (const i in this.allTableData) {
        //   if (
        //     JSON.stringify(this.showLeftTableData).includes(
        //       JSON.stringify(this.allTableData[i])
        //     ) === false
        //   ) {
        //     rightArr.push(this.allTableData[i]);
        //     this.showRightTableData = rightArr;
        //   }
        // }
        this.showRightTableData = this.arrayDeduplicate(
          this.allTableData,
          this.showLeftTableData
        );
      } else {
        this.showRightTableData = JSON.parse(JSON.stringify(this.allTableData));
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.transferTable {
  height: 100%;
  .tableEdit {
    width: 45%;
    height: 100%;
    border-radius: 10px;
    // border: 1px solid #999;
    box-shadow: 2px 2.8px 7.6px rgba(0, 0, 0, 0.026),
      4.9px 6.7px 18.4px rgba(0, 0, 0, 0.042),
      9.1px 12.5px 34.6px rgba(0, 0, 0, 0.052),
      16.3px 22.3px 61.6px rgba(0, 0, 0, 0.059),
      30.5px 41.8px 115.3px rgba(0, 0, 0, 0.066),
      73px 100px 276px rgba(0, 0, 0, 0.09);
    padding: 10px;
  }
  .editBtn {
    width: 10%;
    height: 100%;
  }
}
</style>
