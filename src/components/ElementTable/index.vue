<template>
  <div id="base-table">
    <el-table
      :data="tableData"
      @row-click="handleRowClick"
      @selection-change="handleSelectionChange"
      v-on="$listeners"
      v-bind="$attrs"
      v-loading="loading"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.5)"
      :row-key="rowKey"
      ref="tableLayout"
      :height="showPagination ? 'calc(100% - 80px)' : 'calc(100% - 10px)'"
      :row-class-name="isRowClass ? handleRowClassName : ''"
      @select="handleSelectChange"
      :default-sort="defaultSort"
      :span-method="spanIndex && spanIndex.length ? arraySpanMethod : null"
      :summary-method="isShowSummary ? getSummaries : () => {}"
      :show-summary="isShowSummary"
      border
    >
      <template v-if="showSelection">
        <el-table-column
          type="selection"
          width="45"
          :reserve-selection="false"
          :selectable="handleSelectable"
        ></el-table-column>
      </template>
      <template v-if="showIndex">
        <el-table-column
          type="index"
          width="60"
          label="序号"
          align="center"
        ></el-table-column>
      </template>
      <column-item
        v-for="(item, index) in tableColumns"
        :key="index"
        :col="item"
      ></column-item>
      <!-- <template v-for="item in tableColumns">
        <el-table-column
          :key="item.prop"
          :prop="item.prop"
          :label="item.unit ? item.label + '(' + item.unit + ')' : item.label"
          :width="item.width || 'unset'"
          :align="item.align || 'center'"
          :sortable="item.sortable"
          :fixed="item.fixed || false"
          :show-overflow-tooltip="true"
          :render-header="renderHeader"
        >
          <template v-for="column in item.multistage">
            <el-table-column
              v-if="item.multistage && item.multistage.length"
              :key="column.prop"
              :prop="column.prop"
              :width="column.width"
              :label="
                column.unit
                  ? column.label + '(' + column.unit + ')'
                  : column.label
              "
              :align="column.align || 'center'"
              :show-overflow-tooltip="true"
              :render-header="renderHeader"
            >
              <template #default="{ row, $index }">
                <slot :name="column.prop" :rowData="{ row, $index }">
                  {{
                    column.formatter
                      ? handleFormatter(row, column.prop, column.formatter)
                      : getValueData(row, column)
                  }}
                </slot>
              </template>

              <template v-for="stage in column.multistage">
                <el-table-column
                  v-if="column.multistage && column.multistage.length"
                  :key="stage.prop"
                  :prop="stage.prop"
                  :width="stage.width"
                  :label="
                    stage.unit
                      ? stage.label + '(' + stage.unit + ')'
                      : stage.label
                  "
                  :align="stage.align || 'center'"
                  :show-overflow-tooltip="true"
                  :render-header="renderHeader"
                >
                  <template #default="{ row, $index }">
                    <slot :name="stage.prop" :rowData="{ row, $index }">
                      <span
                        :class="
                          stage.color === 'max'
                            ? 'font-class-orange'
                            : stage.color === 'min'
                            ? 'font-class-green'
                            : ''
                        "
                      >
                        {{
                          stage.formatter
                            ? handleFormatter(row, stage.prop, stage.formatter)
                            : getValueData(row, stage)
                        }}
                      </span>
                    </slot>
                  </template>
                </el-table-column>
              </template>
            </el-table-column>
          </template>

          <template #default="{ row, $index }">
            <slot :name="item.prop" :rowData="{ row, $index }">
              {{
                item.formatter
                  ? handleFormatter(row, item.prop, item.formatter)
                  : getValueData(row, item)
              }}
            </slot>
          </template>
        </el-table-column>
      </template> -->

      <slot name="endColumns"></slot>
    </el-table>
    <el-pagination
      v-if="showPagination"
      @size-change="handleSizeChange"
      @prev-click="handlePrevClick"
      @next-click="handleNextClick"
      @current-change="handleCurrentChange"
      v-bind="mergePaginationConfig"
      v-on="$listeners"
      :current-page.sync="$attrs.currentPage"
    >
    </el-pagination>
  </div>
</template>

<script>
import { handlerDataNum } from "@/utils/common-util";
import { DateUtil } from "@/utils/date-util";
import { DeepClone } from "@/utils/common-util";
import { DeepClone } from "@/utils/common-util";
import columnItem from "./column-item";

