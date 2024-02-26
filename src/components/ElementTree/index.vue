<template>
  <div class="my-tree">
    <el-input
      v-if="hasSearch"
      v-model="filterText"
      class="search-input"
      :placeholder="$t('placeholder.filter')"
      clearable
    >
    </el-input>
    <slot></slot>
    <el-tree
      ref="myTree"
      v-if="renderFlag"
      :icon-class="iconClass"
      :filter-node-method="filterNodeMethod"
      :default-checked-keys="defaultCheckedKeys"
      :check-strictly="checkStrictly"
      :show-checkbox="showCheckbox"
      :default-expanded-keys="defaultExpandedKeys"
      :highlight-current="highlightCurrent"
      :check-on-click-node="checkOnClickNode"
      :default-expand-all="defaultExpandAll"
      :expand-on-click-node="expandOnClickNode"
      :node-key="nodeKey"
      :data="treeData"
      :props="defaultProps"
      :empty-text="emptyText"
      :render-content="renderContent"
      :current-node-key="'' + currentNodeKey"
      @node-click="nodeClick"
      @check="check"
      @check-change="checkChange"
      @current-change="currentChange"
      @node-expand="nodeExpand"
      @node-collapse="nodeCollapse"
      :class="[className, 'tree-data']"
    >
    </el-tree>
  </div>
</template>

