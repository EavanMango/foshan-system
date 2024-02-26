<template>
  <transition name="fade">
    <div v-show="modelValue" class="alarm-info">
      <div style="position: absolute; right: 5%">
        <i class="el-icon-close" @click="handleClose"></i>
      </div>
      <div v-for="detailItem in detailList" class="item">
        <div class="flex_row_l">
          <div class="icon">
            <i class="el-icon-warning"></i>
          </div>
          <div class="title">
            <div class="flex_row_l">
              <div class="text">新的报警信息</div>
              <div
                class="level flex_row_c margin-left-10"
                style="font-size: 0.8rem"
              >
                {{ detailItem.levelName }}
              </div>
            </div>
          </div>
        </div>
        <div class="content-info">
          <div>{{ detailItem.content }}</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "alarmSeriousCard",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    /** 返回数据 */
    newDataActualInfo: {
      type: Array,
      default: () => [],
    },
  },
  model: {
    prop: "modelValue",
    event: "change",
  },
  data() {
    return {
      detailList: [],
    };
  },
  watch: {
    newDataActualInfo: {
      handler(newValue) {
        if (newValue && newValue.length) {
          this.detailList = newValue;
          if (this.detailList && this.detailList.length > 10) {
            this.detailList.pop();
          }
        }
      },
      immediate: true,
    },
  },
  methods: {
    /** 关闭 */
    handleClose() {
      this.$emit("change", false);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/css-theme/handle.scss";

.el-icon-close {
  @include font_color("primary_titleColor");
}

.alarm-info {
  position: absolute;
  z-index: 2000;
  top: 30px;
  right: 13px;
  width: 340px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid;
  @include border_color("layout_border");
  box-sizing: border-box;
  @include background_color("emphasizeColor");
  height: 188px;
  overflow: auto;

  .item {
    margin-bottom: 6px;
    border-bottom: 1px dashed;
    @include border_color("layout_border");

    .icon {
      font-size: 1.2rem;
      width: 1.5rem;
      margin-top: 0.1rem;
      color: #3a71a8;
    }

    .title {
      height: 1.5rem;
      .text {
        @include font_color("primary_titleColor");
        font-size: 1rem;
        font-weight: bold;
      }
      .level {
        width: 3rem;
        height: 1.5rem;
        background-color: #ebb563;
        border-radius: 5px;
        color: #ffffff;
      }
    }
    .content-info {
      margin: 2px 15px 4px 25px;
      @include font_color("primary_titleColor");
    }
  }
}

.fade-enter-active {
  animation: fadeIn 1s;
}

.fade-leave-active {
  animation: fadeOut 1s;
}

@keyframes fadeIn {
  100% {
    transform: translateY(0);
  }
  0% {
    transform: translateY(100%);
    transition: all 1s ease;
  }
}
</style>