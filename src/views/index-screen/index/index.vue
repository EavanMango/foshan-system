<!--
 * @Description  : 空调智慧管控平台
 * @Author       : 陈凯
 * @Date         : 2024-02-20 17:06:11
 * @LastEditors  : 陈凯
 * @LastEditTime : 2024-02-26 14:26:58
 * @FilePath     : \foushan-system\src\views\index-screen\index\index.vue
-->
<template>
  <div class="app-container screen-container" style="padding-top: 0">
    <div class="screenTitle">空调智慧管控平台</div>
    <div class="show-container relative">
      <transition name="left" :appear="true">
        <div class="content-left absolute">
          <leftContent></leftContent>
        </div>
      </transition>

      <div class="content-middle">
        <middleContent></middleContent>
      </div>
      <transition name="right" :appear="true">
        <div class="content-right absolute">
          <rightContent></rightContent>
        </div>
      </transition>
    </div>
    <div
      class="back pointer flex_row_c"
      @click="$router.push('/load-monitor/city-monitor')"
    >
      <i class="el-icon-d-arrow-left" style="transform: rotate(-90deg)"></i>
      <span> &nbsp;返回工作台</span>
    </div>
    <div class="fixDate">{{ newTime }}</div>
  </div>
</template>
<script>
import leftContent from '../components/left/index.vue';
import middleContent from '../components/middle/mapChart.vue';
import rightContent from '../components/right/index.vue';

export default {
  components: {
    leftContent,
    middleContent,
    rightContent,
  },
  data() {
    return {
      timer: null,
      newTime: '',
    };
  },
  mounted() {
    this.timer = setInterval(() => {
      this.getNowTime();
    }, 1000);
  },
  methods: {
    getNowTime() {
      let yy = new Date().getFullYear();
      let mm =
        new Date().getMonth() + 1 < 10
          ? 0 + new Date().getMonth() + 1
          : new Date().getMonth() + 1;
      let dd =
        new Date().getDate() < 10
          ? '0' + new Date().getDate()
          : new Date().getDate();
      let hh =
        new Date().getHours() < 10
          ? '0' + new Date().getHours()
          : new Date().getHours();
      let mf =
        new Date().getMinutes() < 10
          ? '0' + new Date().getMinutes()
          : new Date().getMinutes();
      let ss =
        new Date().getSeconds() < 10
          ? '0' + new Date().getSeconds()
          : new Date().getSeconds();

      this.newTime =
        yy + '年' + mm + '月' + dd + '日    ' + hh + ':' + mf + ':' + ss;
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>
<style lang="scss" scoped>
@import '@/styles/css-theme/handle.scss';

.screen-container {
  width: 100%;
  height: 100%;
  background: url('../../../assets/index-screen/bg.png') no-repeat;
  background-size: 100% 100%;
  color: #fff;

  .screenTitle {
    width: 100%;
    height: 3rem;
    background: url('../../../assets/index-screen/top.png') no-repeat;
    background-size: 100% 130%;
    background-position: 0px -4px;
    line-height: 3rem;
    text-align: center;
    font-family: 'ysbth';
    font-size: 2rem;
  }
  .show-container {
    width: 100%;
    height: calc(100% - 3rem);
    .content-left {
      width: 31%;
      height: 100%;
      z-index: 999;
      left: 0;
      top: 0;
    }

    .content-middle {
      width: 100%;
      height: 100%;
    }
    .content-right {
      width: 31%;
      height: 100%;
      right: 0;
      top: 0;
    }
  }
}

.left-enter,
.left-leave-to {
  transform: translateX(-35rem);
  opacity: 0;
}

.left-enter-to,
.left-leave-from {
  transform: translateX(0px);
  opacity: 1;
}

.left-enter-active,
.left-leave-active {
  transition: 2s;
}

.right-enter,
.right-leave-to {
  transform: translateX(35rem);
  opacity: 0;
}

.right-enter-to,
.right-leave-from {
  transform: translateX(0px);
  opacity: 1;
}

.right-enter-active,
.right-leave-active {
  transition: 2s;
}
.back {
  position: fixed;
  top: 0.2rem;
  left: 0.6rem;
  font-size: 0.6rem;
  font-weight: bold;
}
.fixDate {
  position: fixed;
  top: 0px;
  right: 0.6rem;
  font-size: 0.6rem;
  font-weight: bold;
}
</style>
