<!--
 * @Author: bingbing.geng
 * @Date: 2022-11-29 13:54:43
 * @LastEditTime: 2022-11-29 14:40:36
 * @FilePath: \vue-tengyu-tools3.0\src\views\simple-postman\index.vue
-->
<template>
  <el-dialog :title="title" top="50px" :visible="apiTestVisible" :before-close="handleclose">
    <el-form ref="form" :model="form" label-width="90px">
      <div class="simplepostman">
        <div class="api-url">
          <el-form-item label="请求地址">
            <el-input class="api-url-input" placeholder="请输入URL" v-model="form.apiurI">
              <el-select v-model="apiType" slot="prepend">
                <el-option
                  v-for="item in apiTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-button slot="append" type="primary" @click="sendAxios">发送</el-button>
            </el-input>
          </el-form-item>
        </div>
        <div class="api-header-params">
          <el-form-item label="请求头">
            <el-input
              type="textarea"
              resize="none"
              placeholder="请输入Header参数"
              rows="6"
              v-model="form.apiHeader"
            ></el-input>
            <el-button class="btn" type="primary" @click="getParseHeader(form.apiHeader, true)">格式化</el-button>
          </el-form-item>
        </div>
        <div class="api-params">
          <el-form-item label="请求参数">
            <el-input
              type="textarea"
              resize="none"
              placeholder="请输入入参"
              rows="6"
              v-model="form.apiparams"
            ></el-input>
          </el-form-item>
        </div>
        <div class="response">
          <el-form-item label="返回数据">
            <el-tabs type="border-card">
              <el-tab-pane label="返回数数据">
                <div class="api-response">
                  <el-input
                    type="textarea"
                    resize="none"
                    rows="6"
                    placeholder="接口返回数据"
                    v-model="form.apiResponse"
                  ></el-input>
                </div>
              </el-tab-pane>
              <el-tab-pane label="Response Header">
                <div class="api-response-header">
                  <el-input
                    type="textarea"
                    resize="none"
                    rows="6"
                    placeholder="Response头信息"
                    v-model="form.apiResponseHeader"
                  ></el-input>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      apiType: "GET",
      form: {
        apiUrl: "",
        apiHeader: "",
        apiparams: "",
        apiResponse: "",
        apiResponseHeader: ""
      },
      apiTypeList: [
        {
          lable: "GET",
          value: "GET"
        },
        {
          lable: "POST",
          value: "POST"
        },
        {
          lable: "PUT",
          value: "PUT"
        },
        {
          lable: "DELETE",
          value: "DELETE"
        }
      ]
    };
  },
  props: {
    title: {
      type: String,
      default: "API测试"
    },
    apiTestvisible: {
      type: Boolean,
      default: false
    },
    apiInfo: {
      type: Object
    }
  },
  watch: {
    apiInfo: {
      handler(val) {
        this.apiType = val.requestMethod;
        this.form.apiurl = val.url;
        getApiTree(val.apiid).then(res => {
          this.$set(
            this.form,
            "apiparams",
            JSON.stringify(JSON.parse(res.inputExample), null, "\t")
          );
        });
      },
      deep: true
    }
  },
  methods: {
    handleClose() {
      this.$emit("closevisible");
      this.form.apiurl = "";
      this.form.apiHeader = "";
      this.form.apiparams = "";
      this.form.apiResponse = "";
      this.form.apiResponseHeader = "";
    },
    getParseHeader(headers, state) {
      if (!headers) {
        return false;
      }
      //根据换行格式化字符串为数组
      const headerArr = headers.split("\n");
      let objs = {};
      headerArr.forEach(item => {
        if (item.includes(":")) {
          const str = item.split(":");
          const obj = {};
          obj[str[0]] = str[1];
          objs = { ...objs, ...obj };
        }
      });

      if (state) {
        this.form.apiHeader = JSON.stringify(objs, null, "\t");
        return objs;
      }
    },
    sendAxios() {
      // request请求拦截器
      axios.interceptors.request.use(config => {
        const configParams = config;
        if (this.form.apiHeader.includes("]")) {
          configParams.headers = {
            ...config.headers,
            ...JsON.parse(this.form.apiHeader || "{}")
          };
        } else {
          configParams.headers = {
            ...config.headers,
            ...this.getparseHeader(this.form.apiHeader)
          };
        }
        return configParams;
      }, Promise.reject);

      // 响应拦截器
      axios.interceptors.response.use(
        response => {
          console.log("response=====>", response);
          if (response && response.headers && response.data) {
            this,
              (form.apiResponseHeader = JSON.stringify(
                response.headers,
                null,
                "\t"
              ));
            this.form.apiResponse = JSON.stringify(response.data, null, "\t");
          }
        },
        error => {
          console.log("response=====>", error);
          if (
            error &&
            typeof error === "object" &&
            error.config &&
            error.response
          ) {
            this.form.apiResponseHeader = JSON.stringify(
              error.config.headers,
              null,
              "\t"
            );
            this.form.apiResponse = JSON.stringify(
              error.response.data,
              null,
              "\t"
            );
          } else {
            this.form.apiResponse = error.message;
          }
        }
      );

      axios({
        url: this.form.apiUrl,
        methods: this.apiType,
        data: JSON.parse(this.form.apiparams || '{}'),
      })
    }
  }
};
</script>

<style lang="less" scoped>
/deep/.el-input--suffix {
  width: 90px;
}
/deep/.el-button--primary {
  background: @main-color !important;
  color:#FFFFFF !important;
}
.btn {
  float: right;
  margin-top: 12px;
}
</style>
