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
            label: '迭代',
            type: 'circle',
            size: 35,
            x: 50,
            y: 200,
            style: {
              fill: '#000',
              stroke: 'red',
            },
            labelCfg: {
              style: {
                // 文字颜色
                fill: '#fff',
              },
            },
          },
          {
            id: 'node2',
            label: 'IR',
            x: 100,
            y: 300,
            type: 'circle-animate',
            color: 'red',
            labelCfg: {
              position: 'center',
              offset: 10,
            },
          },
        ],
        // 边集
        edges: [
          // 表示一条从 node1 节点连接到 node2 节点的边
          {
            label: '30%',
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
      const width = 1000 || document.getElementById('main').scrollWidth;
      const height = document.getElementById('main').scrollHeight || 500;
      const graph = new G6.Graph({
        container: 'main',
        width,
        height,
        animate: true,
        // 设置是否将图适配到画布中
        fitView: true,
        // 画布上四周的留白宽度
        fitViewPadding: [20, 40, 50, 20],
        // 节点在默认状态下的样式属性（style）和其他属性
        defaultNode: {
          size: 30,
          labelCfg: {
            style: {
              // 文字颜色
              fill: '#000',
            },
          },
        },
        // 边在默认状态下的样式配置（style）和其他配置
        defaultEdge: {
          // 边样式配置
          style: {
            opacity: 0.6, // 边透明度
            stroke: 'red', // 边描边颜色
          },
          // 边上的标签文本配置
          labelCfg: {
            autoRotate: true, // 边上的标签文本根据边的方向旋转
          },
        },
        // 节点不同状态下的样式集合
        nodeStateStyles: {
          // 鼠标 hover 上节点，即 hover 状态为 true 时的样式
          hover: {
            fill: 'lightsteelblue',
          },
          // 鼠标点击节点，即 click 状态为 true 时的样式
          click: {
            stroke: '#000',
            lineWidth: 1,
          },
        },
        // 边不同状态下的样式集合
        edgeStateStyles: {
          // 鼠标点击边，即 click 状态为 true 时的样式
          click: {
            stroke: 'steelblue',
          },
        },
        modes: {
          default: [
            {
              type: 'tooltip', // 提示框
              formatText(model) {
                // 提示框文本内容
                const text =
                  'label: ' + model.label + '<br/> class: ' + model.id;
                return text;
              },
            },
            {
              type: 'edge-tooltip', // 边提示框
              formatText(model) {
                // 边提示框文本内容
                const text =
                  'source: ' +
                  model.source +
                  '<br/> target: ' +
                  model.target +
                  '<br/> weight: ' +
                  model.weight;
                return text;
              },
            },
          ],
        },
      });
      graph.data(this.gg);
      graph.render();

      // 鼠标进入节点
      graph.on('node:mouseenter', (e) => {
        const nodeItem = e.item; // 获取鼠标进入的节点元素对象
        graph.setItemState(nodeItem, 'hover', true); // 设置当前节点的 hover 状态为 true
      });

      // 鼠标离开节点
      graph.on('node:mouseleave', (e) => {
        const nodeItem = e.item; // 获取鼠标离开的节点元素对象
        graph.setItemState(nodeItem, 'hover', false); // 设置当前节点的 hover 状态为 false
      });

      // 点击节点
      graph.on('node:click', (e) => {
        // 先将所有当前是 click 状态的节点置为非 click 状态
        const clickNodes = graph.findAllByState('node', 'click');
        clickNodes.forEach((cn) => {
          graph.setItemState(cn, 'click', false);
        });
        const nodeItem = e.item; // 获取被点击的节点元素对象
        graph.setItemState(nodeItem, 'click', true); // 设置当前节点的 click 状态为 true
      });

      // 点击边
      graph.on('edge:click', (e) => {
        // 先将所有当前是 click 状态的边置为非 click 状态
        const clickEdges = graph.findAllByState('edge', 'click');
        clickEdges.forEach((ce) => {
          graph.setItemState(ce, 'click', false);
        });
        const edgeItem = e.item; // 获取被点击的边元素对象
        graph.setItemState(edgeItem, 'click', true); // 设置当前边的 click 状态为 true
      });
    },
  },
};
</script>

<style >
#main {
  width: 1000px;
  height: 500px;
}
/* 提示框的样式 */
.g6-tooltip {
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  font-size: 12px;
  color: #545454;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px 8px;
  box-shadow: rgb(174, 174, 174) 0px 0px 10px;
}
</style>
</style>