<template>
  <el-popover trigger="click" placement="left" :width="200">
    <p style="margin: 10px">是否确定删除此条记录?</p>
    <div style="text-align: right; margin: 10px 10px">
      <el-button size="small" class="border-radius-6" @click="handleCancel()"
        >取消</el-button
      >
      <el-button
        size="small"
        type="primary"
        class="border-radius-6"
        @click="handleDel"
        >确定
      </el-button>
    </div>
    <template #reference>
      <el-button
        type="danger"
        :size="size"
        title="删除"
        icon="el-icon-delete"
        style="margin-right: 10px; margin-left: 10px"
        >删除</el-button
      >
    </template>
  </el-popover>
</template>
<script>
export default {
  props: {
    size: {
      type: String,
      default: 'mini',
    },
  },
  methods: {
    /** 取消 */
    handleCancel() {
      document.body.click();
    },
    handleDel() {
      this.handleCancel();
      this.$emit('handleDel');
    },
  },
};
</script>
