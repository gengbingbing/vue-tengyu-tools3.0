import router from './router'

router.beforeEach(async(to, from, next) => {
  // set page title
  // document.title = getPageTitle(to.meta.title)
  // 通过路由钩子，进行权限校验以及标题设置
  next();

})
