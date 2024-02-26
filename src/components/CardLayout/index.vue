<template>
  <div id="base-card" >
    <div class="title">
      <slot name="header"></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CardLayout",
    data() {
      return {}
    },
    created() {
    },
    methods: {}
  }
</script>

<style scoped lang="scss">
  @import "~@/styles/css-theme/handle.scss";
  #base-card {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-radius: 3px;
    /*box-shadow: 0 10px 12px rgba(0,0,0,.1);*/
    @include box_shadow('shadowColor');

    .title {
      color: #ffffff;
      font-size: 1rem;
      padding: 5px 10px;
      box-sizing: border-box;
      position: relative;
      @include background_color('tabRadioColor')
    }

    .content {
      width: 100%;
      height: calc(100% - 30px);
      box-sizing: border-box;
      @include background_color('emphasizeColor');
/*      border: 1px solid;
      @include border_color('layout_border');*/
      padding: 10px 10px 5px;
    }
  }
</style>
