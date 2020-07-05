import router from './router'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  // set page title
  // document.title = getPageTitle(to.meta.title)
  // 通过路由钩子，进行权限校验以及标题设置
  next();
  NProgress.done()

})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
