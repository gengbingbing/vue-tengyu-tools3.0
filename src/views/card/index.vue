<template>
<div >
  <div style="height: 300px; width: 100%; background: red;"></div>
  <div class="codeNum">
    <div class="card" id="codeNumCard">
      <div class="header">
        <span>代码提交量</span>
      </div>
      <div class="main">
        <div class="left">
          <span class="num">10002(个)</span>
          <img src="./img/up.svg">
        </div>
        <div class="right">
          <div>
            <img @click="openChart()" class="chart" src="./img/chart.svg">
          </div>
          <div>
            <a href="#">
              <img class="link" src="./img/link.svg">
            </a>
          </div>
        </div>
      </div>
    </div>
    <div v-show="visable" class="table-card" :style="{'margin-left':`${marginLeft}px`, 'top': `${top}px`}">
      <div class="header">
        <span>代码详细</span>
      </div>
      <div class="chartBar">
        <div style="width: 600px; height:220px;" id="chartMain"></div>
      </div>
    </div>
  </div>
   <div style="height: 600px; width: 100%; background: yellow;"></div>
</div>
</template>
<script>
import echarts from "echarts";
export default {
  data: function() {
    return {
      visable: false,
      marginLeft: 0,
      top: 0
    };
  },
  mounted() {
    this.marginLeft = document.getElementById('codeNumCard').clientWidth / 2;

    // 监听页面滚动
    window.addEventListener('scroll', this.handleScroll);

    // 初始化距离头部距离
    const chartDom = document.getElementById('codeNumCard');
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    this.top = chartDom.getBoundingClientRect().top + 180 + scrollTop;

  },
  destroyed () {
    //离开该页面需要移除这个监听的事件
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    openChart() {
      this.initChart();
      this.visable = !this.visable;
    },
    initChart() {
      const option = {
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "60%",
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      };
      const dom = document.getElementById("chartMain")
      const myChart = echarts.init(dom)

      myChart.setOption(option);
    },
    handleScroll () { 
      // this.visable = false;
      //改变元素#searchBar的top值
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      var offsetTop = document.querySelector('.table-card').offsetTop;
      // debugger
      offsetTop = this.top - Number(scrollTop);
      document.querySelector('.table-card').style.top = offsetTop+'px';
    },
  }
};
</script>

<style lang="less" scoped>
.codeNum {
  margin-top: 20px;
  padding-bottom: 20px;
  background: #e6e6e6;
  padding-left: 50px;
  padding-top: 50px;
  overflow: hidden;
  width: 320px;
  height: 180px;
  // position: fixed;
  margin-left: 50px;

  .card {
    // margin: 0 auto;
    background-color: #ffffff;
    width: 300px;
    height: 180px;

    .header {
      width: 100%;
      line-height: 40px;
      background: red;
      span {
        margin-left: 15px;
      }
    }

    .main {
      display: flex;
      height: calc(100% - 40px);
      .left {
        width: calc(100% - 120px);
        text-align: center;
        align-self: center;

        .num {
          font-size: 20px;
          color: red;
        }

        img {
          width: 25px;
          vertical-align: sub;
        }
      }

      .right {
        width: 120px;
        text-align: center;
        align-self: center;

        .chart {
          width: 25px;
          cursor: pointer;
        }

        .link {
          width: 25px;
          margin-top: 10px;
          cursor: pointer;
        }
      }
    }
  }
  .table-card {
    z-index: 999;
    display: inline-block;
    // margin-left: 50%;
    background-color: #FFFFFF;
    width: 600px;
    height: 260px;
    margin-top: 10px;
    position: fixed;
    top: auto;

    .header {
      line-height: 40px;
      width: 100%;
      background: #ffffff;
      border-bottom: 1px solid #e6e6e6;
      span {
        margin-left: 15px;
      }
    }

    .chartBar {
      height: calc(100% - 40px);
    }
  }
}
</style>

