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
        :rules="rules"
      >
        <el-form-item label="用户密码:" prop="newPassword">
          <el-input
            show-password
            v-model="editorDataCopy.newPassword"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" prop="confirmPassword">
          <el-input
            show-password
            v-model="editorDataCopy.confirmPassword"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
  </element-dialog>
</template>

<script>
import ElementDialog from '@/components/ElementDialog/index';
import { AesUtil } from '@/utils/aes-util';
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
      rules: {
        newPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 8,
            max: 24,
            message: '密码长度不能小于8位或过长',
            trigger: 'blur',
          },
          { validator: this.validatePasswordStrength, trigger: 'blur' },
        ],
        confirmPassword: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          {
            min: 8,
            max: 24,
            message: '密码长度不能小于8位或过长',
            trigger: 'blur',
          },
          { validator: this.validateConfirmPassword, trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    validatePasswordStrength(rule, value, callback) {
      // 密码强度正则表达式：至少包含一个数字、一个字母和一个特殊字符
      const passwordStrengthRegex =
        /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*.])[a-zA-Z0-9!@#$%^&*.]{8,}$/;

      if (!passwordStrengthRegex.test(value)) {
        callback(new Error('密码必须包含至少一个数字、一个字母和一个特殊字符'));
      } else {
        callback();
      }
    },
    validateConfirmPassword(rule, value, callback) {
      if (value === this.editorDataCopy.newPassword) {
        callback();
      } else {
        callback(new Error('两次输入的密码不一致'));
      }
    },
    open(data) {
      this.showDialog = true;
      this.editorDataCopy = JSON.parse(JSON.stringify(data));
    },
    async handleConfirm() {
      if (
        !this.editorDataCopy.confirmPassword ||
        !this.editorDataCopy.newPassword ||
        this.editorDataCopy.confirmPassword !== this.editorDataCopy.newPassword
      ) {
        this.$message.warning('密码不为空或者密码不一致');
        return;
      }
      this.showDialog = false;
      const res = await API.ChangePassword({
        id: this.editorDataCopy.id,
        password: AesUtil.encryptPassword(this.editorDataCopy.newPassword),
      });
      this.$message.success(res.message);
      this.$emit('submit', this.editorDataCopy);
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
