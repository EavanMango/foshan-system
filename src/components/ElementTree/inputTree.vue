<template>
  <div class="tree-container">
    <div v-if="hasSearch" class="input-container">
      <el-input
              size="small"
              clearable
              :placeholder="placeholder"
              v-model="searchValue"
      >
      </el-input>
    </div>
    <div class="btnClass">
      <slot name="btn"></slot>
    </div>
    <div class="tree-box">
      <el-tree
              ref="tree"
              :expand-on-click-node="expandOnClickNode"
              :filter-node-method="filterNode"
              highlight-current
              :data="data"
              :icon-class="iconClass"
              :show-checkbox="showCheckBox"
              :check-strictly="checkStrictly"
              :node-key="nodeKey"
              :props="defaultProps"
              :default-expanded-keys="expandedKeys"
              @node-click="nodeClick"
              @node-expand="nodeExpand"
              @node-collapse="nodeCollapse"
              :accordion="accordion"
      >
        <span
                class="custom-tree-node"
                :style="{'justify-content': isJustifyContent ? ' space-between' : 'none'}"
                slot-scope="{ node, data }"
        >
          <span v-show="!data.edit"> {{ node[searchLabel] }}</span>
          <span v-show="data.edit" @click.stop>
            <el-input
                    size="small"
                    style="width: 100%"
                    clearable
                    :placeholder="placeholder"
                    v-model="editLabel"
                    @clear="clearInputValue"
                    @blur.stop="clearInput"
                    @change="clearInputShow(node, data)"
            >
            </el-input>
          </span>
          <span class="custom-tree-node-action">
