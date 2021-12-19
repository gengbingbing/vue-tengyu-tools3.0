<template>
  <div id="treeMap" style="width: 800px; height: 800px"></div>
</template>

<script>
import echarts from 'echarts';

export default {
  data() {
    return {
      treeData: [
        {
          name: '产品1',
          value: 10,
          children: [
            {
              name: '子产品1',
              value: 4,
            },
            {
              name: '子产品2',
              value: 6,
            },
            {
              name: '子产品3',
              value: 6,
            },
            {
              name: '子产品4',
              value: 6,
            },
          ],
        },
        {
          name: '产品2',
          value: 10,
          children: [
            {
              name: '子产品1',
              value: 4,
            },
            {
              name: '子产品2',
              value: 6,
            },
            {
              name: '子产品3',
              value: 6,
            },
            {
              name: '子产品4',
              value: 6,
            },
          ],
        },
        {
          name: '产品3',
          value: 10,
          children: [
            {
              name: '子产品1',
              value: 4,
            },
            {
              name: '子产品2',
              value: 6,
            },
            {
              name: '子产品3',
              value: 6,
            },
            {
              name: '子产品4',
              value: 6,
            },
          ],
        },
        {
          name: '产品4',
          value: 10,
          children: [
            {
              name: '子产品1',
              value: 4,
            },
            {
              name: '子产品2',
              value: 6,
            },
            {
              name: '子产品3',
              value: 6,
            },
            {
              name: '子产品4',
              value: 6,
            },
          ],
        },
        {
          name: '产品5',
          value: 10,
          children: [
            {
              name: '子产品1',
              value: 4,
            },
            {
              name: '子产品2',
              value: 6,
            },
            {
              name: '子产品3',
              value: 6,
            },
            {
              name: '子产品4',
              value: 6,
            },
          ],
        },
      ],
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      const option = {
        // title: '树状矩形图',
        tooltip: {
          formatter: function (info) {
            var value = info.value;
            var treePathInfo = info.treePathInfo;
            var treePath = [];
            for (var i = 1; i < treePathInfo.length; i++) {
              treePath.push(treePathInfo[i].name);
            }
            return [
              '<div class="tooltip-title">' +
                echarts.format.encodeHTML(treePath.join('/')) +
                '</div>',
              '子产品: ' + echarts.format.addCommas(value) + ' KB',
            ].join('');
          },
        },
        grid: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 0,
        },
        series: [
          {
            // 设置矩形图的距离
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            // 设置节点不可点击
            nodeClick: false,
            type: 'treemap',
            // 是否开启图例
            breadcrumb: {
              show: false,
            },
            // 禁止缩放平移
            roam: false, //不能缩放平移
            visibleMin: 300,
            label: {
              show: true,
              formatter: '{b}',
              normal: {
                textStyle: {
                  ellipsis: true, //圆角
                },
              },
            },
            levels: this.getLevelOption(),
            upperLabel: {
              show: true,
              height: 40,
              color: '#FFF',
              fontStyle: 'normal',
              borderColor: 'inherit',
              borderWidth: '1',
              borderRadius: '9',
              padding: [0, 0, 0, 20],
            },
            data: this.treeData,
          },
        ],
      };

      const domChart = echarts.init(document.getElementById('treeMap'));
      domChart.setOption(option);
    },
    getLevelOption() {
      // 设置不同层级样式
      return [
        {
          itemStyle: {
            borderColor: '#777',
            borderWidth: 3,
            gapWidth: 1,
          },
          upperLabel: {
            show: false,
          },
        },
        {
          itemStyle: {
            borderColor: '#555',
            borderWidth: 0,
            gapWidth: 1,
          },
          emphasis: {
            itemStyle: {
              borderColor: '#ddd',
            },
          },
        },
        {
          colorSaturation: [0.35, 0.5],
          itemStyle: {
            borderWidth: 3,
            gapWidth: 1,
            borderColorSaturation: 0.6,
          },
        },
      ];
    },
  },
};
</script>

<style lang="less" scoped>
#treeMap {
  border: 3px solid #000000;
}
</style>>