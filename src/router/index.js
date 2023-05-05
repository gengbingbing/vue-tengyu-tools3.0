import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/layout';

Vue.use(VueRouter);
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
        path: '/dragTable',
        component: () => import('@/views/table/dragTable.vue'),
        name: 'dragTable 表格',
        meta: { title: 'dragTable 表格', icon: '' }
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
      {
        path: '/jsPlumb',
        component: () => import('../components/jsPlumb/index.vue'),
        name: 'jsPlumb',
        meta: { title: 'jsPlumb', icon: '', affix: true }
      },
      {
        path: '/antvG6',
        component: () => import('../components/antvG6/index.vue'),
        name: 'antvG6',
        meta: { title: 'antvG6', icon: '', affix: true }
      },
      {
        path: '/d3',
        component: () => import('../components/d3js/index.vue'),
        name: 'd3',
        meta: { title: 'd3', icon: '', affix: true }
      },
      {
        path: '/treeMap',
        component: () => import('../components/echarts/treeMap.vue'),
        name: 'treeMap',
        meta: { title: 'treeMap', icon: '', affix: true }
      }
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
        path: '/tool/photoSphereViewer',
        component: () => import('@/views/tool/photoSphereViewer/index.vue'),
        name: '全景查看',
        meta: { title: '全景查看', icon: '', affix: true }
      },
      {
        path: '/tool/smoothSignature',
        component: () => import('@/views/tool/smoothSignature.vue'),
        name: '签名',
        meta: { title: '签名', icon: '', affix: true }
      },
      {
        path: '/tool/listeners-attr',
        component: () => import('@/views/listeners-attr/index.vue'),
        name: '跨组件传值',
        meta: { title: '跨组件传值', icon: '', affix: true }
      },
      {
        path: '/tool/md-menu',
        component: () => import('@/views/md-menu/index.vue'),
        name: 'html生成菜单',
        meta: { title: 'HTML生成菜单', icon: '', affix: true }
      },
      {
        path: '/tool/theme',
        component: () => import('@/views/theme/index.vue'),
        name: '主题切换',
        meta: { title: '主题切换', icon: '', affix: true }
      },
      {
        path: '/tool/swiper',
        component: () => import('@/components/swiper/index.vue'),
        name: '轮播组件',
        meta: { title: 'swiper', icon: '', affix: true }
      },
      {
        path: '/tool/index',
        component: () => import('@/views/tool/export.vue'),
        name: '导出/入Excel',
        meta: { title: '导出/入Excel', icon: '', affix: true }
      },
      {
        path: '/tool/exportExcel',
        component: () => import('@/views/tool/exportExcel/index.vue'),
        name: '导出Excel',
        meta: { title: '导出Excel', icon: '', affix: true }
      },
      {
        path: '/tool/card',
        component: () => import('@/views/card/index.vue'),
        name: '导出/入Excel',
        meta: { title: '卡片', icon: '', affix: true }
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
      }
    ]
  },
  {
    path: '/demo',
    name: 'demo',
    component: Layout,
    redirect: '/demo',
    meta: { title: 'demo', icon: '', affix: false },
    children: [
      {
        path: '/demo/scroll',
        component: () => import('@/views/scroll/index'),
        name: 'scroll',
        meta: { title: 'scroll', icon: '', affix: true }
      },
      {
        path: '/demo/scroll1',
        component: () => import('@/views/scroll/index1'),
        name: 'scroll1',
        meta: { title: 'scroll1', icon: '', affix: true }
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
        path: '/err-page/imgLazyload',
        component: () => import('@/views/imgLazyload/index'),
        name: 'imgLazyload',
        meta: { title: 'imgLazyload', icon: '', affix: true }
      },
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
];

const router = new VueRouter({
  mode: 'history',
  base: window.__MICRO_APP_BASE_ROUTE__ || '/',
  routes
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
