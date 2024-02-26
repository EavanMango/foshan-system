<template>
  <div style="padding: 0 15px" @click="toggleClick" class="flex_row_l">
    <i v-if="isActive" class="el-icon-s-fold"></i>
    <i v-if="!isActive" class="el-icon-s-unfold"></i>
    <div class="topTitle">空调智慧管控平台</div>
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggleClick() {
      this.$emit('toggleClick');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/css-theme/handle.scss';
.topTitle {
  font-weight: lighter;
  line-height: 50px;
  font-size: 1.5rem;
  letter-spacing: 2px;
  font-family: 'ysbth';
  margin-left: 10px;
  @include font_color('primary_titleColor');
}
.el-icon-s-fold {
  cursor: pointer;
  font-size: 1.375rem;
  vertical-align: middle;
  @include font_color('primary_titleColor');
}

.el-icon-s-unfold {
  cursor: pointer;
  font-size: 22px;
  vertical-align: middle;
  @include font_color('primary_titleColor');
}

.topTitle {
  text-decoration: none;
  animation: topTitleShine 2s infinite; /*设置动画*/
}
@keyframes topTitleShine {
  /*创建动画*/
  0%,
  100% {
    color: #fff;
    text-shadow: 0 2px 10px #00f, 0 2px 10px #00f;
  }
  50% {
    text-shadow: 0 2px 10px #00f, 0 2px 60px #00f;
  }
}
</style>
