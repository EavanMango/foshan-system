<template>
  <div id="system-container" class="flex_row_s">
    <div
      class="left-layout border-radius-10"
      :class="isLeftBorder ? 'layout-border' : ''"
    >
      <slot name="left-layout"></slot>
    </div>
    <div
      class="right-layout border-radius-10"
      :class="isRightBorder ? 'layout-border' : ''"
    >
      <slot name="right-layout"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    isLeftBorder: {
      type: Boolean,
      default: false,
    },
    isRightBorder: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/css-theme/handle.scss';
#system-container {
  width: 100%;
  height: 100%;

  .left-layout {
    position: relative;
    height: 100%;
    width: 22rem;
    margin-right: 10px;
    box-sizing: border-box;
    // border-radius: 3px;
    padding: 10px;
    @include background_color('layout_bg');
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .right-layout {
    width: calc(100% - 22rem);
    height: 100%;
    box-sizing: border-box;
    // border-radius: 3px;
    @include background_color('layout_bg');
    overflow: hidden;
    /*overflow-x: hidden;*/
    /*overflow-y: auto;*/
  }

  .layout-border {
    border: 1px solid;
    @include border_color('layout_border');
  }
}
</style>
