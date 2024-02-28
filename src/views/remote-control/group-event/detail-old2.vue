<!--
 * @Description  : 群控事件详情
 * @Author       : 陈凯
 * @Date         : 2023-11-06 10:26:08
 * @LastEditors  : 陈凯
 * @LastEditTime : 2023-12-08 17:41:55
 * @FilePath     : \init-project\src\views\remote-control\group-event\detail-old2.vue
-->
<template>
  <div class="app-container" id="mainSize">
    <!-- 返回 -->
    <div
      class="goBack pointer inline-block font-weight-bold margin-bottom-10"
      @click="$router.go(-1)"
    >
      <i class="el-icon-arrow-left" style="font-weight: bold"></i>返回
    </div>
    <div class="w-h-100 flex_row_s" style="height: calc(100% - 2rem)">
      <div class="left-content width50 h-100 margin-right-10">
        <!-- 需求信息 -->
        <div
          class="card-container margin-bottom-10"
          style="height: calc(50%); width: 100%"
        >
          <div class="headerTitle">需求信息</div>
          <div
            style="height: calc(100% - 2rem); width: 100%"
            class="flex_row_s flex_wrap"
          >
            <div
              class="leftEach border-radius-10 flex_row_s"
              v-for="item in leftData"
              :key="item.prop"
            >
              <div class="flex_row_s">
                <svg-icon :icon-class="item.prop" />
                <!-- <img
                class="margin-right-20"
                style="height: 2rem"
                :src="
                  require('../../../assets/remote-control/' +
                    item.prop +
                    '.png')
                "
              /> -->
                &nbsp;&nbsp;&nbsp;{{ item.label }}
              </div>
              <div>{{ item.value }}</div>
            </div>
          </div>
        </div>
        <!-- 表格 -->
        <div
          class="right-content width100 card-container"
          style="height: calc(50% - 1rem)"
          v-loading="rightLoading"
        >
          <div class="headerTitle">用户信息</div>
          <element-table
            style="height: calc(100% - 2rem)"
            :tableData="tableData"
            :tableColumns="tableColumns"
            :paginationConfig="queryParams"
            @page-current-change="handlePageCurrentChange"
            @pageNum-current-change="handleNumChange"
          >
            <template #state="{ rowData: { row } }">
              <div
                @click="handleState(row)"
                class="pointer"
                style="color: #666ee8"
              >
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
        </div>
      </div>
      <div class="h-100 width50">
        <!--计划曲线 -->
        <div
          class="card-container margin-bottom-10"
          style="height: calc(50%); width: 100%"
          v-loading="loading"
        >
          <div class="headerTitle">计划曲线</div>
          <echarts-chart
            id="echart"
            style="width: 100%; height: calc(100% - 2rem)"
            :option="lineOptionPlan"
          />
        </div>
        <!--执行曲线 -->
        <div
          class="card-container margin-bottom-10"
          style="height: calc(50% - 1rem); width: 100%"
          v-loading="loading"
        >
          <div class="headerTitle">执行曲线</div>
          <echarts-chart
            id="echart"
            style="width: 100%; height: calc(100% - 2rem)"
            :option="lineOptionAction"
          />
        </div>
      </div>
    </div>

    <!-- 状态弹窗 -->
    <element-dialog
      :showCloseButton="true"
      :title="titleState"
      v-model="showDialogState"
      width="60%"
    >
      <!-- <img
        style="width: 100%"
        src="../../../assets/demand-response/微信图片_20231104203930.png"
        alt=""
      /> -->
      <Progress1 :params="progressParams"></Progress1>
    </element-dialog>
    <!-- 曲线弹窗 -->
    <element-dialog
      :title="titleLine"
      v-model="showDialogLine"
      :showCloseButton="true"
    >
      <!--计划 -->
      <div class="chooseBox">
        <span
          class="chooseBtn pointer"
          :class="{ colorBtn: dialogTab == 1 }"
          @click="dialogTab = 1"
          >计划</span
        >
        <span style="margin-right: 1rem">|</span
        ><span
          class="chooseBtn pointer"
          :class="{ colorBtn: dialogTab == 2 }"
          @click="dialogTab = 2"
          >执行</span
        >
      </div>
      <echarts-chart
        v-if="dialogTab == 1"
        class="margin-bottom-20"
        id="echart"
        height="31.25rem"
        :option="lineOptionInPlan"
      />
      <!-- 执行 -->

      <echarts-chart
        v-if="dialogTab == 2"
        class="margin-bottom-20"
        id="echart"
        height="31.25rem"
        :option="lineOptionInAction"
      />
    </element-dialog>
  </div>
