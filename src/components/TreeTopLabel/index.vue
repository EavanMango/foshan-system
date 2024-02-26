<template>
  <div class="titleLabel">
    <div class="title">
      <slot name="topTitle"></slot>
    </div>
    <div class="input">
        <el-input
                v-bind="$attrs"
                v-on="$listeners"
                v-model="inValue"
                :placeholder="placeholder"
                :maxlength="maxlength"
                :max="max"
                :min="min"
                :disabled="disabled"
                :readonly="readonly"
                :clearable="clearable"
                class="search-input"
        >
          <el-button slot="append" icon="el-icon-search" class="iconBtn" @click="handleSearch"></el-button>
        </el-input>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HInput",
    model: {
      prop: "modelValue",
      event: "returnModel",
    },
    props: {
      modelValue: {
        type: String | Array | Object | Boolean | Number,
        default: ''
      },
      /** 输入框提示语 */
      placeholder: {
        type: String,
        default: "请输入"
      },
      /** 最大长度 */
      maxlength: {
        type: Number,
        default: 13
      },
      /** 最大值 */
      max: {
        type: Number,
        default: 1000,
        required: false
      },
      /** 最小值 */
      min: {
        type: Number,
        default: -1000,
        required: false
      },
      /** 是否禁用 */
      disabled: {
        type: Boolean,
        default: false
      },
      /** 是否只读 */
      readonly: {
        type: Boolean,
        default: false
      },
      /** 是否清空 */
      clearable: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      inValue: {
        get: function () {
          // 获取传入的v-model
          return this.modelValue;
        },
        set: function (newValue) {
          // 修改时同时修改v-model
          this.$emit("returnModel", newValue);
          return newValue;
        },
      },
    },
    methods: {
      handleSearch() {
        this.$emit('clickSearch')
      }
    },
  }
</script>
<style lang="scss" scoped>
  @import "~@/styles/css-theme/handle.scss";

  .titleLabel {
    .title {
      margin-bottom: 5px;
      @include font_color('primary_titleColor')
    }

    .input {
      .search-input {
        display: flex;
        justify-content: center;
        width: 95%;
        margin: 0 auto 10px;

        .el-input-group__append .el-button{
          display: inline-block;
          margin: -1px -28px;
        }
      }
    }

  }

</style>