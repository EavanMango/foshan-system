<!--
 * @Description  : 自定义可编辑表格
 * @Author       : 陈凯
 * @Date         : 2023-03-08 15:16:38
 * @LastEditors  : 陈凯
 * @LastEditTime : 2024-01-30 16:12:46
 * @FilePath     : \init-project\src\components\EditTable\index.vue
-->
<template>
  <div id="base-table">
    <el-table
      :key="keyValue"
      ref="baseTableRef"
      :data="tableData"
      :stripe="stripe"
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0.4)"
      v-bind="$attrs"
      style="width: 100%; height: 100%"
      @row-click="handleRowClick"
      @selection-change="handleSelectionChange"
      :row-class-name="rowClass ? tableRowClassName : ''"
      :border="showBorder"
      @cell-dblclick="doubleClick"
      :cell-style="tableCellStyle"
    >
      <el-table-column
        v-if="showSelect"
        type="selection"
        width="55"
        align="center"
      />
      <el-table-column
        v-if="showIndex"
        label="序号"
        type="index"
        align="center"
        width="60"
      >
        <template #default="{ $index }">
          {{
            (paginationConfig.pageNum - 1) * paginationConfig.pageSize +
            ($index + 1)
          }}
        </template>
      </el-table-column>
      <el-table-column
        v-for="columnV in tableColumns"
        :key="columnV.label"
        :label="columnV.label"
        :prop="columnV.prop"
        :sortable="columnV.sortable"
        :width="columnV.width || 'unset'"
        :align="columnV.align || 'center'"
      >
        <template #default="{ row, column, $index }">
          <!--     自定义渲染内容 -->
          <slot :name="columnV.prop" :rowData="{ row, $index }">
            <!-- 筛选所有单元格给符合条件的添加样式 -->
            <el-input
              v-show="row[column.property + 'Show']"
              :ref="column.property"
              v-model="row[columnV.prop]"
              @keyup.enter.native="onBlur(row, column)"
              @blur="onBlur(row, column)"
            ></el-input>
            <span
              v-show="!row[column.property + 'Show']"
              :style="{
                color: columnV.textColor
                  ? columnV.textColor
                  : '',
              }"
            >
              {{
                columnV.formatter
                  ? columnV.formatter(row, columnV, row[columnV.prop])
                  : handleRowValue(row, columnV)
              }}
            </span>
          </slot>
        </template>
      </el-table-column>
      <slot name="end"></slot>
      <slot name="endend"></slot>
    </el-table>
    <div v-if="pagination && tableData.length" class="pagination">
      <div class="text">{{ paginationText }}</div>
      <div style="padding-top: 7px; display: flex">
        <el-select
          size="mini"
          @change="handleNumChanges"
          style="width: 80px"
          v-model="paginationConfig.pageSize"
          :popper-append-to-body="false"
        >
          <el-option
            v-for="item in pageSizeNum"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
        <el-pagination
          class="el-pagination-reset"
          v-bind="mergePaginationConfig"
          :current-page="paginationConfig.pageNum"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          @prev-click="handlePrevClick"
          @next-click="handleNextClick"
          layout="prev, pager, next, jumper"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 表格组件
 *
 * @Date 2021/9/1 14:22
 */
