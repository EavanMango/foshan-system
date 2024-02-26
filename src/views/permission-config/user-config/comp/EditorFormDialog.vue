<template>
  <element-dialog
    :title="title"
    width="40%"
    v-model="showDialog"
    @submit="handleConfirm"
  >
    <div class="dialog-content">
      <el-form
        ref="formRef"
        size="small"
        label-width="7.5rem"
        label-position="right"
        :model="editorDataCopy"
        :rules="rules"
      >
        <el-form-item label="用户名称:" prop="userName">
          <el-input
            v-model="editorDataCopy.userName"
            placeholder="请输入"
            readonly
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="用户昵称:" prop="nickName">
          <el-input
            v-model="editorDataCopy.nickName"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户角色:">
          <el-select
            v-model="editorDataCopy.roleIds"
            placeholder="请选择"
            style="width: 100%"
            multiple
          >
            <el-option
              v-for="option in roleOptions"
              :key="option.id"
              :label="option.label"
              :value="option.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话号码:" prop="phone">
          <el-input
            type="phone"
            v-model="editorDataCopy.phone"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input
            type="email"
            v-model="editorDataCopy.email"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别:">
          <el-radio v-model="editorDataCopy.sex" :label="0">男</el-radio>
          <el-radio v-model="editorDataCopy.sex" :label="1">女</el-radio>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 5 }"
            v-model="editorDataCopy.note"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
  </element-dialog>
</template>

<script>
import ElementDialog from '@/components/ElementDialog/index';
import API from '@/api/permission';
import { AesUtil } from '@/utils/aes-util';

const rules = {
  userName: [{ required: true, message: '请输入用户名称', trigger: 'blur' }],
  nickName: [{ required: true, message: '请输入用户昵称', trigger: 'blur' }],
  phone: [
    {
      validator: (rule, value, callback) => {
        if (value && !/^1[0-9]{10}$/.test(value)) {
          callback(new Error('请输入正确的电话号码'));
        } else {
          callback();
        }
      },
      trigger: 'blur',
    },
  ],
  email: [
    {
      type: 'email',
      message: '请输入正确的邮箱地址',
      trigger: ['blur', 'change'],
    },
  ],
};
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
      rules,
      roleOptions: [],
    };
  },
  created() {
    this.getRoleIdOptions();
  },
  methods: {
    async getRoleIdOptions() {
      const res = await API.GetRoleList({
        pageNo: 1,
        pageSize: 9999,
        cnName: '',
      });
      if (res.code !== 200) return;
      this.roleOptions = res.data.data.map(d => {
        return {
          value: d.id,
          label: d.cnName,
        };
      });
    },
    open(data) {
      this.showDialog = true;
      this.editorDataCopy = JSON.parse(JSON.stringify(data));
      this.editorDataCopy.roleIds || (this.editorDataCopy.roleIds = []);
    },
    async handleConfirm() {
      this.$refs['formRef'].validate(async valid => {
        if (valid) {
          const res = await API.UpdateUser(this.editorDataCopy);
          if (res.code !== 200) {
            this.$message.error(res.message);
            return;
          }
          this.showDialog = false;
          this.$message.success(res.message);
          this.$emit('submit', this.editorDataCopy);
        } else {
          return false;
        }
      });
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
