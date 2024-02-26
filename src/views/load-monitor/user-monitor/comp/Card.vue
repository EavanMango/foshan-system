<template>
  <div
    class="eachCard flex_row_a border-radius-10 pointer text-color"
    @click="config.clickHandler"
  >
    <img
      style="height: 50%; margin: 0 15px"
      :src="config.imgSrc"
      :key="config.title"
    />
    <section class="flex-1 text-color flex" style="line-height: 20px">
      <div class="font-size-14">{{ config.title }}</div>
      <div class="font-size-18 font-weight-bold flex-1 text-center">
        {{ KeepDecimal(config.value) }}
      </div>
      <div class="font-size-14 line-height-20" style="margin-right: 5px">
        {{ config.unit }}
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
          title: '实时负荷',
          value: '232.10',
          unit: 'kw',
          clickHandler: () => {},
        };
      },
    },
  },
  methods: {
    KeepDecimal(v) {
      if (v == null || v == '-') return '-';
      let d = v * 100;
      return Math.round(+d.toFixed(2)) / 100;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/css-theme/handle.scss';
.eachCard {
  width: 23%;
  height: 100%;
  border: 1px solid #ccc;
  @include background_color('layout_menu_submenu_item_bg');
}
.line-height-20 {
  line-height: 20px;
}
</style>
