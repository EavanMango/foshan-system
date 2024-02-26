import { asyncRoutes, constantRoutes } from '@/router/index'

function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}


export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    // let defaultRoutes = JSON.parse(JSON.stringify(constantRoutes))
    // state.routes = defaultRoutes.concat(routes)
    state.routes = routes
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}





// import { constantRoutes } from '@/router'
// import Layout from '@/views/layout'
// import axios from 'axios'
//
// const permission = {
//   state: {
//     routes: [],
//     addRoutes: [],
//   },
//   mutations: {
//     SET_ROUTES: (state, routes) => {
//       state.addRoutes = routes
//       state.routes = constantRoutes.concat(routes)
//     },
//   },
//   actions: {
//     /** 生成路由 */
//     GenerateRoutes({commit}) {
//       return new Promise(resolve => {
//         axios.get('/getRouterListZh').then(res => {
//           let routeData = res.data.result
//           const rewriteRoutes = filterAsyncRouter(routeData, false, true)
//           rewriteRoutes.push({path: '*', redirect: '/404', hidden: true})
//           commit('SET_ROUTES', rewriteRoutes)
//           resolve(rewriteRoutes)
//         })
//       })
//     },
//   }
// }
//
// // 遍历传来的路由字符串，转换为组件对象
// function filterAsyncRouter(routerMap, lastRouter = false, type = false) {
//   return routerMap.filter(route => {
//     if (type && route.children) {
//       route.children = filterChildren(route.children)
//     }
//     if (route.component) {
//       if (route.component === 'Layout') {
//         route.component = Layout
//       }
//       else {
//         route.component = loadView(route.component)
//       }
//     }
//     if (route.children && route.children.length) {
//       route.children = filterAsyncRouter(route.children, route, type)
//     } else {
//       delete route['children']
//       delete route['redirect']
//     }
//     return true
//   })
// }
//
// function filterChildren(childrenMap, lastRouter = false) {
//   let children = []
//   childrenMap.forEach((el, index) => {
//     if (el.children && el.children.length) {
//       if (el.component === 'ParentView' && !lastRouter) {
//         el.children.forEach(c => {
//           c.path = el.path + '/' + c.path
//           if (c.children && c.children.length) {
//             children = children.concat(filterChildren(c.children, c))
//             return
//           }
//           children.push(c)
//         })
//         return
//       }
//     }
//     if (lastRouter) {
//       el.path = lastRouter.path + '/' + el.path
//     }
//     children = children.concat(el)
//   })
//   return children
// }
//
// export const loadView = (view) => {
//   if (process.env.NODE_ENV === 'development') {
//     // return (resolve) => require([`@/views/${view}`], resolve)
//     return () => import(`@/views/${view}`)
//   } else {
//     // 使用 import 实现生产环境的路由懒加载
//     return () => import(`@/views/${view}`)
//   }
// }
