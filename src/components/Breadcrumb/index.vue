<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <!-- <div class="title">{{$t('header.systemTitle')}}</div> -->
  </el-breadcrumb>
</template>

<script>
</script>

<style lang="scss" scoped>
@import "~@/styles/css-theme/handle.scss";
.app-breadcrumb {
  display: inline-block;
  line-height: 50px;
  margin-left: 8px;
  font-size: 1.12rem;
  @include font_color("tree_font");
}
</style>
