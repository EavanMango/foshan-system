<!--
 * @Description  : 资源管理
 * @Author       : 陈凯
 * @Date         : 2023-11-05 11:08:34
 * @LastEditors  : 陈凯
 * @LastEditTime : 2024-01-16 10:06:05
 * @FilePath     : \init-project\src\views\permission-config\resource-config\index.vue
-->
<template>
  <div class="w-h-100 app-container">
    <left-right-layout is-left-border is-right-borders>
      <template #left-layout>
        <!-- <div class="margin-bottom-10 flex">
          <el-input placeholder="请输入内容" v-model="filterText" clearable>
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="handleSearch"
            ></el-button>
          </el-input>
        </div> -->
        <div class="tree-box">
          <el-tree
            v-if="renderFlag"
            ref="myTree"
            node-key="id"
            highlight-current
            :data="treeData"
            :props="defaultProps"
            :filter-node-method="filterNode"
            :current-node-key="'' + currentId"
            draggable
            @node-drop="handleDrop"
            @node-click="handleNodeClick"
            @node-contextmenu="openTreeMenu"
          ></el-tree>
          <div
            v-show="showTreeMenu"
            class="treeMenu"
            :class="{ treeMenuDark: fontColor != '#000' }"
          >
            <div @click="handleAddUpLevelNode">上方新增</div>
            <div @click="handleAddDownLevelNode">下方新增</div>
            <div @click="handleAddChildNode">新增子集</div>
            <div @click="handleDeleteNode">删除</div>
          </div>
        </div>
      </template>
      <template #right-layout>
        <div class="right-container">
          <div class="form-content flex_col_t margin-top-20">
            <el-form
              label-position="right"
              :model="currentData"
              :rules="rules"
              ref="formRef"
              class="form-inline"
            >
              <el-form-item
                label="菜单名称："
                label-width="7.5rem"
                prop="cnName"
              >
                <el-input
                  v-model="currentData.cnName"
                  placeholder="请输入"
                  style="width: 25rem"
                ></el-input>
              </el-form-item>
              <el-form-item label="菜单类型：" label-width="7.5rem" prop="type">
                <el-radio v-model="currentData.type" :label="10200001"
                  >目录</el-radio
                >
                <el-radio v-model="currentData.type" :label="10200002"
                  >菜单</el-radio
                >
              </el-form-item>
              <el-form-item label="菜单图标：" label-width="7.5rem">
                <!-- <CustomIconSelect
                  v-model="currentData.icon"
                  placeholder="请输入"
                ></CustomIconSelect> -->
                <el-input
                  v-model="currentData.icon"
                  placeholder="请输入"
                  style="width: 25rem"
                ></el-input>
              </el-form-item>
              <el-form-item label="路由地址：" label-width="7.5rem" prop="url">
                <el-input
                  v-model="currentData.url"
                  placeholder="请输入"
                  style="width: 25rem"
                ></el-input>
              </el-form-item>
              <el-form-item
                v-show="currentData.type == 10200002"
                label="组件路径："
                label-width="7.5rem"
                prop="componentPath"
              >
                <el-input
                  v-model="currentData.componentPath"
                  placeholder="请输入"
                  style="width: 25rem"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="是否隐藏："
                label-width="7.5rem"
                prop="componentPath"
              >
                <el-switch
                  v-model="currentData.hidden"
                  active-color="#13ce66"
                  inactive-color="#999"
                >
                </el-switch>
              </el-form-item>
              <el-form-item label="是否外链" label-width="7.5rem" prop="target">
                <el-radio v-model="currentData.target" :label="10210001"
                  >当前标签页</el-radio
                >
                <el-radio v-model="currentData.target" :label="10210002"
                  >新标签页</el-radio
                >
                <!-- <el-radio v-model="currentData.target" :label="10210003"
                  >顶级标签页</el-radio
                > -->
              </el-form-item>
            </el-form>
            <div>
              <el-button type="primary" @click="handleSubmit">{{
                btnTitle
              }}</el-button>
            </div>
          </div>
        </div>
      </template>
    </left-right-layout>
  </div>
</template>

