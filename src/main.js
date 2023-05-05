/*
 * @Author: bingbing.geng
 * @Date: 2022-09-02 08:33:41
 * @LastEditTime: 2022-09-06 14:09:03
 * @FilePath: \vue-tengyu-tools3.0\src\main.js
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './icons'; // icon
import ElementUI from 'element-ui';
import Cookies from 'js-cookie';
import './public-path'
import'@/assets/css/font.css'
import'@/assets/css/element.scss'

import * as filters from './filters'; // global filters
import './permission'; // permission control

import imgLazyload from './directive/imgLazyload';
import animate from './directive/animate'

// 引入刚才的js文件
import { initTheme, themeOptions } from '@/views/theme/theme.js';

import MetaInfo from 'vue-meta-info';

Vue.use(MetaInfo)
// key 选择初始化加载默认的主体
initTheme('dark');
Vue.prototype.$initTheme = initTheme;
Vue.prototype.$themeOptions = themeOptions;

console.log('打包环境===>', process.env.NODE_ENV);

Vue.config.productionTip = false;

Vue.use(ElementUI, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
});

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.use(imgLazyload)
Vue.use(animate)


const app = new Vue({
  router,
  store,
  render: h => h(App)
})
app.$mount('#app');

// 监听卸载操作
window.addEventListener('unmount', function () {
  app.$destroy()
})