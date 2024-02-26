import router from './index';
import store from '@/store';
import NProgress from 'nprogress'; // progress bar
import { UserUtil } from '@/utils/user-utils';
import { Message } from 'element-ui';
import 'nprogress/nprogress.css'; // progress bar style
import { generateRouters } from './generateRouter';

// 防止在登录页一直刷新页面
// if (!location.href.includes('login')) {
//   generateRouters();
// }

let flag = false;
NProgress.configure({ showSpinner: false }); // NProgress Configuration
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  // let token = UserUtil.getToken();
  // if (!token) {
  //   if (to.path !== '/login') {
  //     Message.error('token失效,请重新登录！');
  //     UserUtil.logout();
  //     next('/login');
  //     return;
  //   }
  //   next();
  //   return;
  // }
  if (flag) {
    next();
    return;
  }
  const accessRoutes = await store.dispatch(
    'permission/generateRoutes',
    'admin'
  );
  for (const item of accessRoutes) {
    router.addRoute(item);
  }
  flag = true;
  next(to.fullPath);
  next()
});
/** 判断当前路由是否存在 */
function hasRoute(to) {
  let find = router.getRoutes().find(item => item.name === to.name);
  if (!find) {
    console.log(router.getRoutes(), to);
  }
  return !!find;
}

router.afterEach(() => {
  NProgress.done();
});
