<template>
  <div id="main"></div>
</template>

<script>
import G6 from '@antv/g6';
export default {
  data() {
    return {
      gg: {
        nodes: [
          {
            id: 'node1',
            name: '迭代',
            x: 100,
            y: 200,
          },
          {
            id: 'node2',
            name: 'IR',
            x: 100,
            y: 500,
          },
        ],
        // 边集
        edges: [
          // 表示一条从 node1 节点连接到 node2 节点的边
          {
            source: 'node1',
            target: 'node2',
          },
        ],
      },
    };
  },
  mounted() {
    this.g6();
  },
  methods: {
    g6() {
      const width = document.getElementById('main').scrollWidth;
      const height = document.getElementById('main').scrollHeight || 500;
      const graph = new G6.Graph({
        container: 'main',
        width,
        height,
        defaultNode: {
          type: 'sql', //默认使用上面设置的类
        },
        defaultEdge: {
          type: 'polyline',
          style: {
            radius: 5,
            offset: 45,
            endArrow: true,
            lineWidth: 2,
            stroke: '#C2C8D5',
          },
        },
        nodeStateStyles: {
          selected: {
            stroke: '#d9d9d9',
            fill: '#5394ef',
          },
          //   鼠标 hover 上节点，即 hover 状态为 true 时的样式
          hover: {
            fill: 'lightsteelblue',
          },
        },
        fitView: true,
      });
      graph.data(this.gg);
      graph.render();
    },
  },
};
</script>

<style >
#main {
  width: 1000px;
  height: 1000px;
}
</style>