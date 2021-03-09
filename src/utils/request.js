import axios from 'axios';
axios.defaults.withCredentials = true;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';//配置请求头

// 添加一个请求拦截器
axios.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response) {
    switch (error.response.status) {
      // 返回401，清除token信息并跳转到登录页面
      case 401:
        // eslint-disable-next-line no-undef
        router.replace({
          path: '/404'
          // 登录成功后跳入浏览的当前页面
          // query: {redirect: router.currentRoute.fullPath}
        });
    }
    // 返回接口返回的错误信息
    return Promise.reject(error.response.data);
  }
});

/* axios.interceptors.request.use(function (config) {
  console.dir(config);
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
}); */

// 通用方法
export const POST = (url, params) => {
  return axios.post(`${url}`, params).then(res => res.data);
};

export const GET = (url, params) => {
  return axios.get(`${url}`, { params: params }).then(res => res.data);
};

export const PUT = (url, params) => {
  return axios.put(`${url}`, params).then(res => res.data);
};

export const DELETE = (url, params) => {
  return axios.delete(`${url}`, { params: params }).then(res => res.data);
};

export const PATCH = (url, params) => {
  return axios.patch(`${url}`, params).then(res => res.data);
};
