import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    meta: { title: '登录' },
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },

]

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        // affix: true 当前tag会被固定在tags-view中
        meta: { title: '系统首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/organization',
    hidden: true,
    component: Layout,
    redirect: '/organization/info',
    children: [
      {
        path: 'info',
        name: 'Info',
        component: () => import('@/views/organization/index'),
        //noCache: true 不会被<keep-alive>缓存
        meta: { title: '个人中心', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/pet',
    alwaysShow: true,
    component: Layout,
    redirect: '/pet/petInformation',
    meta: { title: '宠物管理', icon: 'list' },
    children: [
      {
        path: 'petInformation',
        name: 'petInformation',
        component: () => import('@/views/pet/information'),
        meta: { title: '宠物信息列表' }
      }
    ]
  },
  {
    path: '/user',
    alwaysShow: true,
    component: Layout,
    redirect: '/user/adoption',
    meta: { title: '用户申请表管理', icon: 'peoples' },
    children: [
      {
        path: 'adoption',
        name: 'adoption',
        component: () => import('@/views/user/adoption'),
        meta: { title: '领养申请列表' }
      }
    ]
  },
  {
    path: '/order',
    alwaysShow: true,
    component: Layout,
    redirect: '/order/orderList',
    meta: { title: '订单管理', icon: 'form' },
    children: [
      {
        path: 'orderList',
        name: 'orderList',
        component: () => import('@/views/order/index'),
        meta: { title: '订单列表' }
      }
    ]
  },
  {
    path: '/revisit',
    alwaysShow: true,
    component: Layout,
    redirect: '/revisit/revisitList',
    meta: { title: '回访管理', icon: 'edit' },
    children: [
      {
        path: 'revisitList',
        name: 'revisitList',
        component: () => import('@/views/revisit/index'),
        meta: { title: '回访列表' }
      }
    ]
  },
  {
    path: '/statement',
    alwaysShow: true,
    component: Layout,
    redirect: '/order/orderList',
    meta: { title: '数据报表', icon: 'chart' },
    children: [
      {
        path: 'statement',
        name: 'statement',
        component: () => import('@/views/statement/index'),
        meta: { title: '报表查看' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
