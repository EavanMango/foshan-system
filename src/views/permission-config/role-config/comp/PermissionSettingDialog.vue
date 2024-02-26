<template>
  <element-dialog
    :title="title"
    width="40%"
    v-model="showDialog"
    @submit="handleConfirm"
  >
    <div class="dialog-content">
      <el-tabs v-model="activeName">
        <el-tab-pane label="菜单权限" name="menu"
          ><SelectTree
            :data="menuData"
            :targetKeys="menuDataKeys"
            ref="meunTree"
          ></SelectTree
        ></el-tab-pane>
        <el-tab-pane label="路由权限" name="router"
          ><BaseTransfer
            v-if="activeName === 'router'"
            :data="routeData"
            :targetKeys="routeDataKeys"
            @change="keys => handleChange('routeDataKeys', keys)"
          ></BaseTransfer
        ></el-tab-pane>
      </el-tabs>
    </div>
  </element-dialog>
</template>

<script>
import ElementDialog from '@/components/ElementDialog/index';
import BaseTransfer from './BaseTransfer';
import SelectTree from './SelectTree.vue';
import API from '@/api/permission';
import { translateTreeData } from './comp.js';
export default {
  components: {
    ElementDialog,
    BaseTransfer,
    SelectTree,
  },
  props: {
    title: {
      type: String,
      default: '权限设置',
    },
  },
  data() {
    return {
      menuData: [],
      routeData: [],

      menuDataKeys: [],
      routeDataKeys: [],

      activeName: 'menu',
      editorDataCopy: {},
      showDialog: false,
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.getMenuList();
      this.getRouteList();
    },
    async open(data) {
      this.showDialog = true;
      this.editorDataCopy = JSON.parse(JSON.stringify(data));
      this.initSelectKeys(data);
    },
    async initSelectKeys(data) {
      if (!data || !data.id) return;
      const res = await API.QueryBindingInfo({ id: data.id });
      if (res.code !== 200) return;
      const { routeIds, resourceIds } = res.data;
      this.menuDataKeys = (resourceIds || []).map(d => '' + d);
      this.routeDataKeys = (routeIds || []).map(d => '' + d);
    },
    handleConfirm() {
      this.handleBindAll();
      this.showDialog = false;
    },
    async getMenuList() {
      const res = await API.QueryResTree();
      if (res.code !== 200) return;
      this.menuData = translateTreeData(res.data);
    },
    async getRouteList() {
      const res = await API.GetRouteList({ pageNo: 1, pageSize: 9999 });
      if (res.code !== 200) return;
      let data = this.joinPath(res.data.data);
      this.routeData = translateTreeData(data);
    },
    joinPath(data) {
      if (!data) return [];
      return data.map(d => {
        const { param, type } = d;
        let obj = {};
        let path = '';
        try {
          obj = JSON.parse(param);
        } catch (error) {
          obj = {};
          console.warn(error);
        }

        if (type == 10220001) {
          path = obj?.Path?.paramValue || '';
        } else {
          path = obj?.Rewrite?.RewriteValue || '';
        }
        d.cnName = d.cnName + path;
        return d;
      });
    },
    handleBindMenu() {
      API.RebindResources({
        ids: this.$refs.meunTree.getSelectKeys().map(d => +d),
        roleId: this.editorDataCopy.id,
      });
    },
    handleBindRoute() {
      API.RebindRoutes({
        ids: this.routeDataKeys.map(d => +d),
        roleId: this.editorDataCopy.id,
      });
    },
    handleBindAll() {
      this.handleBindMenu();
      this.handleBindRoute();
    },
    handleChange(type, keys) {
      this[type] = keys;
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
