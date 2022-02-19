import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './icons'; // icon
import ElementUI from 'element-ui';
import Cookies from 'js-cookie';
import './public-path'

import * as filters from './filters'; // global filters
import './permission'; // permission control

console.log('打包环境===>', process.env.NODE_ENV);

Vue.config.productionTip = false;

Vue.use(ElementUI, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
});

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});


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