import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './lang';
import locals from './utils/locals';
import plugins from './plugins';
import mixins from './mixins';
import { getSelectOptons } from '@/api/select';
import '@/styles/index.scss';
import '@/assets/icons/index.js'; // icon
import '@/router/router-perssion'; // permission control

import SlideVerify from 'vue-monoplasty-slide-verify';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'swiper/css/bundle';

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.use(Antd);

Vue.use(Element, {
  size: 'medium', // 设置默认/刷新浏览器设置为指定的尺寸
  i18n: (key, value) => i18n.t(key, value),
});
// 全局混入
Vue.config.productionTip = false;
Vue.mixin(mixins)
Vue.use(SlideVerify)
Vue.use(plugins)
Vue.prototype.$locals = locals
Vue.prototype.getSelectOptons = getSelectOptons
Vue.prototype.setSessionItem = function (key, newVal) {
  let newStorageEvent = document.createEvent("StorageEvent");
  const storage = {
    setItem: function (k, val) {
      sessionStorage.setItem(k, val);
      newStorageEvent.initStorageEvent(
        "setItem",
        false,
        false,
        k,
        null,
        val,
        null,
        null
      );
      // 派发事件
      window.dispatchEvent(newStorageEvent);
    },
  };
  return storage.setItem(key, newVal);
};
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
