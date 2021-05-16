<template>
  <div>
    <div class="exportBtn" type="primary" @click="getType()">导出</div>
  </div>
</template>

<script>
import axios from '@/utils/request';
import { getResData } from './utils';
export default {
  data() {
    return {
      dataListPost: [],
      formInline: {},
    };
  },
  props: {
    // 导出excel名称
    excelName: {
      type: String,
      default: () => {
        return `${new Date().getTime()}`;
      },
    },
    /**
     * headerObj: 导出文件对象
     * nameArr：标题头部
     * fieldArr：标题id
     * unitArr：列的单位
     *
     */
    headerObj: {
      type: Object,
      default: () => {
        return {
          nameArr: [],
          fieldArr: [],
          unitArr: [],
        };
      },
    },
    /**
     * url: 导出请求地址
     * type：请求类型
     * total：导出文件总数
     * pageSize：一页请求数量
     * params：请求参数
     *
     */
    paramsObj: {
      type: Object,
      default: () => {
        return {
          url: '',
          type: 'post',
          total: 0,
          pageSize: 1000,
          params: {},
        };
      },
    },
    dataList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  methods: {
    // 获取类型
    getType() {
      if (this.dataList.length > 0) {
        this.export2Excel();
      } else {
        this.geParams();
      }
    },
    // 组装参数
    geParams() {
      const params = {
        ...this.paramsObj.params,
        pageSize: this.paramsObj.pageSize,
        currentPage: 1,
      };
      const total = this.paramsObj.total;
      this.getAxiosArr(total, this.paramsObj.pageSize);
    },
    // 获取请求数据
    getAxiosArr(total, pageSize) {
      let serviceArr = [];
      for (let i = 0; i < total / pageSize + 1; i++) {
        let service = '';
        if (this.paramsObj.type === 'post') {
          service = axios.post(this.paramsObj.url, params);
        } else {
          service = axios.get(this.paramsObj.url.replace('p=1', `p=${i + 1}`));
        }
        serviceArr.push(service);
      }

      this.getDataPromise(serviceArr);
    },
    // 将所有请求进行处理数据
    getDataPromise(serviceArr) {
      let promiseArr = [];

      Promise.all(serviceArr)
        .then((res) => {
          let dataArr = [];
          res.forEach((item) => {
            const result = getResData(item, 'result_vos');
            dataArr = [...dataArr, ...result];
          });
          this.assembleData(dataArr);
        })
        .catch((err) => {
          this.$message.error(`导出失败！ ${err}`);
        });
    },
    // 组装数据
    assembleData(data) {
      let Arr = [];
      data.forEach((item) => {
        let obj = {};
        this.headerObj.fieldArr.forEach((field) => {
          obj[field] = item[field].replace(/<em>/g, '').replace(/<\/em>/g, '');
        });
        Arr.push(obj);
      });

      this.export2Excel(Arr);
    },
    export2Excel(dataArr) {
      const { export_json_to_excel } = require('@/vendor/Export2Excel');
      const tHeader = this.headerObj.nameArr;
      const filterVal = this.headerObj.fieldArr;
      const list = dataArr || this.dataListPost;
      const data = this.formatJson(filterVal, list);
      export_json_to_excel(
        tHeader,
        data,
        `${this.excelName}-${this.getTime()}`
      );
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
    getTime() {
      const d = new Date();
      const y = d.getFullYear();
      const mNow = d.getMonth() + 1;
      const m = mNow > 10 ? mNow : `0${mNow}`;
      const day = d.getDate();
      return `${y}${m}${day}`;
    },
  },
};
</script>

<style scoped>
.exportBtn {
  cursor: pointer;
  font-family: '微软雅黑';
  background: #7192ff;
  width: auto;
  line-height: 25px;
  padding: 5px 15px;
  display: inline-block;
  border-radius: 3px;
  color: #ffffff;
  font-size: 14px;
  min-width: 30px;
}
.exportBtn:hover {
  background: #66b1ff;
}
</style>