<template>
  <div id="wrap" :style="{ height: screenHeight + 'px' }">
    <div id="main" :style="{ top: nowTop + 'px' }">
      <ul id="pageUl" type="disc">
        <li id="pageUlLi1" class="pageUlLi" :class="{'active': curIndex == 1}">&nbsp;</li>
        <li id="pageUlLi2" class="pageUlLi" :class="{'active': curIndex == 2}">&nbsp;</li>
        <li id="pageUlLi3" class="pageUlLi" :class="{'active': curIndex == 3}">&nbsp;</li>
        <li id="pageUlLi4" class="pageUlLi" :class="{'active': curIndex == 4}">&nbsp;</li>
        <li id="pageUlLi5" class="pageUlLi" :class="{'active': curIndex == 5}">&nbsp;</li>
      </ul>
      <div style="background-color: #1b6d85" id="page1" class="page">111  &laquo;</div>
      <div style="background-color: #5cb85c" id="page2" class="page">222 &ast;</div>
      <div style="background-color: #8a6d3b" id="page3" class="page">333 &reg;</div>
      <div style="background-color: #337ab7" id="page4" class="page">444 &hamilt;</div>
      <div style="background-color: #66512c" id="page5" class="page">555 &real;</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      screenWeight: 0, // 屏幕宽度
      screenHeight: 0, // 屏幕高度
      index: 1, // 用于判断翻页
      curIndex: 1, // 当前页的index
      startTime: 0, // 翻屏起始时间
      endTime: 0, // 上一次翻屏结束时间
      nowTop: 0, // 翻屏后top的位置
      pageNum: 0, // 一共有多少页
      main: Object,
      obj: Object
    };
  },
  mounted() {
    this.screenWeight = document.documentElement.clientWidth;
    this.screenHeight = document.documentElement.clientHeight;
    this.main = document.getElementById("main");
    this.obj = document.getElementsByTagName("div");
    for (let i = 0; i < this.obj.length; i++) {
      if (this.obj[i].className == "page") {
        this.obj[i].style.height = this.screenHeight + "px";
      }
    }
    this.pageNum = document.querySelectorAll(".page").length;

    // 浏览器兼容
    if (navigator.userAgent.toLowerCase().indexOf("firefox") != -1) {
      document.addEventListener("DOMMouseScroll", this.scrollFun, false);
    } else if (document.addEventListener) {
      document.addEventListener("mousewheel", this.scrollFun, false);
    } else if (document.attachEvent) {
      document.attachEvent("onmousewheel", this.scrollFun);
    } else {
      document.onmousewheel = this.scrollFun;
    }
  },
  methods: {
    scrollFun(event) {
      this.startTime = new Date().getTime();
      // mousewheel事件中的 “event.wheelDelta” 属性值：返回的如果是正值说明滚轮是向上滚动
      // DOMMouseScroll事件中的 “event.detail” 属性值：返回的如果是负值说明滚轮是向上滚动
      let delta = event.detail || -event.wheelDelta;
      // 如果当前滚动开始时间和上次滚动结束时间的差值小于1.5s，则不执行翻页动作，这样做是为了实现类似节流的效果
      if (this.startTime - this.endTime > 500) {
        if (delta > 0 && parseInt(this.main.offsetTop) >= -(this.screenHeight * (this.pageNum - 2))) {
          // 向下滚动
          this.index++;
          this.toPage(this.index);
        } else if (delta < 0 && parseInt(this.main.offsetTop) < 0) {
          // 向上滚动
          this.index--;
          this.toPage(this.index);
        }
        // 本次翻页结束，记录结束时间，用于下次判断
        this.endTime = new Date().getTime();
      }
    },
    // 翻页
    toPage(index) {
      if (index != this.curIndex) {
        let delta = index - this.curIndex;
        this.nowTop = this.nowTop - delta * this.screenHeight;
        this.curIndex = index;
      }
    }
  }
};
</script>
<style>
html,
body {
  height: 100%;
}

body,
ul,
li,
a,
p,
div {
  /*慎删*/
  padding: 0px;
  margin: 0px;
}

#wrap {
  overflow: hidden;
  width: 100%;
}

#main {
  position: relative;
  transition: top 0.5s;
}

.page {
  /*谨删*/
  width: 100%;
  margin: 0;
}

#pageUl {
  position: fixed;
  right: 10px;
  bottom: 50%;
}

.active {
  color: rgb(0, 89, 255) !important;
}
.active::marker {
  background: rgb(0, 89, 255) !important;
}
.pageUlLi {
  color: rgb(248, 248, 248);
  background: #FFF;
}
</style>