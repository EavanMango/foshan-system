<template>
  <div id="base-table">
    <el-table
            :data="tableData"
            @row-click="handleRowClick"
            @selection-change="handleSelectionChange"
            v-on="$listeners"
            v-bind="$attrs"
            v-loading="loading"
            :row-key="rowKey"
            ref="tableLayout"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            :height="showPagination ? 'calc(100% - 80px)' : 'calc(100% - 10px)'"
            :row-class-name="isRowClass?handleRowClassName:''"
            @select="handleSelectChange"
            :default-sort = defaultSort
            :span-method="objectSpanMethod"
            :summary-method="isShowSummary?getSummaries:()=>{}"
            :show-summary="isShowSummary"
            border
    >
      <template v-if="showSelection">
        <el-table-column type="selection" width="45"
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

      <template v-for="item in tableColumns">
        <el-table-column
                :prop="item.prop"
                :label="item.unit?item.label+ '(' +item.unit + ')':item.label"
                :width="item.width || 'unset'"
                :align="item.align || 'center'"
                :sortable="item.sortable"
                :fixed="item.fixed || false"
                show-overflow-tooltip
        >
          <template  v-for="column in item.multistage">
            <el-table-column
                    :prop="column.prop"
                    :width="column.width"
                    :label="column.unit?column.label+ '(' +column.unit + ')':column.label"
                    :align="column.align || 'center'"
                    show-overflow-tooltip
            >
              <template #default="{ row,$index }">
                <slot :name="column.prop" :rowData="{row,$index}">
                  {{
                  column.formatter
                  ? handleFormatter(row, column.prop, column.formatter)
                  : getValueData(row, column)
                  }}
                </slot>
              </template>

              <template  v-for="stage in column.multistage">
                <el-table-column
                        :prop="stage.prop"
                        :width="stage.width"
                        :label="stage.unit?stage.label+ '(' +stage.unit + ')':stage.label"
                        :align="stage.align || 'center'"
                        show-overflow-tooltip
                >
                  <template #default="{ row,$index }">
                    <slot :name="stage.prop" :rowData="{row,$index}">
                      <span
                              :class="stage.color==='max' ? 'font-class-orange' : stage.color==='min' ? 'font-class-green' : ''"
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

          <template #default="{ row,$index }">
            <slot :name="item.prop" :rowData="{row,$index}">
              {{
              item.formatter
              ? handleFormatter(row, item.prop, item.formatter)
              : getValueData(row, item)
              }}
            </slot>
          </template>
        </el-table-column>
      </template>

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
  import {handlerDataNum} from "@/utils/common-util";
  import {DateUtil} from "@/utils/date-util";
  import {DeepClone} from "@/utils/common-util";

  const basePagination = {
    layout: "total, sizes, prev, pager, next, jumper",
    total: 0,
    "page-sizes": [10, 20, 30, 40, 50],
    "page-size": 10,
  };
  export default {
    name: "base-table",
    data() {
      return {
        rowData: {},
        mergeObj: {},
        /** 用来记录每一个单元格的下标 */
        tableMergeIndex: [],
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
        default: false
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
        default: false
      },
      /** 某一行的样式 */
      isRowClass: {
        type: Boolean,
        default: false
      },
      /** 自动生成 */
      autoShowSelectable: {
        type: Boolean,
        default: false
      } ,
      singleSelectable: {
        type: Boolean,
        default: false
      },
      defaultSort: {
        type: Object,
        default: () => ({})
      },
      /** 合并行 */
      mergeRowArr: {
        type: Array,
        default: () => []
      },
      /** 合并行列 */
      mergeCols: {
        type: Array,
        default: () => []
      }
    },
    created() {
    },
    mounted() {},
    computed: {
      /** 合并分页 */
      mergePaginationConfig() {
        return Object.assign({}, DeepClone(basePagination), this.paginationConfig);
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
        handler(newValue) {
          this.doLayout()
          this.getSpanArr(this.tableData)
          // this.newTableMergeData()
        }
      },
    },
    methods: {
      /** 当某一行被点击时会触发该事件   */
      handleRowClick(row, column, event) {
        this.rowData = row
        this.$emit("rowClick", row, column, event);
      },
      /** 当选择项发生变化时会触发该事件   */
      handleSelectionChange(selection) {
        if (this.singleSelectable) {
          if (selection.length > 1) {
            this.$refs.tableLayout.clearSelection()
            this.$refs.tableLayout.toggleRowSelection( selection.pop())
          } else if (selection.length === 1) {
            this.$emit("selectionSingleChange",  selection.pop());
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
        if (data[item.prop] instanceof Object && !Object.keys(data[item.prop]).length) {
          return '-';
        }
        return data[item.prop];

      },
      doLayout() {
        this.$nextTick(() => {
          this.$refs.tableLayout.doLayout()
        })
      },
      handleSelectable(row) {
        if (this.showSelectable) {
          if (row[this.$attrs.selectStatus[0]] === this.$attrs.selectStatus[1]) return false
          else return true
        } else {
          return true
        }
      },
      /** 某一行的样式 */
      handleRowClassName({row}) {
        if (row.isExist === 1) {
          return 'redRow'
        } else if (row.isExist === 2) {
          return 'greenRow'
        }
      },
      handleSelectChange(selection, row) {
        if (this.autoShowSelectable) {
          if (selection.length > 1) {
            selection.map((item, index) => {
              if ([1, 2].includes(item.isExist)) {
                if (item['resultAddr'] === row['resultAddr'] && item['isExist'] !== row['isExist']) {
                  this.$refs.tableLayout.toggleRowSelection(item, false)
                  selection.splice(index, 1)
                }
              }
            })
          }
          console.log('**************', selection, row)
        }
      },


      /** 合并行列：初始化数据 */
      newTableMergeData() {
        for (let i = 0; i < this.tableData.length; i++) {
          for (let j = 0; j < this.mergeCols.length; j++) {
            // 初始化行、列坐标信息
            let rowIndex = 1;
            let columnIndex = 1;
            // 比较横坐标左方的第一个元素
            if (j > 0 && this.tableData[i][this.mergeCols[j]['name']] === this.tableData[i][this.mergeCols[j - 1]['name']]) {
              columnIndex = 0;
            }
            // 比较纵坐标上方的第一个元素
            if (i > 0 && this.tableData[i][this.mergeCols[j]['name']] === this.tableData[i - 1][this.mergeCols[j]['name']]) {
              rowIndex = 0;
            }
            // 比较横坐标右方元素
            if (columnIndex > 0) {
              columnIndex = this.onColIndex(this.tableData[i], j, j + 1, 1, this.mergeCols.length);
            }
            // 比较纵坐标下方元素
            if (rowIndex > 0) {
              rowIndex = this.onRowIndex(this.tableData, i, i + 1, 1, this.mergeCols[j]['name']);
            }
            let key = this.mergeCols[j]['index'] + '_' + i;
            this.tableMergeIndex[key] = [rowIndex, columnIndex];
          }
        }
      },
      /**
       * 合并行列：计算列坐标信息
       * data 单元格所在行数据  index 当前下标  nextIndex 下一个元素坐标
       * count 相同内容的数量   maxLength 当前行的列总数
       */
      onColIndex(data, index, nextIndex, count, maxLength) {
        // 比较当前单元格中的数据与同一行之后的单元格是否相同
        if (nextIndex < maxLength && data[this.mergeCols[index]['name']] === data[this.mergeCols[nextIndex]['name']]) {
          return this.onColIndex(data, index, ++nextIndex, ++count, maxLength);
        }
        return count;
      },
      /**
       * 合并行列：计算行坐标信息
       * data 表格总数据  index 当前下标  nextIndex 下一个元素坐标
       * count 相同内容的数量  name 数据的key
       */
      onRowIndex(data, index, nextIndex, count, name) {
        // 比较当前单元格中的数据与同一列之后的单元格是否相同
        if (nextIndex < data.length && data[index][name] === data[nextIndex][name]) {
          return this.onRowIndex(data, index, ++nextIndex, ++count, name);
        }
        return count;
      },
      /**
       * 合并行列：计算列坐标信息
       * data 单元格所在行数据  index 当前下标  nextIndex 下一个元素坐标
       * count 相同内容的数量   maxLength 当前行的列总数
       */
      onColIndex(data, index, nextIndex, count, maxLength) {
        // 比较当前单元格中的数据与同一行之后的单元格是否相同
        if (nextIndex < maxLength && data[this.mergeCols[index]['name']] === data[this.mergeCols[nextIndex]['name']]) {
          return this.onColIndex(data, index, ++nextIndex, ++count, maxLength);
        }
        return count;
      },
      /**
       * 合并行列：计算行坐标信息
       * data 表格总数据  index 当前下标  nextIndex 下一个元素坐标
       * count 相同内容的数量  name 数据的key
       */
      onRowIndex(data, index, nextIndex, count, name) {
        // 比较当前单元格中的数据与同一列之后的单元格是否相同
        if (nextIndex < data.length && data[index][name] === data[nextIndex][name]) {
          return this.onRowIndex(data, index, ++nextIndex, ++count, name);
        }
        return count;
      },
      /** 合并行列： 默认接受四个值 { 当前行的值, 当前列的值, 行的下标, 列的下标 } */
      objectSpanMethods({ row, column, rowIndex, columnIndex }) {
        let key = columnIndex + '_' + rowIndex;
        if (this.tableMergeIndex[key]) {
          return this.tableMergeIndex[key];
        }
      },


      /** 合并行：比较当前行与上一行的值是否相等（如果是第一行数据，直接将值赋值为1） */
      getSpanArr(data) {
        this.mergeRowArr.forEach((key, index1) => {
          let count = 0; // 用来记录需要合并行的起始位置
          this.mergeObj[key] = []; // 记录每一列的合并信息
          data.forEach((item, index) => {
            // index == 0表示数据为第一行，直接 push 一个 1
            if(index === 0) {
              this.mergeObj[key].push(1);
            } else {
              // 判断当前行是否与上一行其值相等 如果相等 在 count 记录的位置其值 +1 表示当前行需要合并 并push 一个 0 作为占位
              if(item[key] === data[index - 1][key]) {
                this.mergeObj[key][count] += 1;
                this.mergeObj[key].push(0);
              } else {
                // 如果当前行和上一行其值不相等
                count = index; // 记录当前位置
                this.mergeObj[key].push(1); // 重新push 一个 1
              }
            }
          })
        })
      },
      /** 合并行： 默认接受四个值 { 当前行的值, 当前列的值, 行的下标, 列的下标 } */
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        // 判断列的属性
        if(this.mergeRowArr.indexOf(column.property) !== -1) {
          // 判断其值是不是为0
          if(this.mergeObj[column.property][rowIndex]) {
            return [this.mergeObj[column.property][rowIndex], 1]
          } else {
            // 如果为0则为需要合并的行
            return [0, 0];
          }
        }
      },


      /** 合计*/
      getSummaries(param) {
        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '';
            return;
          }
          if (index === 1) {
            sums[index] = '合计'
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            // if (index !== 3 && index !== 4) {
            sums[index] = handlerDataNum(values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0))
            // } else {
            //   sums[index] = '/'
            // }
          }
        });

        return sums;
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
