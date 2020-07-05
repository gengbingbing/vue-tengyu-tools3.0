<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <!-- <el-tab-pane label="use clipboard  directly" name="directly">
        <el-input v-model="inputData" placeholder="Please input" style="width:400px;max-width:100%;" />
        <el-button type="primary" icon="el-icon-document" @click="handleCopy(inputData,$event)">
          copy
        </el-button>
      </el-tab-pane> -->
      <el-tab-pane label="use clipboard by v-directive" name="v-directive">
        <el-input v-model="inputData" placeholder="Please input" style="width:400px;max-width:100%;" />
        <el-button v-copy:copy="inputData" v-copy:success="clipboardSuccess" type="primary" icon="el-icon-document">
          copy
        </el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import copy from '@/directive/index.js' // use clipboard by v-directive

export default {
  name: 'CopyDemo',
  directives: {
    copy
  },
  data() {
    return {
      activeName: 'v-directive',
      inputData: 'https://github.com/gengbingbing'
    }
  },
  methods: {
    clipboardSuccess() {
      this.$message({
        message: 'Copy successfully',
        type: 'success',
        duration: 1500
      })
    }
  }
}
</script>

