<!--
 * @Description  : 终端控制详情页
 * @Author       : 陈凯
 * @Date         : 2023-09-13 11:00:43
 * @LastEditors  : 陈凯
 * @LastEditTime : 2024-02-01 10:37:10
 * @FilePath     : \init-project\src\views\remote-control\single-control\edit.vue
-->

<template>
  <div class="app-container">
    <div
      class="goBack pointer margin-bottom-10 inline-block font-weight-bold"
      @click="$router.push('/single-control/airConditioning-control')"
    >
      <i class="el-icon-arrow-left"></i>返回
    </div>
    <el-card
      class="header-container"
      style="margin-bottom: 10px"
      v-loading="showLoading"
    >
      <div class="headerTitle">
        <span class="title-text">基本参数</span>
      </div>
      <!-- 基本参数 -->
      <div class="topOne">
        <div
          class="itemInfo flex_row_l"
          v-for="(item, index) in topBaseData"
          :key="index"
        >
          <span class="itemTitle">{{ item.name }} ： </span>

          <div class="width60">
            <el-popover
              placement="top-start"
              trigger="hover"
              :content="String(item.value)"
            >
              <div class="text-overflow" slot="reference">
                {{ item.value ? item.value : '-' }}
              </div>
            </el-popover>
          </div>
        </div>
      </div>
      <div class="headerTitle">
        <span class="title-text">运行参数</span>
      </div>
      <!-- 运行参数 -->
      <div class="topTwo">
        <div
          class="itemInfo"
          v-for="(item, index) in topSportData"
          :key="index"
        >
          <span class="itemTitle">{{ item.name }} ： </span
          >{{ item.value ? item.value : '-' }}
        </div>
      </div>
    </el-card>

    <div class="bottom-container" v-loading="showLoading">
      <!-- 状态控制 -->
      <div
        class="leftContent"
        :class="{ width60: conditionType == '2004' }"
        v-if="showLines"
      >
        <!-- 设备状态控制--分体式空调 -->
        <el-card
          v-if="conditionType == '2001'"
          class="topThreeBox"
          style="margin-bottom: 10px"
        >
          <div class="headerTitle">
            <span class="title-text">设备状态控制</span>
            <el-button
              style="float: right; font-weight: bold"
              type="primary"
              @click="handleStatus"
              :disabled="confirmFlag"
              >下发</el-button
            >
          </div>
          <div class="threeCircles">
            <!-- 当前状态 分体式空调-->
            <div class="eachCircle">
              <div class="circleMain">
                <img class="circleImg" :src="activeImg" alt="" />
                <div class="bottomTitleName">当前状态</div>
              </div>
              <div
                class="bottomBox bottomTab"
                @click="
                  statusData.activeFlag = !statusData.activeFlag;
                  confirmFlag = false;
                "
              >
                <div
                  class="changeBtn"
                  ref="changeBtn"
                  :class="{ marginleft44: statusData.activeFlag }"
                >
                  {{ statusData.activeFlag ? '开' : '关' }}
                </div>
              </div>
            </div>
            <!-- 运行模式 分体式空调-->
            <div class="eachCircle">
              <div class="circleMain">
                <span class="fixTitle">{{ modeText }}</span>
                <img class="circleImg" :src="modeImg" alt="" />
                <div class="bottomTitleName">运行模式</div>
              </div>
              <div class="bottomBox bottomMode">
                <div
                  class="eachBox"
                  @click="clickMode(1)"
                  :class="{ disabled: !statusData.activeFlag }"
                >
                  <img
                    style="vertical-align: middle; height: 1.25rem"
                    :src="modeLeftImg"
                    alt=""
                  />
                  <span class="modeText">制冷</span>
                </div>
                <div
                  class="eachBox"
                  @click="clickMode(2)"
                  style="text-align: right"
                  :class="{ disabled: !statusData.activeFlag }"
                >
                  <img
                    style="vertical-align: middle; height: 1.25rem"
                    :src="modeMiddleImg"
                    alt=""
                  />
                  <span class="modeText">制热</span>
                </div>
              </div>
            </div>
            <!-- 当前温度 分体式空调-->
            <div class="eachCircle">
              <div class="circleMain">
                <span class="fixTitle">
                  {{
                    statusData.tempNum
                      ? String(statusData.tempNum).substring(0, 2)
                      : '-'
                  }}
                  ℃</span
                >
                <img class="circleImg" :src="temImg" alt="" />
                <div class="bottomTitleName">设定温度</div>
              </div>
              <div class="bottomBox bottomTemp">
                <div
                  class="addClick"
                  @click="clickTemp(1)"
                  :class="{ disabled: !statusData.activeFlag }"
                >
                  -
                </div>
                <div
                  class="tempNum"
                  :class="{ disabled: !statusData.activeFlag }"
                >
                  {{
                    statusData.tempNum
                      ? String(statusData.tempNum).substring(0, 2)
                      : '-'
                  }}
                  ℃
                </div>
                <div
                  class="addClick"
                  @click="clickTemp(2)"
                  :class="{ disabled: !statusData.activeFlag }"
                >
                  +
                </div>
              </div>
            </div>
          </div>
        </el-card>
        <!-- 设备状态控制--VRV空调 -->
        <el-card
          v-if="conditionType == '2002'"
          class="topThreeBox"
          style="margin-bottom: 10px"
        >
          <div class="headerTitle">
            <span class="title-text">设备状态控制</span>
            <el-button
              style="float: right; font-weight: bold"
              type="primary"
              @click="handleStatus"
              :disabled="confirmFlag"
              >下发</el-button
            >
          </div>
          <div class="threeCircles">
            <!-- 当前状态 VRV空调-->
            <div class="eachCircle">
              <div class="circleMain">
                <img class="circleImg" :src="activeImg" alt="" />
                <div class="bottomTitleName">当前状态</div>
              </div>
              <div
                class="bottomBox bottomTab"
                @click="
                  statusData.activeFlag = !statusData.activeFlag;
                  confirmFlag = false;
                "
              >
                <div
                  class="changeBtn"
                  ref="changeBtn"
                  :class="{ marginleft44: statusData.activeFlag }"
                >
                  {{ statusData.activeFlag ? '开' : '关' }}
                </div>
              </div>
            </div>
            <!-- 运行模式 VRV空调-->
            <div class="eachCircle">
              <div class="circleMain">
                <span class="fixTitle">{{ modeText }}</span>
                <img class="circleImg" :src="modeImg" alt="" />
                <div class="bottomTitleName">运行模式</div>
              </div>
              <div class="bottomBox bottomMode">
                <div
                  class="eachBox"
                  @click="clickMode(1)"
                  :class="{ disabled: !statusData.activeFlag }"
                >
                  <img
                    style="vertical-align: middle; height: 1.25rem"
                    :src="modeLeftImg"
                    alt=""
                  />
                  <span class="modeText">制冷</span>
                </div>
                <div
                  class="eachBox"
                  @click="clickMode(2)"
                  style="text-align: right"
                  :class="{ disabled: !statusData.activeFlag }"
                >
                  <img
                    style="vertical-align: middle; height: 1.25rem"
                    :src="modeMiddleImg"
                    alt=""
                  />
                  <span class="modeText">制热</span>
                </div>
              </div>
            </div>
            <!-- 当前温度 VRV空调-->
            <div class="eachCircle">
              <div class="circleMain">
                <span class="fixTitle">
                  {{
                    statusData.tempNum
                      ? String(statusData.tempNum).substring(0, 2)
                      : '-'
                  }}
                  ℃</span
                >
                <img class="circleImg" :src="temImg" alt="" />
                <div class="bottomTitleName">设定温度</div>
              </div>
              <div class="bottomBox bottomTemp">
                <div
                  class="addClick"
                  @click="clickTemp(1)"
                  :class="{ disabled: !statusData.activeFlag }"
                >
                  -
                </div>
                <div
                  class="tempNum"
                  :class="{ disabled: !statusData.activeFlag }"
                >
                  {{
                    statusData.tempNum
                      ? String(statusData.tempNum).substring(0, 2)
                      : '-'
                  }}
                  ℃
                </div>
                <div
                  class="addClick"
                  @click="clickTemp(2)"
                  :class="{ disabled: !statusData.activeFlag }"
                >
                  +
                </div>
              </div>
            </div>
          </div>
        </el-card>
        <!-- 设备状态控制--水冷中央空调 -->
        <el-card
          v-if="conditionType == '2003'"
          class="topThreeBox"
          style="margin-bottom: 10px"
        >
          <div class="headerTitle">
            <span class="title-text">设备状态控制</span>
            <el-button
              style="float: right; font-weight: bold"
              type="primary"
              @click="handleStatus"
              :disabled="confirmFlag"
              >下发</el-button
            >
          </div>
          <div class="threeCircles">
            <!-- 当前状态  水冷中央空调-->
            <div class="eachCircle">
              <div class="circleMain">
                <img class="circleImg" :src="activeImg" alt="" />
                <div class="bottomTitleName">当前状态</div>
              </div>
              <div
                class="bottomBox bottomTab"
                @click="
                  statusData.activeFlag = !statusData.activeFlag;
                  confirmFlag = false;
                "
              >
                <div
                  class="changeBtn"
                  ref="changeBtn"
                  :class="{ marginleft44: statusData.activeFlag }"
                >
                  {{ statusData.activeFlag ? '开' : '关' }}
                </div>
              </div>
            </div>
            <!-- 限制负载率  水冷中央空调-->
            <div class="eachCircle">
              <div class="circleMain">
                <span class="fixTitle">
                  {{ statusData.limitRate }}
                  %</span
                >
                <img class="circleImg" :src="temImg" alt="" />
                <div class="bottomTitleName">限制负载率</div>
              </div>
              <div class="bottomBox bottomTemp">
                <div
                  class="addClick"
                  @click="
                    confirmFlag = false;
                    statusData.limitRate > 0
                      ? statusData.limitRate--
                      : statusData.limitRate;
                  "
                  :class="{ disabled: !statusData.activeFlag }"
                >
                  -
                </div>
                <div
                  class="tempNum"
                  :class="{ disabled: !statusData.activeFlag }"
                >
                  {{ statusData.limitRate }}%
                </div>
                <div
                  class="addClick"
                  @click="
                    confirmFlag = false;
                    statusData.limitRate < 100
                      ? statusData.limitRate++
                      : statusData.limitRate;
                  "
                  :class="{ disabled: !statusData.activeFlag }"
                >
                  +
                </div>
              </div>
            </div>
            <!-- 出水温度  水冷中央空调-->
            <div class="eachCircle">
              <div class="circleMain">
                <span class="fixTitle">
                  {{
                    statusData.coolWaterTemp
                      ? String(statusData.coolWaterTemp).substring(0, 2)
                      : '-'
                  }}
                  ℃</span
                >
                <img class="circleImg" :src="temImg" alt="" />
                <div class="bottomTitleName">出水温度</div>
              </div>
              <div class="bottomBox bottomTemp">
                <div
                  class="addClick"
                  @click="
                    confirmFlag = false;
                    statusData.coolWaterTemp > 16
                      ? statusData.coolWaterTemp--
                      : statusData.coolWaterTemp;
                  "
                  :class="{ disabled: !statusData.activeFlag }"
                >
                  -
                </div>
                <div
                  class="tempNum"
                  :class="{ disabled: !statusData.activeFlag }"
                >
                  {{
                    statusData.coolWaterTemp
                      ? String(statusData.coolWaterTemp).substring(0, 2)
                      : '-'
                  }}
                  ℃
                </div>
                <div
                  class="addClick"
                  @click="
                    confirmFlag = false;
                    statusData.coolWaterTemp < 32
                      ? statusData.coolWaterTemp++
                      : statusData.coolWaterTemp;
                  "
                  :class="{ disabled: !statusData.activeFlag }"
                >
                  +
                </div>
              </div>
            </div>
          </div>
        </el-card>
        <!-- 设备状态控制--风冷热泵机组 -->
        <el-card
          v-if="conditionType == '2004'"
          class="topThreeBox"
          style="margin-bottom: 10px"
        >
          <div class="headerTitle">
            <span class="title-text">设备状态控制</span>
            <el-button
              style="float: right; font-weight: bold"
              type="primary"
              @click="handleStatus"
              :disabled="confirmFlag"
              >下发</el-button
            >
          </div>
          <div class="threeCircles">
            <!-- 当前状态 风冷热泵机组-->
            <div
              class="eachCircle"
              :class="{ width25: conditionType == '2004' }"
            >
              <div class="circleMain">
                <img class="circleImg" :src="activeImg" alt="" />
                <div class="bottomTitleName">当前状态</div>
              </div>
              <div class="bottomBox bottomTab disabled">
                <div
                  class="changeBtn"
                  ref="changeBtn"
                  :class="{ marginleft44: statusData.activeFlag }"
                >
                  {{ statusData.activeFlag ? '开' : '关' }}
                </div>
              </div>
            </div>
            <!-- 运行模式 风冷热泵机组-->
            <div
              class="eachCircle"
              :class="{ width25: conditionType == '2004' }"
            >
              <div class="circleMain">
                <span class="fixTitle">{{ modeText }}</span>
                <img class="circleImg" :src="modeImg" alt="" />
                <div class="bottomTitleName">运行模式</div>
              </div>
              <div class="bottomBox bottomMode disabled">
                <div class="eachBox disabled" @click="clickMode(1)">
                  <img
                    style="vertical-align: middle; height: 1.25rem"
                    :src="modeLeftImg"
                    alt=""
                  />
                  <span class="modeText">制冷</span>
                </div>
                <div
                  class="eachBox disabled"
                  @click="clickMode(2)"
                  style="text-align: right"
                >
                  <img
                    style="vertical-align: middle; height: 1.25rem"
                    :src="modeMiddleImg"
                    alt=""
                  />
                  <span class="modeText">制热</span>
                </div>
              </div>
            </div>
            <!-- 出水温度 风冷热泵机组-->
            <div
              class="eachCircle"
              :class="{ width25: conditionType == '2004' }"
            >
              <div class="circleMain">
                <span class="fixTitle">
                  {{
                    statusData.waterTemp
                      ? String(statusData.waterTemp).substring(0, 2)
                      : '-'
                  }}
                  ℃</span
                >
                <img class="circleImg" :src="temImg" alt="" />
                <div class="bottomTitleName">出水温度</div>
              </div>
              <div class="bottomBox bottomTemp">
                <div
                  class="addClick"
                  @click="clickTemp(1)"
                  :class="{ disabled: !statusData.activeFlag }"
                >
                  -
                </div>
                <div
                  class="tempNum"
                  :class="{ disabled: !statusData.activeFlag }"
                >
                  {{
                    statusData.waterTemp
                      ? String(statusData.waterTemp).substring(0, 2)
                      : '-'
                  }}
                  ℃
                </div>
                <div
                  class="addClick"
                  @click="clickTemp(2)"
                  :class="{ disabled: !statusData.activeFlag }"
                >
                  +
                </div>
              </div>
            </div>
            <!-- 回差温度 风冷热泵机组-->
            <div
              class="eachCircle"
              :class="{ width25: conditionType == '2004' }"
            >
              <div class="circleMain">
                <span class="fixTitle">
                  {{
                    statusData.returnDiff
                      ? String(statusData.returnDiff).substring(0, 2)
                      : '-'
                  }}
                  ℃</span
                >
                <img class="circleImg" :src="temImg" alt="" />
                <div class="bottomTitleName">回差温度</div>
              </div>
              <div class="bottomBox bottomTemp">
                <div
                  class="addClick"
                  @click="clickTemp(3)"
                  :class="{ disabled: !statusData.activeFlag }"
                >
                  -
                </div>
                <div
                  class="tempNum"
                  :class="{ disabled: !statusData.activeFlag }"
                >
                  {{
                    statusData.returnDiff
                      ? String(statusData.returnDiff).substring(0, 2)
                      : '-'
                  }}
                  ℃
                </div>
                <div
                  class="addClick"
                  @click="clickTemp(4)"
                  :class="{ disabled: !statusData.activeFlag }"
                >
                  +
                </div>
              </div>
            </div>
          </div>
        </el-card>
        <!-- 负荷状态曲线 -->
        <el-card class="bottomLineBox">
          <div class="headerTitle">
            <span class="title-text">负荷状态</span>
            <el-date-picker
              v-model="curveDayTime"
              placeholder="请选择日期"
              type="date"
              :picker-options="pickerOptions"
              style="width: 9.375rem; float: right"
              value-format="yyyy-MM-dd"
              @change="handleDetail"
            />
          </div>
          <div class="lineChartBox">
            <!-- <realTimeLine
              :curveName="curveName"
              :lineOption="lineOption"
              :fontColor="fontColor"
            ></realTimeLine> -->
            <echarts-chart id="echart" height="100%" :option="lineOption" />
          </div>
        </el-card>
      </div>
      <!-- 控制日志 -->
      <el-card class="rightContent" v-if="showLines">
        <div class="headerTitle">
          <span class="title-text">控制日志</span>
          <el-date-picker
            v-model="dateRange"
            placeholder="选择开始和结束时间"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 14rem !important; float: right"
            @change="handleRightLog"
          />
        </div>
        <div class="logInfor block" v-if="timelineData.length != 0">
          <el-timeline>
            <el-timeline-item
              v-for="(item, index) in timelineData"
              :key="index"
              :color="item.isSuccess == '成功' ? '#0f0' : '#999'"
              :size="item.size"
              :timestamp="item.dayTime"
              placement="top"
            >
              <el-card class="timelineBox">
                <div class="flex_row_s" style="padding: 10px">
                  <div>操作内容</div>
                  <div>
                    {{ item.ctrlType }}&nbsp;&nbsp;&nbsp;&nbsp;{{
                      item.ctrlParam
                    }}
                  </div>
                  <div
                    class="error"
                    :class="{ success: item.isSuccess == '成功' }"
                  >
                    <!-- <div>{{ item.operator }}</div> -->
                    {{ item.isSuccess == '成功' ? '成功' : '失败' }}
                  </div>
                </div></el-card
              >
            </el-timeline-item>
          </el-timeline>
        </div>
        <transition name="fade-transform" mode="out-in" v-else>
          <div class="logInfor" style="display: flex; justify-content: center">
            <img
              width="40%"
              src="../../../assets/remote-control/noWord.png"
              alt=""
              style="margin: auto"
            />
          </div>
        </transition>
      </el-card>
    </div>
  </div>
