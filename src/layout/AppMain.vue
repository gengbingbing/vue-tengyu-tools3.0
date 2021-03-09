<template>
  <transition name="fade" mode="out-in">
    <router-view />
  </transition>
</template>

<script>
console.log('855');
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path;
    },
  },
};
</script>

<style>
</style>
