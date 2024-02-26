<template>
  <div class="w-h-100" style="padding: 0.3rem">
    <left-right-layout isLeftBorder>
      <template #left-layout>
        <div class="w-h-100 flex_dir_col">
          <div
            v-show="pageType === 'DEVICE'"
            class="flex padding-10 text-color text-title"
          >
            <div class="flex-1">设备监测</div>
            <div class="text-link" @click="handleReturn">返回上一级</div>
          </div>
          <div
            v-show="pageType === 'USER'"
            class="padding-10 text-color border-bottom text-title"
            style="border-bottom: 1px solid #ccc"
          >
            <div>用户监测</div>
            <el-select
              class="width100 margin-top-10"
              v-model.lazy="currentId"
              placeholder="请输入关键词"
              filterable
            >
              <el-option
                v-for="item in getConsByNameOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </div>
          <div class="padding" v-show="pageType === 'USER'">
            <el-radio-group
              v-model="queryParams.treeType"
              size="mini"
              @change="initData"
            >
              <el-radio-button :label="1">地市</el-radio-button>
              <el-radio-button :label="2">行业</el-radio-button>
            </el-radio-group>
          </div>

          <div class="padding-10 tree-wrapper">
            <element-tree
              ref="treeRef"
              node-key="id"
              :currentNodeKey="currentId"
              :renderContent="renderContent"
              :tree-data="treeData"
              :highlight-current="true"
              :default-expand-all="true"
              :defaultCheckedKeys="['5']"
              :default-props="{
                children: 'children',
                label: 'name',
                id: 'id',
              }"
              @nodeClick="handleNodeClick"
            >
              <template #tree="{ data }">{{ data }}</template>
            </element-tree>
          </div>
        </div>
      </template>
      <template #right-layout>
        <div class="w-h-100 flex_dir_col">
          <div
            class="text-color flex padding-10"
            style="font-szie: 15px; font-weight: 600"
          >
            {{ deviceName }}
          </div>
          <section
            class="width100 flex_row_s margin-bottom-10 padding-10 cardBox"
          >
            <Card
              v-for="config in cardList"
              :key="config.key"
              :config="config"
            ></Card>
          </section>

          <section
            class="flex padding-10"
            style="border-top: 1px solid #ccc; padding-top: 20px"
          >
            <div class="flex-1">
              <el-button
                icon="el-icon-refresh"
                size="mini"
                class="commonBtn"
                style="margin-right: 15px"
                @click="refreshData"
                >刷新</el-button
              >
              <el-radio-group v-model="isHistory" size="mini">
                <el-radio-button :label="true">历史</el-radio-button>
                <el-radio-button :label="false">实时</el-radio-button>
              </el-radio-group>
            </div>
            <el-date-picker
              v-if="isHistory"
              class="float-right"
              style="width: 9.375rem"
              :picker-options="pickerOptions"
              v-model="date"
              size="mini"
              value-format="yyyy-MM-dd"
              type="date"
              @change="getCurveData"
            />
            <el-date-picker
              v-if="!isHistory"
              class="float-right"
              v-model="dateRange"
              size="mini"
              type="datetimerange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="getCurveData"
            >
            </el-date-picker>
          </section>
          <section v-if="isHistory" class="padding-10 flex-1">
            <LineChart
              :muilYAxis="true"
              :xData="chartOption.xData"
              :data="chartOption.data"
            />
          </section>
          <section v-if="!isHistory" class="padding-10 flex-1">
            <LineChart
              :xData="realTimeChartOption.xData"
              :data="realTimeChartOption.data"
            />
          </section>
        </div>
      </template>
    </left-right-layout>
    <MeasChartModalVue ref="measChartModal" />
  </div>
</template>

<script>
import LeftRightLayout from '@/components/LeftRightLayout';
import TreeTopLabel from '@/components/TreeTopLabel';
import ElementTree from '@/components/ElementTree/index';
import MeasChartModalVue from './comp/MeasChartModal.vue';
import Card from './comp/Card.vue';
import LineChart from '../comp/LineChart.vue';
import * as Servce from './service';
import { DateUtil } from '@/utils/date-util';
import API from '@/api/load-monitor';
import HttpUrl from '@/api/file-management/equipmentFile';
import zu1 from '@/assets/load-monitor/组1.png';
import zu2 from '@/assets/load-monitor/组2.png';
import zu3 from '@/assets/load-monitor/组3.png';
import zu4 from '@/assets/load-monitor/组4.png';

const TYPELIST = ['USER', 'DEVICE'];
// 获取当前日期
let currentDate = new Date();
let year = currentDate.getFullYear();
let month = currentDate.getMonth(); // 月份从0开始，所以需要加1
let day = currentDate.getDate();
let tomorrowMidnight = new Date(year, month, day + 1, 0, 0, 0, 0);

