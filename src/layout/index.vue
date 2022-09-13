<!--
 * @Author: bingbing.geng
 * @Date: 2022-09-02 08:33:41
 * @LastEditTime: 2022-09-13 09:31:52
 * @FilePath: \vue-tengyu-tools3.0\src\layout\index.vue
-->
<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <Header />
      <app-main class="mains" />
    </div>
  </div>
</template>

<script>
import AppMain from './AppMain.vue'
import Sidebar from './Sidebar/index'
import Header from './Header'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Sidebar,
    Header
  }
}
</script>

<style lang="less" scoped>
.app-wrapper {
  padding: 0;
  margin: 0;
  .sidebar-container {
    width: 220px;
    height: 100vh;
    display: inline-block;
    border-right: 1px solid #e6e6e6;

    /deep/.el-menu {
      border-right: 0px;
    }

    /deep/ a {
      text-decoration: none;
    }
  }
  .main-container {
      width: calc(100% - 225px);
      height: 100vh;
      // display: inline-block;
      position: relative;
      float: right;
  }
  .mains {
    overflow-y: auto;
    height: calc(100vh - 70px);
  }
}
</style>

