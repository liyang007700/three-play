import VueRouter from 'vue-router'
const index = () =>
  import(
    /* webpackChunkName: "three_start" */
    '../pages/index'
  )
const renderTarget = () =>
  import(
    /* webpackChunkName: "webgl_start" */
    '../pages/renderTarget'
  )
const orbitControls = () =>
  import(
    /* webpackChunkName: "webgl_start" */
    '../pages/orbitControls'
  )
const routes = [
  {
    path: '/',
    component: index,
  },
  {
    path: '/render-target',
    component: renderTarget,
  },
  {
    path: '/orbitControls',
    component: orbitControls
  }
]
export default new VueRouter({
  base: '/',
  mode: 'hash',
  routes,
})