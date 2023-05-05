export default (Vue) => {
    var imageCatcheList = [];
    //初始化数据
    var init = {
      default: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.huabanimg.com%2Fcc30c03af8ae10f361c98be3c0bb5fda5634687f1617-RDMX48_fw236&refer=http%3A%2F%2Fhbimg.huabanimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1667963847&t=34e2386dabba1d0bf0056745c44cba74',
    }
    //是否已下载
    const hasLoad = (src) => {
      if (imageCatcheList.indexOf(src) > -1) {
        return true;
      } else {
        return false;
      }
    }
    //图片下载处理
    const imageLoad     = (el, src) => {
      var image    = new Image();
      image.onload = function () {
        el.src = src;
        imageCatcheList.push(src);
      }
      image.src    = src;
    }
    //是否可以展示
    const isCanShow     = (el, src) => {
      //节点离浏览器顶部的距离
      var offsetTop    = el.offsetTop;
      //页面可视区域的高度
      var windowHeight = window.innerHeight;
      var scroll       = windowHeight + window.scrollY;
      var offsetHeigth = el.offsetHeight;
      if (scroll > offsetTop && (window.scrollY - offsetTop) < offsetHeigth) {
        //查询图片是否已加载过，是则直接加载，否则先load
        if (hasLoad(src)) {
          el.src = src;
        } else {
          imageLoad(el, src);
        }
      }
    }
  
    const addListener = (el, bind) => {
      var imageSrc = bind.value;
      //赋值默认值
      el.src       = init.default;
      isCanShow(el, imageSrc);
      window.addEventListener('scroll', function (event) {
        isCanShow(el, imageSrc, event);
      });
    }
  
    Vue.directive('lazy', {
      inserted: addListener,
      updated : addListener,
    })
}