</template>

<script>
// import { enterTree } from '@/api/dr/run';
// import { agreementUrl } from '@/api/auxiliary/agreement';
import HttpUrl from '@/api/remote-control/single-control';
import customTable from '@/components/ElementTable/index_d.vue';
import customDialog from '@/components/ElementDialog/index.vue';
import echartsChart from '@/components/EchartsChart/index.vue';
import { DateUtil } from '@/utils/date-util';

// import realTimeLine from '../components/realTimeLine.vue';

export default {
  name: 'agreement',
  components: {
    customTable,
    customDialog,
    echartsChart,
    // realTimeLine,
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      topBaseData: [
        { name: '设备名称', prop: 'name', value: '-' },
        { name: '设备类型', prop: 'typeName', value: '-' },
        { name: '额定功率(kW)', prop: 'ratedPower', value: '-' },
        { name: '设备容量(kW)', prop: 'capacity', value: '-' },
      ], //基本参数
      topSportData: [], //运行参数
      statusData: {
        tempNum: 25, //设备状态温度(25℃)
        activeFlag: false, //设备状态运行状态(关)
        modeFlag: 1, //设备状态模式(制冷)
        equipId: this.$route.query.equipId,
      },
      conditionType: '',
      activeFlagText: '关', //设备状态运行状态(关)
      modeText: '制冷',
      temImg: require('../../../assets/remote-control/组 392.png'),
      activeImg: require('../../../assets/remote-control/close.png'),
      modeImg: require('../../../assets/remote-control/组 392.png'),
      modeLeftImg: require('../../../assets/remote-control/组 388.png'),
      modeMiddleImg: require('../../../assets/remote-control/矩形 4632.png'),
      lineOption: {}, //状态曲线
      dayTime: new Date(),
      dateRange: [],
      curveDayTime: new Date(),
      timelineData: [], //日志数据
      confirmFlag: true,
      showLines: true,
      showLoading: false,
      password: '',
      curveName: '',
      // 分体式空调
      airEquipInfo: [
        { name: '实时功率(kW)', prop: 'loadValue', value: '-' },
        { name: '当前设定模式', prop: 'nowSetMod', value: '-' },
        { name: '当前开关状态', prop: 'nowSetState', value: '-' },
        { name: '当前设定温度', prop: 'nowSetTemp', value: '-' },
        { name: '环境温度(℃)', prop: 'roomTemp', value: '-' },
        { name: '运行时间', prop: 'runTime', value: '-' },
      ],
      // VRV空调运行参数
      vrvInfo: [
        { name: '实时功率(kW)', prop: 'loadValue', value: '-' },
        { name: '当前设定模式', prop: 'nowSetMod', value: '-' },
        { name: '当前开关状态', prop: 'nowSetState', value: '-' },
        { name: '当前设定温度', prop: 'nowSetTemp', value: '-' },
        { name: '环境温度(℃)', prop: 'roomTemp', value: '-' },
        { name: '运行时间', prop: 'runTime', value: '-' },
      ],
      // 水冷机组运行参数
      waterEquipInfo: [
        { name: '冷凝器出水温度(℃)', prop: 'intoColdTemp', value: '-' },
        { name: '蒸发器出水温度(℃)', prop: 'intoHotTemp', value: '-' },
        { name: '实时功率(kW)', prop: 'loadValue', value: '-' },
        { name: '当前设定限制负载率(%)', prop: 'nowSetLimitRate', value: '-' },
        { name: '当前开关状态', prop: 'nowSetState', value: '-' },
        { name: '当前设定出水温度', prop: 'nowSetWaterTemp', value: '-' },
        { name: '冷凝器进水温度(℃)', prop: 'outColdTemp', value: '-' },
        { name: '蒸发器进水温度(℃)', prop: 'outHotTemp', value: '-' },
        { name: '环境温度(℃)', prop: 'roomTemp', value: '-' },
        { name: '运行时间', prop: 'runTime', value: '-' },
      ],
      // 风冷热泵运行参数
      windEquipInfo: [
        { name: '制冷设定温度下限(℃)', prop: 'downSetColdTemp', value: '-' },
        { name: '制热设定温度下限(℃)', prop: 'downSetHotTemp', value: '-' },
        { name: '实时功率(kW)', prop: 'loadValue', value: '-' },
        { name: '当前设定回差温度(℃)', prop: 'nowSetDiffTemp', value: '-' },
        { name: '当前设定模式', prop: 'nowSetMod', value: '-' },
        { name: '当前开关状态', prop: 'nowSetState', value: '-' },
        { name: '当前设定出水温度(℃)', prop: 'nowSetWaterTemp', value: '-' },
        { name: '环境温度(℃)', prop: 'roomTemp', value: '-' },
        { name: '运行时间', prop: 'runTime', value: '-' },
        { name: '制冷设定温度上限(℃)', prop: 'upSetColdTemp', value: '-' },
        { name: '制热设定温度上限(℃)', prop: 'upSetHotTemp', value: '-' },
      ],
    };
  },

  watch: {
    statusData: {
      handler(newV) {
        if (this.statusData.modeFlag == 1) {
          this.modeLeftImg = require('../../../assets/remote-control/组 388.png');
          this.modeMiddleImg = require('../../../assets/remote-control/矩形 4632.png');
          this.modeImg = require('../../../assets/remote-control/组 392.png');
          this.modeText = '制冷';
        } else if (this.statusData.modeFlag == 2) {
          this.modeLeftImg = require('../../../assets/remote-control/矩形 4632.png');
          this.modeMiddleImg = require('../../../assets/remote-control/组 388.png');
          this.modeImg = require('../../../assets/remote-control/组 401.png');
          this.modeText = '制热';
        }
        if (this.statusData.modeFlag == 1 && this.statusData.activeFlag) {
          this.activeImg = require('../../../assets/remote-control/cold.png');
        } else if (
          this.statusData.modeFlag == 2 &&
          this.statusData.activeFlag
        ) {
          this.activeImg = require('../../../assets/remote-control/hot.png');
        } else {
          this.activeImg = require('../../../assets/remote-control/close.png');
        }
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    window.addEventListener('setItem', () => {
      this.handleDetail(); //负荷状态曲线
    });
    this.getData();
    // setInterval(() => {
    //   this.getData();
    // }, 60000); //一分钟定时
  },
  methods: {
    getData() {
      this.handleTopInfor(); //基本参数
      this.handleDetail(); //负荷状态曲线
      this.handleRightLog(); //控制日志
    },
    // 基本参数
    handleTopInfor() {
      this.showLines = false;
      this.showLoading = true;
      HttpUrl.queryAirEquipRunParam({ param: this.statusData.equipId }).then(
        res => {
          if (res.code == 200) {
            this.showLoading = false;
            for (const i in this.topBaseData) {
              this.topBaseData[i].value =
                res.data.baseInfo[this.topBaseData[i].prop] ?? '-';
            }
            // this.topSportData = res.data.runParams;
            let kongtiaoArray =
              res.data.baseInfo.type == 2001
                ? this.airEquipInfo
                : res.data.baseInfo.type == 2002
                ? this.vrvInfo
                : res.data.baseInfo.type == 2003
                ? this.waterEquipInfo
                : this.windEquipInfo;
            this.topSportData = kongtiaoArray.map(val => {
              val.value =
                res.data[res.data.baseInfo.runParams][val.prop] ?? '-';
              return val;
            });

            this.statusData = res.data.commandResp;
            this.conditionType = res.data.baseInfo.type;
            this.statusData.tempNum = this.statusData.tempNum ?? 16;
            this.statusData.limitRate = this.statusData.limitRate ?? 0;
            this.statusData.coolWaterTemp = this.statusData.coolWaterTemp ?? 16;
            if (!this.statusData.modeFlag) {
              this.statusData.modeFlag = 1;
            }
            this.showLines = true;
            this.curveName =
              this.conditionType == '2004' ? '出水温度' : '设定温度';
          }
        }
      );
    },
    // 设备状态控制确认
    handleStatus() {
      this.$confirm('确定下发吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        HttpUrl.sendAirCtrl(this.statusData).then(res => {
          if (res.data == true) {
            this.$message.success('下发成功');
            this.confirmFlag = true;
            setTimeout(() => {
              this.getData();
            }, 1000);
          } else {
            this.$message.error(res.msg);
          }
        });
      });
    },

    /** 负荷状态曲线 */
    handleDetail() {
      // 详情信息曲线
      HttpUrl.queryAirEquipCurve({
        id: this.statusData.equipId,
        dayTime: this.getYearMonthDay(this.curveDayTime),
      }).then(res => {
        if (res.code == 200) {
          this.lineOption = this.getOption(res.data, this.curveName);
        }
      });
    },
    getOption(data, curveName) {
      data.times.push('24:00');
      return {
        color: ['#53C429', '#F59B1B', '#FFD21E', '#823FDE'],
        tooltip: {
          trigger: 'axis',
          color: this.fontColor,
          backgroundColor: 'rgba(0,0,0,0.6)',
          borderColor: 'gray',
          textStyle: {
            color: this.fontColor,
          },
          formatter: function (params) {
            var relVal = params[0].axisValueLabel;
            for (var i = 0, l = params.length; i < l; i++) {
              if (typeof params[i].value === 'undefined') {
                params[i].value = ' ';
              }
              if (
                params[i].seriesName == '出水温度' ||
                params[i].seriesName == '设定温度'
              ) {
                relVal +=
                  '<br/>' +
                  params[i].marker +
                  params[i].seriesName +
                  ' : ' +
                  params[i].value +
                  '(℃)';
              } else {
                relVal +=
                  '<br/>' +
                  params[i].marker +
                  params[i].seriesName +
                  ' : ' +
                  params[i].value +
                  '(kW)';
              }
            }
            return relVal;
          },
        },
        grid: {
          left: '4%',
          right: '4%',
          bottom: '10px',
          top: '15%',
          containLabel: true,
        },
        legend: {
          right: 'center',
          icon: 'circle',
          padding: [20, 0, 0, 0],
          textStyle: {
            color: this.fontColor,
            fontSize: this.echartFontSize(12),
          },
          data: [
            '负荷',
            this.conditionType == '2004' ? '出水温度' : '设定温度',
          ],
        },
        xAxis: {
          type: 'category',

          data: data.times,
          splitLine: {
            show: false,
            lineStyle: {
              opacity: 0.4,
              color: this.fontColor,
            },
          },
          axisLabel: {
            interval: 23,
            textStyle: {
              color: this.fontColor,
              fontSize: this.echartFontSize(12),
            },
          },
          nameTextStyle: {
            color: this.fontColor,
            fontSize: this.echartFontSize(12),
          },
        },
        yAxis: [
          {
            type: 'value',
            name: '单位:\t\tkW',
            splitLine: {
              show: false,
              lineStyle: {
                opacity: 0.4,
                color: this.fontColor,
              },
            },
            axisLabel: {
              formatter: '{value} \tkW',
              textStyle: {
                color: this.fontColor,
                fontSize: this.echartFontSize(12),
              },
            },
            nameTextStyle: {
              color: this.fontColor,
              fontSize: this.echartFontSize(12),
            },
          },
          {
            type: 'value',
            name: '温度:\t\t℃',
            splitLine: {
              show: false,
              lineStyle: {
                opacity: 0.4,
                color: this.fontColor,
              },
            },
            axisLabel: {
              formatter: '{value} \t℃',
              textStyle: {
                color: this.fontColor,
                fontSize: this.echartFontSize(12),
              },
            },
            nameTextStyle: {
              color: this.fontColor,
              fontSize: this.echartFontSize(12),
            },
          },
        ],
        dataZoom: {
          type: 'inside',
        },
        series: [
          {
            name: '负荷',
            type: 'line',
            smooth: 0.5,
            symbol: null,
            symbolSize: 0,
            data: data.loadValP,
            areaStyle: {
              opacity: 0.4,
            },
            connectNulls: true,
          },
          {
            name: this.conditionType == '2004' ? '出水温度' : '设定温度',
            type: 'line',
            smooth: 0.5,
            symbol: null,
            symbolSize: 0,
            data: data.setTemps,
            yAxisIndex: 1,
            areaStyle: {
              opacity: 0.4,
            },
            connectNulls: true,
          },
        ],
      };
    },
    // 控制日志
    handleRightLog() {
      if (this.dateRange == null) {
        this.dateRange = [];
      }
      HttpUrl.queryAirCtrlLog({
        id: this.statusData.equipId,
        startDay: this.dateRange[0]
          ? this.getYearMonthDay(this.dateRange[0])
          : '',
        endDay: this.dateRange[1]
          ? this.getYearMonthDay(this.dateRange[1])
          : '',
      }).then(res => {
        this.timelineData = res.data;
      });
    },
    // 模式设定
    clickMode(e) {
      if (this.conditionType == 2001 || this.conditionType == 2002) {
        if (this.statusData.activeFlag) {
          this.statusData.modeFlag = e;
          this.confirmFlag = false;
        }
      }
    },
    // 温度设定
    clickTemp(e) {
      if (this.conditionType == 2001 || this.conditionType == 2002) {
        if (this.statusData.activeFlag) {
          this.confirmFlag = false;
          if (e == 2) {
            if (this.statusData.tempNum < 32) {
              this.statusData.tempNum++;
            }
          } else {
            if (this.statusData.tempNum > 16) {
              this.statusData.tempNum--;
            }
          }
        }
      }
      if (this.conditionType == 2004) {
        if (this.statusData.activeFlag) {
          this.confirmFlag = false;
          if (e == 1) {
            this.statusData.waterTemp--;
          } else if (e == 2) {
            this.statusData.waterTemp++;
          } else if (e == 3) {
            if (this.statusData.returnDiff > 2) {
              this.statusData.returnDiff--;
            }
          } else if (e == 4) {
            if (this.statusData.returnDiff < 5) {
              this.statusData.returnDiff++;
            }
          }
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.headerTitle {
  margin-bottom: 10px;
}
.app-container {
  .header {
    line-height: 1.75rem;
    margin-bottom: 5px;
    .icon-label-class {
      width: 2rem;
      height: 1rem;
      margin-right: 10px;
    }
  }
  .header-container {
    // height: 10rem;
    .topOne,
    .topTwo {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 0.625rem;
      align-content: center;
      .itemInfo {
        width: 25%;
        height: 1.875rem;
        line-height: 1.875rem;
        padding-left: 2.5rem;
        font-size: 1rem;

        .itemTitle {
          display: inline-block;
        }
      }
    }
    ::-webkit-scrollbar {
      width: 0px;
    }
  }
  .bottom-container {
    width: 100%;
    height: calc(100% - 14.5rem);
    display: flex;
    .leftContent {
      width: 50%;
      margin-right: 10px;
      display: flex;
      flex-direction: column;
      .topThreeBox,
      .bottomLineBox {
        width: 100%;
        height: 50%;
        overflow: hidden;
        .threeCircles,
        .lineChartBox {
          width: 100%;
          height: calc(100% - 2.375rem);
          display: flex;
          justify-content: space-between;
          overflow: hidden;
          .eachCircle {
            width: 30%;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;

            .circleMain {
              width: 100%;
              height: 70%;
              text-align: center;
              // padding-top: 115px;
              padding-right: 4px;
              margin-bottom: 0.8rem;
              position: relative;
              .fixTitle {
                position: absolute;

                top: 53%;
                left: 44%;
              }
              .circleImg {
                height: 100%;
                margin: 0 auto;
                transition: 0.1s;
                user-select: none;
              }
              .bottomTitleName {
                width: 100%;
                position: absolute;
                bottom: 10px;
                text-align: center;
                font-size: 0.75rem;
              }
            }
            .bottomBox {
              width: 15rem;
              height: 2.5rem;
              line-height: 2.5rem;
            }
            .bottomTemp {
              width: 80%;
              background: url('../../../assets/remote-control/组\ 399.png')
                no-repeat;
              background-size: 100% 100%;
              display: flex;
              justify-content: space-between;
              padding: 0.3125rem 0.625rem;
              div {
                line-height: 1.875rem;
                text-align: center;
              }
              .addClick {
                height: 1.875rem;
                width: 1.875rem;
                background: url('../../../assets/remote-control/矩形 4564.png')
                  no-repeat;
                background-size: 100% 100%;
                cursor: pointer;
              }
              .tempNum {
                width: calc(100% - 3.75rem);
              }
            }
            .bottomTab {
              width: 80%;
              background: url('../../../assets/remote-control/矩形\ 4571.png')
                no-repeat;
              background-size: 95% 100%;
              padding: 4px;
              cursor: pointer;
              .changeBtn {
                width: 50%;
                height: 100%;
                background: url('../../../assets/remote-control/矩形\ 4572.png')
                  no-repeat;
                background-size: 100% 100%;

                transition: 0.3s;
                text-align: center;
                line-height: 2.1rem;
              }
              .marginleft44 {
                margin-left: 44%;
              }
            }
            .bottomMode {
              display: flex;
              justify-content: space-between;
              padding: 0.3rem 2.5rem;
              .eachBox {
                width: 100%;
                cursor: pointer;
                .modeText {
                  font-size: 0.75rem;
                  display: inline-block;
                  height: 1.56rem;
                  margin-left: 5px;
                  position: relative;
                  top: 1px;
                }
              }
            }
          }
        }
      }
    }
    .rightContent {
      width: 50%;
      .logInfor {
        width: 100%;
        height: calc(100% - 38px);
        overflow-y: scroll;
        .error {
          font-size: 1.1rem;
          font-weight: bold;
          color: #fa0303;
        }
        .success {
          color: #0f0;
        }
      }
    }
  }
}
.timelineBox {
  background-color: rgba(0, 0, 0, 0.1) !important;
  box-shadow: 2.4px 2.1px 17.3px -55px rgba(0, 0, 0, 0.017),
    6.1px 5.4px 29.5px -55px rgba(0, 0, 0, 0.023),
    11.9px 10.5px 37.5px -55px rgba(0, 0, 0, 0.027),
    21.8px 19.2px 42.9px -55px rgba(0, 0, 0, 0.033),
    41.6px 36.6px 49.6px -55px rgba(0, 0, 0, 0.043),
    100px 88px 80px -55px rgba(0, 0, 0, 0.07);
}
.disabled {
  cursor: not-allowed !important;
}
.width25 {
  width: 25% !important;
}
.width60 {
  width: 60% !important;
}
::v-deep .el-card__body::-webkit-scrollbar {
  width: 5px !important;
  border-radius: 50%;
}

::v-deep .el-card .el-card__header {
  padding: 10px;
}
::v-deep .el-card__body {
  padding: 10px;
  height: 100%;
  // overflow-y: scroll;
}
::v-deep .el-table__body-wrapper {
  height: 300px !important;
}
::v-deep .el-table--medium td,
.el-table--medium th {
  padding: 4px 0 !important;
}
::v-deep .el-timeline {
  padding-left: 1rem;
}
::v-deep .el-timeline-item__wrapper {
  margin-bottom: 15px;
}
::v-deep .el-timeline-item__timestamp {
  margin-bottom: 10px;
}
</style>
