const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,

  token: state => state.user.token,
  id: state => state.user.id,
  mobile: state => state.user.mobile,
  name: state => state.user.name,
  heading: state => state.user.heading,

  permission_routes: state => state.permission.routes,

  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews
}
export default getters
