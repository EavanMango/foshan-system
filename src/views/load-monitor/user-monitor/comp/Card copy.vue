<template>
  <div
    class="eachCard flex_row_a border-radius-10 pointer"
    @click="config.clickHandler"
  >
    <img
      class="margin-left-20 margin-right-20"
      style="height: 50%"
      :src="config.imgSrc"
      :key="config.title"
    />
    <section class="flex-1 text-color">
      <div class="font-size-12">{{ config.title }}</div>
      <div class="font-size-18 font-weight-bold">
        {{ config.value == '-' ? '-' : config.value.toFixed(2) }}
      </div>
    </section>
  </div>
</template>

<script>
import zu from '@/assets/load-monitor/组 25602@2.png';
export default {
  props: {
    config: {
      type: Object,
      default() {
        return {
          imgSrc: zu,
          title: '实时负荷 (kw)',
          value: '232.10',
          clickHandler: () => {},
        };
      },
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import '~@/styles/css-theme/handle.scss';
.eachCard {
  width: 22%;
  height: 100%;
  border: 1px solid #ccc;
  @include background_color('layout_menu_submenu_item_bg');
}
</style>
