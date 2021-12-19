<template>
  <div class="chart"></div>
</template>
<script>
import * as d3 from 'd3';
export default {
  name: 'vue-line',
  data() {
    return {
      data: [99, 71, 78, 25, 36, 92],
      line: '',
    };
  },
  mounted() {
    this.createSVG();
  },
  methods: {
    createSVG() {
      const dom = d3.select('.chart');
      const svg = dom.append('svg').attr('width', 1800).attr('height', 900);
      svg.append('g').attr('transform', 'translate(0, 10)');

      this.initChart(svg);
    },

    initChart(g) {
      //定义一个线性比例尺
      const scaleLinear = d3
        .scaleLinear()
        .domain([0, d3.max(this.data)])
        .range([0, 600]);

      // 初始化柱形高度
      const rectHeight = 35;

      g.selectAll('rect')
        .data(this.data)
        .enter()
        .append('rect')
        // 设置左上点x
        .attr('x', 50)
        // 设置左上点y
        .attr('y', (d, i) => {
          return i * rectHeight;
        })
        // 设置宽度
        .attr('width', (d) => {
          return scaleLinear(d);
        })
        // 设置长
        .attr('height', rectHeight - 5)
        // 颜色填充
        .attr('fill', 'blue');

      //为坐标轴定义一个线性比例尺
      const xScale = d3
        .scaleLinear()
        .domain([0, d3.max(this.data)])
        .range([0, 600]);

      //定义一个坐标轴
      const xAxis = d3
        .axisBottom(xScale) //定义一个axis，由bottom可知，是朝下的
        .ticks(6); //设置刻度数目

      g.append('g')
        .attr(
          'transform',
          'translate(' + 50 + ',' + this.data.length * rectHeight + ')'
        )
        .call(xAxis);

      //为坐标轴定义一个线性比例尺
      const yScale = d3
        .scaleLinear()
        .domain([50, d3.length])
        .range([0, rectHeight * 6]);

      //定义一个坐标轴
      const yAxis = d3.axisLeft(yScale).ticks(6);

      g.append('g').attr('transform', 'translate(50, 0)').call(yAxis);
    },
  },
};
</script>
<style>
svg {
  margin: 25px;
}
path {
  fill: none;
  stroke: #76bf8a;
  stroke-width: 3px;
}
</style>