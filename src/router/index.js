import Vue from 'vue';
import Router from 'vue-router';
import { Message } from 'element-ui';
import Layout from '@/views/layout';
import ParentView from '@/components/ParentView/index';

Vue.use(Router);

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    // redirect: '/index',
    redirect: 'index',
    // children: [
    //   {
    //     // path: 'index',
    //     path: 'index',
    //     // component: () => import('@/views/home'),
    //     component: () => import('@/views/index-screen/index/index.vue'),
    //     name: 'Index',
    //     meta: { title: '首页', icon: 'index', affix: true },
    //   },
    // ],
  },
  {
    path: '/login',
    component: resolve => require(['@/views/login/login.vue'], resolve),
    hidden: true,
  },
];

export const asyncRoutes = [
  // 首页
  {
    name: 'index',
    path: '/index',
    alwaysShow: false,
    hidden: false,
    component: () => import('@/views/index-screen/index/index.vue'),
    meta: {
      title: '首页',
      icon: 'resourcesBusiness',
    },
  },
  // 档案管理
  {
    name: 'FileMmanagement',
    path: '/file-management',
    redirect: 'noRedirect',
    hidden: false,
    alwaysShow: true,
    component: Layout,
    meta: {
      title: '档案管理',
      icon: 'FileMmanagement',
    },
    children: [
      {
        name: 'EnterpriseFile',
        path: 'enterprise-file',
        hidden: false,
        component: () => import('@/views/file-management/enterprise-file'),
        meta: {
          title: '企业档案',
          icon: '企业档案',
        },
      },
      {
        name: 'EquipmentFile',
        path: 'equipment-file',
        hidden: false,
        component: () => import('@/views/file-management/equipment-file'),
        meta: {
          title: '设备档案',
          icon: '设备档案',
        },
      },

    ],
  },
  // 负荷监测
  {
    name: 'loadMonitor',
    path: '/load-monitor',
    redirect: 'noRedirect',
    hidden: false,
    alwaysShow: true,
    component: Layout,
    meta: {
      title: '负荷监测',
      icon: 'loadMonitor',
    },
    children: [
      {
        name: 'cityMonitor',
        path: 'city-monitor',
        hidden: false,
        component: () => import('@/views/load-monitor/city-monitor'),
        meta: {
          title: '地区监测',
          icon: '地区监测',
        },
      },
      {
        name: 'industryMonitor',
        path: 'industry-monitor',
        hidden: false,
        component: () => import('@/views/load-monitor/industry-monitor'),
        meta: {
          title: '行业监测',
          icon: '行业监测',
        },
      },

      {
        name: 'userMonitor',
        path: 'user-monitor',
        hidden: false,
        component: () => import('@/views/load-monitor/user-monitor'),
        meta: {
          title: '用户监测',
          icon: '用户监测',
        },
      },
      {
        name: 'userMonitor',
        path: 'user-monitor-detail',
        hidden: true,
        component: () => import('@/views/load-monitor/user-monitor/detail.vue'),
        meta: {
          title: '用户监测-设备数量详情',
          icon: '用户监测',
        },
      },
      {
        name: 'HistoryMonitorEdit',
        path: 'history-monitor-deviceNum',
        hidden: true,
        component: () => import('@/views/load-monitor/history-monitor/deviceNum.vue'),
        meta: {
          title: '历史负荷-设备数量',
          icon: ' ',
        },
      },
    ],
  },
  // 单体控制
  {
    name: 'singleControl',
    path: '/single-control',
    redirect: 'noRedirect',
    hidden: false,
    alwaysShow: true,
    component: Layout,
    meta: {
      title: '单体控制',
      icon: 'singleControl',
    },
    children: [
      {
        name: 'airConditioningControl',
        path: 'airConditioning-control',
        hidden: false,
        component: () => import('@/views/remote-control/single-control'),
        meta: {
          title: '空调控制',
          icon: '空调控制',
        },
      },
      {
        name: 'airConditioningControlEdit',
        path: 'airConditioning-control-edit',
        hidden: true,
        component: () =>
          import('@/views/remote-control/single-control/edit.vue'),
        meta: {
          title: '空调控制编辑',
          icon: ' ',
        },
      },


    ],
  },
  // 远程控制
  {
    name: 'remoteControl',
    path: '/remote-control',
    redirect: 'noRedirect',
    hidden: false,
    alwaysShow: true,
    component: Layout,
    meta: {
      title: '远程控制',
      icon: 'remoteControl',
    },
    children: [
      {
        name: 'groupControl',
        path: 'group-control',
        hidden: false,
        component: () => import('@/views/remote-control/group-control'),
        meta: {
          title: '群组管理',
          icon: '群组管理',
        },
      },
      {
        name: 'groupIssued',
        path: 'group-issued',
        hidden: false,
        component: () => import('@/views/remote-control/group-issued'),
        meta: {
          title: '群控下发',
          icon: '群控下发',
        },
      },
      {
        name: 'groupEvent',
        path: 'group-event',
        hidden: false,
        component: () => import('@/views/remote-control/group-event'),
        meta: {
          title: '群控事件',
          icon: '群控事件',
        },
      },
      {
        name: 'groupEventDetail',
        path: 'group-event-detail',
        hidden: true,
        component: () => import('@/views/remote-control/group-event/detail.vue'),
        meta: {
          title: '群控事件详情',
          icon: ' ',
        },
      },
    ],
  },
];

const createRouter = () =>
  new Router({
    mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    // 实例化vue的时候只挂载constantRoutes
    routes: constantRoutes,
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
