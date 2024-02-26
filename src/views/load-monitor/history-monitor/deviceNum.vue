<!--
 * @Description  : 用户监测-设备数
 * @Author       : 陈凯
 * @Date         : 2023-11-05 11:08:34
 * @LastEditors  : 陈凯
 * @LastEditTime : 2024-01-30 16:19:58
 * @FilePath     : \init-project\src\views\load-monitor\history-monitor\deviceNum.vue
-->
<template>
  <div class="app-container">
    <!-- 设备数 -->
    <div
      :style="{ height: telescopic ? '100%' : 'calc(40%)', transition: '0.3s' }"
      class="relative card-container margin-bottom-10 overflowHidden"
    >
      <div
        class="absolute goBack pointer margin-bottom-10 inline-block font-weight-bold"
        style="
          z-index: 999;
          margin-top: 0.3rem;
          height: 1rem;
          line-height: 1rem;
        "
        @click="$router.go(-1)"
      >
        <i class="el-icon-arrow-left" style="font-weight: bold"></i>
      </div>
      <div
        class="headerTitle absolute pointer"
        style="font-weight: bold; left: 30px; z-index: 999; width: auto"
        @click="$router.go(-1)"
      >
        {{ $route.query.name }} ——— 设备树
      </div>
      <div class="absolute-top-right-10 flex_row_a width10">
        <div
          class="flex_row_s"
          v-for="item in tree_colour_options"
          :key="item.dictValue"
        >
          <div
            :style="{
              width: '15px',
              height: '15px',
              backgroundColor: item.dictLabel,
              marginRight: '5px',
            }"
          ></div>
          <span>{{ item.dictValue == 1 ? '正常' : '离线' }}</span>
        </div>
      </div>
      <div
        class="width100"
        style="
          height: calc(100% - 3rem);
          overflow-y: scroll;
          margin-top: 1.5rem;
        "
      >
        <echartsChart
          v-if="showChart"
          id="echart"
          :height="treeHeight"
          :option="treeOption"
          @getChartHeight="getChartHeight"
        />
      </div>
      <div class="clickBar flex_row_c pointer" @click="handleTelescopic">
        <i
          v-if="!telescopic"
          class="el-icon-arrow-down"
          style="font-size: 1rem !important"
        ></i>
        <i
          v-else
          class="el-icon-arrow-up"
          style="font-size: 1rem !important"
        ></i>
      </div>
    </div>
    <!-- 表格 -->
    <div
      style="height: calc(60% - 10px); position: relative"
      class="overflowHidden card-container"
    >
      <element-table
        ref="tableRef"
        :loading="loading"
        :tableData="tableData"
        :tableColumns="tableColumns"
        :paginationConfig="queryParams"
        @page-current-change="handlePageCurrentChange"
        @pageNum-current-change="handleNumChange"
      >
        <template #consNowStatus="{ rowData: { row } }">
          <div
            :class="{ stateColor: row.consNowStatus == '在线' }"
            style="color: #f00"
          >
            {{ row.consNowStatus }}
          </div>
        </template>
        <template #nowVal="{ rowData: { row } }">
          <div class="tableBtn">
            {{ KeepDecimal(row.nowVal) }}
          </div>
        </template>
        <template #measNum="{ rowData: { row } }">
          <div class="tableBtn pointer underline" @click="jumpToCurve(row)">
            {{ KeepDecimal(row.measNum) }}
          </div>
        </template>
        <template #end>
          <el-table-column
            label="曲线"
            align="center"
            class-name="small-padding"
            width="auto"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                class="tableBtn margin-right-10"
                @click="handleViewCurve(scope.row, 1)"
                >历史</el-button
              >
              <el-button
                size="mini"
                class="tableBtn"
                @click="handleViewCurve(scope.row, 2)"
                >实时</el-button
              >
            </template>
          </el-table-column>
        </template>
      </element-table>
    </div>
    <ViewDataCurveDialog ref="viewDataCurve"></ViewDataCurveDialog>
    <MeasChartModalVue ref="measChartModal" />
  </div>
</template>

<script>
import elementDialog from '@/components/ElementDialog/index.vue';
import elementTable from '@/components/ElementTable/index_d.vue';
import MeasChartModalVue from '../user-monitor/comp/MeasChartModal.vue';

import * as service from './comp/service';
import API from '@/api/load-monitor';
import HttpUrl from '@/api/file-management/enterpriseFile';
import ViewDataCurveDialog from './comp/ViewDataCurveDialog.vue';
import echartsChart from './comp/echartsChartTree.vue';

