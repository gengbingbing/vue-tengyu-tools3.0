<!--
 * @Author: bingbing.geng
 * @Date: 2022-09-06 15:27:14
 * @LastEditTime: 2022-09-06 15:57:07
 * @FilePath: \vue-tengyu-tools3.0\src\views\listeners-attr\children1.vue
 * 中间组件，使用v-bind="$attrs" v-on="$listeners"进行跨组件传递
-->
<template>
  <div>
    <Children2 v-bind="$attrs" v-on="$listeners"></Children2>
  </div>
</template>

<script>
import Children2 from './children2'

export default {
  inheritAttrs: false,
  components: {
    Children2,
  },
}
</script>