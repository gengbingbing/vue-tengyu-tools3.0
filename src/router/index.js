import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'

Vue.use(VueRouter)
  const routes = [
    {
      path: '/',
      name: '腾宇',
      component: Layout,
      redirect: '/index',
      meta: { title: '表格', icon: '', affix: true },
      children: [
        {
          path: '/index',
          component: () => import('@/views/table/elTable.vue'),
          name: 'elGrid 表格',
          meta: { title: 'elGrid 表格', icon: '', affix: true }
        },
        {
          path: '/dgTable',
          component: () => import('@/views/table/dgTable.vue'),
          name: 'dgTable 表格',
          meta: { title: 'dgTable 表格', icon: '' }
        },
        {
          path: '/indexTreeTable',
          component: () => import('@/views/table/indexTreeTable.vue'),
          name: '自定义treeTable',
          meta: { title: '自定义treeTable', icon: '' }
        },
        {
          path: '/treeTable',
          component: () => import('@/views/table/treeTable.vue'),
          name: 'treeTable 表格',
          meta: { title: 'treeTable 表格', icon: '' }
        },
        {
          path: '/tableChoice',
          component: () => import('@/views/table/tableChoice.vue'),
          name: '表格弹出选择框',
          meta: { title: '表格弹出选择框', icon: '' }
        },
        {
          path: '/treeTransfer',
          component: () => import('@/views/treeTransfer/index.vue'),
          name: '树形穿越框',
          meta: { title: '树形穿越框', icon: '' }
        },
        {
          path: '/selectTable',
          component: () => import('@/views/select/index.vue'),
          name: '下拉表格(带复选框)',
          meta: { title: '下拉表格(带复选框)', icon: '' }
        },
        {
          path: '/tool/treeDragTransfer',
          component: () => import('@/views/treeTransfer/treeDragTransfer.vue'),
          name: '树形可拖拽穿越框',
          meta: { title: '树形可拖拽穿越框', icon: '', affix: true }
        },
      ]
    },
    {
      path: '/tools',
      name: '工具',
      component: Layout,
      redirect: '/tools',
      meta: { title: '工具', icon: '', affix: true },
      children: [
        {
          path: '/tool/index',
          component: () => import('@/views/tool/export.vue'),
          name: '导出/入Excel',
          meta: { title: '导出/入Excel', icon: '', affix: true }
        },
        {
          path: '/tool/animation',
          component: () => import('@/views/tool/animation.vue'),
          name: '数字动画',
          meta: { title: '数字动画', icon: '', affix: true }
        },
        {
          path: '/tool/horseRaceLamp',
          component: () => import('@/views/tool/horseRaceLamp.vue'),
          name: 'vue跑马灯',
          meta: { title: 'vue跑马灯', icon: '', affix: true }
        },
        {
          path: '/tool/markdown',
          component: () => import('@/views/markdown/editor.vue'),
          name: '富文本编辑器',
          meta: { title: '富文本编辑器', icon: '', affix: true }
        },
        {
          path: '/tool/copy',
          component: () => import('@/views/tool/copy.vue'),
          name: '指令Copy',
          meta: { title: '指令Copy', icon: '', affix: true }
        },
      ]
    },
    {
      path: '/err-page',
      name: '404',
      component: Layout,
      redirect: '/404',
      meta: { title: '异常页面', icon: '', affix: false },
      children: [
        {
          path: '/err-page/404',
          component: () => import('@/views/err-page/404'),
          name: '404',
          meta: { title: '404', icon: '', affix: true }
        },
        {
          path: '/err-page/500',
          component: () => import('@/views/err-page/500'),
          name: '500',
          meta: { title: '500', icon: '', affix: true }
        }
      ]
    }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  next()
});

export default router