export default {
  components: {
    elementDialog,
    elementTable,
    ViewDataCurveDialog,
    echartsChart,
    MeasChartModalVue,
  },
  data() {
    return {
      currentData: {},
      loading: false,
      showDialog: false,
      tableData: [],
      tableColumns: service.tableColumns,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      treeOption: {},
      tree_colour_options: [],
      telescopic: false,
      showChart: true,
      treeHeight: 'calc(100% - 1.5rem)',
      treeImg: {
        tree1:
          sessionStorage.getItem('themeColor') == 'black'
            ? require('../../../assets/load-monitor/tree1.png')
            : require('../../../assets/load-monitor/tree11.png'),
        tree2:
          sessionStorage.getItem('themeColor') == 'black'
            ? require('../../../assets/load-monitor/tree2.png')
            : require('../../../assets/load-monitor/tree22.png'),
      },

      circleImg: require('../../../assets/load-monitor/circle1.png'),
    };
  },
  mounted() {
    // 设备数颜色
    this.getSelectOptons('tree_colour').then(res => {
      this.tree_colour_options = res.data;
    });
    window.addEventListener('setItem', () => {
      this.treeImg = {
        tree1:
          sessionStorage.getItem('themeColor') == 'black'
            ? require('../../../assets/load-monitor/tree1.png')
            : require('../../../assets/load-monitor/tree11.png'),
        tree2:
          sessionStorage.getItem('themeColor') == 'black'
            ? require('../../../assets/load-monitor/tree2.png')
            : require('../../../assets/load-monitor/tree22.png'),
      };
      this.initData();
    });
    this.open();
  },
  watch: {
    treeHeight: {
      handler(newVal, oldVal) {
        this.showChart = false;
        setTimeout(() => {
          this.showChart = true;
        }, 100);
      },
    },
  },
  methods: {
    open() {
      this.queryParams.consId = this.$route.query.id;
      //   this.currentData = JSON.parse(JSON.stringify(data));
      this.initData();
    },
    async initData() {
      this.treeOption = {};
      this.loading = true;
      const res = await API.monitorEquipList(this.queryParams);
      this.tableData = res.data.data;
      this.$nextTick(() => {
        this.queryParams.total = res.data.total;
      });
      this.loading = false;
      HttpUrl.queryEquipTree({ param: this.queryParams.consId }).then(res => {
        let treeData = this.treeRecursion(res.data);
        this.treeOption = {
          series: [
            {
              name: '账户权限信息一览-数据库',
              type: 'tree',
              emphasis: {
                scale: true,
              },
              orient: 'horizontal',
              edgeShape: 'polyline',
              top: '0%',
              left: '5%',
              right: '17%',
              bottom: '1%',
              initialTreeDepth: 3,
              expandAndCollapse: true,
              roam: false,
              symbolSize: 11,
              animationDuration: 0,
              label: {
                padding: [8, 20, 8, 20],
                fontSize: this.echartFontSize(12),
                color: this.fontColor,
                overflow: 'break',
                position: 'right',
                verticalAlign: 'middle',
                lineHeight: this.echartFontSize(24),
                offset: [-4, 0],
                formatter: function (params) {
                  return [`{name|${params.data.name}}`, `{padding|}`].join('');
                },
                rich: {
                  name: {
                    fontSize: this.echartFontSize(14),
                    fontWeight: 'bold',
                    align: 'center',
                    padding: [5, 0, 5, 5],
                  },

                  padding: {
                    padding: [0, 0],
                  },
                },
              },
              // leaves: {
              //   label: {
              //     position: 'right',
              //     verticalAlign: 'middle',
              //     align: 'left',
              //   },
              // },

              data: treeData,
            },
          ],
        };
      });
    },
    treeRecursion(data) {
      let back1 = {
        backgroundColor: {
          image: this.treeImg.tree1,
        },
      };
      let back2 = {
        backgroundColor: {
          image: this.treeImg.tree2,
        },
      };
      for (let key in data) {
        if (
          data[key].label == null ||
          data[key].label.backgroundColor == '#1976D2'
        ) {
          data[key].label = back1;
          data[key].lineStyle = {
            color: '#1976D2',
          };
          data[key].itemStyle = {
            color: '#1976D2',
            borderWidth: '10',
          };
        }
        if (data[key].label.backgroundColor == '#FFA726') {
          data[key].label = back2;
          data[key].lineStyle = {
            color: '#FFA726',
          };
          data[key].itemStyle = {
            color: '#FFA726',
          };
        }
        if (data[key].children.length > 0) {
          this.treeRecursion(data[key].children);
        }
      }

      return data;
    },

    handleViewCurve(row, type) {
      this.$refs.viewDataCurve.open(row, type);
    },
    KeepDecimal(v) {
      if (v == null || v == '-') return '-';
      let d = v * 100;
      return Math.round(+d.toFixed(2)) / 100;
    },
    jumpToCurve(row) {
      this.$refs.measChartModal.open({
        currentId: row.id,
        date: this.getYearMonthDay(new Date()),
        deviceName: row.name,
      });
    },
    // 表格页码切换
    handlePageCurrentChange(num) {
      this.queryParams.pageNum = num;
      this.initData();
    },
    // 表格列表展示数量
    handleNumChange(num) {
      this.queryParams.pageNum = 1;
      this.queryParams.pageSize = num;
      this.initData();
    },
    handleTelescopic() {
      this.telescopic = !this.telescopic;
      this.showChart = false;
      setTimeout(() => {
        this.showChart = true;
      }, 300);
    },
    getChartHeight(val) {
      let heightKey = this.telescopic ? 5 : 13;
      this.treeHeight =
        val > 10 ? heightKey * val + '%' : 'calc(100% - 1.5rem)';
    },
  },
};
</script>

<style scoped>
.biaoshi {
  width: 15px;
  height: 15px;
  background-color: #425aed;
  border-radius: 50%;
}
.underline {
  text-decoration: underline;
}
.clickBar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2rem;
  background: rgba(0, 0, 0, 0.3);
}
</style>
