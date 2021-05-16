<template>
  <div>
    <el-input v-model="input" @change="changeInput"></el-input>
    <export2
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
      excelName: config['CSDN'].excelName,
      headerObj: config['CSDN'].headerObj,
      paramsObj: {},
    };
  },
  created() {
    this.paramsObj = {
      url: `https://so.csdn.net/api/v3/search?q=${this.input}&t=blog&p=1&s=0&tm=0&lv=-1&ft=0&l=&u=&ct=-1&pnt=-1&ry=-1&ss=-1&dct=-1&vco=-1&cc=-1&sc=-1&akt=-1&art=-1&ca=-1&prs=&pre=&ecc=-1&ebc=-1&platform=pc`,
      type: 'post',
      total: 0,
      pageSize: 1450173,
      params: {},
    };
  },
  methods: {
    changeInput() {
      this.paramsObj.url = `https://so.csdn.net/api/v3/search?q=${this.input}&t=blog&p=1&s=0&tm=0&lv=-1&ft=0&l=&u=&ct=-1&pnt=-1&ry=-1&ss=-1&dct=-1&vco=-1&cc=-1&sc=-1&akt=-1&art=-1&ca=-1&prs=&pre=&ecc=-1&ebc=-1&platform=pc`;
    },
  },
};
</script>