const basePagination = {
  layout: "total, sizes, prev, pager, next, jumper",
  total: 0,
  "page-sizes": [10, 20, 30, 40, 50],
  "page-size": 10,
};
export default {
  name: "base-table",
  components: { columnItem },
  data() {
    return {
      rowData: {},
    };
  },
  props: {
    /** 表格 */
    tableData: {
      type: Array,
      default: () => [],
    },
    /** 表头 */
    tableColumns: {
      type: Array,
      default: () => [],
    },
    /** 多级表头 */
    multistage: {
      type: Array,
      default: () => [],
    },
    /** 是否显示合计*/
    isShowSummary: {
      type: Boolean,
      default: false,
    },
    /** 是否显示序号 */
    showIndex: {
      type: Boolean,
      default: false,
    },
    /** 是否多选 */
    showSelection: {
      type: Boolean,
      default: false,
    },
    /** 分页配置 */
    paginationConfig: {
      type: Object,
      default: () => ({}),
    },
    /** 显示分页 */
    showPagination: {
      type: Boolean,
      default: true,
    },
    /** 某一行的样式 */
    showRowStyle: {
      type: Boolean,
      default: false,
    },
    /** 页面加载*/
    loading: {
      type: Boolean,
      default: false,
    },
    rowKey: {
      type: String,
      default: "id",
    },
    showSelectable: {
      type: Boolean,
      default: false,
    },
    /** 某一行的样式 */
    isRowClass: {
      type: Boolean,
      default: false,
    },
    /** 自动生成 */
    autoShowSelectable: {
      type: Boolean,
      default: false,
    },
    singleSelectable: {
      type: Boolean,
      default: false,
    },
    defaultSort: {
      type: Object,
      default: () => ({}),
    },
    /** 合并列 */
    spanIndex: {
      type: String,
      default: "",
    },
  },
  created() {},
  mounted() {},
  computed: {
    /** 合并分页 */
    mergePaginationConfig() {
      return Object.assign(
        {},
        DeepClone(basePagination),
        this.paginationConfig
      );
    },
    /** 表头样式 */
    getHeaderCellStyle() {
      return {
        background: "#181C3A",
        color: "rgba(115, 122, 172, 1)",
        border: "1px solid #4A5386",
        borderRight: "1px solid #4A5386",
        marginLeft: "-2px",
      };
    },
  },
  watch: {
    tableData: {
      handler() {
        this.doLayout();
      },
    },
  },
  methods: {
    /** 当某一行被点击时会触发该事件   */
    handleRowClick(row, column, event) {
      this.rowData = row;
      this.$emit("rowClick", row, column, event);
    },
    setCurrentRow() {
      return this.$refs.tableLayout.setCurrentRow();
    },
    /** 当选择项发生变化时会触发该事件   */
    handleSelectionChange(selection) {
      if (this.singleSelectable) {
        if (selection.length > 1) {
          this.$refs.tableLayout.clearSelection();
          this.$refs.tableLayout.toggleRowSelection(selection.pop());
        } else if (selection.length === 1) {
          this.$emit("selectionSingleChange", selection.pop());
        } else {
          this.$emit("selectionSingleChange", null);
        }
      }
      this.$emit("selectionChange", selection);
    },
    /** 每页条数   */
    handleSizeChange(val) {
      this.$emit("sizeChange", val);
    },
    /** 用户点击上一页按钮改变当前页后触发   */
    handlePrevClick(val) {
      this.$emit("prevClick", val);
    },
    /** 用户点击下一页按钮改变当前页后触发   */
    handleNextClick(val) {
      this.$emit("nextClick", val);
    },
    /** 当前页 */
    handleCurrentChange(val) {
      this.$emit("currentChange", val);
    },
    /** 格式化 **/
    handleFormatter(data, prop, formatter) {
      if (data) {
        return DateUtil.transformData(data[prop], formatter);
      }
    },
    /** 返回数据 */
    getValueData(data, item) {
      if (!data[item.prop] && data[item.prop] !== 0) {
        return "-";
      }
      if (
        data[item.prop] instanceof Object &&
        !Object.keys(data[item.prop]).length
      ) {
        return "-";
      }
      return data[item.prop];
    },
    doLayout() {
      this.$nextTick(() => {
        this.$refs.tableLayout.doLayout();
      });
    },
    handleSelectable(row) {
      if (this.showSelectable) {
        if (row[this.$attrs.selectStatus[0]] === this.$attrs.selectStatus[1])
          return false;
        else return true;
      } else {
        return true;
      }
    },
    /** 某一行的样式 */
    handleRowClassName({ row }) {
      if (row.isExist === 1) {
        return "redRow";
      } else if (row.isExist === 2) {
        return "greenRow";
      }
    },
    /** 当用户手动勾选数据行的 Checkbox 时触发的事件 */
    handleSelectChange(selection, row) {
      if (this.autoShowSelectable) {
        if (selection.length > 1) {
          selection.map((item, index) => {
            if ([1, 2].includes(item.isExist)) {
              if (
                item["resultAddr"] === row["resultAddr"] &&
                item["isExist"] !== row["isExist"]
              ) {
                this.$refs.tableLayout.toggleRowSelection(item, false);
                selection.splice(index, 1);
              }
            }
          });
        }
        console.log("**************", selection, row);
      }
    },
    /** 合并*/
    flitterData(arr) {
      let spanOneArr = [];
      let concatOne = 0;
      arr.forEach((item, index) => {
        if (index === 0) {
          spanOneArr.push(1);
        } else {
          if (item.a0 === arr[index - 1].a0) {
            //第一列需合并相同内容的判断条件
            spanOneArr[concatOne] += 1;
            spanOneArr.push(0);
          } else {
            spanOneArr.push(1);
            concatOne = index;
          }
        }
      });
      return {
        one: spanOneArr,
      };
    },
    arraySpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === Number(this.spanIndex)) {
        const _row = this.flitterData(this.tableData).one[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
    },
    /** 合计*/
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "";
          return;
        }
        if (index === 1) {
          sums[index] = "合计";
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (!values.every((value) => isNaN(value))) {
          // if (index !== 3 && index !== 4) {
          sums[index] = handlerDataNum(
            values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0)
          );
          // } else {
          //   sums[index] = '/'
          // }
        }
      });

      return sums;
    },
    renderHeader(h, data) {
      return h("span", [
        h(
          "el-tooltip",
          {
            attrs: {
              class: "item",
              effect: "dark",
              content: data.column.label,
              placement: "top",
            },
          },
          [h("span", data.column.label)]
        ),
      ]);
    },
  },
};
</script>

<style scoped lang="scss">
#base-table {
  width: 100%;
  height: 100%;

  .font-class-orange {
    color: #ff8b58;
    font-weight: bold;
  }
  .font-class-green {
    color: #3ad09d;
    font-weight: bold;
  }
}
</style>
