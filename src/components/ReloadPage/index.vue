<template>
  <div>
    <svg-icon class-name="reload-icon" icon-class="reload" @click="click" />
  </div>
</template>

<script>
  export default {
    name: "ReloadPage",
    inject:['reload'],
    data() {
      return {

      }
    },
    methods: {
      click() {
        this.reload()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/styles/css-theme/handle.scss";

  .reload-icon {
    position: relative;
    cursor: pointer;
    font-size: 21px;
    vertical-align: middle;
    @include font_color('primary_titleColor')
  }


</style>