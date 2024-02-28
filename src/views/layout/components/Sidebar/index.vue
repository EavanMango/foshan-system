<template>
  <div :class="{ 'has-logo': 0 }">
    <logo :collapse="isCollapse" />
    <el-scrollbar
      style="height: calc(100% - 3rem)"
      wrap-class="scrollbar-wrapper"
    >
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :unique-opened="true"
        :collapse-transition="false"
        mode="vertical"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
      >
        <sidebar-item
          v-for="(route, index) in permission_routes"
          :key="index"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
    <div v-if="isCollapse" class="cardMenu flex_row_c pointer">
      <menuCard :menuData="permission_routes"></menuCard>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import Logo from './Logo';
import SidebarItem from './SidebarItem';
import menuCard from './menuCard';

export default {
  components: { SidebarItem, Logo, menuCard },
  computed: {
    ...mapGetters(['permission_routes', 'sidebar']),
    isCollapse() {
      return !this.sidebar.opened;
    },
    activeMenu() {
      const route = this.$route;
      const { path } = route;
      if (path === '/demand-response/event-calendar-edit') {
        return '/demand-response/event-calendar';
      } else if (path === '/single-control/airConditioning-control-edit') {
        return '/single-control/airConditioning-control';
      } else if (path === '/ancillary-services/participation-details') {
        return '/ancillary-services/demand-calendar';
      } else if (path === '/load-monitor/history-monitor-deviceNum') {
        return '/load-monitor/history-monitor';
      } else if (path === '/ancillary-services/demand-initiation') {
        return '/ancillary-services/demand-calendar';
      } else if (path === '/remote-control/group-event-detail') {
        return '/remote-control/group-event';
      } else if (path === '/load-monitor/user-monitor-detail') {
        return '/load-monitor/user-monitor';
      } else {
        return path;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.cardMenu {
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 0px;
  left: 0px;
}
</style>
