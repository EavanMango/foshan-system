<template>
  <div v-if="isShow">
    <el-dialog
      v-bind="$attrs"
      :title="title"
      :visible.sync="isShow"
      @close="handleCancel"
      :close-on-click-modal="false"
      append-to-body
      v-el-drag-dialog
      :custom-class="dialogClass"
      v-if="isShow"
    >
      <slot></slot>
      <div slot="footer" class="dialog-footer" v-if="showFooter">
        <el-button
          @click="handleCancel"
          class="commonBtn"
          v-if="!showCloseButton"
          >取消</el-button
        >
        <el-button
          @click="handleCancel"
          class="commonBtn"
          v-if="showCloseButton"
          >关闭</el-button
        >
        <el-button
          type="primary"
          @click="handleSubmit"
          :disabled="submitDisabled"
          v-if="!showCloseButton"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import elDragDialog from '@/utils/directive/el-dragDialog';

export default {
  name: 'HDialog',
  directives: {
    elDragDialog,
  },
  model: {
    prop: 'modelValue',
    event: 'change',
  },
  props: {
    // 弹窗的开启或关闭
    modelValue: {
      type: Boolean,
      default: false,
    },
    // 弹窗的标题
    title: {
      type: String,
      default: '',
    },
    // 弹窗className
    dialogClass: {
      type: String,
      default: '',
    },
    /** 是否显示底部 */
    showFooter: {
      type: Boolean,
      default: true,
    },
    // 底部是否展示关闭按钮
    showCloseButton: {
      type: Boolean,
      default: false,
    },
    // 点击是否有效
    submitDisabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isShow: this.modelValue,
    };
  },
  watch: {
    modelValue: {
      handler(newValue) {
        this.isShow = newValue;
      },
      deep: true,
      immediate: true,
    },
  },
  created() {},
  methods: {
    // 关闭弹窗
    handleCancel() {
      this.$emit('change', false);
      this.$emit('cancel');
    },
    /** 确定 */
    handleSubmit() {
      this.$emit('submit');
    },
  },
};
</script>
