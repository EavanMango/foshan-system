<!--
 * @Description  : 右侧板块
 * @Author       : 陈凯
 * @Date         : 2024-02-23 11:06:32
 * @LastEditors  : 陈凯
 * @LastEditTime : 2024-02-26 15:32:37
 * @FilePath     : \foushan-system\src\views\index-screen\components\right\index.vue
-->

<template>
  <div class="w-h-100 flex_col_s padding-10 font-size-12">
    <!-- 设备状态 -->
    <div class="rightTopBox indexCardBox width100 h-30 margin-bottom-20">
      <div class="indexTitle">设备状态</div>
      <div class="indexContent flex_row_a">
        <div class="eachCircle h-100">
          <rightPie title="在线率" :circleValue="topData.equipOnlineRate" />
        </div>
        <div class="eachCircle h-100">
          <rightPie title="运行率" :circleValue="topData.equipRunRate" />
        </div>
        <div class="eachCircle h-100">
          <rightPie title="负载率" :circleValue="topData.equipLoadRate" />
        </div>
      </div>
    </div>
    <!-- 设备信息 -->
    <div class="rightMiddleBox indexCardBox width100 h-30 margin-bottom-20">
      <div class="indexTitle">设备信息</div>
      <div class="indexContent flex_col_s">
        <div class="smallTitle flex_row_c width100 h-10">
          <img
            style="height: 0.5rem"
            src="../../../../assets/index-screen/left-point.png"
            alt=""
          />
          <div
            class="margin-left-10 margin-right-10 font-size-12"
            style="color: #3eddfe"
          >
            设备规模
          </div>
          <img
            style="height: 0.5rem"
            src="../../../../assets/index-screen/right-point.png"
            alt=""
          />
        </div>
        <div class="width100 h-50 flex_row_a_a flex_wrap">
          <div
            class="fourEach flex_row_s"
            v-for="item in rightDeviceData"
            :key="item.name"
          >
            <span> {{ item.name }}</span>
            <span> {{ item.value }}&nbsp;&nbsp; {{ item.unit }}</span>
          </div>
        </div>
        <div class="smallTitle flex_row_c width100 h-10">
          <img
            style="height: 0.5rem"
            src="../../../../assets/index-screen/left-point.png"
            alt=""
          />
          <div
            class="margin-left-10 margin-right-10 font-size-12"
            style="color: #3eddfe"
          >
            预计明日可削减
          </div>
          <img
            style="height: 0.5rem"
            src="../../../../assets/index-screen/right-point.png"
            alt=""
          />
        </div>
        <div class="width100 h-30 flex_row_c">
          <div class="threeEachBox width90 h-80 flex_row_s">
            <div
              class="threeEach width30 h-100 flex_row_a"
              v-for="item in rightExpectedData"
              :key="item.name"
            >
              <img style="width: 20%" :src="item.img" alt="" />
              <div class="width80 text-align-center">
                <span>{{ item.name }}</span>
                <span>{{ item.value }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 事件日历 -->
    <div class="rightBottomBox indexCardBox width100 h-40">
      <div class="indexTitle">事件日历</div>
      <div class="indexContent flex_row_s">
        <div style="width: 65%" class="h-100">
          <ElementCalendar @handleDay="handleDayInfo"></ElementCalendar>
        </div>
        <div
          style="width: 35%; padding: 2.5rem 0 1.5rem 0.5rem"
          class="h-100 flex_col_s margin-right-10"
        >
          <div
            v-for="item in rightBottomData"
            :key="item.name"
            class="flex_row_s width100"
          >
            <div class="width60">{{ item.name }}</div>
            <div>{{ item.value }}&nbsp;{{ item.unit }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echartsChart from '@/components/EchartsChart/index.vue';
import rightPie from './rightCom/circlePie.vue';
import ElementCalendar from './rightCom/ElementCalendar.vue';

export default {
  components: {
    echartsChart,
    rightPie,
    ElementCalendar,
  },
  data() {
    return {
      topData: {
        equipOnlineRate: '30.86',
        equipRunRate: '76.86',
        equipLoadRate: '29.86',
      },
      rightDeviceData: [
        {
          name: '分体式空调(2P以下)',
          value: '78',
          unit: '台',
        },
        {
          name: '分体式空调(2P以上)',
          value: '78',
          unit: '台',
        },
        {
          name: '中央水冷空调',
          value: '78',
          unit: '台',
        },
        {
          name: 'VRV多联机',
          value: '78',
          unit: '台',
        },
      ],
      rightExpectedData: [
        {
          name: '早峰（万kW）',
          value: '1.53',
          img: require('../../../../assets/index-screen/morning.png'),
        },
        {
          name: '腰荷（万kW）',
          value: '3.87',
          img: require('../../../../assets/index-screen/sun.png'),
        },
        {
          name: '晚峰（万kW）',
          value: '2.32',
          img: require('../../../../assets/index-screen/moon.png'),
        },
      ],
      rightBottomData: [
        {
          name: '平均预测偏差率',
          value: '-',
          unit: '%',
        },
        {
          name: '参与客户',
          value: '-',
          unit: '户',
        },
        {
          name: '申报量',
          value: '-',
          unit: '万kWh',
        },
        {
          name: '成功调节量',
          value: '-',
          unit: '万kWh',
        },
      ],
    };
  },
  mounted() {},
  methods: {
    handleDayInfo(obj, val) {},
  },
};
</script>
<style lang="scss" scoped>
.rightTopBox {
  .eachCircle {
    width: 32%;
  }
}
.rightMiddleBox {
  .fourEach {
    width: 40%;
    height: 35%;
    background-color: #195892;
    box-shadow: 3px 3px 5px #195892;
    padding: 0 0.6rem;
    font-size: 0.7rem;
  }
  .threeEachBox {
    background-color: #195892;
    box-shadow: 3px 3px 5px #195892;
    padding: 0 0.5rem;
  }
}
</style>
