<!--
 * @Author: bingbing.geng
 * @Date: 2022-09-06 15:27:14
 * @LastEditTime: 2022-09-06 15:58:46
 * @FilePath: \vue-tengyu-tools3.0\src\views\listeners-attr\index.vue
-->
<template>
  <div>
    <children1 :str1="str1" :str2="str2" :str3="str3" @change="change"></children1>
  </div>
</template>

<script>
import children1 from './children1.vue';

export default {
  inheritAttrs: false,
  components: {
    children1,
  },
  provide: {
    op: {
      id: 'A001',
      name: 'provide 传入的值'
    }
  },
  data() {
    return {
      str1: 111,
      str2: 222,
      str3: 333,
    }
  },
  methods: {
    change(val) {
      console.log(val, 'change')
    },
  },
}
</script>