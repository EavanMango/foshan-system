import resourceApiObj from './resource';
import roleApiObj from './role';
import routerApiObj from './router';
import userApiObj from './user';

export default {
  ...resourceApiObj,
  ...roleApiObj,
  ...routerApiObj,
  ...userApiObj,
};
