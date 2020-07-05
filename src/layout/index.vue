<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <Header />
      <app-main />
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
}
</style>