<script>
export default {
  name: 'ElementTree',
  props: {
    currentNodeKey: {
      type: [String, Number],
      default: '',
    },
    nodeKey: {
      type: String,
      default: 'id',
    },
    className: {
      type: String,
      default: '',
    },
    /** 树形控件展示数据 */
    treeData: {
      type: Array,
      default: function () {
        return [];
      },
    },
    /** 默认展开的节点的 key 的数组 */
    defaultExpandedKeys: {
      type: Array,
      default: function () {
        return [];
      },
    },
    /** props配置项 */
    defaultProps: {
      type: Object,
      default: function () {
        return {
          label: 'label',
          children: 'children',
          id: 'id',
          disabled: function (data, node) {
            return data;
          },
        };
      },
    },
    /** 内容为空时的文案 */
    emptyText: {
      type: String,
      default: '暂无数据',
    },
    /** 是否高亮当前选中 */
    highlightCurrent: {
      type: Boolean,
      default: false,
    },
    /** 是否默认展开所有节点 */
    defaultExpandAll: {
      type: Boolean,
      default: false,
    },
    /** 是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。*/
    expandOnClickNode: {
      type: Boolean,
      default: true,
    },
    /** 是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点。 */
    checkOnClickNode: {
      type: Boolean,
      default: false,
    },
    /** 节点是否可被选择 */
    showCheckbox: {
      type: Boolean,
      default: false,
    },
    /** 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法 */
    checkStrictly: {
      type: Boolean,
      default: false,
    },
    /** 默认勾选的节点的 key 的数组 */
    defaultCheckedKeys: {
      type: Array,
      default: function () {
        return [];
      },
    },
    /** 是否需要搜索功能 */
    hasSearch: {
      type: Boolean,
      default: false,
    },
    /** 自定义树节点的图标 */
    iconClass: {
      type: String,
      default: '',
    },
    /** 自定义节点内容 */
    renderContent: {
      type: Function,
      default: function (h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
          </span>
        );
      },
    },
  },
  data() {
    return {
      /** 关键字过滤值 */
      filterText: '',
      renderFlag: true,
      scrollTop: 0,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, true);
  },
  watch: {
    filterText(val) {
      this.$refs.myTree.filter(val);
    },
    treeData() {
      this.scrollTop = 0;
    },
    currentNodeKey(newV) {
      this.renderFlag = false;
      this.$nextTick(() => {
        this.renderFlag = true;
        this.$nextTick(() => {
          document.querySelector('.el-tree').scrollTop = this.scrollTop;
        });
      });
    },
  },
  methods: {
    /** 节点被点击时的回调 */
    nodeClick(data, node, self) {
      this.$emit('nodeClick', { data, node, self });
    },
    /** 当复选框被点击的时候触发 */
    check(data, checkObj) {
      this.$emit('boxCheck', { data, checkObj });
    },
    /** 节点选中状态发生变化时的回调 */
    checkChange(data, isChecked, childIsCheked) {
      // 传递给 data 属性的数组中该节点所对应的对象、节点本身是否被选中、节点的子树中是否有被选中的节点
      this.$emit('checkChange', { data, isChecked, childIsCheked });
    },
    /** 当前选中节点变化时触发的事件 */
    currentChange(data, node) {
      this.$emit('currentChange', { data, node });
    },
    /** 对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏 */
    filterNodeMethod(value, data, node) {
      if (!value) return true;
      return data[this.defaultProps.label].indexOf(value) !== -1;
    },
    /** 节点被展开时触发的事件 */
    nodeExpand(data, node, el) {
      this.$emit('nodeExpand', { data, node, el });
    },
    /** 节点被关闭时触发的事件 */
    nodeCollapse(data, node, el) {
      this.$emit('nodeCollapse', { data, node, el });
    },
    /** 若节点可被选择（即 show-checkbox 为 true），则返回目前被选中的节点所组成的数组 */
    getCheckedNodes(leafOnly = false, includeHalfChecked = false) {
      return this.$refs.myTree.getCheckedNodes(leafOnly, includeHalfChecked);
    },
    /**	设置目前勾选的节点，使用此方法必须设置 node-key 属性 */
    setCheckedNodes(nodes) {
      this.$refs.myTree.setCheckedNodes(nodes);
    },
    /** 若节点可被选择（即 show-checkbox 为 true），则返回目前被选中的节点的 key 所组成的数组 */
    getCheckedKeys(leafOnly = false, includeHalfChecked = false) {
      return this.$refs.myTree.getCheckedKeys(leafOnly, includeHalfChecked);
    },
    /** 通过 keys 设置目前勾选的节点，使用此方法必须设置 node-key 属性 */
    setCheckedKeys(keys, leafOnly = false) {
      this.$refs.myTree.setCheckedKeys(keys, leafOnly);
    },
    /** 通过 key / data 设置某个节点的勾选状态，使用此方法必须设置 node-key 属性 */
    setChecked(keyordata, checked, deep = false) {
      this.$refs.myTree.setChecked(keyordata, checked, deep);
    },
    /** 若节点可被选择（即 show-checkbox 为 true），则返回目前半选中的节点所组成的数组 */
    getHalfCheckedNodes() {
      return this.$refs.myTree.getHalfCheckedNodes();
    },
    /** 若节点可被选择（即 show-checkbox 为 true），则返回目前半选中的节点的 key 所组成的数组 */
    getHalfCheckedKeys() {
      return this.$refs.myTree.getHalfCheckedKeys();
    },
    /** 获取当前被选中节点的 key，使用此方法必须设置 node-key 属性，若没有节点被选中则返回 null */
    getCurrentKey() {
      return this.$refs.myTree.getCurrentKey();
    },
    /** 获取当前被选中节点的 data，若没有节点被选中则返回 null */
    getCurrentNode() {
      return this.$refs.myTree.getCurrentNode();
    },
    /** 通过 key 设置某个节点的当前选中状态，使用此方法必须设置 node-key 属性 */
    setCurrentKey(key) {
      this.$refs.myTree.setCurrentKey(key);
    },
    /** 通过 node 设置某个节点的当前选中状态，使用此方法必须设置 node-key 属性 */
    setCurrentNode(node) {
      this.$refs.myTree.setCurrentNode(node);
    },
    /** 设置 node-key 属性	(node) 待被选节点的 node getNode	根据 data 或者 key 拿到 Tree 组件中的 node */
    getNode(data) {
      return this.$refs.myTree.getNode(data);
    },
    /** 删除 Tree 中的一个节点，使用此方法必须设置 node-key 属性 */
    remove(data) {
      this.$refs.myTree.remove(data);
    },
    /** 为 Tree 中的一个节点追加一个子节点 */
    append(data, parentNode) {
      this.$refs.myTree.append(data, parentNode);
    },
    /** 递归拉平数据 */
    recursion(arr) {
      return [].concat(
        ...arr.map(item => {
          if (item[this.defaultProps['children']]) {
            let arr = [].concat(
              item,
              ...this.recursion(item[this.defaultProps['children']])
            );
            delete item[this.defaultProps['children']];
            return arr;
          }
          return [].concat(item);
        })
      );
    },
    /** 获取拉平的treeData数据 */
    getFlatData() {
      let cloneData = JSON.parse(JSON.stringify(this.treeData));
      return this.recursion(cloneData);
    },
    //鼠标滚轮事件
    handleScroll() {
      this.scrollTop = document.querySelector('.el-tree').scrollTop;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/css-theme/handle.scss';
.my-tree {
  height: 100%;
  width: 100%;
  margin: 10px auto;

  .search-input {
    display: flex;
    justify-content: center;
    width: 95%;
    margin: 0 auto 10px;
    height: 2rem;
    position: relative;
  }
  .tree-data {
    height: 100%;
    overflow: auto;
    position: relative;
  }

  ::v-deep .tree-data::-webkit-scrollbar {
    width: 6px; // 横向滚动条
    height: 5px; // 纵向滚动条 必写
  }
  ::v-deep .tree-data::-webkit-scrollbar-thumb {
    // @include background_color('tabRadioColor');
    background: #ccc;
    border-radius: 3px;
  }
}
</style>
