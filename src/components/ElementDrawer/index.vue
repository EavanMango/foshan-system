<template>
  <div v-if="isShow">
    <el-drawer
      v-bind="$attrs"
      :title="title"
      :direction="direction"
      :visible.sync="isShow"
      :before-close="handleClose"
      v-if="isShow"
      :append-to-body="true"
      :modal-append-to-body="false"
    >
      <slot></slot>
      <div slot="title" >
        <i class="el-icon-star-on"></i>
        <span class="margin-left-5">{{title}}</span>
      </div>
    </el-drawer>
  </div>
</template>

<script>
  export default {
    name: "",
    model: {
      prop: 'modelValue',
      event: 'open'
    },
    props: {
      modelValue: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ''
      },
      direction: {
        type: String,
        default: 'rtl'  // rtl / ltr / ttb / btt
      }
    },
    data() {
      return {
        isShow: this.modelValue
      }
    },
    watch: {
      modelValue: {
        handler(newValue) {
          this.isShow = newValue
        },
        deep: true,
        immediate: true
      }
    },
    methods: {
      handleClose() {
        this.$emit('open', false)

      }
    }
  }
</script>

<style lang="scss" scoped>
  ::v-deep .el-icon-star-on {
    font-size: 22px;
  }

</style>