<script>
import { FileUtil } from '@/utils/file-util';
import LeftRightLayout from '@/components/LeftRightLayout';
import { areaTypeOptions, rules, treeData } from './server';
import API from '@/api/permission';
import CustomIconSelect from '@/components/custom-icon-select.vue';

export default {
  components: { LeftRightLayout, CustomIconSelect },
  data() {
    return {
      renderFlag: true,
      areaTypeOptions,
      rules,
      /** 输入的关键词 */
      filterText: '',
      treeData,
      defaultProps: {
        children: 'children',
        label: 'cnName',
        id: 'id',
      },
      currentData: { target: 10210001 },
      btnTitle: '保存',
      showTreeMenu: false,
      // 右键的data
      currentMenuData: null,
      currentId: '',
    };
  },
  watch: {
    // currentData(nv) {
    //   this.currentId = nv?.id || '';
    // },
    // currentId() {
    //   this.renderFlag = false;
    //   this.$nextTick(() => {
    //     this.renderFlag = true;
    //   });
    // },
  },
  async created() {
    await this.initTreeData();
  },
  methods: {
    handleSearch() {
      this.$refs.myTree.filter(this.filterText);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.cnName.indexOf(value) !== -1;
    },
    async initTreeData() {
      const res = await API.QueryResTree();
      if (res.code !== 200) return;
      this.treeData = this.transformTreeId(res.data);
      this.currentData = this.treeData[0];
      this.currentId = this.treeData[0]?.id || '';
      this.renderFlag = false;
      this.$nextTick(() => {
        this.renderFlag = true;
      });
    },
    transformTreeId(data) {
      if (!data || !data.length) return [];
      return data.map(d => {
        d.id = '' + d.id;
        if (d?.children?.length) {
          d.children = this.transformTreeId(d.children);
        }
        return d;
      });
    },
    async handleUpload(file) {
      const res = await FileUtil.toBase64(file);
      this.currentData.icon = res;
      this.$refs.iconRef.src = res;
      return false;
    },
    /**
     * 拖拽完成触发的事件：目标节点已经移动完之后的节点
     * draggingNode: 被拖拽节点  dropNode: 结束拖拽时最后进入的节点
     * dropType: 被拖拽节点的放置位置（before、after、inner）
     * event
     * */
    async handleDrop(draggingNode, dropNode, dropType, type) {
      const { children, ...params } = draggingNode.data;
      const dropData = dropNode.data;
      if (dropType === 'before') {
        params.ofResource = dropData.ofResource;
        params.sort = dropData.sort;
      } else if (dropType === 'after') {
        params.ofResource = dropData.ofResource;
        params.sort = Number(dropData.sort) + 1;
      } else if (dropType === 'inner') {
        params.ofResource = dropData.id;
      }
      params.hidden = 10300002;
      await API.UpdateRes(params);
    },
    handleNodeClick(data, node) {
      this.closeTreeMenu();
      // if (!node.isLeaf) return
      this.btnTitle = '保存';
      this.currentData = data;
      this.currentData.target || (this.currentData.target = 10210001);
    },
    /** 右键菜单打开 */
    openTreeMenu(event, data, node, target) {
      this.currentMenuData = data;
      this.showTreeMenu = true;
      const treeMenu = document.querySelector('.treeMenu');
      const clientY =
        event.clientY < 500
          ? event.clientY
          : event.clientY - treeMenu.clientHeight;
      document
        .querySelector('.treeMenu')
        .setAttribute('style', `top:${clientY}px;left:${event.clientX}px;`);
      document.addEventListener('click', this.closeTreeMenu);
      document.addEventListener('contextmenu', this.closeTreeMenu);
    },
    /** 右键菜单关闭吧 */
    closeTreeMenu() {
      this.showTreeMenu = false; // 关闭菜单
      document.removeEventListener('click', this.closeTreeMenu);
      document.removeEventListener('contextmenu', this.closeTreeMenu);
    },
    // 上方新增
    handleAddUpLevelNode() {
      if (!this.currentMenuData) return;
      this.$prompt('请输入名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
        .then(async ({ value }) => {
          let params = {
            cnName: value,
            ofResource: this.currentMenuData.ofResource,
            sort:
              this.currentMenuData.sort == 0
                ? 0
                : this.currentMenuData.sort - 1,
            type: 10200001,
            target: 10210001,
            hidden: 10300002,
          };
          const res = await API.UpdateRes(params);
          if (res.code !== 200) {
            this.$message.error(res.message);
            return;
          }
          await this.initTreeData();
        })
        .catch(() => {});
    },
    // 下方新增
    handleAddDownLevelNode() {
      if (!this.currentMenuData) return;
      this.$prompt('请输入名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
        .then(async ({ value }) => {
          let params = {
            cnName: value,
            ofResource: this.currentMenuData.ofResource,
            sort: this.currentMenuData.sort + 1,
            type: 10200001,
            target: 10210001,
            hidden: 10300002,
          };
          const res = await API.UpdateRes(params);
          if (res.code !== 200) {
            this.$message.error(res.message);
            return;
          }
          await this.initTreeData();
        })
        .catch(() => {});
    },
    handleAddChildNode() {
      if (!this.currentMenuData) return;
      this.$prompt('请输入名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
        .then(async ({ value }) => {
          let params = {
            cnName: value,
            ofResource: this.currentMenuData.id,
            type: 10200001,
            target: 10210001,
            hidden: 10300002,
          };
          const res = await API.UpdateRes(params);
          if (res.code !== 200) {
            this.$message.error(res.message);
            return;
          }
          await this.initTreeData();
        })
        .catch(() => {});
    },
    async handleDeleteNode() {
      if (!this.currentMenuData) return;
      await API.DelRes({ id: this.currentMenuData.id });
      await this.initTreeData();
    },
    async handleSubmit() {
      if (!this.currentData.id) {
        this.$message.warning('请先选择');
        return;
      }
      this.currentData.hidden =
        this.currentData.hidden == true ? 10300001 : 10300002;
      const res = await API.UpdateRes(this.currentData);
      if (res.code !== 200) {
        this.$message.error(res.message);
        return;
      }
      this.$message.success(res.message);
      this.initTreeData();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/css-theme/handle.scss';

::v-deep .el-form-item {
  margin-bottom: 1.25rem !important;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 8px;

  .custom-tree-node-action {
    margin-left: 1.25rem;
    opacity: 1;
    transition: opacity 0.5s !important;

    i {
      padding: 2px;
      border-radius: 2px;
      transition: all 0.5s; // 增加hover效果 美观
    }

    i + i {
      margin-left: 15px;
    }

    i-edit {
      color: #000000;

      &:hover {
        color: #ffffff;
        background: #1857be;
        transition: all 0.5s; // 增加hover效果 美观
      }
    }

    .i-delete {
      color: #000000;

      &:hover {
        color: #ffffff;
        background: #1857be;
        transition: all 0.5s; // 增加hover效果 美观
      }
    }
  }
}

.tree-box {
  width: 100%;
  height: calc(100% - 60px);
  overflow: auto;
}

.treeMenu {
  position: fixed;
  z-index: 99999;
  top: 50%;
  left: 50%;
  background-color: white;
  overflow: hidden;
  border-radius: 5px;
  // border: 1px solid #e6ebf5;
  box-shadow: 2px 2px 5px #000;

  div {
    padding: 3px 1.25rem;
    box-sizing: border-box;
    text-align: center;
  }
  div:hover {
    background-color: #eee;
    cursor: pointer;
  }
}
.treeMenuDark {
  position: fixed;
  z-index: 99999;
  top: 50%;
  left: 50%;
  background-color: #0a0b27;
  overflow: hidden;
  border-radius: 5px;
  // border: 1px solid #e6ebf5;

  div {
    padding: 3px 1.25rem;
    box-sizing: border-box;
    text-align: center;
  }
  div:hover {
    background-color: #0a0b27;
    cursor: pointer;
  }
}
.right-container {
  width: 100%;
  height: 100%;
  padding: 10px;

  .title {
    height: 10%;
    padding: 40px 0;
    font-weight: bold;
    @include font_color('primary_titleColor');
  }

  .form-content {
    width: 100%;
    height: 90%;
  }
}
::v-deep .el-form-item .el-form-item__label {
  font-size: 1rem;
  line-height: 2.25rem !important;
}
::v-deep .el-form-item__content {
  height: 2.125rem;
  display: flex;
  align-items: center;
}
</style>
