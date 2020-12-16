import VueRouter from 'vue-router'
const index = () =>
  import(
    /* webpackChunkName: "three_start" */
    '../pages/index'
  )
const light = () =>
  import(
    /* webpackChunkName: "webgl_start" */
    '../pages/light'
  )
  
const routes = [
  {
    path: '/',
    component: index,
  },
  {
    path: '/light',
    component: light,
  }
]
export default new VueRouter({
  base: '/',
  mode: 'history',
  routes,
})