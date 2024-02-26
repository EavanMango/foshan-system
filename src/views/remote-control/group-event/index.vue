<!--
 * @Description  : 控制事件
 * @Author       : 陈凯
 * @Date         : 2023-09-07 15:10:13
 * @LastEditors  : 陈凯
 * @LastEditTime : 2023-12-08 17:41:42
 * @FilePath     : \init-project\src\views\remote-control\group-event\index.vue
-->

<template>
  <div class="app-container">
    <!-- 头部搜索 -->
    <div ref="form">
      <el-form
        :model="queryParams"
        :inline="true"
        label-width="5.625rem"
        class="query-container relative card-container"
      >
        <el-form-item label="事件名称" prop="roleName">
          <el-input
            v-model="queryParams.consNo"
            placeholder="请输入事件名称"
            clearable
          />
        </el-form-item>

        <el-form-item label="选择时间" prop="status">
          <el-date-picker
            :picker-options="pickerOptions"
            v-model="dateRange"
            placeholder="选择开始和结束时间"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>

        <!--  -->
        <div class="absolute-top-right-10">
          <el-button
            icon="el-icon-refresh"
            size="mini"
            class="commonBtn"
            @click="refreshData"
            >刷新</el-button
          >

          <el-button
            icon="el-icon-search"
            type="primary"
            size="mini"
            @click="handleSearch"
            >查询</el-button
          >
        </div>
      </el-form>
    </div>
    <!-- 表格 -->
    <div
      class="card-container margin-top-10"
      :style="{
        height: 'calc(100% - 4.5rem)',
      }"
    >
      <element-table
        :loading="loading"
        :tableData="tableData"
        :tableColumns="tableColumns"
        :paginationConfig="queryParams"
        :showSelect="true"
        @page-current-change="handlePageCurrentChange"
        @pageNum-current-change="handleNumChange"
        @selectionChange="selectionChange"
        @sortChange="sortChange"
      >
        <template #state="{}">
          <!-- <div class="pointer" style="color: #666ee8">已完成</div> -->
          <div class="pointer">已完成</div>
        </template>
        <template #end>
          <el-table-column
            label="操作"
            align="center"
            class-name="small-padding"
            width="auto"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                style="margin-right: 10px"
                class="tableBtn"
                @click="handleDetail(scope.row)"
                >详情</el-button
              >
              <!-- <el-button
                size="mini"
                style="margin-right: 10px"
                class="tableBtn"
                @click="handleLineOut(scope.row)"
                >曲线</el-button
              > -->
            </template>
          </el-table-column>
        </template>
      </element-table>
    </div>
    <!-- 用户详情 -->
    <element-dialog
      :title="title"
      v-model="showDialog"
      ref="elementDialog"
      :showCloseButton="true"
    >
      <element-table
        style="height: 31.25rem"
        :loading="loadingDialog"
        :tableData="tableDataDialog"
        :tableColumns="tableColumnsDialog"
        :paginationConfig="queryParamsDialog"
        @page-current-change="handlePageCurrentChangeDialog"
        @pageNum-current-change="handleNumChangeDialog"
      >
        <template #state="{}">
          <div @click="handleState" class="pointer" style="color: #666ee8">
            已完成
          </div>
        </template>
        <template #end>
          <el-table-column
            label="操作"
            align="center"
            class-name="small-padding"
            :width="echartFontSize(200)"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                style="margin-right: 10px"
                icon="el-icon-view"
                class="tableBtn"
                @click="handleLineIn(scope.row)"
                >曲线</el-button
              >
            </template>
          </el-table-column>
        </template>
      </element-table>
    </element-dialog>
    <!-- 状态弹窗 -->
    <element-dialog
      :title="titleState"
      v-model="showDialogState"
      width="60%"
      :showCloseButton="true"
    >
      <!-- <img
        style="width: 100%"
        src="../../../assets/demand-response/微信图片_20231104203930.png"
        alt=""
      /> -->
      <Progress1></Progress1>
    </element-dialog>
    <!-- 曲线弹窗 -->
    <element-dialog
      :title="titleLine"
      v-model="showDialogLine"
      :showCloseButton="true"
    >
      <echarts-chart id="echart" height="31.25rem" :option="lineOption" />
    </element-dialog>
  </div>
