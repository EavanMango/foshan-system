<template>
  <element-dialog
    :title="title"
    width="40%"
    v-model="showDialog"
    @submit="handleConfirm"
  >
    <div class="dialog-content">
      <a-transfer
        class="base-tree-transfer"
        show-search
        :data-source="treeData"
        :titles="['未关联用户', '已关联用户']"
        :target-keys="targetKeys"
        :render="item => item.title"
        @change="handleChange"
      />
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
      default: '关联用户',
    },
  },
  data() {
    return {
      editorDataCopy: {},
      showDialog: false,
      treeData: [],
      targetKeys: [],
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const res = await API.GetList({ pageNo: 1, pageSize: 9999 });
      if (res.code !== 200) return;
      this.treeData = res.data.data.map(d => {
        return {
          ...d,
          key: '' + d.id,
          title: d.nickName,
        };
      });
    },
    async open(data) {
      this.showDialog = true;
      this.editorDataCopy = JSON.parse(JSON.stringify(data));
      const res = await API.QueryBindingInfo({ id: data.id });
      if (res.code !== 200) return;
      const { userIds } = res.data;
      this.targetKeys = (userIds || []).map(d => '' + d);
    },
    handleChange(targetKeys) {
      this.targetKeys = targetKeys;
    },
    async handleConfirm() {
      const res = await API.RebindUsers({
        roleId: this.editorDataCopy.id,
        ids: this.targetKeys.map(d => +d),
      });
      if (res.code !== 200) {
        this.$message.error('关联失败');
        return;
      }
      this.$message.success('关联成功');
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
