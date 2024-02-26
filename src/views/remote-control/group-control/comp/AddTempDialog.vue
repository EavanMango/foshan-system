<template>
  <!-- 新增编辑弹窗 -->
  <element-dialog
    title="新增"
    width="30%"
    v-model="showDialog"
    @submit="handleSubmit"
  >
    <el-form ref="formRef" :model="formData" :rules="rules" label-width="140px">
      <el-form-item label="群组编码" prop="groupCode">
        <el-input v-model="formData.groupCode" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="群组名称" prop="groupName">
        <el-input v-model="formData.groupName" placeholder="请输入" />
      </el-form-item>
    </el-form>
  </element-dialog>
</template>

<script>
import elementDialog from '@/components/ElementDialog/index.vue';
import API from '@/api/remote-control/group-control';

export default {
  components: { elementDialog },
  data() {
    return {
      showDialog: false,
      formData: {
        groupCode: '',
        groupName: '',
      },
      rules: {
        groupCode: [{ required: true, message: '请输入', trigger: 'blur' }],
        groupName: [{ required: true, message: '请输入', trigger: 'blur' }],
      },
    };
  },
  methods: {
    open() {
      this.formData = {};
      this.showDialog = true;
    },
    async handleSubmit() {
      this.$refs['formRef'].validate(async valid => {
        if (valid) {
          await API.saveOrUpdateGroup(this.formData);
          this.$emit('submit');
          this.showDialog = false;
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style></style>
