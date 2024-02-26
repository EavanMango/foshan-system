<!--
 * @Description  : 表格
 * @Author       : 陈凯
 * @Date         : 2023-08-09 09:12:11
 * @LastEditors  : 陈凯
 * @LastEditTime : 2024-01-30 16:12:12
 * @FilePath     : \init-project\src\components\ElementTable\index_d.vue
-->

<template>
  <div id="base-table">
    <el-table
      :key="keyValue"
      ref="baseTableRef"
      :data="tableData"
      :stripe="stripe"
      :row-key="rowKey"
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0.4)"
      v-bind="$attrs"
      :height="pagination ? 'calc(100% - 3.2rem)' : 'calc(100% - 0px)'"
      @row-click="handleRowClick"
      @cell-click="cellClick"
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChange"
      :row-class-name="rowClass ? tableRowClassName : ''"
      :header-cell-class-name="handleHeadAddClass"
      :border="showBorder"
      tooltip-effect="dark myTooltips"
      highlight-current-row
    >
      <el-table-column
        v-if="showSelect"
        type="selection"
        :width="echartFontSize(60)"
        align="center"
        :selectable="selectable"
      />
      <el-table-column
        v-if="showIndex"
        label="序号"
        type="index"
        align="center"
        :width="echartFontSize(70)"
      >
        <template #default="{ $index }">
          {{
            pagination
              ? (paginationConfig.pageNum - 1) * paginationConfig.pageSize +
                ($index + 1)
              : $index + 1
          }}
        </template>
      </el-table-column>
      <el-table-column
        v-for="column in tableColumns"
        :key="column.label"
        :label="column.label"
        :prop="column.prop"
        :sortable="column.sortable"
        :width="column.width || 'unset'"
        :align="column.align || 'center'"
        show-overflow-tooltip
      >
        <template #header="{ column }">
          <el-tooltip
            effect="dark"
            :content="column.label"
            placement="top-start"
          >
            <span> {{ column.label }} </span>
          </el-tooltip>
        </template>

        <template #default="{ row, $index }">
          <!--     自定义渲染内容 -->
          <slot :name="column.prop" :rowData="{ row, $index }">
            <!-- 筛选所有单元格给符合条件的添加样式 -->
            <span
              :style="{
                color: column.textColor ? column.textColor : '',
              }"
            >
              {{
                column.formatter
                  ? column.formatter(row, column, row[column.prop])
                  : handleRowValue(row, column)
              }}
            </span>
          </slot>
        </template>
      </el-table-column>
      <slot name="edit"></slot>
      <slot name="end"></slot>
      <slot name="endend"></slot>
    </el-table>
    <div v-if="pagination && tableData.length" class="pagination">
      <div class="text">{{ paginationText }}</div>
      <div class="flex_row_s">
        <el-select
          size="mini"
          @change="handleNumChanges"
          style="width: 4rem"
          v-model="paginationConfig.pageSize"
          :popper-append-to-body="true"
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
import Sortable from 'sortablejs';
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
    rowKey: {
      type: String,
      default: 'id',
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
    // 是否点击行选中
    showClickChecked: {
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

    /**
     * 分页配置
      paginationConfig: {
        total: 0,
        pageSize: 20,
      },
     */
    // 分页配置
    paginationConfig: {
      type: Object,
      default: () => ({}),
    },
    /** 拖拽排序 */
    dragSort: {
      type: Boolean,
      default: false,
    },
    // 内容是否勾选
    selectable: {
      type: Function,
      default: () => {
        return true;
      },
    },
  },
  data() {
    return {
      pageSizeNum: [5, 10, 20, 50],
      keyValue: Math.random(),
      sortArr: [],
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

  created() {},
  mounted() {
    this.dragSort && this.rowDrop();
  },
  methods: {
    /**
     * 行拖拽
     */
    rowDrop() {
      // 要侦听拖拽响应的DOM对象
      const tbody = document.querySelector('.el-table__body-wrapper tbody');
      const _this = this;
      Sortable.create(tbody, {
        // 结束拖拽后的回调函数
        onEnd(option) {
          const { newIndex, oldIndex } = option;
          if (newIndex >= oldIndex) {
            const currentRow = _this.tableData.slice(oldIndex, oldIndex + 1)[0];
            _this.tableData.splice(newIndex + 1, 0, currentRow);
            _this.tableData.splice(oldIndex, 1);
          } else {
            const currentRow = _this.tableData.slice(oldIndex, oldIndex + 1)[0];
            _this.tableData.splice(newIndex, 0, currentRow);
            _this.tableData.splice(oldIndex + 1, 1);
          }
          _this.$emit('dragSort', {
            tableData: JSON.parse(JSON.stringify(_this.tableData)),
            dragOption: option,
          });
        },
      });
    },
    handleSizeChange(cur) {
      this.$emit('size-change', cur);
    },
    // 页码切换
    handleCurrentChange(cur) {
      this.$emit('page-current-change', cur);
    },
    // 上一页
    handlePrevClick(cur) {
      this.$emit('prev-click', cur);
    },
    // 下一页
    handleNextClick(cur) {
      this.$emit('next-click', cur);
    },
    // 处理表格内容信息
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
      if (this.showClickChecked) {
        this.toggleSelection([row]);
      }
      this.$emit('table-row-click', row);
    },
    // 点击单元格
    cellClick(row, col) {
      this.$emit('cell-click', row, col);
    },
    // 选择表格项
    handleSelectionChange(val) {
      this.$emit('selectionChange', val);
    },
    // 表头单元格设置一个className
    handleHeadAddClass({ column }) {
      this.sortArr.forEach(item => {
        if (item.prop == column.property) {
          column.order = item.order;
        }
      });
    },
    // 表格排序
    handleSortChange({ column, prop, order }) {
      if (prop) {
        if (this.sortArr.length > 0) {
          this.sortArr.forEach((item, index) => {
            if (item.prop == prop) {
              this.sortArr[index].order = order;
            }
            let flag = this.sortArr.some(item => {
              return item.prop == prop;
            });
            if (!flag) {
              this.sortArr.push({
                prop: prop,
                order: order,
              });
            }
          });
        } else {
          this.sortArr.push({
            prop: prop,
            order: order,
          });
        }
      }
      this.$emit('sortChange', this.sortArr);
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
    // 表格选中
    setCurrent(row) {
      this.$refs.baseTableRef.setCurrentRow(row);
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/styles/css-theme/handle.scss';
#base-table {
  width: 100%;
  height: 100%;
  position: relative;
  .pagination {
    display: flex;
    justify-content: flex-end;
    font-size: 0.75rem;
    padding-top: 10px;
    padding-right: 20px;
    @include font_color('fontColor');
    .text {
      line-height: 2.8125rem;
      margin-right: 20px;
    }
  }
}
::v-deep .indexWidth {
  width: 2rem !important;
}
::v-deep .el-select-dropdown__wrap.el-scrollbar__wrap {
  margin-bottom: 0 !important;
}
::v-deep .el-input--medium .el-input__inner {
  height: 1.75rem !important;
  line-height: 1.75rem !important;
}
::v-deep .el-pagination {
  display: flex;
  align-items: center;
}
</style>
<style lang="scss">
.myTooltips {
  margin-bottom: -10px !important;
}
</style>