</template>

<script>
import elementTable from '@/components/ElementTable/index_d.vue';
import elementDialog from '@/components/ElementDialog/index.vue';
import Progress1 from '@/views/comp/Progress1.vue';
import echartsChart from '@/components/EchartsChart/index.vue';
import HttpUrl from '@/api/remote-control/group-event';
import elementResize from 'element-resize-detector';

import * as echarts from 'echarts';
export default {
  name: '',
  components: { elementTable, elementDialog, echartsChart, Progress1 },

  data() {
    return {
      dialogTab: '1',
      progressParams: null,
      bigScreen: window.screen.width < 2000 ? false : true,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        id: this.$route.query.id ?? '',
      },
      loading: false,
      rightLoading: false,
      tableData: [],
      tableColumns: [
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
          label: '地区',
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
      leftData: [
        {
          label: '事件名称',
          prop: 'name',
          value: '-',
        },
        {
          label: '事件编码',
          prop: 'code',
          value: '-',
        },
        {
          label: '需求量(kW)',
          prop: 'loadValue',
          value: '-',
        },
        {
          label: '需求类型',
          prop: 'commandType',
          value: '-',
        },
        {
          label: '参与方式',
          prop: 'takePartType',
          value: '-',
        },
        {
          label: '所选群组',
          prop: 'groupName',
          value: '-',
        },
        {
          label: '用户数量',
          prop: 'consNum',
          value: '-',
        },
        {
          label: '下发值(kW)',
          prop: 'underLoad',
          value: '-',
        },
        {
          label: '响应量(kW)',
          prop: 'respondLoad',
          value: '-',
        },
        {
          label: '完成率',
          prop: 'finishRate',
          value: '-',
        },
        {
          label: '状态',
          prop: 'state',
          value: '-',
        },
        {
          label: '开始时间',
          prop: 'startTime',
          value: '-',
        },
        {
          label: '结束时间',
          prop: 'endTime',
          value: '-',
        },
      ],
      showDialogState: false,
      titleState: '',
      titleLine: '',
      showDialogLine: false,
      lineOptionInPlan: {},
      lineOptionInAction: {},
      lineOptionPlan: {}, //计划曲线
      lineOptionAction: {}, //执行曲线
    };
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.getRightData();
    });
    this.getData();
  },
  methods: {
    getData() {
      this.getLeftData();
      this.getList();
      this.getRightData();
    },
    getLeftData() {
      HttpUrl.getSingleCtrlEvents({ param: this.queryParams.id }).then(res => {
        if (res.code == 200) {
          for (const i in this.leftData) {
            this.leftData[i].value =
              res.data.data[0][this.leftData[i].prop] ?? '-';
            if (this.leftData[i].label == '完成率') {
              this.leftData[i].value =
                res.data.data[0][this.leftData[i].prop] * 100 + '%';
            }
          }
        }
      });
    },
    getList() {
      this.loading = true;
      HttpUrl.getCtrlEventCons(this.queryParams).then(res => {
        this.tableData = res.data.data;
        this.$nextTick(() => {
          this.queryParams.total = res.data.total;
        });
        this.loading = false;
      });
    },
    getNearTime(time, arr) {
      for (const i in arr) {
        if (Object.hasOwnProperty.call(object, i)) {
          const element = object[i];
        }
      }
    },
    getRightData() {
      this.rightLoading = true;
      //   计划曲线
      HttpUrl.getCtrlEventPlanCurve({ id: this.queryParams.id }).then(res => {
        if (res.code == 200) {
          // res.data.timeStamp.push('24:00');
          let timeData = [];
          for (const i in res.data.timeDateLimit) {
            // if (
            //   res.data.timeDateLimit[i].slice(4) == 0 ||
            //   res.data.timeDateLimit[i].slice(4) == 5
            // ) {
            // } else if (res.data.timeDateLimit[i].slice(4) < 5) {
            //   res.data.timeStamp.splice(
            //     res.data.timeStamp.indexOf(
            //       res.data.timeDateLimit[i].slice(0, -1) + 0
            //     ) + 1,
            //     0,
            //     res.data.timeDateLimit[i]
            //   );
            // } else if (res.data.timeDateLimit[i].slice(4) > 5) {
            //   res.data.timeStamp.splice(
            //     res.data.timeStamp.indexOf(
            //       res.data.timeDateLimit[i].slice(0, -2) +
            //         (Number(res.data.timeDateLimit[i].slice(-2)) + 1)
            //     ) + 1,
            //     0,
            //     res.data.timeDateLimit[i]
            //   );
            // }
            timeData.push({ xAxis: res.data.timeDateLimit[i] });
          }
          timeData[0].label = { padding: [0, this.echartFontSize(50), 0, 0] };
          timeData[1].label = { padding: [0, 0, 0, this.echartFontSize(50)] };

          let yData1 = [];
          let yData2 = [];
          let yData3 = [];
          let yData4 = [];
          for (let i = 0; i < res.data.timeStamp.length; i++) {
            yData1.push([res.data.timeStamp[i], res.data.baselineLoad[i]]);
            yData2.push([res.data.timeStamp[i], res.data.baselineLoadAvg[i]]);
            yData3.push([res.data.timeStamp[i], res.data.planCurve[i]]);
            yData4.push([res.data.timeStamp[i], res.data.planCurveAvg[i]]);
          }

          this.lineOptionPlan = {
            color: [
              '#F4A651',
              '#F4D951',
              '#425AED',
              '#429EED',

              '#A349A4',
              '#15796A',
              '#583c87',
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
              top: '16%',
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
              selected: {
                基线负荷平均值: false,
                计划曲线平均值: false,
              },
              // data: ['实际负荷', '基线负荷', '调节计划', '响应负荷'],
            },
            xAxis: {
              type: 'time',
              // min: res.data.timeStamp[0],
              // max: res.data.timeStamp[res.data.timeStamp.length - 1],
              // minInterval: 60 * 1000,
              interval: 10,
              splitLine: {
                show: false,
                lineStyle: {
                  opacity: 0.2,
                  color: this.fontColor,
                },
              },

              axisLabel: {
                // formatter: data => {
                //   console.log(
                //     this.getDateTimeSecond(new Date(data)).slice(10, 16)
                //   );
                //   return this.getDateTimeSecond(new Date(data)).slice(10, 16);
                // },
                formatter: {
                  year: '{yyyy}',
                  month: '{MMM}',
                  day: '{dd}日',
                  hour: '{HH}:{mm}',
                  minute: '{HH}:{mm}',
                  none: '{yyyy}-{MM}-{dd} {hh}:{mm}',
                },
                color: this.fontColor,
                fontSize: this.echartFontSize(12),
                margin: this.echartFontSize(15),
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
                name: '基线负荷',
                type: 'line',
                smooth: 0.5,
                symbol: null,
                symbolSize: 0,
                data: yData1,
                connectNulls: true,
                markLine: {
                  symbol: 'none',
                  label: {
                    position: 'end',
                    color: '#f00',
                    formatter: params => {
                      return params.value.slice(10, 16);
                    },
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
                name: '基线负荷平均值',
                type: 'line',
                smooth: 0.5,
                symbol: null,
                symbolSize: 0,
                data: yData2,
                connectNulls: true,
                lineStyle: {
                  type: 'dotted', //'dotted'虚线 'solid'实线
                },
              },
              {
                name: '计划曲线',
                type: 'line',
                smooth: 0.5,
                symbol: null,
                symbolSize: 0,
                data: yData3,
                connectNulls: true,
              },
              {
                name: '计划曲线平均值',
                type: 'line',
                smooth: 0.5,
                symbol: null,
                symbolSize: 0,
                data: yData4,
                connectNulls: true,
                lineStyle: {
                  type: 'dotted', //'dotted'虚线 'solid'实线
                },
              },
            ],
          };
          this.rightLoading = false;
        }
      });
      //   执行曲线
      HttpUrl.getCtrlEventCurve({ id: this.queryParams.id }).then(res => {
        if (res.code == 200) {
          res.data.timeStamp.push('24:00');
          let timeData = [];
          for (const i in res.data.timeDateLimit) {
            // if (
            //   res.data.timeDateLimit[i].slice(4) == 0 ||
            //   res.data.timeDateLimit[i].slice(4) == 5
            // ) {
            // } else if (res.data.timeDateLimit[i].slice(4) < 5) {
            //   res.data.timeStamp.splice(
            //     res.data.timeStamp.indexOf(
            //       res.data.timeDateLimit[i].slice(0, -1) + 0
            //     ) + 1,
            //     0,
            //     res.data.timeDateLimit[i]
            //   );
            // } else if (res.data.timeDateLimit[i].slice(4) > 5) {
            //   res.data.timeStamp.splice(
            //     res.data.timeStamp.indexOf(
            //       res.data.timeDateLimit[i].slice(0, -2) +
            //         (Number(res.data.timeDateLimit[i].slice(-2)) + 1)
            //     ) + 1,
            //     0,
            //     res.data.timeDateLimit[i]
            //   );
            // }
            timeData.push({ xAxis: res.data.timeDateLimit[i] });
          }
          timeData[0].label = { padding: [0, this.echartFontSize(50), 0, 0] };
          timeData[1].label = { padding: [0, 0, 0, this.echartFontSize(50)] };
          this.lineOptionAction = {
            color: [
              //   '#F4A651',
              //   '#F4D951',
              '#425AED',
              '#429EED',
              '#00B050',
              '#91CD77',

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
              top: '16%',
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
              selected: {
                计划负荷平均值: false,
                实际负荷平均值: false,
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
                name: '计划负荷',
                type: 'line',
                smooth: 0.5,
                symbol: null,
                symbolSize: 0,
                data: res.data.planCurve,
                connectNulls: true,
              },
              {
                name: '计划负荷平均值',
                type: 'line',
                smooth: 0.5,
                symbol: null,
                symbolSize: 0,
                data: res.data.planCurveAvg,
                connectNulls: true,
              },
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
                name: '实际负荷平均值',
                type: 'line',
                smooth: 0.5,
                symbol: null,
                symbolSize: 0,
                data: res.data.actualLoadAvg,
                connectNulls: true,
              },
            ],
          };
          this.rightLoading = false;
        }
      });
    },
    handleState(row) {
      this.progressParams = { consId: row.consId, id: row.eventId };
      this.showDialogState = true;
      this.titleState = '事件状态';
    },
    // 弹窗曲线
    handleLineIn(row) {
      this.showDialogLine = true;
      this.titleLine = row.consName;
      //   计划
      HttpUrl.getCtrlEventConsPlanCurve({
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
          this.lineOptionInPlan = {
            color: [
              '#F4A651',
              '#F4D951',
              '#425AED',
              '#429EED',

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
              top: '12%',
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
              selected: {
                基线负荷平均值: false,
                计划曲线平均值: false,
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
                name: '基线负荷',
                type: 'line',
                smooth: 0.5,
                symbol: null,
                symbolSize: 0,
                data: res.data.baselineLoad,
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
                name: '基线负荷平均值',
                type: 'line',
                smooth: 0.5,
                symbol: null,
                symbolSize: 0,
                data: res.data.baselineLoadAvg,
                connectNulls: true,
              },
              {
                name: '计划曲线',
                type: 'line',
                smooth: 0.5,
                symbol: null,
                symbolSize: 0,
                data: res.data.planCurve,
                connectNulls: true,
              },
              {
                name: '计划曲线平均值',
                type: 'line',
                smooth: 0.5,
                symbol: null,
                symbolSize: 0,
                data: res.data.planCurveAvg,
                connectNulls: true,
              },
            ],
          };
        }
      });
      // 执行
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
          this.lineOptionInAction = {
            color: [
              '#425AED',
              '#429EED',
              '#00B050',
              '#91CD77',
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
              top: '12%',
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
              selected: {
                计划负荷平均值: false,
                实际负荷平均值: false,
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
                name: '计划负荷',
                type: 'line',
                smooth: 0.5,
                symbol: null,
                symbolSize: 0,
                data: res.data.planCurve,
                connectNulls: true,
              },
              {
                name: '计划负荷平均值',
                type: 'line',
                smooth: 0.5,
                symbol: null,
                symbolSize: 0,
                data: res.data.planCurveAvg,
                connectNulls: true,
              },
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
                name: '实际负荷平均值',
                type: 'line',
                smooth: 0.5,
                symbol: null,
                symbolSize: 0,
                data: res.data.actualLoadAvg,
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
@import '~@/styles/css-theme/handle.scss';

.leftEach {
  font-size: 0.75rem;
  width: 48%;
  height: 12%;
  @include background_color('right_container');
  padding: 0 1.5rem;
  margin-bottom: 0.1rem;
}

.chooseBox {
  @include font_color('fontColor');
  font-size: 1.2rem;
  .chooseBtn {
    display: inline-block;
    margin-right: 1rem;
  }

  .colorBtn {
    @include font_color('primaryColor');
  }
}
</style>
