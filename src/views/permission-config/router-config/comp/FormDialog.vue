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
        :model="editorDataCopy"
        :rules="rules"
        label-width="7.5rem"
        label-position="right"
      >
        <el-form-item label="路由名称:" prop="cnName">
          <el-input
            v-model="editorDataCopy.cnName"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="路由地址:" prop="url">
          <el-input
            v-model="editorDataCopy.url"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="类型:" prop="type">
          <el-select
            v-model="editorDataCopy.type"
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option label="跳转" :value="10220001"></el-option>
            <el-option label="重写" :value="10220002"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请求路径:" prop="param.Path.paramValue">
          <el-input
            v-model="editorDataCopy.param.Path.paramValue"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="重写路径:"
          v-show="editorDataCopy.type != '10220001'"
          prop="param.Rewrite.RewriteValue"
        >
          <el-input
            v-model="editorDataCopy.param.Rewrite.RewriteValue"
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
const rulesA = {
  cnName: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  url: [{ required: true, message: '请输入地址', trigger: 'blur' }],
  type: [{ required: true, message: '请选择类型', trigger: 'blur' }],
  // ['param.Rewrite.RewriteValue']: [
  //   { required: true, message: '请输入', trigger: 'blur' }
  // ],
  ['param.Path.paramValue']: [
    { required: true, message: '请输入', trigger: 'blur' },
  ],
};
const rulesB = {
  cnName: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  url: [{ required: true, message: '请输入地址', trigger: 'blur' }],
  type: [{ required: true, message: '请选择类型', trigger: 'blur' }],
  ['param.Rewrite.RewriteValue']: [
    { required: true, message: '请输入', trigger: 'blur' },
  ],
  ['param.Path.paramValue']: [
    { required: true, message: '请输入', trigger: 'blur' },
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
      editorDataCopy: {
        param: {
          Path: { paramValue: '' },
          Rewrite: { paramValue: '', RewriteValue: '' },
        },
      },
      showDialog: false,
    };
  },
  computed: {
    rules() {
      if (this.editorDataCopy.type == '10220001') {
        return rulesA;
      }
      return rulesB;
    },
  },
  methods: {
    open(data) {
      this.showDialog = true;
      data.type || (data.type = 10220001);
      this.editorDataCopy = JSON.parse(JSON.stringify(data));
      // 类型为重写
      if (this.editorDataCopy.type == '10220002') {
        this.editorDataCopy.param.Path = { paramValue: '' };
        this.editorDataCopy.param.Path.paramValue =
          this.editorDataCopy?.param?.Rewrite?.paramValue;
      }
    },
    handleParams(params) {
      // 跳转
      if (params.type == '10220001') {
        Reflect.deleteProperty(params.param, 'Rewrite');
      } else {
        params.param.Rewrite.paramValue = params.param.Path.paramValue;
        Reflect.deleteProperty(params.param, 'Path');
      }
      // 兼容之前小写问题 后面应该可删
      Reflect.deleteProperty(params.param, 'rewrite');
      params.param = JSON.stringify(params.param);
      return params;
    },
    async handleConfirm() {
      this.$refs.formRef.validate(async valid => {
        if (valid) {
          const params = JSON.parse(JSON.stringify(this.editorDataCopy));
          const res = await API.UpdateRoute(this.handleParams(params));
          if (res.code !== 200) return;
          this.showDialog = false;
          let messageTitle = this.title == '编辑路由' ? '修改成功' : '新增成功';
          this.$message.success(messageTitle);
          this.$emit('submit', params);
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
