<!--
 * @Author: bingbing.geng
 * @Date: 2022-09-02 08:44:09
 * @LastEditTime: 2022-09-02 09:16:10
 * @FilePath: \vue-tengyu-tools3.0\src\views\theme\index.vue
-->
<template>
  <div class="theme">
    <button @click="switchTheme(item)" v-for="item in Object.keys($themeOptions)" :key="item">{{item}}</button>
    <div class="block">
      <span>测试Theme</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {
    switchTheme(theme) {
      this.$initTheme(theme);
    }
  }
};
</script>

<style lang="less" scoped>
.theme {
  padding: 24px;
  height: 100vh;
  text-align: center;
}
.block {
  margin: 20px auto;
  width: 300px;
  height: 300px;
  color: var(--color1); 
  background: var(--bg1);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
