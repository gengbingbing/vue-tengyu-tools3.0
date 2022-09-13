<!--
 * @Author: bingbing.geng
 * @Date: 2022-09-02 08:33:41
 * @LastEditTime: 2022-09-13 09:27:30
 * @FilePath: \vue-tengyu-tools3.0\src\layout\Sidebar\index.vue
-->
<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :unique-opened="true"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import SidebarItem from "./SidebarItem";

export default {
  components: { SidebarItem },
  computed: {
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    routes() {
      return this.$router.options.routes;
    }
  }
};
</script>

<style lang="less" scoped>
/deep/.el-scrollbar__view {
  overflow: auto;
  height: 100vh;
}
</style>
