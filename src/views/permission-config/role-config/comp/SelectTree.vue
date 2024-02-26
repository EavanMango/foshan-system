<template>
  <div class="w-h-100" style="padding: 0.3rem">
    <div class="flex margin-bottom-10">
      <div class="margin-right-10">权限</div>
      <el-checkbox v-model="isCascade">级联</el-checkbox>
      <el-checkbox :checked="isCheckAll" @change="handleCheckboxChange"
        >全选</el-checkbox
      >
    </div>
    <el-tree
      accordion
      class="tree-container"
      :data="data"
      show-checkbox
      node-key="id"
      ref="selectTree"
      highlight-current
      :check-strictly="!isCascade"
      :props="defaultProps"
      :default-checked-keys="targetKeys"
      @check-change="handleChange"
    >
    </el-tree>
  </div>
</template>

<script>
let data = [
  {
    id: 1,
    label: '一级 1',
    children: [
      {
        id: 4,
        label: '二级 1-1',
        children: [
          {
            id: 9,
            label: '三级 1-1-1',
          },
          {
            id: 10,
            label: '三级 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: '一级 2',
    children: [
      {
        id: 5,
        label: '二级 2-1',
      },
      {
        id: 6,
        label: '二级 2-2',
      },
    ],
  },
  {
    id: 3,
    label: '一级 3',
    children: [
      {
        id: 7,
        label: '二级 3-1',
      },
      {
        id: 8,
        label: '二级 3-2',
      },
    ],
  },
];
export default {
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    targetKeys: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isCascade: true,
      isIndeterminate: true,
      isCheckAll: false,
      defaultProps: {
        children: 'children',
        label: 'label',
      },
    };
  },
  watch: {
    targetKeys(nv) {
      this.$refs.selectTree.setCheckedKeys(nv);
    },
  },
  computed: {
    allKeys() {
      let target = [];
      const loop = arr => {
        arr.forEach(d => {
          target.push(d.key);
          if (d?.children?.length) {
            loop(d.children);
          }
        });
      };
      loop(this.data);
      return target;
    },
  },
  methods: {
    handleChange() {
      if (this.targetKeys.length === this.allKeys.length) {
        this.isCheckAll = true;
      } else {
        this.isCheckAll = false;
      }
    },
    getSelectKeys() {
      return this.$refs.selectTree.getCheckedKeys();
    },
    resetChecked() {
      this.$refs.selectTree.setCheckedKeys([]);
    },
    handleCheckboxChange(bool) {
      if (bool) {
        this.selectAllKeys();
      } else {
        this.clearAllKeys();
      }
    },
    selectAllKeys() {
      this.$refs.selectTree.setCheckedKeys(this.allKeys);
    },
    clearAllKeys() {
      this.$refs.selectTree.setCheckedKeys([]);
    },
  },
};
</script>
<style scoped lang="scss">
.tree-container {
  height: 200px;
  overflow-y: auto;
}
</style>
