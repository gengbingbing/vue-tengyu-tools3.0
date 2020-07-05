<template>
  <transition name="fade" mode="out-in">
    <router-view :key="key" />
  </transition>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style>

</style>