const paginationBaseConfig = {
  background: true,
  'page-sizes': [10, 20, 30, 40, 50],
  layout: 'prev, pager, next',
  total: 0,
};
export default {
  name: 'base-table',
  props: {
    /** 表头数据 */
    tableColumns: {
      type: Array,
      default: () => [],
    },

    /** 渲染数据 */
    tableData: {
      type: Array,
      default: () => [],
    },

    /** loading */
    loading: {
      type: Boolean,
      default: false,
    },
    // 是否可选
    showSelect: {
      type: Boolean,
      default: false,
    },
    // 是否展示可伸缩边框
    showBorder: {
      type: Boolean,
      default: true,
    },
    /** 显示序号 */
    showIndex: {
      type: Boolean,
      default: true,
    },
    /** 是否显示斑马条纹 */
    stripe: {
      type: Boolean,
      default: true,
    },

    showStart: {
      type: Boolean,
      default: true,
    },
    /**设置斑马条纹样式*/
    rowClass: {
      type: Boolean,
      default: true,
    },
    /** 是否展示分页 */
    pagination: {
      type: Boolean,
      default: true,
    },
    showCommand: {
      type: Boolean,
      default: false,
    },
    /**
     * 分页配置
      paginationConfig: {
        total: 0,
        pageSize: 20,
      },
     */
    paginationConfig: {
      type: Object,
      default: () => ({}),
    },
    loadValue: {
      type: [String, Number],
      default: '1',
    },
  },
  data() {
    return {
      pageSizeNum: [5, 10, 20, 50],
      keyValue: Math.random(),
      chooseRow: [],
      chooseColumn: [],
    };
  },

  computed: {
    /**
     * 合并
     * @param paginationConfig
     * @returns {any}
     */
    mergePaginationConfig({ paginationConfig }) {
      return Object.assign(paginationBaseConfig, paginationConfig);
    },
    paginationText() {
      const totalPageSize = Math.ceil(
        this.paginationConfig.total / this.paginationConfig.pageSize
      );
      return `共计${totalPageSize}页,${this.paginationConfig.total}条记录`;
    },
  },
  directives: {
    // 通过自定义指令实现的表单自动获得光标的操作
    focus: {
      inserted: function (el) {
        if (el.tagName.toLocaleLowerCase() == 'input') {
          el.focus();
        } else {
          if (el.getElementsByTagName('input')) {
            el.getElementsByTagName('input')[0].focus();
          }
        }
        el.focus();
      },
    },
    focusTextarea: {
      inserted: function (el) {
        if (el.tagName.toLocaleLowerCase() == 'textarea') {
          el.focus();
        } else {
          if (el.getElementsByTagName('textarea')) {
            el.getElementsByTagName('textarea')[0].focus();
          }
        }
        el.focus();
      },
    },
  },
  created() {},
  methods: {
    handleSizeChange(cur) {
      this.$emit('size-change', cur);
    },
    // 页码切换
    handleCurrentChange(cur) {
      this.$emit('page-current-change', cur);
    },

    handlePrevClick(cur) {
      this.$emit('prev-click', cur);
    },

    handleNextClick(cur) {
      this.$emit('next-click', cur);
    },
    handleRowValue(rowData, columnInfo) {
      if (rowData[columnInfo.prop] !== 0 && !rowData[columnInfo.prop]) {
        return '-';
      }
      if (
        rowData[columnInfo.prop] &&
        typeof rowData[columnInfo.prop] === 'object'
      ) {
        if (columnInfo.subProp) {
          return rowData[columnInfo.prop][columnInfo.subProp];
        }
        return rowData[columnInfo.prop]?.name;
      }
      return rowData[columnInfo.prop];
    },
    
    /** 当某一行被点击时会触发该事件   */
    handleRowClick(row) {
      this.$emit('table-row-click', row);
    },
    // 点击选中行事件
    handleSelectionChange(val) {
      this.$emit('selectionChange', val);
    },
    /**设置斑马条纹样式*/
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 !== 0) {
        return 'rowStripeLinear';
      } else {
        return 'rowStripe';
      }
    },
    // 选择显示数量
    handleNumChanges(cur) {
      this.$emit('pageNum-current-change', cur);
      this.paginationConfig.pageSize = cur;
    },
    // 处理表格点击事件
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.baseTableRef.toggleRowSelection(row);
        });
      } else {
        this.$refs.baseTableRef.clearSelection();
      }
    },
    // 双击单元格触发事件
    doubleClick(row, column) {
      if (
        column.property == 'dictValue' ||
        column.property == 'dictLabel' ||
        column.property == 'status'
      ) {
        row[column.property + 'Show'] = true;
        this.updateTable(row, column);
      }
    },
    //输入框失焦事件
    onBlur(row, column) {
      this.chooseRow.push(row);
      this.chooseColumn.push(column);
      row[column.property + 'Show'] = false;
      this.updateTable(row, column);
    },
    // 刷新表格
    updateTable(row, column) {
      this.keyValue = Math.random();
      this.$emit('refreshActionData', row);
    },
    // 表格内容样式
    tableCellStyle(row, rowIndex, column) {
      for (let i = 0; i < this.chooseRow.length; i++) {
        if (
          this.chooseRow[i] == row.row &&
          this.chooseColumn[i].label == row.column.label
        ) {
          return 'color:#f00 !important;';
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
#base-table {
  height: 100%;
  position: relative;
  .pagination {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    padding-top: 10px;
  }
}
::v-deep .el-select-dropdown__wrap.el-scrollbar__wrap {
  margin-bottom: 0 !important;
}
::v-deep .pagination .el-input--medium .el-input__inner {
  height: 1.75rem !important;
  line-height: 1.75rem !important;
}
</style>
