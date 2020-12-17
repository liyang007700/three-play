import VueRouter from 'vue-router'
const index = () =>
  import(
    /* webpackChunkName: "three_start" */
    '../pages/index'
  )
const light = () =>
  import(
    /* webpackChunkName: "webgl_start" */
    '../pages/offlineRender'
  )
  
const routes = [
  {
    path: '/',
    component: index,
  },
  {
    path: '/offline-render',
    component: light,
  }
]
export default new VueRouter({
  base: '/',
  mode: 'hash',
  routes,
})