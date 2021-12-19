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
      const svg = dom.append('svg').attr('width', 500).attr('height', 300);
      svg.append('g').attr('transform', 'translate(0, 10)');

      var nodes = [
        { name: '姓名1' },
        { name: '姓名2' },
        { name: '姓名3' },
        { name: '姓名4' },
        { name: '姓名5' },
      ];
      d3.forceSimulation(nodes);

      var links = [
        { source: 0, target: 2 },
        { source: 1, target: 2 },
        { source: 3, target: 2 },
        { source: 3, target: 4 },
      ];
      var svg_links = svg
        .selectAll('path')
        .data(links)
        .enter()
        .append('path')
        .style('stroke', '#ccc')
        .style('stroke-width', 3);

      console.log(svg_links);

      this.calculatePath(svg);
    },
    getScales() {
      const x = d3.scaleTime().range([0, 430]);
      const y = d3.scaleLinear().range([210, 0]);
      d3.axisLeft().scale(x);
      d3.axisBottom().scale(y);
      x.domain(d3.extent(this.data, (d, i) => i));
      y.domain([0, d3.max(this.data, (d) => d)]);
      return { x, y };
    },
    calculatePath(svg) {
      const scale = this.getScales();
      const path = d3
        .line()
        .x((d, i) => scale.x(i))
        .y((d) => scale.y(d));
      this.line = path(this.data);
      svg.append('path').attr('d', this.line);
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