<!--            <i-->
            <!--                    v-if="plus < node.level"-->
            <!--                    class="el-icon-plus i-plus"-->
            <!--                    @click.stop="nodeAdd(node, data)"-->
            <!--            ></i>-->
            <i
                    v-if="edit < node.level"
                    class="el-icon-edit i-edit"
                    @click.stop="nodeEdit(node, data)"
            ></i>
            <i
                    v-if="del < node.level"
                    class="el-icon-delete i-delete"
                    @click.stop="nodeDelete(node, data)"
            ></i>
          </span>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>

  export default {
    name: "VueElTreeCustom",
    data() {
      return {
        elTree: null,
        /** 模糊搜索 */
        searchValue: "",
        treeLoading: false,
        data: [],
        /** 默认展开的节点的key的数组 */
        expandedKeys: [],
        node: null,
        nodeData: null,
        /** 修改的node */
        editData: null,
        /** 当前的label */
        editLabel: null,
        /** 上一个label */
        oldEditLabel: "", // 上一个label
        onceExpanded: true,
      };
    },
    props: {
      /** 是否两边对齐 */
      isJustifyContent: {
        type: Boolean,
        required: false,
        default: true,
      },
      /** 设置展开的层级 */
      expandLevel: {
        type: Number,
        required: false,
        default: 1,
      },
      /** 自定义树节点图标 */
      iconClass: {
        type: String,
        required: false,
        default: "el-icon-caret-right",
      },
      /** 是否显示搜索input */
      hasSearch: {
        type: Boolean,
        required: false,
        default: true,
      },
      /** 边框 */
      isBorder: {
        type: Boolean,
        required: false,
        default: true,
      },
      /** tree：
       *  true -- node内部修改同时也发送修改事件，
       *  false -- 发送修改事件 */
      isEdit: {
        type: Boolean,
        required: false,
        default: true,
      },
      /** tree数据 */
      treeList: {
        type: Array,
        required: false,
        default: () => {
          return []
        },
      },
      /** tree模糊搜索字段 */
      searchLabel: {
        type: String,
        required: false,
        default: "label",
      },
      /** 关键字搜索 */
      placeholder: {
        type: String,
        required: false,
        default: "请输入关键字",
      },
      /** 是否在第一次展开某个树节点后才渲染其子节点 */
      renderAfterExpand: {
        type: Boolean,
        required: false,
        default: true,
      },
      /** 是否在点击节点的时候展开或收缩节点，默认值为false
       * false：只有点击箭头图标的时候才展开或收缩节点 */
      expandOnClickNode: {
        type: Boolean,
        required: false,
        default: false,
      },
      /** 多选 */
      showCheckBox: {
        type: Boolean,
        required: false,
        default: false,
      },
      /** 在显示复选框的情况下。是否严格的遵循父子不相关联的做法 */
      checkStrictly: {
        type: Boolean,
        required: false,
        default: false,
      },
      /** 是否每次只打开一个同级树节点 */
      accordion: {
        type: Boolean,
        required: false,
        default: false,
      },
      nodeKey: {
        type: String,
        required: false,
        default: "id",
      },
      defaultProps: {
        type: Object,
        required: false,
        default: () => {
          return {
            children: "children",
            label: "label",
          };
        },
      },
      customNodeAction: {
        type: Array,
        required: false,
        default: () => {
          return [false, false, false];
          // return [true, false, 3];
        },
      },
    },
    watch: {
      searchValue(val) {
        this.$refs.tree.filter(val);
      },
      treeList: {
        handler(newVal) {
          this.data = newVal;
          if (this.expandLevel > 0 && this.onceExpanded && !this.accordion) {
            this.$nextTick(() => {
              if (!this.elTree) this.elTree = this.$refs.tree;
              this.getExpandedKeys(this.data);
              this.onceExpanded = false;
            });
          }
        },
        // immediate: true,
        deep: true,
      },
    },
    computed: {
      plus() {
        if (this.customNodeAction[0]) {
          if (this.customNodeAction[0] === true) return 0;
          return this.customNodeAction[0];
        } else return 999999;
      },
      edit() {
        if (this.customNodeAction[1]) {
          if (this.customNodeAction[1] === true) return 0;
          return this.customNodeAction[1];
        } else return 999999;
      },
      del() {
        if (this.customNodeAction[2]) {
          if (this.customNodeAction[2] === true) return 0;
          return this.customNodeAction[2];
        } else return 999999;
      },
    },
    mounted() {
      this.$nextTick(() => {
        if (!this.elTree) this.elTree = this.$refs.tree;
      });
    },
    methods: {
      /** 模糊搜索 */
      filterNode(value, data, node) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      /** 新增 */
      nodeAdd(node, data) {
        this.closeEdit()
        this.node = node;
        this.nodeData = data;
        this.setCurrentKey(data[this.nodeKey])
        this.$emit("nodeAdd", {node, data});
      },
      /** window点击事件 隐藏input */
      windowClick() {
        if (this.nodeData.edit) this.nodeData.edit = false;
        else window.removeEventListener("click", this.windowClick);
      },
      /** 关闭编辑 */
      closeEdit() {
        if (this.nodeData && this.nodeData.edit) this.nodeData.edit = false;
      },
      /** 修改 */
      nodeEdit(node, data) {
        this.node = node;
        this.nodeData = data;
        this.setCurrentKey(data[this.nodeKey])
        // 保存当前点击node的label
        this.editLabel = data[this.defaultProps.label];
        // 获取上一个node 的label
        if (this.editData)
          this.oldEditLabel = this.editData[this.defaultProps.label];
        else this.oldEditLabel = data[this.defaultProps.label];
        if (this.isEdit) {
          // 增加window点击事件
          window.addEventListener("click", this.windowClick);
          if (typeof data.edit == "undefined") {
            this.$set(data, "edit", true);
            if (this.editData && this.editData.edit) {
              this.editData.edit = false; // 取消编辑
              this.editData[this.defaultProps.label] = this.oldEditLabel; // 赋值回原来的label
            }
          } else {
            if (this.editData && this.editData.edit) {
              this.editData.edit = false; // 取消编辑
              this.editData[this.defaultProps.label] = this.oldEditLabel; // 赋值回原来的label
            }
            data.edit = !data.edit;
          }
          this.editData = data; // 保存当前node
        } else {
          this.$emit("editNode", {node, data});
        }
      },
      clearInputShow(node, data) {
        if (!this.editLabel) {
          // this.$message.warning("修改内容不能为空！");
          window.removeEventListener("click", this.windowClick);
          return;
        }
        window.removeEventListener("click", this.windowClick);
        const that = this;
        this.$confirm(
            `确定修改( ${this.oldEditLabel} )的名称为( ${this.editLabel} ), 是否继续?`,
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
              distinguishCancelAndClose: true,
              closeOnClickModal: false,
              beforeClose: (action, instance, done) => {
                //instance中的 confirmButtonLoading  可以给按钮增加loading效果
                if (action === "confirm") {
                  instance.confirmButtonLoading = true;
                  this.$emit("confirmEditNode", {
                    node,
                    data,
                    instance,
                    done,
                    editLabel: that.editLabel,
                  });
                } else {
                  data.edit = false;
                  instance.confirmButtonLoading = false;
                  this.$emit("cancelEditNode", {node, data});
                  done();
                }
              },
            }
        ).then(() => {
        })
            .catch(() => {
            });
      },
      clearInputValue() {
        window.addEventListener("click", this.windowClick);
      },
      clearInput() {
        if (this.editLabel === "" && this.nodeData) this.nodeData.edit = false;
      },
      /** 删除 */
      nodeDelete(node, data) {
        this.closeEdit()
        this.node = node;
        this.nodeData = data;
        this.setCurrentKey(data[this.nodeKey])
        this.$confirm(
            `确定删除(${data[this.defaultProps.label]})的数据, 是否继续?`,
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
              distinguishCancelAndClose: true,
              closeOnClickModal: false,
              beforeClose: (action, instance, done) => {
                if (action === "confirm") {
                  instance.confirmButtonLoading = true;
                  this.$emit("confirmDeleteNode", {node, data, instance, done});
                } else {
                  instance.confirmButtonLoading = false;
                  this.$emit("cancelDeleteNode", {node, data});
                  done();
                }
              },
            }
        ).then(() => {
        })
            .catch(() => {
            });
      },
      /** 点击事件 */
      nodeClick(data, node, event) {
        // 在点击tree的时候也增加 ****编辑**** 取消
        this.closeEdit()
        this.$emit("nodeClick", {data, node, event});
      },
      getNodeParent(nodeData) {
        if (!nodeData) {
          return console.error('缺少参数(data)')
        }
        const storeMap = this.getTreeMapData(nodeData[this.nodeKey])
        const list = []
        this.getNodeParentLList(storeMap, list)
        return list
      },
      /** 获取当前选中的所有父级 */
      getNodeParentLList(storeMap, list) {
        if (storeMap.level !== 0) { // level 0 不需要
          list.unshift(storeMap.data[this.nodeKey])
          this.getNodeParentLList(storeMap.parent, list)
        }
      },
      /** 通过 key 设置某个节点的当前选中状态，使用此方法必须设置 node-key 属性 */
      setCurrentKey(key = null) {
        if (this.elTree) this.elTree.setCurrentKey(key);
      },
      /** 通过 node 设置某个节点的当前选中状态，使用此方法必须设置 node-key 属性 */
      setCurrentNode(node = null) {
        if (this.elTree) this.elTree.setCurrentNode(node);
      },
      /** 删除 Tree 中的一个节点，使用此方法必须设置 node-key 属性
       * 传入参数则外面删除  不传参数自身删除node
       **/
      remove(val = null) {
        if (this.elTree) {
          const del = val || this.node;
          this.elTree.remove(del);
          this.node = null;
          this.nodeData = null;
          return this.getTreeMapData();
        }
      },
      /** 为 Tree 中的一个节点追加一个子节点
       * (data, parentNode) 接收两个参数，1. 要追加的子节点的 data 2. 子节点的 parent 的 data、key 或者 node
       * */
      append(data, parentNode) {
        if (this.elTree) {
          this.elTree.append(data, parentNode || this.nodeData);
          if (parentNode || this.nodeData) {
            const nodes = this.getTreeMapData(
                (parentNode.data[this.nodeKey] === 0 ? 0 : parentNode.data[this.nodeKey]) ||
                this.nodeData[this.nodeKey]
            );
            // if (!nodes.expanded) nodes.expanded = true;
            if (!nodes.expanded) this.expandedKeys.push(data[this.nodeKey]);
          }
        }
      },
      /** 若节点可被选择（即 show-checkbox 为 true），则返回目前被选中的节点所组成的数组
       * (leafOnly, includeHalfChecked) 接收两个 boolean 类型的参数，
       * 1. 是否只是叶子节点，默认值为 false   2. 是否包含半选节点，默认值为 false
       * */
      getCheckedNodes(leafOnly = false, includeHalfChecked = false) {
        if (!this.showCheckBox)
          this.$message.warning("请设置多选(showCheckBox为true)");
        if (this.elTree) {
          return this.elTree.getCheckedNodes(leafOnly, includeHalfChecked);
        }
      },
      /** 若节点可被选择（即 show-checkbox 为 true），则返回目前被选中的节点的 key 所组成的数组
       * (leafOnly) 接收一个 boolean 类型的参数，若为 true 则仅返回被选中的叶子节点的 keys，默认值为 false
       * */
      getCheckedKeys(leafOnly = false) {
        if (!this.showCheckBox)
          this.$message.warning("请设置多选(showCheckBox为true)");
        if (this.elTree) {
          return this.elTree.getCheckedKeys(leafOnly);
        }
      },
      /** 获取当前被选中节点的 key，使用此方法必须设置 node-key 属性，若没有节点被选中则返回 null */
      getCurrentKey() {
        if (this.elTree) {
          return this.elTree.getCurrentKey();
        }
      },
      /** 获取当前被选中节点的 data，若没有节点被选中则返回 null */
      getCurrentNode() {
        if (this.elTree) {
          return this.elTree.getCurrentNode();
        }
      },
      getNode(dataKey) {
        if (this.elTree) {
          return this.elTree.getNode(dataKey);
        }
      },
      /** 若节点可被选择（即 show-checkbox 为 true），则返回目前半选中的节点所组成的数组 */
      getHalfCheckedNodes() {
        if (this.elTree) {
          return this.elTree.getHalfCheckedNodes();
        }
      },
      /** 若节点可被选择（即 show-checkbox 为 true），则返回目前半选中的节点的 key 所组成的数组 */
      getHalfCheckedKeys() {
        if (this.elTree) {
          return this.elTree.getHalfCheckedKeys();
        }
      },
      /** 参数可选 nodeKey
       * 不传获取完整 nodesMap  传参数（node-key） 获取对应的nodes */
      getTreeMapData(nodeKey) {
        const nodesMap = this.elTree.store.nodesMap;
        if (nodeKey || nodeKey === 0) {
          const maps = Object.values(nodesMap);
          for (let i = 0; i < maps.length; i++) {
            if (maps[i].data[this.nodeKey] === nodeKey) return maps[i];
          }
        } else {
          return nodesMap;
        }
      },
      /** 设置展开层级 */
      getExpandedKeys(data) {
        for (let item of data) {
          const itemNode = this.getTreeMapData(item[this.nodeKey]);
          const level = itemNode.level;
          // 获取要展开的层级id（nodeKey）
          if (item[this.defaultProps.children] && level <= this.expandLevel) {
            this.expandedKeys.push(item[this.nodeKey]);
          }
          if (level <= this.expandLevel && item[this.defaultProps.children]) {
            this.getExpandedKeys(item[this.defaultProps.children]);
          }
        }
      },
      /** 节点展开 */
      nodeExpand(data, node, e) {
        if (!this.accordion) {
          let id = data[this.nodeKey];
          let bool = this.expandedKeys.includes(id);
          if (!bool) this.expandedKeys.push(id);
          id = null;
          bool = null;
        }
        this.$emit("nodeExpand", {data, node, e});
      },
      /** 节点关闭 */
      nodeCollapse(data, node, e) {
        if (!this.accordion) {
          let id = data[this.nodeKey];
          let i = this.expandedKeys.indexOf(id);
          if (i !== -1) this.expandedKeys.splice(i, 1);
          id = null;
          i = null;
        }
        this.$emit("nodeCollapse", {data, node, e});
      },
    },
  };
