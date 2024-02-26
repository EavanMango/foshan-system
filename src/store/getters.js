const getters = {
  sidebar: state => state.app.sidebar,
  lang: state => state.app.lang,
  theme: state => state.app.theme,
  visitedViews: state => state.tagsView.visitedViews,  // 导航栏切换菜单
  cachedViews: state => state.tagsView.cachedViews,  // 当前导航栏菜单
  permission_routes: state => state.permission.routes,
}
export default getters
