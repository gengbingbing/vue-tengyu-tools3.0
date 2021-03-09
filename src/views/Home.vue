<template>
  <el-row class="container">
    <!--头部-->
    <!-- <el-col :span="24"><router-view name="top"></router-view></el-col> -->
    <el-col :span="24" class="main" style="top: 0px">
      <!--右侧内容区-->
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: 'home',
  data() {
    return {
      loading: true,
    };
  },
  mounted() {
    console.log(this.$router.options.routes, '*******************');
  },
};
</script>
<style>
.container .main {
  top: 0px;
}
</style>