</script>

<style scoped lang="scss">
  @import "./tree-variables.scss";

  ::v-deep .el-tree-node__content:hover,
  ::v-deep.el-upload-list__item:hover {
    background-color: $v-bgHoverColor !important;
    transition: all 0.5s; // 增加hover效果 美观
  }

  ::v-deep .el-tree-node__content {
    height: 32px !important;
  }

  ::v-deep .el-tree-node__content,
  .el-upload-list__item {
    transition: all 0.5s; // 增加hover效果 美观
  }

  ::v-deep
  .el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__content {
    background-color: $v-bgHoverColor !important;
  }

  .tree-container {
    box-sizing: border-box;
    height: 100%;

    .input-container {
      padding: 10px;
    }

    .btnClass {
      padding: 0 10px;
    }

    .tree-box {
      height: calc(100vh - 20rem) !important;
      overflow: auto;

      .el-tree {
        min-width: 100%;
        height: 100%;
        box-sizing: border-box;

        .el-tree-node.is-current
        > .el-tree-node__content
        > .custom-tree-node
        > .custom-tree-node-action {
          opacity: 1;
          transition: opacity 0.5s !important;
        }

        .custom-tree-node {
          flex: 1;
          display: flex;
          align-items: center;
          font-size: 14px;
          padding-right: 8px;

          .custom-tree-node-action {
            margin-left: 20px;
            opacity: 1;
            transition: opacity 0.5s !important;

            i {
              padding: 2px;
              border-radius: 2px;
              transition: all 0.5s; // 增加hover效果 美观
            }

            i + i {
              margin-left: 10px;
            }

            .i-plus {
              color: #000000;

              &:hover {
                color: $v-i-hover-color;
                background-color: $v-i-plus-color;
                transition: all 0.5s; // 增加hover效果 美观
              }
            }

            .i-edit {
              color: #000000 ;

              &:hover {
                color: #ffffff;
                background: #1857BE ;
                transition: all 0.5s; // 增加hover效果 美观
              }
            }

            .i-delete {
              color: #000000 ;

              &:hover {
                color: #ffffff;
                background: #1857BE ;
                transition: all 0.5s; // 增加hover效果 美观
              }
            }
          }

          &:hover .custom-tree-node-action {
            opacity: 1;
            transition: opacity 0.5s !important;
          }
        }
      }

      ::v-deep .el-tree > .el-tree-node {
        display: inline-block;
        min-width: calc(100% - 8px);
        margin: 0 4px;
      }
    }
  }

  // /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  // ::-webkit-scrollbar {
  //   width: 6px;
  //   /*滚动条宽度*/
  //   height: 10px;
  //   /*滚动条高度*/
  // }

  // /*定义滚动条轨道 内阴影+圆角*/
  // ::-webkit-scrollbar-track {
  //   -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  //   border-radius: 10px;
  //   /*滚动条的背景区域的圆角*/
  //   background-color: #fff;
  //   /*滚动条的背景颜色*/
  // }

  // /*定义滑块 内阴影+圆角*/
  // ::-webkit-scrollbar-thumb {
  //   border-radius: 6px;
  //   /*滚动条的圆角*/
  //   -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .1);
  //   background-color: #ddd;
  //   /*滚动条的背景颜色*/
  // }
</style>
