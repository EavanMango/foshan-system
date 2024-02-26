import API from '@/api/permission/resource';
import Layout from '@/views/layout';
import router, { resetRouter } from './index';
import store from '@/store';
import { Message } from 'element-ui';
import { UserUtil } from '@/utils/user-utils';

const loadView = view => {
  // 路由懒加载
  return resolve => require([`@/views/${view}`], resolve);
};

function transformRouter(asyncRoute) {
  let resultRouter = [];
  asyncRoute.forEach(route => {
    let obj = {};
    const { cnName, componentPath, url, icon, hidden } = route;
    obj.meta = {
      title: cnName,
      icon: icon ? icon : ' ',
    };
    obj.hidden = hidden;
    obj.name = url;
    if (route.children.length) {
      obj.component = Layout;
      obj.path = `/${url}`;
      obj.redirect = 'noRedirect';
      obj.alwaysShow = true;
      obj.children = transformRouter(route.children);
    } else {
      obj.component = loadView(componentPath);
      obj.path = url;
    }
    resultRouter.push(obj);
  });
  return resultRouter;
}

// let flag = false;
export async function generateRouters() {
  // if (flag) return;
  let asyncRoute = [];
  // const res = await API.QueryResTreeById();
  // if (res.code == 401) {
  //   if (res.msg) {
  //     Message.error(res.msg);
  //   }
  //   // UserUtil.removeToken();
  //   window.location.reload();
  //   return;
  // }
  // if (res.code == 200 && res.data) {
  //   // flag = true;
  //   asyncRoute = res.data;
  // }

  // 通过接口生成路由

  // const finallyRouter = transformRouter(asyncRoute);
  // store.commit('permission/SET_ROUTES', finallyRouter);
  // finallyRouter.forEach(fr => {
  //   router.addRoute(fr);
  // });

  // 常规生成路由

  const accessRoutes = await store.dispatch(
    'permission/generateRoutes',
    'admin'
  );
  for (const item of accessRoutes) {
    router.addRoute(item);
  }
}
