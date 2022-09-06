<template>
  <div class="icon-sources-wapper wapper">
    <el-main>
      <h1 id="-">一级目录</h1>
      <br />
      <br />
      <br />
      <br />
      <h2 id="-1">二级目录1</h2>
      <br />
      <br />
      <br />
      <br />
      <h3 id="-1">三级目录1</h3>
      <br />
      <br />
      <br />
      <br />
      <h1 id="-">一级目录</h1>
      <br />
      <br />
      <br />
      <br />
      <h4 id="-1">四级目录1</h4>
      <p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
      <p>
        <img src="/Users/chenyujun/Desktop/截屏2020-07-14 下午1.56.11.png" alt="截屏2020-07-14 下午1.56.11" />
      </p>
      <h4 id="-2">四级目录2</h4>
      <p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
      <h3 id="-2">三级目录2</h3>
      <p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
      <h2 id="-2">二级目录2</h2>
      <p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
      <h4 id="-4">四级目录4</h4>
      <p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
      <h4 id="-4">四级目录4</h4>
      <p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
      <h4 id="-4">四级目录4</h4>
      <p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
      <h5 id="-5">五级目录</h5>
      <p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
    </el-main>
    <el-aside>
      <div style="margin:0px 0 0 180px;font-size:18px;font-weight:bold;">目录</div>
      <el-tabs
        @tab-click="handleClick"
        v-model="activeName"
        :tab-position="tabPosition"
        style="height: auto;"
      >
        <el-tab-pane
          :name="'tab'+index"
          :class="item.lev"
          v-for="(item, index) in navList"
          :key="index"
          :label="item.name"
        ></el-tab-pane>
      </el-tabs>
    </el-aside>
  </div>
</template>
  <script>
export default {
  data() {
    return {
      activeName: "tab0",
      tabPosition: "right",
      scroll: "",
      navList: []
    };
  },
  methods: {
    handleClick(tab, event) {
      this.jump(tab.index);
    },
    dataScroll: function() {
      this.scroll =
        document.documentElement.scrollTop || document.body.scrollTop;
    },
    jump(index) {
      let jump = document.querySelectorAll("h1,h2,h3,h4,h5,h6");
      // 获取需要滚动的距离
      let total = jump[index].offsetTop - 80;
      // Chrome
      document.body.scrollTop = total;
      // Firefox
      document.documentElement.scrollTop = total;
      // Safari
      window.pageYOffset = total;
      // $('html, body').animate({
      // 'scrollTop': total
      // }, 400);
    },
    loadScroll: function() {
      let self = this;
      let navs = document.querySelectorAll(".el-tabs__item");
      // var sections = document.getElementsByClassName('section');
      for (var i = self.navList.length - 1; i >= 0; i--) {
        if (self.scroll >= self.navList[i].offsetTop - 120) {
          self.activeName = "tab" + i;
          break;
        }
      }
    },
    selectAllTitle() {
      let title = document.querySelectorAll("h1,h2,h3,h4,h5,h6");
      this.navList = Array.from(title);
      this.navList.forEach(item => {
        item.name = item.innerHTML;
      });
      this.navList.forEach(el => {
        let index = el.localName.indexOf("h");
        el.lev = "lev" + el.localName.substring(index + 1, el.localName.length);
      });
    }
  },
  watch: {
    scroll: function() {
      this.loadScroll();
    }
  },
  mounted() {
    // scroll代表滚动条距离页面顶部距离
    window.addEventListener("scroll", this.dataScroll);
    this.selectAllTitle();
    this.$nextTick(() => {
      setTimeout(() => {
        let navs = document.querySelectorAll(".el-tabs__item");
        for (let i = navs.length - 1; i >= 0; i--) {
          // console.log($('#'+navs[i].id))
          // 从lev1到lev5分别添加不同到样式
          document.querySelector("#" + navs[i].id).style.padding = "0";
          if (this.navList[i].lev == "lev1") {
            document.querySelector("#" + navs[i].id).style.paddingLeft = "20px";
          } else if (this.navList[i].lev == "lev2") {
            document.querySelector("#" + navs[i].id).style.paddingLeft = "35px";
          } else if (this.navList[i].lev == "lev3") {
            document.querySelector("#" + navs[i].id).style.paddingLeft = "50px";
          } else if (this.navList[i].lev == "lev4") {
            document.querySelector("#" + navs[i].id).style.paddingLeft = "65px";
            document.querySelector("#" + navs[i].id).style.fontWeight = "400";
          } else if (this.navList[i].lev == "lev5") {
            document.querySelector("#" + navs[i].id).style.paddingLeft = "80px";
            document.querySelector("#" + navs[i].id).style.fontWeight = "400";
          }
        }
      });
    });
  }
};
</script>
<style lang="scss" >
.el-main {
  width: calc(100% - 270px);
  overflow-y: auto;
  // height: calc(100vh - 60px);
}
.el-tabs__header.is-right {
  height: 500px !important;
  z-index: 99999;
  background: #FFFFFF;
}
.el-aside {
  position: fixed;
  top: 108px;
  right: 50px;
  width: 220px;
  height: auto;
}
.icon-sources-wapper.wapper .el-tabs__nav.is-right {
  box-sizing: content-box !important;
}
</style>
  