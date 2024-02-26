<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!-- 组件切换后不进行销毁 保存之前的状态 incluede会被缓存-->
      <!-- <keep-alive :include="cachedViews"> -->
      <router-view :key="key" />
      <!-- </keep-alive> -->
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  data() {
    return {};
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.path;
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import '~@/styles/css-theme/handle.scss';

.app-main {
  /* 50= navbar  50  */
  height: calc(100vh - 5rem);
  /*height: 100%;*/
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 0.3rem;
  padding-top: 3px;
  margin-bottom: 20px;
  box-sizing: border-box;
  @include background_color('right_container');
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    /*height: calc(100vh - 84px);*/
    height: 100%;
    overflow: hidden;
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 17px;
  }
}
</style>
