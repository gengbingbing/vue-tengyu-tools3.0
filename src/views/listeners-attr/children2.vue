<!--
 * @Author: bingbing.geng
 * @Date: 2022-09-06 15:27:14
 * @LastEditTime: 2022-09-06 16:00:03
 * @FilePath: \vue-tengyu-tools3.0\src\views\listeners-attr\children2.vue
-->
<template>
  <div>
    <h1>{{ $attrs.str1 }}</h1>
    <p>id:  {{ op.id }}</p>
    <p>name:  {{ op.name }}</p>
  </div>
</template>

<script>

export default {
  inject: ['op'],
  mounted() {
    this.$emit('change', 'AAAAAAA')
  },
}
</script>