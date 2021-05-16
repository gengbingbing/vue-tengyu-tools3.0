<template>
  <div>
    <div class="csdnSearch">
      <h1>CSDN搜索</h1>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-input v-model="input" @change="changeInput"></el-input>
        </el-col>
        <el-col :span="12">
          <el-select
            v-model="selVal"
            placeholder="请选择导出条数"
            @change="changeSel"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
    <export2
      class="btn"
      :excelName="excelName"
      :headerObj="headerObj"
      :paramsObj="paramsObj"
    ></export2>
  </div>
</template>

<script>
import export2 from './exportExcel';
import config from './config.json';
export default {
  components: {
    export2,
  },
  data() {
    return {
      input: '前端',
      selVal: 30,
      options: [
        {
          value: 30,
          label: 30,
        },
        {
          value: 100,
          label: 100,
        },
        {
          value: 1000,
          label: 1000,
        },
      ],
      excelName: config['CSDN'].excelName,
      headerObj: config['CSDN'].headerObj,
      paramsObj: {},
    };
  },
  created() {
    this.paramsObj = {
      url: `https://so.csdn.net/api/v3/search?q=${this.input}&t=blog&p=1&s=0&tm=0&lv=-1&ft=0&l=&u=&ct=-1&pnt=-1&ry=-1&ss=-1&dct=-1&vco=-1&cc=-1&sc=-1&akt=-1&art=-1&ca=-1&prs=&pre=&ecc=-1&ebc=-1&platform=pc`,
      type: 'get',
      total: 0,
      pageSize: 30,
      params: {},
    };
  },
  methods: {
    changeInput() {
      this.paramsObj.url = `https://so.csdn.net/api/v3/search?q=${this.input}&t=blog&p=1&s=0&tm=0&lv=-1&ft=0&l=&u=&ct=-1&pnt=-1&ry=-1&ss=-1&dct=-1&vco=-1&cc=-1&sc=-1&akt=-1&art=-1&ca=-1&prs=&pre=&ecc=-1&ebc=-1&platform=pc`;
    },
    changeSel(val) {
      this.selVal = val;
      this.paramsObj.total = val;
      this.paramsObj.url = `https://so.csdn.net/api/v3/search?q=${this.input}&t=blog&p=1&s=0&tm=0&lv=-1&ft=0&l=&u=&ct=-1&pnt=-1&ry=-1&ss=-1&dct=-1&vco=-1&cc=-1&sc=-1&akt=-1&art=-1&ca=-1&prs=&pre=&ecc=-1&ebc=-1&platform=pc`;
    },
  },
};
</script>

<style lang="less" scoped>
.csdnSearch {
  padding: 20px;
}
.btn {
  padding-left: 20px;
}
</style>
