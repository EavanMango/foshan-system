<template>
  <element-dialog
    :title="title"
    width="40%"
    v-model="showDialog"
    @submit="handleConfirm"
  >
    <div class="dialog-content">
      <el-form
        ref="form"
        size="small"
        :model="editorDataCopy"
        label-width="7.5rem"
        label-position="right"
      >
        <el-form-item label="角色名称:">
          <el-input
            v-model="editorDataCopy.cnName"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="用户角色:">
          <el-select
            v-model="editorDataCopy.level"
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option label="common" value="common"></el-option>
            <el-option label="admin" value="admin"></el-option>
          </el-select>
        </el-form-item> -->
      </el-form>
    </div>
  </element-dialog>
</template>

<script>
import ElementDialog from '@/components/ElementDialog/index';
import API from '@/api/permission';
export default {
  name: '',
  components: {
    ElementDialog,
  },
  props: {
    title: {
      type: String,
      default: '编辑',
    },
  },
  data() {
    return {
      editorDataCopy: {},
      showDialog: false,
    };
  },
  methods: {
    open(data) {
      this.showDialog = true;
      this.editorDataCopy = JSON.parse(JSON.stringify(data));
    },
    async handleConfirm() {
      await API.UpdateRole(this.editorDataCopy);
      this.$emit('submit', this.editorDataCopy);
      this.showDialog = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-content {
  width: 100%;
  height: 100%;
}
</style>