</template>

<script>
import elementTable from '@/components/ElementTable/index_d.vue';
import elementDialog from '@/components/ElementDialog/index.vue';
import Progress1 from '@/views/comp/Progress1.vue';
import echartsChart from '@/components/EchartsChart/index.vue';
import HttpUrl from '@/api/remote-control/group-event';
import * as echarts from 'echarts';

export default {
  name: 'groupEvent',
  components: { elementTable, elementDialog, echartsChart, Progress1 },
  data() {
    return {
      titleState: '',
      showDialogState: false,
      titleLine: '',
      showDialogLine: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      dateRange: [],
      isFold: true,
      loading: true,
      tradeCateOptions: [],
      // 表格
      tableDataSelectOptions: [],
      tableData: [],
      tableColumns: [
        {
          label: '事件名称',
          prop: 'name',
          sortable: 'custom',
        },
        // {
        //   label: '事件编码',
        //   prop: 'code',
        //   sortable: 'custom',
        // },
        {
          label: '需求类型',
          prop: 'commandType',
        },
        {
          label: '参与方式',
          prop: 'takePartType',
        },
        {
          label: '群组名称',
          prop: 'groupName',
        },

        {
          label: '需求量(kW)',
          prop: 'loadValue',
          sortable: 'custom',
        },
        {
          label: '开始时间',
          prop: 'startTime',
        },
        {
          label: '结束时间',
          prop: 'endTime',
        },
        {
          label: '状态',
          prop: 'state',
        },
      ],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        createDate: '',
      },
      loadingDialog: false,
      tableDataDialog: [],
      tableColumnsDialog: [
        {
          label: '户名',
          prop: 'consName',
          sortable: 'custom',
        },
        {
          label: '户号',
          prop: 'consNo',
          sortable: 'custom',
        },
        {
          label: '地市',
          prop: 'city',
          sortable: 'custom',
        },
        {
          label: '事件名称',
          prop: 'eventName',
          sortable: 'custom',
        },
        {
          label: '调节负荷(kW)',
          prop: 'downLoad',
          sortable: 'custom',
        },
        {
          label: '状态',
          prop: 'state',
          sortable: 'custom',
        },
      ],
      queryParamsDialog: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      // 弹窗
      title: '',
      showDialog: false,
      form: {},
      lineOption: {},
    };
  },

  mounted() {
    this.getList();
  },
  methods: {
    handleSearch() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    // 请求表格数据
    getList() {
      if (this.dateRange) {
        this.queryParams.startDate = this.dateRange[0];
        this.queryParams.endDate = this.dateRange[1];
      }
      this.loading = true;
      HttpUrl.getCtrlEvents(this.queryParams).then(res => {
        this.tableData = res.data.data;
        this.$nextTick(() => {
          this.queryParams.total = res.data.total;
        });
        this.loading = false;
      });
    },
    // 刷新
    refreshData() {
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      };
      this.getList();
    },
    // 表格多选
    selectionChange(e) {
      this.tableDataSelectOptions = e ? e.map(val => val.id) : [];
    },

    // 表格详情
    handleDetail(row) {
      // this.title = row.name;
      // this.showDialog = true;
      // this.queryParamsDialog.id = row.id;
      // this.getListDialog();
      this.$router.push({
        path: '/remote-control/group-event-detail',
        query: { id: row.id },
      });
    },
    //弹窗表格数据
    getListDialog() {
      this.loadingDialog = true;
      HttpUrl.getCtrlEventCons(this.queryParamsDialog).then(res => {
        this.tableDataDialog = res.data.data;
        this.$nextTick(() => {
          this.queryParamsDialog.total = res.data.total;
        });
        this.loadingDialog = false;
      });
    },
    handleState() {
      this.showDialogState = true;
      this.titleState = '用户状态';
    },
    handleLineOut(row) {
      this.showDialogLine = true;
      this.titleLine = row.name;
      HttpUrl.getCtrlEventCurve({ id: row.id }).then(res => {
        if (res.code == 200) {
          res.data.timeStamp.push('24:00');
          let timeData = [];
          for (const i in res.data.timeDateLimit) {
            timeData.push({ xAxis: res.data.timeDateLimit[i] });
          }
          timeData[0].label = { padding: [0, this.echartFontSize(50), 0, 0] };
          timeData[1].label = { padding: [0, 0, 0, this.echartFontSize(50)] };
          this.lineOption = {
            color: [
              '#425AED',
              '#F4A651',
              '#A349A4',
              '#15796A',
              '#583c87',
              '#ff6473',
              '#41a4c3',
            ],
            tooltip: {
              trigger: 'axis',
              color: this.fontColor,
              backgroundColor: 'rgba(0,0,0,0.4)',
              borderColor: 'gray',
              textStyle: {
                color: '#fff',
                fontSize: this.echartFontSize(12),
              },
              formatter: function (params) {
                var relVal = params[0].axisValueLabel;
                for (var i = 0, l = params.length; i < l; i++) {
                  if (typeof params[i].value === 'undefined') {
                    params[i].value = ' ';
                  }
                  relVal +=
                    '<br/>' +
                    params[i].marker +
                    params[i].seriesName +
                    ' : ' +
                    params[i].value +
                    '(kW)';
                }
                return relVal;
              },
            },
            grid: {
              left: '10px',
              right: '5%',
              bottom: '5px',
              top: '10%',
              containLabel: true,
            },
            legend: {
              top: -10,
              right: 'center',
              padding: [20, 0, 0, 0],
              icon: 'rect',
              itemHeight: this.echartFontSize(5), //修改icon图形大小
              itemWidth: this.echartFontSize(16), //修改icon图形大小
              itemGap: this.echartFontSize(10),
              textStyle: {
                color: this.fontColor,
                fontSize: this.echartFontSize(12),
              },
              // data: ['实际负荷', '基线负荷', '调节计划', '响应负荷'],
            },
            xAxis: {
              type: 'category',
              data: res.data.timeStamp,
              splitLine: {
                show: false,
                lineStyle: {
                  opacity: 0.2,
                  color: this.fontColor,
                },
              },
              axisLabel: {
                interval: 23,
                color: this.fontColor,
                fontSize: this.echartFontSize(12),
                margin: this.echartFontSize(15),
              },
              nameTextStyle: {
                color: this.fontColor,
                fontSize: this.echartFontSize(12),
              },
            },
            yAxis: {
              type: 'value',
              name: '单位:kW',
              splitLine: {
                show: false,
                lineStyle: {
                  opacity: 0.2,
                  color: this.fontColor,
                },
              },
              axisLabel: {
                formatter: '{value}',
                color: this.fontColor,
                fontSize: this.echartFontSize(12),
              },
              nameTextStyle: {
                color: this.fontColor,
                fontSize: this.echartFontSize(12),
              },
            },
            dataZoom: {
              type: 'inside',
            },
            series: [
              {
                name: '实际负荷',
                type: 'line',
                smooth: 0.5,
                symbol: null,
                symbolSize: 0,
                data: res.data.actualLoad,
                connectNulls: true,
                markLine: {
                  symbol: 'none',
                  label: {
                    position: 'end',
                    color: '#f00',
                    fontSize: this.echartFontSize(16),
                  },
                  lineStyle: {
                    //警戒线的样式  ，虚实  颜色
                    color: '#f00',
                    width: this.echartFontSize(1),
                  },
                  data: timeData,
                },
              },

              {
                name: '基线负荷',
                type: 'line',
                smooth: 0.5,
                symbol: null,
                symbolSize: 0,
                data: res.data.baselineLoad,
                connectNulls: true,
              },
            ],
          };
        }
      });
    },
    handleLineIn(row) {
      this.showDialogLine = true;
      this.titleLine = row.name;
      HttpUrl.getCtrlEventConsCurve({
        id: row.eventId,
        consId: row.consId,
      }).then(res => {
        if (res.code == 200) {
          res.data.timeStamp.push('24:00');
          let timeData = [];
          for (const i in res.data.timeDateLimit) {
            timeData.push({ xAxis: res.data.timeDateLimit[i] });
          }
          timeData[0].label = { padding: [0, this.echartFontSize(50), 0, 0] };
          timeData[1].label = { padding: [0, 0, 0, this.echartFontSize(50)] };
          this.lineOption = {
            color: [
              '#425AED',
              '#F4A651',
              '#A349A4',
              '#15796A',
              '#583c87',
              '#ff6473',
              '#41a4c3',
            ],
            tooltip: {
              trigger: 'axis',
              color: this.fontColor,
              backgroundColor: 'rgba(0,0,0,0.4)',
              borderColor: 'gray',
              textStyle: {
                color: '#fff',
                fontSize: this.echartFontSize(12),
              },
              formatter: function (params) {
                var relVal = params[0].axisValueLabel;
                for (var i = 0, l = params.length; i < l; i++) {
                  if (typeof params[i].value === 'undefined') {
                    params[i].value = ' ';
                  }
                  relVal +=
                    '<br/>' +
                    params[i].marker +
                    params[i].seriesName +
                    ' : ' +
                    params[i].value +
                    '(kW)';
                }
                return relVal;
              },
            },
            grid: {
              left: '10px',
              right: '5%',
              bottom: '5px',
              top: '10%',
              containLabel: true,
            },
            legend: {
              top: -10,
              right: 'center',
              padding: [20, 0, 0, 0],
              icon: 'rect',
              itemHeight: this.echartFontSize(5), //修改icon图形大小
              itemWidth: this.echartFontSize(16), //修改icon图形大小
              itemGap: this.echartFontSize(10),
              textStyle: {
                color: this.fontColor,
                fontSize: this.echartFontSize(12),
              },
              // data: ['实际负荷', '基线负荷', '调节计划', '响应负荷'],
            },
            xAxis: {
              type: 'category',
              data: res.data.timeStamp,
              splitLine: {
                show: false,
                lineStyle: {
                  opacity: 0.2,
                  color: this.fontColor,
                },
              },
              axisLabel: {
                interval: 23,
                color: this.fontColor,
                fontSize: this.echartFontSize(12),
                margin: this.echartFontSize(15),
              },
              nameTextStyle: {
                color: this.fontColor,
                fontSize: this.echartFontSize(12),
              },
            },
            yAxis: {
              type: 'value',
              name: '单位:kW',
              splitLine: {
                show: false,
                lineStyle: {
                  opacity: 0.2,
                  color: this.fontColor,
                },
              },
              axisLabel: {
                formatter: '{value} ',
                color: this.fontColor,
                fontSize: this.echartFontSize(12),
              },
              nameTextStyle: {
                color: this.fontColor,
                fontSize: this.echartFontSize(12),
              },
            },
            dataZoom: {
              type: 'inside',
            },
            series: [
              {
                name: '实际负荷',
                type: 'line',
                smooth: 0.5,
                symbol: null,
                symbolSize: 0,
                data: res.data.actualLoad,
                connectNulls: true,
                markLine: {
                  symbol: 'none',
                  label: {
                    position: 'end',
                    color: '#f00',
                    fontSize: this.echartFontSize(16),
                  },
                  lineStyle: {
                    //警戒线的样式  ，虚实  颜色
                    color: '#f00',
                    width: this.echartFontSize(1),
                  },
                  data: timeData,
                },
              },

              {
                name: '基线负荷',
                type: 'line',
                smooth: 0.5,
                symbol: null,
                symbolSize: 0,
                data: res.data.baselineLoad,
                connectNulls: true,
              },
            ],
          };
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .query-container .el-form-item {
  width: 21%;
}

::v-deep .query-container .el-form-item__content {
  width: calc(100% - 5.625rem);
}
</style>