export default {
  components: {
    LeftRightLayout,
    TreeTopLabel,
    ElementTree,
    Card,
    LineChart,
    MeasChartModalVue,
  },
  data() {
    return {
      queryParams: {
        searchText: '',
        treeType: 1,
      },
      deviceName: '设备名称-1 (28912801)',
      cardList: [],
      cardListMap: [],
      getConsByNameOptions: [],
      pageType: TYPELIST[0],
      isHistory: false,
      treeData: Servce.treeData,
      currentId: '5',
      date: new Date(),
      dateRange: [
        new Date(year, month, day, 0, 0, 0, 0),
        new Date(tomorrowMidnight.getTime() - 1),
      ],
      chartOption: {
        xData: [],
        data: [],
      },
      realTimeChartOption: {
        xData: [],
        data: [],
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
    };
  },
  async created() {
    await this.getConsByName();
    this.initData();
  },
  watch: {
    currentId(nv) {
      this.getCurveData();
      this.queryConsRunInfo();
    },
    isHistory() {
      this.getCurveData();
    },
    pageType: {
      handler(nv) {
        this.cardListMap = [
          {
            key: 'nowLoad',
            title: '实时负荷',
            value: '-',
            unit: 'KW',
            imgSrc: zu1,
            clickHandler: () => {
              console.log(111);
            },
          },
          {
            key: 'maxLoad',
            title: '最高负荷',
            value: '-',
            imgSrc: zu2,
            unit: 'KW',
            clickHandler: () => {},
          },
          {
            key: 'minLoad',
            title: '最低负荷',
            value: '-',
            unit: 'KW',
            imgSrc: zu3,
            clickHandler: () => {},
          },
          nv === 'USER'
            ? {
                key: 'equipNum',
                title: '设备数量',
                value: '-',
                unit: '台',
                imgSrc: zu4,
                clickHandler: this.viewDevice,
              }
            : {
                key: 'measNum',
                title: '测点数量',
                value: '-',
                unit: '个',
                imgSrc: zu4,
                clickHandler: this.jumpToCurve,
              },
        ];
      },
      immediate: true,
    },
  },
  methods: {
    async initData() {
      await this.queryConsTree();
    },
    handleNodeClick({ data, node }) {
      // if (!node.isLeaf) return;
      if (data.type == 3 || data.type == 4) {
        this.currentId = data.id;
      }
    },
    async queryConsTree() {
      const res = await API.queryConsTree({
        type: +this.queryParams.treeType,
      });
      if (res.code !== 200) return;
      this.treeData = res.data;
      this.currentId = this.getDataFirstChild(
        res.data.filter(d => d.children.length)
      );
    },
    getDataFirstChild(data) {
      if (!data || !data.length) return '';
      if (data[0] && !data[0].children.length) {
        return data[0].id;
      }
      return this.getDataFirstChild(data[0].children);
    },
    async queryUserTree() {
      const res = await API.queryEquipTree({
        param: this.currentId,
      });
      if (res.code !== 200) return;
      this.treeData = res.data;
      this.currentId = this.getDataFirstChild(
        res.data.filter(d => d.children.length)
      );
    },
    async queryConsRunInfo() {
      if (!this.currentId) return;
      const isUserPage = this.pageType == TYPELIST[0];
      const reqfn = isUserPage ? API.queryConsRunInfo : API.queryEquipRunInfo;
      const res = await reqfn({
        param: this.currentId || '',
      });
      if (res.code !== 200) return;
      const data = res.data;
      this.deviceName = isUserPage
        ? `${data.consName}(${data.consNo})`
        : `${data.equipName}(${data.equipNo})`;
      this.cardList = this.cardListMap.map(clm => {
        const key = clm.key;
        clm.value = data[key] ?? '-';
        return clm;
      });
    },
    async getCurveData() {
      if (this.isHistory) {
        this.getHistoryCurve();
      } else {
        this.getRealTimeCurve();
      }
    },
    async getHistoryCurve() {
      const res = await API.queryCurveP({
        date: DateUtil.transformData(this.date, 'YYYY-MM-DD'),
        sid: this.currentId || 10000000004,
      });
      if (res.code !== 200) return;
      this.chartOption.xData = res.data.times;
      this.chartOption.data = [
        { name: '今日负荷', data: res.data.todayValP, unit: 'kw' },
        { name: '昨日负荷', data: res.data.yesterdayValP, unit: 'kw' },
        { name: '负荷基线', data: res.data.baselineValP, unit: 'kw' },
      ];
    },
    async getRealTimeCurve() {
      let start;
      let end;
      if (this.dateRange) {
        start = DateUtil.transformData(this.dateRange[0]);
        end = DateUtil.transformData(this.dateRange[1]);
      }
      const res = await API.getMeasRtCurveValues({
        measId: +this.currentId || 160000000019,
        start,
        end,
      });
      if (res.code !== 200) return;
      this.realTimeChartOption.xData = res.data.timeTag;
      this.realTimeChartOption.data = [
        { name: '实时负荷', data: res.data.values, unit: 'kw' },
      ];
    },
    handleReturn() {
      this.pageType = TYPELIST[0];
      this.queryConsTree();
    },
    viewDevice() {
      this.pageType = TYPELIST[1];
      this.queryUserTree();
    },
    jumpToCurve() {
      this.$refs.measChartModal.open({
        currentId: this.currentId,
        date: DateUtil.transformData(this.date, 'YYYY-MM-DD'),
        deviceName: this.deviceName,
      });
    },
    refreshData() {
      this.getCurveData();
      this.queryConsRunInfo();
    },
    renderContent(h, { node, data, store }) {
      return (
        <div class="custom-tree-node">
          <div class="text-overflow" title={node.label}>
            {node.label}
          </div>
        </div>
      );
    },
    // 获取用户下拉
    async getConsByName(param) {
      const res = await HttpUrl.getConsByName({ param });
      this.getConsByNameOptions = res.data.map(d => {
        d.id = '' + d.id;
        return d;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/css-theme/handle.scss';
.text-title {
  margin-bottom: 5px;
  font-size: 15px;
  font-weight: 600;
}
.text-link {
  font-size: 12px;
  color: #2662ef;
  cursor: pointer;
}
.cardBox {
  height: 85px;
}
::v-deep .left-layout {
  padding: 0 !important;
}
.tree-wrapper {
  // background: #fbfbfb;
  height: calc(100% - 140px);
}
</style>
