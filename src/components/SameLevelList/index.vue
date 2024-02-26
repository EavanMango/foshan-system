<template>
  <div class="levelList">
    <div
      v-if="isImgShow"
      v-for="item in levelList"
      :key="item.id"
      :class="String(item.id) === curActive ? 'active' : 'noActive'"
      class="levelItemImg flex_row_c"
      @click="handleListImg(item)"
    >
      <div>
        <img src="../../assets/images/dry-transformer.png" alt="" />
        <div class="name flex_row_c">{{ item.cnName }}</div>
      </div>
    </div>

    <div v-if="!isImgShow" v-for="item in levelList" :key="item.id">
      <el-checkbox-group
        v-model="checkedValue"
        @change="statusChange(item.id)"
        class="levelItem"
        :class="String(item.id) === curActive ? 'active' : 'noActive'"
      >
        <el-checkbox :key="item.id" :label="item.id" :name="item.cnName">
          <div :class="String(item.id) === curActive ? 'active' : 'noActive'">
            {{ item.cnName }}
          </div>
        </el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "saveLevel",
  data() {
    return {
      curActive: 0,
      checkedValue: [],
    };
  },
  model: {
    prop: "modelValue",
    event: "change",
  },
  props: {
    levelList: {
      type: Array,
      default: () => [],
    },
    modelValue: {
      type: [Number, String],
    },
    isImgShow: {
      type: Boolean,
      default: false,
    },
    isIconShow: {
      type: Boolean,
      default: true,
    },
    /** 是否单选（默认单选） */
    singleChoose: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    "$store.getters.deviceList": {
      handler(newValue) {
        if (newValue && newValue.length) {
          this.checkedValue = [newValue[0].id];
        } else {
          this.checkedValue = [];
        }
      },
      immediate: true,
    },
    modelValue: {
      handler(newValue) {
        this.curActive = String(newValue);
      },
      immediate: true,
    },
    isImgShow: {
      handler(newValue) {
        if (newValue === true) {
          return;
        }
      },
    },
  },
  methods: {
    handleListImg(item) {
      this.$emit("changeImg", item.id);
    },
    statusChange(item) {
      if (this.singleChoose === true && this.checkedValue.length > 1) {
        this.checkedValue.splice(0, 1);
      }
      this.$emit("change", item);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/css-theme/handle.scss";

.levelList {
  height: calc(100vh - 14rem) !important;
  width: 100%;
  overflow: auto;

  .levelItem {
    padding: 10px 10px;
    box-sizing: border-box;
    cursor: pointer;
  }

  ::v-deep .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #ffffff;
  }

  .levelItemImg {
    padding: 10px 18px;
    box-sizing: border-box;
    cursor: pointer;
  }

  .active {
    border-radius: 1px;
    @include font_color("tree_font");
    @include background_color("tree_bg");
  }

  .noActive {
    @include font_color("primary_titleColor");
  }

  .noActive {
    &:hover {
      @include font_color("primary_titleColor");
      @include background_color("tree_bg_hover");
    }
  }
}
</style>